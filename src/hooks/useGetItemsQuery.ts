import { useQuery } from 'react-query'
import { getItems } from '../services/base.api.ts'

export const useGetItemsQuery = (debouncedValue: string, page: number, status: string, gender: string) => {
	const newStatus = status === 'All' ? '' : status
	const newGender = gender === 'All' ? '' : gender
	return useQuery({	
		queryFn: () => getItems(debouncedValue, page, newStatus, newGender),
		queryKey: ['items', debouncedValue, page, newStatus, newGender],
		onError: err => {
			if (err instanceof Error) {
				console.log(err)
			}
		}
	})
}
