import React from 'react'
import RankingObject from '../components/RankingObject'

const CEX = () => {
  return (
    <div className="grid grid-cols-1 w-full text-md">

      <header className="text-center  pt-10 mb-5 text-4xl italic">
        Top Centralised Exchanges
      </header>

      <RankingObject chain='CEX' />

    </div>
  )
}

export default CEX
