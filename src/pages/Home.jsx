import React from 'react'

import TVLranking from '../components/TVLranking'
import TVLchart from '../components/charts/TVLchart'

const Home = () => {
  return (
    <div className="grid grid-cols-1 w-full text-md">
      <div className="h-max my-5 mx-10 text-white">
        <TVLchart />
      </div>
      
      <header className="flex justify-center w-full mb-5 text-white text-3xl italic">Protocols TVL Ranking</header>

      <TVLranking />
    </div>
  )
}

export default Home
