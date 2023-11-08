import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ItemsList } from './components/ItemsList/ItemsList'
import { Item } from './components/Item/item'

const router = createBrowserRouter([
	{
		path: '/',
		element: <ItemsList />
	},
	{
		path: '/:id',
		element: <Item />
	}
])

export const Router = () => {
	return <RouterProvider router={router} />
}