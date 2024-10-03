import Fastify, { FastifyReply, FastifyRequest } from 'fastify'
import fjwt from "@fastify/jwt"
import userRoutes from './modules/user/user.route';
import { userSchemas } from './modules/user/user.schema';
import { todoSchemas } from './modules/todo/todo.schema';
import todoRoutes from './modules/todo/todo.route';

export const server = Fastify();

server.register(fjwt, {
    secret: "supersecret",
})

server.decorate("authenticate", async (req: FastifyRequest, reply: FastifyReply) => {
    try {
        await req.jwtVerify();
    } catch (e) {
        return reply.send(e)
    }
})

server.get("/healthcheck", () => {
    return { status: "OK" }
});

(async function main() {
    for (const schema of [...userSchemas, ...todoSchemas]) {
        server.addSchema(schema);
    }
    server.register(userRoutes, { prefix: "api/users" });
    server.register(todoRoutes, { prefix: "api/todos" });

    try {
        await server.listen({ port: 5003, host: "0.0.0.0" })
        console.log("Server ready on http://localhost:5003")
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
})();

