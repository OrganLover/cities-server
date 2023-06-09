import {z} from 'zod'
import {buildJsonSchemas} from 'fastify-zod'
import {createCollectionAndRecycleConnectionInsideCollectionPointSchema} from '../collectionAndRecycleConnection/collectionAndRecycleConnection.schema'

export const createCollectionPointSchema = z.object({
  name: z.string(),
  trashCollectionSize: z.number(),
  cityId: z.number(),
  connectionWithRecycle: z.array(createCollectionAndRecycleConnectionInsideCollectionPointSchema),
})

export const updateCollectionPointSchema = z.object({
  name: z.string(),
  trashCollectionSize: z.number(),
  cityId: z.number(),
  connectionWithRecycle: z
    .array(createCollectionAndRecycleConnectionInsideCollectionPointSchema)
    .optional()
    .default([]),
})

export type CreateCollectionPointInput = z.infer<typeof createCollectionPointSchema>

export type UpdateCollectionPointInput = z.infer<typeof updateCollectionPointSchema>

export const {schemas: collectionPointSchemas, $ref} = buildJsonSchemas(
  {
    createCollectionPointSchema,
    updateCollectionPointSchema,
  },
  {$id: 'collectionPointSchemas'},
)
