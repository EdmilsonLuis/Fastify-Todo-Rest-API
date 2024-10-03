import { FastifyReply, FastifyRequest } from "fastify";
import { addTodo, deleteTodo, getTodos, updateTodo } from "./todo.service";
import { CreateTodoInput, DeleteTodoInput, UpdateTodoInput } from "./todo.schema";

export async function addTodoHandler(
    req: FastifyRequest<{ Body: CreateTodoInput }>,
    reply: FastifyReply
) {
    const body = req.body;
    try {
        const todo = await addTodo({
            ...body,
            userId: req.user.id,
        });
        return reply.code(201).send(todo)
    } catch (error) {
        console.error(error);
        return reply.code(500).send(error)
    }
}

export async function getTodosHandler(req: FastifyRequest) {
    return await getTodos(req.user.id);
}

export async function updateTodoHandler(
    req: FastifyRequest<{ Body: UpdateTodoInput }>,
    reply: FastifyReply
) {
    const body = req.body;
    return updateTodo(body)
}

export async function deleteTodoHandler(
    req: FastifyRequest<{ Body: DeleteTodoInput }>,
    reply: FastifyReply
) {
    const body = req.body;
    try {
        await deleteTodo(body.todoId)
        return true;
    } catch (error) {
        return false
    }
}