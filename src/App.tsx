import './App.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Router } from './router'
import ThemeProvider from './providers/ThemeProvider'


function App() {
  const queryClient = new QueryClient()

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Router/>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
