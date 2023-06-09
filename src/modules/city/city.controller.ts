import {FastifyReply, FastifyRequest} from 'fastify'
import {createCity, deleteCity, getCities, getOneCity, updateCity} from './city.servise'
import {CreateCityInput} from './city.schema'

export const createCityHandler = async (req: FastifyRequest<{Body: CreateCityInput}>, rep: FastifyReply) => {
  try {
    const city = await createCity(req.body)
    rep.send(city)
  } catch (err) {
    rep.send(err)
    console.log(err)
  }
}

export const updateCityHandler = async (
  req: FastifyRequest<{Body: CreateCityInput; Params: {cityId: number}}>,
  rep: FastifyReply,
) => {
  try {
    const city = await updateCity(Number(req.params.cityId), req.body)
    rep.send(city)
  } catch (err) {
    rep.send(err)
    console.log(err)
  }
}

export const getCitiesHandler = async (req: FastifyRequest, rep: FastifyReply) => {
  try {
    const cities = await getCities()
    rep.send(cities)
  } catch (err) {
    rep.send(err)
    console.log(err)
  }
}

export const deleteCityHandler = async (
  req: FastifyRequest<{Params: {cityId: number}}>,
  rep: FastifyReply,
) => {
  try {
    const city = await deleteCity(Number(req.params.cityId))
    rep.send(city)
  } catch (err) {
    rep.send(err)
    console.log(err)
  }
}

export const getOneCityHandler = async (
  req: FastifyRequest<{Params: {cityId: number}}>,
  rep: FastifyReply,
) => {
  try {
    const city = await getOneCity(Number(req.params.cityId))
    rep.send(city)
  } catch (err) {
    rep.send(err)
    console.log(err)
  }
}
