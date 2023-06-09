import {FastifyInstance} from 'fastify'
import {
  createCollectionPointHandler,
  deleteCollectionPointHandler,
  getAllCollectionPointsHandler,
  getOneCollectionPointHandler,
  updateCollectionPointHandler,
} from './collection.controller'
import {$ref} from './collection.schema'

const collectionPointRoutes = async (server: FastifyInstance) => {
  server.post(
    '/',
    {
      schema: {
        body: $ref('createCollectionPointSchema'),
      },
    },
    createCollectionPointHandler,
  )

  server.put(
    '/:id',
    {
      schema: {
        body: $ref('updateCollectionPointSchema'),
      },
    },
    updateCollectionPointHandler,
  )

  server.get('/', getAllCollectionPointsHandler)

  server.get('/:id', getOneCollectionPointHandler)

  server.delete('/:id', deleteCollectionPointHandler)
}

export default collectionPointRoutes
