import { useQuery } from 'react-query'
import { getItems } from '../services/base.api.ts'

export const useGetItemsQuery = (debouncedValue: string, page: number) => {
	return useQuery({
		queryFn: () => getItems(debouncedValue, page),
		queryKey: ['items', debouncedValue, page],
		onError: err => {
			if (err instanceof Error) {
				console.log(err)
			}
		}
	})
}
