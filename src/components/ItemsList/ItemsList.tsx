import { Card, FormControl, InputLabel, MenuItem, Pagination, Select, SelectChangeEvent, Switch, TextField } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDebounce } from '../../hooks/useDebounse'
import { useGetItemsQuery } from '../../hooks/useGetItemsQuery.ts'
import { ThemeContext, themes } from '../../contexts/themeContext.ts'

export const ItemsList = () => {
	const [searchValue, setSearchValue] = useState('')
	const navigate = useNavigate()
	const [page, setPage] = useState(1)
	const [gender, setGender] = useState('')
	const [status, setStatus] = useState('')
	const [theme, setTheme] = useState(false)

	const debouncedValue = useDebounce(searchValue, 500)

	const { data, isLoading, isSuccess } = useGetItemsQuery(debouncedValue, page, status, gender)

	const handleItemClick = (id: number) => {
		navigate(`/${id}`)
	}

	const handlePagination = (event: React.ChangeEvent<unknown>, value: number) => {
		setPage(value)
	}

	const handleGenderSelect = (event: SelectChangeEvent) => {
		setGender(event.target.value as string)
	}

	const handleStatusSelect = (event: SelectChangeEvent) => {
		setStatus(event.target.value as string)
	}

	const handleTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTheme(event.target.checked)
	}

	return (
		<>
		<ThemeContext.Consumer>
    {({ theme, setTheme }: any) => (
      <Switch
        onChange={() => {
          if (theme === themes.light) setTheme(themes.dark)
          if (theme === themes.dark) setTheme(themes.light)
        }}
        checked={theme === themes.dark}
				inputProps={{ 'aria-label': 'controlled' }}
      />
    )}
  </ThemeContext.Consumer>
			
			<TextField
				id='outlined-basic'
				label='Outlined'
				variant='outlined'
				value={searchValue}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					setSearchValue(e.currentTarget.value)
				}}
			/>
			<FormControl fullWidth>
				<InputLabel id="demo-simple-select-label">Status</InputLabel>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={status}
					label="Status"
					onChange={handleStatusSelect}
				>
					<MenuItem value={'alive'}>Alive</MenuItem>
					<MenuItem value={'dead'}>Dead</MenuItem>
					<MenuItem value={'unknown'}>Unknown</MenuItem>
				</Select>
			</FormControl>
			<FormControl fullWidth>
				<InputLabel id="demo-simple-select-label">Gender</InputLabel>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={gender}
					label="Gender"
					onChange={handleGenderSelect}
				>
					<MenuItem value={'male'}>Male</MenuItem>
					<MenuItem value={'female'}>Female</MenuItem>
					<MenuItem value={'genderless'}>Genderless</MenuItem>
					<MenuItem value={'unknown'}>Unknown</MenuItem>
				</Select>
			</FormControl>
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
									<p>{el.status}</p>
									<p>{el.gender}</p>
								</Card>
							)
						})}
				</div>
			)}
			<Pagination
				count={data?.data.info.pages}
				page={page}
				onChange={handlePagination}
				shape='rounded'
				color={'primary'}
				size={'small'}
				disabled={isLoading}
			/>
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
