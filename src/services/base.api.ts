import axios from 'axios'

const baseUrl = 'https://rickandmortyapi.com/api/'

export const getItems = async (name: string, page: number) => {
	const res = await axios(`${baseUrl}character/?name=${name}&page=${page}`)
	return res
}
export const getItem = async (id: number) => {
	const res = await axios(`${baseUrl}character/${id}`)
	return res
}
