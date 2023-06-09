import {FastifyReply, FastifyRequest} from 'fastify'
import {
  createRecyclePoint,
  deleteRecyclePoint,
  getAllRecyclePoints,
  getOneRecyclePoint,
  getShortestWay,
  updateRecyclePoint,
} from './recycle.servise'
import {CreateRecyclePointInput, UpdateRecyclePointInput} from './recycle.schema'

export const createRecyclePointHandler = async (
  req: FastifyRequest<{Body: CreateRecyclePointInput}>,
  rep: FastifyReply,
) => {
  try {
    const recyclePoint = await createRecyclePoint(req.body)
    rep.send(recyclePoint)
  } catch (err) {
    rep.send(err)
    console.log(err)
  }
}

export const updateRecyclePointHandler = async (
  req: FastifyRequest<{Body: UpdateRecyclePointInput; Params: {id: number}}>,
  rep: FastifyReply,
) => {
  try {
    const recyclePoint = await updateRecyclePoint(Number(req.params.id), req.body)
    rep.send(recyclePoint)
  } catch (err) {
    rep.send(err)
    console.log(err)
  }
}

export const getAllRecyclePointsHandler = async (req: FastifyRequest, rep: FastifyReply) => {
  try {
    const recyclePoints = await getAllRecyclePoints()
    rep.send(recyclePoints)
  } catch (err) {
    rep.send(err)
    console.log(err)
  }
}

export const getOneRecyclePointHandler = async (
  req: FastifyRequest<{Params: {id: number}}>,
  rep: FastifyReply,
) => {
  try {
    const recyclePoint = await getOneRecyclePoint(Number(req.params.id))
    rep.send(recyclePoint)
  } catch (err) {
    rep.send(err)
    console.log(err)
  }
}

export const deleteRecyclePointHandler = async (
  req: FastifyRequest<{Params: {id: number}}>,
  rep: FastifyReply,
) => {
  try {
    const recyclePoint = await deleteRecyclePoint(Number(req.params.id))
    rep.send(recyclePoint)
  } catch (err) {
    rep.send(err)
    console.log(err)
  }
}

export const getShortestWayHandler = async (
  req: FastifyRequest<{Params: {id: number}}>,
  rep: FastifyReply,
) => {
  try {
    const result = await getShortestWay(Number(req.params.id))
    rep.send(result)
  } catch (err) {
    rep.send(err)
    console.log(err)
  }
}
