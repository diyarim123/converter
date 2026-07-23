import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages
import PdfToWord from './pages/PdfToWord'

// main Layout
import MainLayout from './layouts/MainLayout'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<PdfToWord />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
