import { Card } from '@mui/material'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { getItem } from '../../services/base.api.ts'

export const Item = () => {
	const params = useParams()

	const query = useQuery('item', () => getItem(Number(params.id)))

	console.log(query);
	

	return (
		<Card>
			<img src={query.data?.data.image} alt='image' />
			<p>{query.data?.data.name}</p>
			<p>{query.data?.data.status}</p>
			<p>{query.data?.data.gender}</p>
		</Card>
	)
}
