import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateTodoInput {
    @Field()
    title: string;

    @Field()
    price: number;
}
