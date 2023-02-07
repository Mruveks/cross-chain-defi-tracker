import React from 'react'
import { Route, Routes } from 'react-router'

import './App.css'

import Navbar from './components/Navbar'

import { Home, Stables, Yields, Fees, Bridges } from './pages/index'
import Avax from './components/projects/Avax'
import Search from './utilities/Search'

function App() {

  return (
    <div className="w-full overflow-hidden pl-48">
      <Navbar />
      <div className="text-center text-white pt-10 pb-5 text-4xl">
        Cross Chain Defi Platform
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stables" element={<Stables />} />
        <Route path="https://kuba-mrowiec-defi-tracker.netlify.app/yields" element={<Yields />} />
        <Route path="/fees" element={<Fees />} />
        <Route path="/bridges" element={<Bridges />} />
        <Route path="/avax" element={<Avax />} />

      </Routes>
    </div>
  )
}

export default App
