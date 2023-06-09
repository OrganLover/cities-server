import prisma from '../../utils/prisma'
import {CreateRecyclePointInput, UpdateRecyclePointInput} from './recycle.schema'

export const createRecyclePoint = async (input: CreateRecyclePointInput) => {
  const recyclePoint = await prisma.recyclePoint.create({
    data: {
      name: input.name,
      cityId: input.cityId,
    },
  })
  return recyclePoint
}

export const updateRecyclePoint = async (id: number, input: UpdateRecyclePointInput) => {
  const recyclePoint = await prisma.recyclePoint.update({
    where: {
      id,
    },
    data: input,
  })
  return recyclePoint
}

export const getAllRecyclePoints = async () => {
  const recyclePoints = await prisma.recyclePoint.findMany({
    include: {
      connectionWithCollection: true,
    },
  })
  return recyclePoints
}

export const getOneRecyclePoint = async (id: number) => {
  const recyclePoint = await prisma.recyclePoint.findUnique({
    where: {
      id,
    },
    include: {
      connectionWithCollection: true,
    },
  })
  return recyclePoint
}

export const deleteRecyclePoint = async (id: number) => {
  const connectionsWithCollections = await prisma.collectionAndRecycleConnection.findMany({
    where: {
      recyclePointId: id,
    },
  })

  const result = await prisma.$transaction([
    ...connectionsWithCollections.map((item) => {
      return prisma.collectionPoint.update({
        where: {
          id: item.collectionPointId,
        },
        data: {
          trashLeftSize: {
            increment: item.trashSize,
          },
        },
      })
    }),

    prisma.recyclePoint.delete({
      where: {
        id,
      },
    }),
  ])

  return result.at(-1)
}

export const getShortestWay = async (id: number) => {
  const connections = await prisma.collectionAndRecycleConnection.findMany({
    where: {
      recyclePointId: id,
    },
    orderBy: {
      distance: 'asc',
    },
    include: {
      collectionPoint: true,
    },
  })

  const sortedCollectionPoints = connections.map((item) => item.collectionPoint)

  return sortedCollectionPoints
}
