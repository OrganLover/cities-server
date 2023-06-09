import prisma from '../../utils/prisma'
import {CreateCollectionPointInput, UpdateCollectionPointInput} from './collection.schema'

export const createCollectionPoint = async (input: CreateCollectionPointInput) => {
  const percentArray = input.connectionWithRecycle.map((item) => item.trashSize)
  const percent = percentArray.reduce((acc: number, item: number) => acc + item, 0)

  if (percent <= 100) {
    const trashSendSize = (input.trashCollectionSize / 100) * percent
    const trashLeftSize = input.trashCollectionSize - trashSendSize

    const newConnectionWithRecycle = input.connectionWithRecycle.map((item) => ({
      recyclePointId: item.recyclePointId,
      distance: item.distance,
      trashSize: (input.trashCollectionSize / 100) * item.trashSize,
    }))

    const [collectionPoint] = await prisma.$transaction([
      prisma.collectionPoint.create({
        data: {
          name: input.name,
          trashCollectionSize: input.trashCollectionSize,
          trashLeftSize,
          cityId: input.cityId,
          connectionWithRecycle: {
            createMany: {
              data: newConnectionWithRecycle,
            },
          },
        },
      }),
      ...newConnectionWithRecycle.map((item) => {
        return prisma.recyclePoint.update({
          where: {
            id: item.recyclePointId,
          },
          data: {
            trashRecycleSize: {
              increment: item.trashSize,
            },
          },
        })
      }),
    ])
    return collectionPoint
  } else {
    return {msg: 'trashSize must be provided in percent% and not more than 100%'}
  }
}

export const updateCollectionPoint = async (id: number, input: UpdateCollectionPointInput) => {
  const percentArray = input.connectionWithRecycle.map((item) => item.trashSize)
  const percent = percentArray.reduce((acc: number, item: number) => acc + item, 0)

  const colPoint = await prisma.collectionPoint.findUnique({
    where: {
      id,
    },
  })

  const trashSendSize = (input.trashCollectionSize / 100) * percent

  if (trashSendSize <= colPoint?.trashLeftSize!) {
    const trashLeftSize = colPoint?.trashLeftSize! - trashSendSize

    const newConnectionWithRecycle = input.connectionWithRecycle.map((item) => ({
      recyclePointId: item.recyclePointId,
      distance: item.distance,
      trashSize: (input.trashCollectionSize / 100) * item.trashSize,
    }))

    const [collectionPoint] = await prisma.$transaction([
      prisma.collectionPoint.update({
        where: {
          id,
        },
        data: {
          name: input.name,
          trashCollectionSize: input.trashCollectionSize,
          trashLeftSize,
          cityId: input.cityId,
          connectionWithRecycle: {
            createMany: {
              data: newConnectionWithRecycle,
            },
          },
        },
      }),
      ...newConnectionWithRecycle.map((item) => {
        return prisma.recyclePoint.update({
          where: {
            id: item.recyclePointId,
          },
          data: {
            trashRecycleSize: {
              increment: item.trashSize,
            },
          },
        })
      }),
    ])
    return collectionPoint
  } else {
    return {msg: 'trashSize must be provided in percent% and not more than trashLeftSize'}
  }
}

export const getAllCollectionPoints = async () => {
  const collectionPoints = await prisma.collectionPoint.findMany({
    include: {
      connectionWithRecycle: {
        select: {
          id: true,
          distance: true,
          trashSize: true,
          createdAt: true,
          updatedAt: true,
          collectionPoint: true,
          recyclePoint: true,
        },
      },
    },
  })
  return collectionPoints
}

export const getOneCollectionPoint = async (id: number) => {
  const collectionPoint = await prisma.collectionPoint.findUnique({
    where: {
      id,
    },
    include: {
      connectionWithRecycle: true,
    },
  })
  return collectionPoint
}

export const deleteCollectionPoint = async (id: number) => {
  const collectionAndRecycleConnection = await prisma.collectionAndRecycleConnection.findMany({
    where: {
      collectionPointId: id,
    },
  })
  const array = collectionAndRecycleConnection.map((con) => ({
    id: con.recyclePointId,
    size: con.trashSize,
  }))
  const result = await prisma.$transaction([
    ...array.map((item) => {
      return prisma.recyclePoint.update({
        where: {
          id: item.id,
        },
        data: {
          trashRecycleSize: {
            decrement: item.size,
          },
        },
      })
    }),

    prisma.collectionPoint.delete({
      where: {
        id,
      },
    }),
  ])
  return result.at(-1)
}
