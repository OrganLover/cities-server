import prisma from '../../utils/prisma'
import {CreateConnectionInput, UpdateConnectionInput} from './connection.schema'

export const createConnection = async (data: CreateConnectionInput) => {
  const connection = await prisma.connection.create({
    data,
    select: {
      id: true,
      distance: true,
      createdAt: true,
      updatedAt: true,
      initiator: true,
      applier: true,
    },
  })
  return connection
}

export const updateConnection = async (id: number, input: UpdateConnectionInput) => {
  const connection = await prisma.connection.update({
    where: {
      id,
    },
    data: input,
    select: {
      id: true,
      distance: true,
      createdAt: true,
      updatedAt: true,
      initiator: true,
      applier: true,
    },
  })
  return connection
}

export const getAllConnections = async () => {
  const connections = await prisma.connection.findMany({
    select: {
      id: true,
      distance: true,
      createdAt: true,
      updatedAt: true,
      initiator: true,
      applier: true,
    },
  })
  return connections
}

export const getOneConnection = async (id: number) => {
  const connection = await prisma.connection.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      distance: true,
      createdAt: true,
      updatedAt: true,
      initiator: true,
      applier: true,
    },
  })
  return connection
}

export const deleteConnection = async (id: number) => {
  const connection = await prisma.connection.delete({
    where: {
      id,
    },
  })
  return connection
}
