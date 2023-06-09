import {FastifyInstance} from 'fastify'
import {
  createConnectionHandler,
  deleteConnectionHandler,
  getAllConectionsHandler,
  getOneConnectionHandler,
  updateConnectionHandler,
} from './connection.controller'
import {$ref} from './connection.schema'

const connectionRoutes = async (server: FastifyInstance) => {
  server.post(
    '/',
    {
      schema: {
        body: $ref('createConnectionSchema'),
      },
    },
    createConnectionHandler,
  )

  server.put(
    '/:id',
    {
      schema: {
        body: $ref('updateConnectionSchema'),
      },
    },
    updateConnectionHandler,
  )

  server.get('/', getAllConectionsHandler)

  server.get('/:id', getOneConnectionHandler)

  server.delete('/:id', deleteConnectionHandler)
}

export default connectionRoutes
