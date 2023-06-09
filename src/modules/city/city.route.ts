import {FastifyInstance} from 'fastify'
import {
  deleteCityHandler,
  getCitiesHandler,
  getOneCityHandler,
  createCityHandler,
  updateCityHandler,
} from './city.controller'
import {$ref} from '../city/city.schema'

const cityRoutes = async (server: FastifyInstance) => {
  server.post(
    '/',
    {
      schema: {
        body: $ref('createCitySchema'),
      },
    },
    createCityHandler,
  )

  server.put(
    '/:cityId',
    {
      schema: {
        body: $ref('updateCitySchema'),
      },
    },
    updateCityHandler,
  )

  server.get('/', getCitiesHandler)

  server.get('/:cityId', getOneCityHandler)

  server.delete('/:cityId', deleteCityHandler)
}

export default cityRoutes
