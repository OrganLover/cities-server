import {FastifyInstance} from 'fastify'
import {
  createRecyclePointHandler,
  deleteRecyclePointHandler,
  getAllRecyclePointsHandler,
  getOneRecyclePointHandler,
  getShortestWayHandler,
  updateRecyclePointHandler,
} from './recycle.controller'
import {$ref} from './recycle.schema'

const recyclePointRoutes = async (server: FastifyInstance) => {
  server.post(
    '/',
    {
      schema: {
        body: $ref('createRecyclePointSchema'),
      },
    },
    createRecyclePointHandler,
  )

  server.put(
    '/:id',
    {
      schema: {
        body: $ref('updateRecyclePointSchema'),
      },
    },
    updateRecyclePointHandler,
  )

  server.get('/', getAllRecyclePointsHandler)

  server.get('/:id', getOneRecyclePointHandler)

  server.delete('/:id', deleteRecyclePointHandler)

  server.get('/shortest-way/:id', getShortestWayHandler)
}

export default recyclePointRoutes
