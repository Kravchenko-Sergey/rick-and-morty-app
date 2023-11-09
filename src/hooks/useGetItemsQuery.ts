import { useQuery } from 'react-query'
import { getItems } from '../services/base.api.ts'

export const useGetItemsQuery = (debouncedValue: string, page: number, status: string, gender: string) => {
	return useQuery({	
		queryFn: () => getItems(debouncedValue, page, status, gender),
		queryKey: ['items', debouncedValue, page, status, gender],
		onError: err => {
			if (err instanceof Error) {
				console.log(err)
			}
		}
	})
}
