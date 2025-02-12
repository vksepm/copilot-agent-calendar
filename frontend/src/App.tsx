import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Calendar from './components/Calendar'

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Calendar App</h1>
        </div>
      </header>
      <main className="flex-1 p-4">
        <div className="h-[800px] bg-white rounded-lg shadow-sm p-4">
          <Calendar />
        </div>
      </main>
    </div>
  )
}

export default App
