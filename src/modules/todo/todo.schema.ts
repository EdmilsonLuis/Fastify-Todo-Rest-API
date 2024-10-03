import { buildJsonSchemas } from "fastify-zod"
import { z } from "zod"

const createTodoSchema = z.object({
    title: z.string({
        invalid_type_error: "Task must be a string",
        required_error: "Task is required",
    })
})

const updateTodoSchema = z.object({
    id: z.string({
        invalid_type_error: "Id must be a string",
        required_error: "Id is required",
    }),
    title: z.string({
        invalid_type_error: "Task must be a string"
    }).optional(),
    completed: z.boolean({
        invalid_type_error: "Completed must be a true/false value"
    }).optional(),
})

const todoResponseSchema = z.object({
    id: z.string(),
    title: z.string(),
    completed: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string(),
})

const todosResponseSchema = z.array(todoResponseSchema)

const deleteTodoResponseSchema = z.boolean()

const deleteTodoSchema = z.object({
    todoId: z.string({
        invalid_type_error: "Id must be a string",
        required_error: "Id is required",
    }),
})

export type CreateTodoInput = z.infer<typeof createTodoSchema>
export type UpdateTodoInput = z.infer<typeof updateTodoSchema>
export type DeleteTodoInput = z.infer<typeof deleteTodoSchema>

export const { $ref, schemas: todoSchemas } = buildJsonSchemas({
    createTodoSchema,
    todoResponseSchema,
    deleteTodoResponseSchema,
    updateTodoSchema,
    deleteTodoSchema,
    todosResponseSchema
}, { $id: "TodoSchema" })