import fastify from 'fastify'
import cityRoutes from './modules/city/city.route'
import {connectionSchemas} from './modules/connection/connection.schema'
import connectionRoutes from './modules/connection/connection.route'
import {citySchemas} from './modules/city/city.schema'
import cors from '@fastify/cors'
import collectionPointRoutes from './modules/collectionPoint/collection.route'
import recyclePointRoutes from './modules/recyclePoint/recycle.route'
import collectionAndRecycleConnectionRoutes from './modules/collectionAndRecycleConnection/collectionAndRecycleConnection.route'
import {recyclePointSchemas} from './modules/recyclePoint/recycle.schema'
import {collectionPointSchemas} from './modules/collectionPoint/collection.schema'
import {collectionAndRecycleConnectionSchemas} from './modules/collectionAndRecycleConnection/collectionAndRecycleConnection.schema'

const server = fastify()

server.register(cors)

server.get('/', async () => {
  return {status: 'ok'}
})

const main = async () => {
  server.register(cityRoutes, {prefix: 'api/cities'})
  server.register(connectionRoutes, {prefix: 'api/connections'})
  server.register(collectionPointRoutes, {prefix: 'api/collection-points'})
  server.register(recyclePointRoutes, {prefix: 'api/recycle-points'})
  server.register(collectionAndRecycleConnectionRoutes, {prefix: 'api/collection-recycle-connection'})

  for (const schema of [
    ...citySchemas,
    ...connectionSchemas,
    ...recyclePointSchemas,
    ...collectionPointSchemas,
    ...collectionAndRecycleConnectionSchemas,
  ]) {
    server.addSchema(schema)
  }

  try {
    await server.listen({
      port: 3001,
    })
    console.log('server runs at http://localhost:3001')
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

main()
