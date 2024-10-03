import { FastifyReply, FastifyRequest } from "fastify";
import { createUser, findUserByEmail, findUsers } from "./user.service";
import { CreateUserInput, LoginInput } from "./user.schema";
import { verifyPassword } from "../../utils/hash";
import { server } from "../../app";

export async function registerUserHandler(
    req: FastifyRequest<{ Body: CreateUserInput }>,
    reply: FastifyReply
) {
    const body = req.body;
    try {
        const user = await createUser(body);
        return reply.code(201).send(user)
    } catch (error) {
        console.error(error);
        return reply.code(500).send(error)
    }
}

export async function getUsersHandler() {
    return await findUsers();
}

export async function loginHandler(
    req: FastifyRequest<{ Body: LoginInput }>,
    reply: FastifyReply
) {
    const body = req.body;

    // find user by email address
    const user = await findUserByEmail(body.email)

    if (!user) return reply.code(401).send({
        message: "Invalid email or password"
    })

    // verify password
    const correctPassword = verifyPassword(body.password, user.salt, user.password)

    if (correctPassword) {
        // generate access token
        return {
            accessToken: server.jwt.sign({
                id: user.id,
                name: user.name,
                email: user.email,
            })
        }
    }

    return reply.code(401).send({
        message: "Invalid email or password"
    })
}