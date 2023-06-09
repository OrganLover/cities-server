import {FastifyReply, FastifyRequest} from 'fastify'
import {
  createCollectionPoint,
  deleteCollectionPoint,
  getAllCollectionPoints,
  getOneCollectionPoint,
  updateCollectionPoint,
} from './collection.service'
import {CreateCollectionPointInput} from './collection.schema'

export const createCollectionPointHandler = async (
  req: FastifyRequest<{Body: CreateCollectionPointInput}>,
  rep: FastifyReply,
) => {
  try {
    const collectionPoint = await createCollectionPoint(req.body)
    rep.send(collectionPoint)
  } catch (err) {
    console.log(err)
    rep.send(err)
  }
}

export const updateCollectionPointHandler = async (
  req: FastifyRequest<{Body: CreateCollectionPointInput; Params: {id: number}}>,
  rep: FastifyReply,
) => {
  try {
    const collectionPoint = await updateCollectionPoint(Number(req.params.id), req.body)
    rep.send(collectionPoint)
  } catch (err) {
    rep.send(err)
    console.log(err)
  }
}

export const getAllCollectionPointsHandler = async (req: FastifyRequest, rep: FastifyReply) => {
  try {
    const collectionPoints = await getAllCollectionPoints()
    rep.send(collectionPoints)
  } catch (err) {
    rep.send(err)
    console.log(err)
  }
}

export const getOneCollectionPointHandler = async (
  req: FastifyRequest<{Params: {id: number}}>,
  rep: FastifyReply,
) => {
  try {
    const collectionPoint = await getOneCollectionPoint(Number(req.params.id))
    rep.send(collectionPoint)
  } catch (err) {
    rep.send(err)
    console.log(err)
  }
}

export const deleteCollectionPointHandler = async (
  req: FastifyRequest<{Params: {id: number}}>,
  rep: FastifyReply,
) => {
  try {
    const collectionPoint = await deleteCollectionPoint(Number(req.params.id))
    rep.send(collectionPoint)
  } catch (err) {
    rep.send(err)
    console.log(err)
  }
}
