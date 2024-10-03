import { FastifyInstance } from "fastify";
import { getUsersHandler, loginHandler, registerUserHandler } from "./user.controller";
import { $ref } from "./user.schema";

export default async function userRoutes(server: FastifyInstance) {
    server.post(
        "/",
        {
            schema: {
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
                body: $ref("loginSchema"),
                response: {
                    201: $ref("loginResponseSchema")
                }
            }
        },
        loginHandler
    )
}