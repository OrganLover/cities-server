import {FastifyReply, FastifyRequest} from 'fastify'
import {
  createConnection,
  deleteConnection,
  getAllConnections,
  getOneConnection,
  updateConnection,
} from './connection.service'
import {CreateConnectionInput, UpdateConnectionInput} from './connection.schema'

export const createConnectionHandler = async (
  req: FastifyRequest<{Body: CreateConnectionInput}>,
  rep: FastifyReply,
) => {
  try {
    const connection = await createConnection(req.body)
    rep.send(connection)
  } catch (err) {
    rep.send(err)
    console.log(err)
  }
}

export const updateConnectionHandler = async (
  req: FastifyRequest<{Body: UpdateConnectionInput; Params: {id: number}}>,
  rep: FastifyReply,
) => {
  try {
    const connection = await updateConnection(Number(req.params.id), req.body)
    rep.send(connection)
  } catch (err) {
    rep.send(err)
    console.log(err)
  }
}

export const getAllConectionsHandler = async (req: FastifyRequest, rep: FastifyReply) => {
  try {
    const connections = await getAllConnections()
    rep.send(connections)
  } catch (err) {
    rep.send(err)
    console.log(err)
  }
}

export const getOneConnectionHandler = async (
  req: FastifyRequest<{Params: {id: number}}>,
  rep: FastifyReply,
) => {
  try {
    const connection = await getOneConnection(Number(req.params.id))
    rep.send(connection)
  } catch (err) {
    rep.send(err)
    console.log(err)
  }
}

export const deleteConnectionHandler = async (
  req: FastifyRequest<{Params: {id: number}}>,
  rep: FastifyReply,
) => {
  try {
    const connection = await deleteConnection(Number(req.params.id))
    rep.send(connection)
  } catch (err) {
    rep.send(err)
    console.log(err)
  }
}
