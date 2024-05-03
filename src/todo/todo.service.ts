import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, Todo } from '@prisma/client';

@Injectable()
export class TodoService {
    constructor(private prisma: PrismaService) { }

    create = async (createTodoInput: Prisma.TodoCreateInput): Promise<Todo> => {
        try {
            return await this.prisma.todo.create({
                data: {
                    ...createTodoInput
                }
            });
        } catch (error) {
            throw new HttpException({ message: error.message }, HttpStatus.BAD_REQUEST);
        }
    }

    todos = async (
        params: {
            skip?: number,
            take?: number,
            select?: Prisma.TodoSelect,
            cursor?: Prisma.TodoWhereUniqueInput,
            where?: Prisma.TodoWhereUniqueInput,
            orderBy?: Prisma.TodoOrderByWithRelationInput,
        }
    ): Promise<Todo[]> => {
        try {
            const { skip, take, select, cursor, where, orderBy } = params;
            return await this.prisma.todo.findMany({
                skip,
                take,
                select,
                cursor,
                where,
                orderBy
            });
        } catch (error) {
            throw new HttpException({ message: 'Oops, something went wrong' }, HttpStatus.BAD_GATEWAY);
        }
    }

    todo = async (
        todoWhereUniqueInput: Prisma.TodoWhereUniqueInput
    ): Promise<Todo> => {
        try {
            return await this.prisma.todo.findFirstOrThrow({
                where: todoWhereUniqueInput
            })
        } catch (error) {
            throw new HttpException({ message: error.message }, HttpStatus.NOT_FOUND);
        }
    }

    update = async (
        params: {
            where: Prisma.TodoWhereUniqueInput,
            updateTodoInput: Prisma.TodoUncheckedUpdateInput
        }
    ): Promise<Todo> => {
        try {
            const { where, updateTodoInput } = params;
            return await this.prisma.todo.update({
                where,
                data: updateTodoInput
            });
        } catch (error) {
            throw new HttpException({ message: 'Oops, something went wrong' }, HttpStatus.NOT_FOUND);
        }
    }

    remove = async (where: Prisma.TodoWhereUniqueInput): Promise<Todo> => {
        try {
            return await this.prisma.todo.delete({
                where,
            });
        } catch (error) {
            throw new HttpException({ message: 'Oops, something went wrong' }, HttpStatus.NOT_FOUND);
        }
    }
}
