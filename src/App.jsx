import React from 'react'
import { Route, Routes } from 'react-router'

import './App.css'

import Navbar from './components/Navbar'

import { Home, Stables, Yields, Fees, Bridges, Avax, Ethereum, Polygon, Arbitrum, Optimism, Bsc, Solana, Kava, Near, Algorand, Fantom, Lending, CEX, DEX } from './pages/index'

function App() {

  return (
    <div className="w-full overflow-hidden pl-48 pt-8">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stables" element={<Stables />} />
        <Route path="/yields" element={<Yields />} />
        <Route path="/fees" element={<Fees />} />
        <Route path="/bridges" element={<Bridges />} />
        <Route path="/lending" element={<Lending />} />
        <Route path="/cex" element={<CEX />} />
        <Route path="/dex" element={<DEX />} />

        <Route path="/ethereum" element={<Ethereum />} />
        <Route path="/bsc" element={<Bsc />} />
        <Route path="/avalanche" element={<Avax />} />
        <Route path="/polygon" element={<Polygon />} />
        <Route path="/arbitrum" element={<Arbitrum />} />
        <Route path="/optimism" element={<Optimism />} />
        <Route path="/solana" element={<Solana />} />
        <Route path="/kava" element={<Kava />} />
        <Route path="/near" element={<Near />} />
        <Route path="/algorand" element={<Algorand />} />
        <Route path="/fantom" element={<Fantom />} />
      </Routes>
    </div>
  )
}

export default App
