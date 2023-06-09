import {z} from 'zod'
import {createConnectionInsideCitySchema} from '../connection/connection.schema'
import {buildJsonSchemas} from 'fastify-zod'

const createCitySchema = z.object({
  name: z.string(),
  connections: z.array(createConnectionInsideCitySchema).optional(),
})

const updateCitySchema = createCitySchema

export type CreateCityInput = z.infer<typeof createCitySchema>

export type UpdateCityInput = z.infer<typeof updateCitySchema>

export const {schemas: citySchemas, $ref} = buildJsonSchemas(
  {
    createCitySchema,
    updateCitySchema,
  },
  {$id: 'citySchemas'},
)
