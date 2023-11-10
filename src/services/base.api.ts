import axios from 'axios'

const baseUrl = 'https://rickandmortyapi.com/api/'

export const getItems = async (name: string, page: number, status: string, gender: string) => {
	const res = await axios(`${baseUrl}character/?name=${name}&page=${page}&status=${status}&gender=${gender}`)
	return res
}
export const getItem = async (id: number) => {
	const res = await axios(`${baseUrl}character/${id}`)
	return res
}

export const getEpisodes = async (id: number) => {
	const res = await axios(`${baseUrl}episode/${id}`)
	return res
}
