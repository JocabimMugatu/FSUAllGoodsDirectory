import { Link, Route, Routes } from 'react-router-dom'
import Placeholder from './routes/Placeholder'

function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white">
      <div className="text-center p-8 rounded-xl border bg-white shadow-sm">
        <h1 className="text-3xl font-bold text-indigo-600">Hello from Vite + React + TypeScript + Tailwind</h1>
        <p className="mt-3 text-gray-600">This is the Home route.</p>
        <div className="mt-6 space-x-4">
          <Link to="/about" className="text-indigo-700 hover:underline">About</Link>
          <a href="https://vitejs.dev" target="_blank" className="text-gray-500 hover:underline" rel="noreferrer">Vite Docs</a>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<Placeholder />} />
    </Routes>
  )
}
