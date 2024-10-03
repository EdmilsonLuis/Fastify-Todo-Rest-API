import { buildJsonSchemas } from "fastify-zod"
import { z } from "zod"

const userCore = {
    email: z.string({
        invalid_type_error: "Email must be a string",
        required_error: "Email is required",
    }).email(),
    name: z.string()
}
const createUserSchema = z.object({
    ...userCore,
    password: z.string({
        invalid_type_error: "Password must be a string",
        required_error: "Password is required",
    }),
})

const createUserResponseSchema = z.object({
    ...userCore,
    id: z.string()
})

export type CreateUserInput = z.infer<typeof createUserSchema>

const loginSchema = z.object({
    email: z.string({
        invalid_type_error: "Email must be a string",
        required_error: "Email is required",
    }).email(),
    password: z.string(),
})

export type LoginInput = z.infer<typeof loginSchema>

const loginResponseSchema = z.object({
    accessToken: z.string()
})

export const { $ref, schemas: userSchemas } = buildJsonSchemas({
    createUserSchema,
    createUserResponseSchema,
    loginResponseSchema,
    loginSchema
}, { $id: "UserSchema" })