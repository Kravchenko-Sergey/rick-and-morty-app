import { Card, TextField } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDebounce } from '../../hooks/useDebounse'
import { useGetItemsQuery } from '../../hooks/useGetItemsQuery.ts'

export const ItemsList = () => {
	const [searchValue, setSearchValue] = useState('')
	const navigate = useNavigate()

	const debouncedValue = useDebounce(searchValue, 500)

	const { data, isLoading, isSuccess } = useGetItemsQuery(debouncedValue)

	console.log(data)

	const handleItemClick = (id: number) => {
		navigate(`/${id}`)
	}

	return (
		<>
			<TextField
				id='outlined-basic'
				label='Outlined'
				variant='outlined'
				value={searchValue}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					setSearchValue(e.currentTarget.value)
				}}
			/>
			{isLoading ? (
				<div>...Loading</div>
			) : (
				<div>
					{isSuccess &&
						data.data.results.map((el: Item) => {
							return (
								<Card key={el.id} onClick={() => handleItemClick(el.id)}>
									<img src={el.image} alt='image' />
									<p>{el.name}</p>
								</Card>
							)
						})}
				</div>
			)}
		</>
	)
}

export type Origin = {
	name: string
	url: string
}

export type Location = {
	name: string
	url: string
}

export type Item = {
	id: number
	name: string
	status: string
	species: string
	type: string
	gender: string
	origin: Origin
	location: Location
	image: string
	episode: string[]
	url: string
	created: string
}
