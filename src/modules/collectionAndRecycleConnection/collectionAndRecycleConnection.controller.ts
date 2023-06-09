import {FastifyReply, FastifyRequest} from 'fastify'
import {
  createCollectionAndRecycleConnection,
  deleteCollectionAndRecycleConnection,
  getAllCollectionAndRecycleConnections,
  getOneCollectionAndRecycleConnection,
  updateCollectionAndRecycleConnection,
} from './collectionAndRecycleConnection.service'
import {
  CreateCollectionAndRecycleConnectionInput,
  UpdateCollectionAndRecycleConnectionInput,
} from './collectionAndRecycleConnection.schema'

export const createCollectionAndRecycleConnectionHandler = async (
  req: FastifyRequest<{Body: CreateCollectionAndRecycleConnectionInput}>,
  rep: FastifyReply,
) => {
  try {
    const collectionAndRecycleConnection = await createCollectionAndRecycleConnection(req.body)
    rep.send(collectionAndRecycleConnection)
  } catch (err) {
    rep.send(err)
    console.log(err)
  }
}

export const updateCollectionAndRecycleConnectionHandler = async (
  req: FastifyRequest<{Body: UpdateCollectionAndRecycleConnectionInput; Params: {id: number}}>,
  rep: FastifyReply,
) => {
  try {
    const collectionAndRecycleConnection = await updateCollectionAndRecycleConnection(
      Number(req.params.id),
      req.body,
    )
    rep.send(collectionAndRecycleConnection)
  } catch (err) {
    rep.send(err)
    console.log(err)
  }
}

export const getAllCollectionAndRecycleConnectionsHandler = async (
  req: FastifyRequest,
  rep: FastifyReply,
) => {
  try {
    const collectionAndRecycleConnections = await getAllCollectionAndRecycleConnections()
    rep.send(collectionAndRecycleConnections)
  } catch (err) {
    rep.send(err)
    console.log(err)
  }
}

export const getOneCollectionAndRecycleConnectionHandler = async (
  req: FastifyRequest<{Params: {id: number}}>,
  rep: FastifyReply,
) => {
  try {
    const collectionAndRecycleConnection = await getOneCollectionAndRecycleConnection(Number(req.params.id))
    rep.send(collectionAndRecycleConnection)
  } catch (err) {
    rep.send(err)
    console.log(err)
  }
}

export const deleteCollectionAndRecycleConnectionHandler = async (
  req: FastifyRequest<{Params: {id: number}}>,
  rep: FastifyReply,
) => {
  try {
    const collectionAndRecycleConnection = await deleteCollectionAndRecycleConnection(Number(req.params.id))
    rep.send(collectionAndRecycleConnection)
  } catch (err) {
    rep.send(err)
    console.log(err)
  }
}
