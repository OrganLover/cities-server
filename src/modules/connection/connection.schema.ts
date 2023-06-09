import {z} from 'zod'
import {buildJsonSchemas} from 'fastify-zod'

export const createConnectionSchema = z.object({
  initiatorId: z.number(),
  applierId: z.number(),
  distance: z.number(),
})

export const createConnectionInsideCitySchema = z.object({
  applierId: z.number(),
  distance: z.number(),
})

export const updateConnectionSchema = z.object({
  distance: z.number(),
})

export type CreateConnectionInput = z.infer<typeof createConnectionSchema>

export type UpdateConnectionInput = z.infer<typeof updateConnectionSchema>

export type CreateConnectionInsideCitySchema = z.infer<typeof createConnectionInsideCitySchema>

export const {schemas: connectionSchemas, $ref} = buildJsonSchemas(
  {
    createConnectionSchema,
    createConnectionInsideCitySchema,
    updateConnectionSchema,
  },
  {$id: 'connectionSchemas'},
)
