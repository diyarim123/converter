import { BrowserRouter, Routes, Route } from 'react-router-dom'

// components
import ConvertCard from './components/ConvertCard'

// main Layout
import MainLayout from './layouts/MainLayout'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<ConvertCard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
