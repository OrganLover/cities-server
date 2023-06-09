import prisma from '../../utils/prisma'
import {CreateCityInput, UpdateCityInput} from './city.schema'

export const createCity = async (input: CreateCityInput) => {
  const city = await prisma.city.create({
    data: {
      name: input.name,
      connectionsAsInitiator: input.connections
        ? {
            createMany: {
              data: input.connections,
            },
          }
        : undefined,
    },
    include: {
      connectionsAsApplier: true,
      connectionsAsInitiator: true,
      collectionPoints: true,
      recyclePoints: true,
    },
  })

  const result = {
    id: city!.id,
    name: city!.name,
    createdAt: city!.createdAt,
    updatedAt: city!.updatedAt,
    connections: [...city!.connectionsAsInitiator, ...city!.connectionsAsApplier],
    collectionPoints: city!.collectionPoints,
    recyclePoints: city!.recyclePoints,
  }

  return result
}

export const updateCity = async (id: number, input: UpdateCityInput) => {
  const city = await prisma.city.update({
    where: {
      id,
    },
    data: {
      name: input.name,
      connectionsAsInitiator: input.connections
        ? {
            createMany: {
              data: input.connections,
            },
          }
        : undefined,
    },
    include: {
      connectionsAsApplier: true,
      connectionsAsInitiator: true,
      collectionPoints: true,
      recyclePoints: true,
    },
  })

  const result = {
    id: city!.id,
    name: city!.name,
    createdAt: city!.createdAt,
    updatedAt: city!.updatedAt,
    connections: [...city!.connectionsAsInitiator, ...city!.connectionsAsApplier],
    collectionPoints: city!.collectionPoints,
    recyclePoints: city!.recyclePoints,
  }

  return result
}

export const getCities = async () => {
  const cities = await prisma.city.findMany({
    include: {
      connectionsAsInitiator: {
        select: {
          id: true,
          distance: true,
          updatedAt: true,
          createdAt: true,
          initiator: true,
          applier: true,
        },
      },
      connectionsAsApplier: {
        select: {
          id: true,
          distance: true,
          updatedAt: true,
          createdAt: true,
          initiator: true,
          applier: true,
        },
      },
      collectionPoints: true,
      recyclePoints: true,
    },
  })

  const result = cities.map((city) => ({
    id: city.id,
    name: city.name,
    createdAt: city.createdAt,
    updatedAt: city.updatedAt,
    connections: [...city.connectionsAsInitiator, ...city.connectionsAsApplier],
    collectionPoints: city.collectionPoints,
    recyclePoints: city.recyclePoints,
  }))

  return result
}

export const getOneCity = async (id: number) => {
  const city = await prisma.city.findUnique({
    where: {
      id,
    },
    include: {
      connectionsAsInitiator: true,
      connectionsAsApplier: true,
      collectionPoints: true,
      recyclePoints: true,
    },
  })

  const result = {
    id: city!.id,
    name: city!.name,
    createdAt: city!.createdAt,
    updatedAt: city!.updatedAt,
    connections: [...city!.connectionsAsInitiator, ...city!.connectionsAsApplier],
    collectionPoints: city!.collectionPoints,
    recyclePoints: city!.recyclePoints,
  }

  return result
}

export const deleteCity = async (id: number) => {
  const city = await prisma.city.delete({
    where: {
      id,
    },
  })
  return city
}
