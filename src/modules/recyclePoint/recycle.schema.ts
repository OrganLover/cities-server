import {z} from 'zod'
import {buildJsonSchemas} from 'fastify-zod'

export const createRecyclePointSchema = z.object({
  name: z.string(),
  cityId: z.number(),
})

export const updateRecyclePointSchema = z.object({
  name: z.string(),
})

export type CreateRecyclePointInput = z.infer<typeof createRecyclePointSchema>

export type UpdateRecyclePointInput = z.infer<typeof updateRecyclePointSchema>

export const {schemas: recyclePointSchemas, $ref} = buildJsonSchemas(
  {
    createRecyclePointSchema,
    updateRecyclePointSchema,
  },
  {$id: 'recyclePointSchemas'},
)
