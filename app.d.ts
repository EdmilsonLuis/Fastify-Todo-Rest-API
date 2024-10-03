import Fastify, { FastifyInstance } from 'fastify'

declare module '@fastify/jwt' {
    export interface FastifyJWT {
        user: {
            id: string;
            email: string;
            name?: string;
        }
    }
};

declare module 'fastify' {
    export interface FastifyInstance {
        authenticate: any;
    }
};