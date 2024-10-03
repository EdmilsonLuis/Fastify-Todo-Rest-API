import { FastifyInstance } from "fastify";
import { $ref } from "./todo.schema";
import { addTodoHandler, deleteTodoHandler, getTodosHandler, updateTodoHandler } from "./todo.controller";

export default async function todoRoutes(server: FastifyInstance) {
    server.post(
        "/",
        {
            schema: {
                body: $ref("createTodoSchema"),
                response: {
                    201: $ref("todoResponseSchema")
                }
            },
            preHandler: [server.authenticate]
        },
        addTodoHandler
    )

    server.put(
        "/",
        {
            schema: {
                body: $ref("updateTodoSchema"),
                response: {
                    201: $ref("todoResponseSchema")
                }
            },
            preHandler: [server.authenticate],
            // onRequest: [server.authenticate]
        },
        updateTodoHandler
    )

    server.delete(
        "/",
        {
            schema: {
                body: $ref("deleteTodoSchema"),
                response: {
                    201: $ref("deleteTodoResponseSchema")
                }
            },
            preHandler: [server.authenticate]
        },
        deleteTodoHandler
    )

    server.get(
        "/",
        {
            preHandler:[server.authenticate],
            schema: {
                response: {
                    200: $ref("todosResponseSchema")
                }
            },
        },
        getTodosHandler
    )
}