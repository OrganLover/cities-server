import {FastifyInstance} from 'fastify'
import {
  createCollectionAndRecycleConnectionHandler,
  deleteCollectionAndRecycleConnectionHandler,
  getAllCollectionAndRecycleConnectionsHandler,
  getOneCollectionAndRecycleConnectionHandler,
  updateCollectionAndRecycleConnectionHandler,
} from './collectionAndRecycleConnection.controller'
import {$ref} from './collectionAndRecycleConnection.schema'

const collectionAndRecycleConnectionRoutes = async (server: FastifyInstance) => {
  server.post(
    '/',
    {
      schema: {
        body: $ref('createCollectionAndRecycleConnectionSchema'),
      },
    },
    createCollectionAndRecycleConnectionHandler,
  )

  server.put(
    '/:id',
    {
      schema: {
        body: $ref('updateCollectionAndRecycleConnectionSchema'),
      },
    },
    updateCollectionAndRecycleConnectionHandler,
  )

  server.get('/', getAllCollectionAndRecycleConnectionsHandler)

  server.get('/:id', getOneCollectionAndRecycleConnectionHandler)

  server.delete('/:id', deleteCollectionAndRecycleConnectionHandler)
}

export default collectionAndRecycleConnectionRoutes
