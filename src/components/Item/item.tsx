import { Card } from '@mui/material'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { getEpisodes, getItem } from '../../services/base.api.ts'
import s from './Item.module.scss'

export const Item = () => {
	const params = useParams()
	const navigate = useNavigate()

	const query = useQuery('item', () => getItem(Number(params.id)))

	const episodes = useQuery('episodes', () => getEpisodes(Number(params.id)))

	const handleBtnClick = () => {
		navigate('/')
	}

	return (
		<Card className={s.card}>
			<img src={query.data?.data.image} alt='image' className={s.image} />
			<div>
				<div className={s.property}>
					<span>name:</span>
					<p>{query.data?.data.name}</p>
				</div>
				<div className={s.property}>
					<span>status:</span>
					<p>{query.data?.data.status}</p>
				</div>
				<div className={s.property}>
					<span>gender:</span>
					<p>{query.data?.data.gender}</p>
				</div>
				<div className={s.property}>
					<span>species:</span>
					<p>{query.data?.data.species}</p>
				</div>
				<div className={s.property}>
					<span>episode:</span>
					<p>{episodes.data?.data.episode}</p>
				</div>
			</div>
			<button onClick={handleBtnClick} className={s.backBtn}>
				back
			</button>
		</Card>
	)
}
