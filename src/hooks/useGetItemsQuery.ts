import { useQuery } from 'react-query'
import { getItems } from '../services/base.api.ts'

export const useGetItemsQuery = (debouncedValue: string) => {
	return useQuery({
		queryFn: () => getItems(debouncedValue),
		queryKey: ['items', debouncedValue],
		onError: err => {
			if (err instanceof Error) {
				console.log(err)
			}
		}
	})
}
