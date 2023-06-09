import {z} from 'zod'
import {buildJsonSchemas} from 'fastify-zod'

export const createCollectionAndRecycleConnectionSchema = z.object({
  distance: z.number(),
  trashSize: z.number(),
  collectionPointId: z.number(),
  recyclePointId: z.number(),
})

export const createCollectionAndRecycleConnectionInsideCollectionPointSchema = z.object({
  distance: z.number(),
  trashSize: z.number(),
  recyclePointId: z.number(),
})

export const updateCollectionAndRecycleConnectionSchema = z.object({
  distance: z.number(),
  trashSize: z.number(),
})

export type CreateCollectionAndRecycleConnectionInput = z.infer<
  typeof createCollectionAndRecycleConnectionSchema
>

export type UpdateCollectionAndRecycleConnectionInput = z.infer<
  typeof updateCollectionAndRecycleConnectionSchema
>

export type CreateCollectionAndRecycleConnectionInsideCollectionPointInput = z.infer<
  typeof createCollectionAndRecycleConnectionInsideCollectionPointSchema
>

export const {schemas: collectionAndRecycleConnectionSchemas, $ref} = buildJsonSchemas(
  {
    createCollectionAndRecycleConnectionSchema,
    createCollectionAndRecycleConnectionInsideCollectionPointSchema,
    updateCollectionAndRecycleConnectionSchema,
  },
  {$id: 'collectionAndRecycleConnectionSchemas'},
)
