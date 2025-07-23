import { FastifyInstance } from "fastify";
import { $ref } from "./todo.schema";
import { addTodoHandler, deleteTodoHandler, getTodosHandler, updateTodoHandler } from "./todo.controller";

export default async function todoRoutes(server: FastifyInstance) {
    server.post(
        "/",
        {
            schema: {
                description: "Add a new todo item",
                tags: ["Todo"],
                summary: "Add Todo",
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
                description: "Update an existing todo item",
                tags: ["Todo"],
                summary: "Update Todo",
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
                description: "Delete a todo item",
                tags: ["Todo"],
                summary: "Delete Todo",
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
                description: "Get all todo items",
                tags: ["Todo"],
                summary: "Get Todos",
                response: {
                    200: $ref("todosResponseSchema")
                }
            },
        },
        getTodosHandler
    )
}