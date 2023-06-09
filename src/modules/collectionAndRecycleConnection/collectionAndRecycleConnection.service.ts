import prisma from '../../utils/prisma'
import {
  CreateCollectionAndRecycleConnectionInput,
  UpdateCollectionAndRecycleConnectionInput,
} from './collectionAndRecycleConnection.schema'

export const createCollectionAndRecycleConnection = async (
  input: CreateCollectionAndRecycleConnectionInput,
) => {
  const collectionPoint = await prisma.collectionPoint.findUnique({
    where: {
      id: input.collectionPointId,
    },
  })

  if (input.trashSize <= collectionPoint?.trashLeftSize!) {
    const [collectionAndRecycleConnection] = await prisma.$transaction([
      prisma.collectionAndRecycleConnection.create({
        data: input,
      }),

      prisma.collectionPoint.update({
        where: {
          id: input.collectionPointId,
        },
        data: {
          trashLeftSize: {
            decrement: input.trashSize,
          },
        },
      }),

      prisma.recyclePoint.update({
        where: {
          id: input.recyclePointId,
        },
        data: {
          trashRecycleSize: {
            increment: input.trashSize,
          },
        },
      }),
    ])

    return collectionAndRecycleConnection
  } else {
    return {msg: 'trashSize must be provided in percent and not more than 100%'}
  }
}

export const updateCollectionAndRecycleConnection = async (
  id: number,
  input: UpdateCollectionAndRecycleConnectionInput,
) => {
  const connection = await prisma.collectionAndRecycleConnection.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      distance: true,
      trashSize: true,
      createdAt: true,
      updatedAt: true,
      collectionPoint: true,
      recyclePoint: true,
    },
  })

  const finalTrashSize = connection?.trashSize! - input.trashSize

  const [colPoint, recPoint, con] = await prisma.$transaction([
    prisma.collectionPoint.update({
      where: {
        id: connection?.collectionPoint.id,
      },
      data: {
        trashLeftSize: {
          increment: finalTrashSize,
        },
      },
    }),

    prisma.recyclePoint.update({
      where: {
        id: connection?.recyclePoint.id,
      },
      data: {
        trashRecycleSize: {
          decrement: finalTrashSize,
        },
      },
    }),

    prisma.collectionAndRecycleConnection.update({
      where: {
        id,
      },
      data: input,
    }),
  ])

  return con
}

export const getAllCollectionAndRecycleConnections = async () => {
  const collectionAndRecycleConnections = await prisma.collectionAndRecycleConnection.findMany({
    include: {
      collectionPoint: true,
      recyclePoint: true,
    },
  })
  return collectionAndRecycleConnections
}

export const getOneCollectionAndRecycleConnection = async (id: number) => {
  const collectionAndRecycleConnection = await prisma.collectionAndRecycleConnection.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      distance: true,
      trashSize: true,
      createdAt: true,
      updatedAt: true,
      collectionPoint: true,
      recyclePoint: true,
    },
  })
  return collectionAndRecycleConnection
}

export const deleteCollectionAndRecycleConnection = async (id: number) => {
  const collectionAndRecycleConnection = await prisma.collectionAndRecycleConnection.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      distance: true,
      trashSize: true,
      createdAt: true,
      updatedAt: true,
      collectionPoint: true,
      recyclePoint: true,
    },
  })

  const [colPoint, recPoint, connection] = await prisma.$transaction([
    prisma.collectionPoint.update({
      where: {
        id: collectionAndRecycleConnection?.collectionPoint.id,
      },
      data: {
        trashLeftSize: {
          increment: collectionAndRecycleConnection?.trashSize,
        },
      },
    }),

    prisma.recyclePoint.update({
      where: {
        id: collectionAndRecycleConnection?.recyclePoint.id,
      },
      data: {
        trashRecycleSize: {
          decrement: collectionAndRecycleConnection?.trashSize,
        },
      },
    }),

    prisma.collectionAndRecycleConnection.delete({
      where: {
        id,
      },
    }),
  ])

  return connection
}
