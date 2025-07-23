import { FastifyInstance } from "fastify";
import { getUsersHandler, loginHandler, registerUserHandler } from "./user.controller";
import { $ref } from "./user.schema";

export default async function userRoutes(server: FastifyInstance) {
    server.post(
        "/",
        {
            schema: {
                description: "Register a new user",
                tags: ["User"],
                summary: "Register User",
                body: $ref("createUserSchema"),
                response: {
                    201: $ref("createUserResponseSchema")
                }
            }
        },
        registerUserHandler
    )

    server.post(
        "/login",
        {
            schema: {
                description: "Login an existing user",
                tags: ["User"],
                summary: "Login User",
                body: $ref("loginSchema"),
                response: {
                    201: $ref("loginResponseSchema")
                }
            }
        },
        loginHandler
    )
}