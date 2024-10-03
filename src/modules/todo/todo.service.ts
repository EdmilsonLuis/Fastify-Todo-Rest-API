import { hashPassword } from "../../utils/hash";
import { CreateTodoInput, UpdateTodoInput } from './todo.schema';
import prisma from "../../utils/prisma";

export async function addTodo(input: CreateTodoInput& { userId: string }) {
    return prisma.todo.create({
        data: { title: input.title, userId: input.userId }
    })
}

export async function updateTodo(input: UpdateTodoInput) {
    return prisma.todo.update({
        where: {
            id: input.id,
            // userId: input.userId
        },
        data: { title: input.title, completed: input.completed}
    })
}

export async function findTodo(id: string) {
    return prisma.todo.findUnique({ where: { id } });
}

export async function getTodos(userId: string) {
    return await prisma.todo.findMany({ where: { userId } })
}

export async function deleteTodo(id: string) {
    return prisma.todo.delete({ where: { id } });
}