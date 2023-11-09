import { Card, FormControl, InputLabel, MenuItem, Pagination, Select, SelectChangeEvent, Switch, TextField } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDebounce } from '../../hooks/useDebounse'
import { useGetItemsQuery } from '../../hooks/useGetItemsQuery.ts'
import { ThemeContext, themes } from '../../contexts/themeContext.ts'
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import Brightness2RoundedIcon from '@mui/icons-material/Brightness2Rounded';
import s from '../ItemsList/ItemsList.module.scss'

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

			<header className={s.header}>
				<TextField
					id='outlined-basic'
					label='Search'
					variant='outlined'
					value={searchValue}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						setSearchValue(e.currentTarget.value)
					}}
					className={s.search}
				/>
				<FormControl className={s.select} fullWidth>
					<InputLabel id="demo-simple-select-label">Status</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={status}
						defaultValue='All'
						label="Status"
						onChange={handleStatusSelect}
						className={s.select}
					>
						<MenuItem value={'All'}>All</MenuItem>
						<MenuItem value={'alive'}>Alive</MenuItem>
						<MenuItem value={'dead'}>Dead</MenuItem>
						<MenuItem value={'unknown'}>Unknown</MenuItem>
					</Select>
				</FormControl>
				<FormControl className={s.select} fullWidth>
					<InputLabel id="demo-simple-select-label">Gender</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={gender}
						label="Gender"
						onChange={handleGenderSelect}
						className={s.select}
					>
						<MenuItem value={''}>All</MenuItem>
						<MenuItem value={'male'}>Male</MenuItem>
						<MenuItem value={'female'}>Female</MenuItem>
						<MenuItem value={'genderless'}>Genderless</MenuItem>
						<MenuItem value={'unknown'}>Unknown</MenuItem>
					</Select>
				</FormControl>
				<div className={s.toggler}>
					<LightModeRoundedIcon />
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
					<Brightness2RoundedIcon />
				</div>
			</header>
			{isLoading ? (
				<div>...Loading</div>
			) : (
				<div className={s.items}>
					{isSuccess &&
						data.data.results.map((el: Item) => {
							return (
								<Card key={el.id} onClick={() => handleItemClick(el.id)} className={s.card}>
									<img src={el.image} alt='image' className={s.itemImage} />
									<div className={s.itemInfo}>
										<div className={s.property}><span>name:</span><p>{el.name}</p></div>
										<div className={s.property}><span>status:</span><p>{el.status}</p></div>
										<div className={s.property}><span>gender:</span><p>{el.gender}</p></div>
									</div>

								</Card>
							)
						})}
				</div>
			)}
			<div className={s.pagination}>
				<Pagination
					count={data?.data.info.pages}
					page={page}
					onChange={handlePagination}
					shape='rounded'
					color={'primary'}
					size={'small'}
					disabled={isLoading}
				/>
			</div>
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
