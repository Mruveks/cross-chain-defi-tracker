import React, { useState, useEffect} from 'react'
import axios from 'axios';

import Loader from './Loader';
import { Formatter } from '../utilities/Formatter';
const TVLranking = () => {

  const [protocols, setProtocols] = useState([])
  const [query, setQuery] = useState('');

  useEffect(() => {
    axios.get('https://api.llama.fi/protocols')
      .then(res => {
        setProtocols(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, []);


  return (
    <>
    <div className="flex justify-between mx-8 py-2 h-full  ">
      <button className="m-2 py-1 px-4 bg-gray-700 rounded-lg text-lg hover:bg-gray-600" onClick={() => setQuery('')}
      >All</button>
        
      <button className="m-2 py-1 px-4 bg-gray-700 rounded-lg text-lg hover:bg-gray-600" onClick={() => {setQuery('Ethereum')}}
      >Ethereum</button>

      <button className="m-2 py-1 px-4 bg-gray-700 rounded-lg text-lg hover:bg-gray-600" onClick={() => setQuery('Avalanche')}
      >Avalanche</button>

      <button className="m-2 py-1 px-4 bg-gray-700 rounded-lg text-lg hover:bg-gray-600" onClick={() => setQuery('Binance')}
      >Bsc</button>

      <button className="m-2 py-1 px-4 bg-gray-700 rounded-lg text-lg hover:bg-gray-600" onClick={() => setQuery('Tron')}
      >Tron</button>

      <button className="m-2 py-1 px-4 bg-gray-700 rounded-lg text-lg hover:bg-gray-600" onClick={() => setQuery('Arbitrum')}
      >Arbitrum</button>

      <button className="m-2 py-1 px-4 bg-gray-700 rounded-lg text-lg hover:bg-gray-600" onClick={() => setQuery('Polygon')}
      >Polygon</button>

      <button className="m-2 py-1 px-4 bg-gray-700 rounded-lg text-lg hover:bg-gray-600" onClick={() => setQuery('Optimism')}
      >Optimism</button>

      <button className="m-2 py-1 px-4 bg-gray-700 rounded-lg text-lg hover:bg-gray-600" onClick={() => setQuery('Solana')}
      >Solana</button>
    </div>
      
    <div className="h-max mb-10 mx-10 border-gray-600 border p-2 rounded-xl bg-gray-800 ">
      <div className="grid grid-cols-7 p-2 border-b-gray-600 text-right italic uppercase">
        <header className="text-left">Name</header>
        <header>Category</header>
        <header>Chain</header>
        <header>1d Change</header>
        <header>7d Change</header>
        <header>30d Change</header>
        <header>TVL</header>
      </div>

      { ( query === '') ?
      
        ( protocols.length ? (
          protocols.filter(item => item.tvl >= 1000000).map(protocol =>
            <div
              className="grid grid-cols-7 items-center p-2 border-gray-600 border-t text-right"
              key={protocol.id}
            >
              <div className="flex w-[140%] text-left">
                <img src={ protocol.logo } alt="logo" className="h-8 w-8 rounded-full" />
                <a href={ protocol.url } alt="site" target="_blank" className="w-full h-full px-2 my-auto text-blue">{ protocol.name }</a>
              </div>

              <div>{ protocol.category }</div>
              <div>{ protocol.chain }</div>
              
              {(protocol.change_1h) > 0 ?
                (<div className="text-green-500">+{parseFloat(protocol.change_1h).toFixed(2)}%</div>)
                : (<div className="text-red-500">{parseFloat(protocol.change_1h).toFixed(2)}%</div>)}
              
              {(protocol.change_1d) > 0 ?
                (<div className="text-green-500">+{parseFloat(protocol.change_1d).toFixed(2)}%</div>)
                : (<div className="text-red-500">{parseFloat(protocol.change_1d).toFixed(2)}%</div>)}
              
              {(protocol.change_7d) > 0 ?
                (<div className="text-green-500">+{parseFloat(protocol.change_7d).toFixed(2)}%</div>)
                : (<div className="text-red-500">{parseFloat(protocol.change_7d).toFixed(2)}%</div>)}
              
              {'$' + Formatter(parseFloat(protocol.tvl))}
              
            </div>)
          ) : <Loader />
        )
      :
        ( protocols.length ?
          ( protocols.filter(item => ( item.tvl != null && item.chain === query && item.tvl >= 1000000)).map(protocol =>
            <div
              className="grid grid-cols-7 items-center p-2 border-gray-600 border-b text-right"
              key={protocol.id}
            >
              <div className="flex w-[140%] text-left">
                <img src={ protocol.logo } alt="logo" className="h-8 w-8 rounded-full" />
                <a href={ protocol.url } alt="site" target="_blank" className="w-full h-full px-2 my-auto">{ protocol.name }</a>
              </div>

              <div>{ protocol.category }</div>
              <div>{ protocol.chain }</div>
              
              {(protocol.change_1h) > 0 ?
                (<div className="text-green-500">+{parseFloat(protocol.change_1h).toFixed(2)}%</div>)
                : (<div className="text-red-500">{parseFloat(protocol.change_1h).toFixed(2)}%</div>)}
              
              {(protocol.change_1d) > 0 ?
                (<div className="text-green-500">+{parseFloat(protocol.change_1d).toFixed(2)}%</div>)
                : (<div className="text-red-500">{parseFloat(protocol.change_1d).toFixed(2)}%</div>)}
              
              {(protocol.change_7d) > 0 ?
                (<div className="text-green-500">+{parseFloat(protocol.change_7d).toFixed(2)}%</div>)
                : (<div className="text-red-500">{parseFloat(protocol.change_7d).toFixed(2)}%</div>)}
              
              {'$' + Formatter(parseFloat(protocol.tvl))}

            </div>)
          ) : <Loader />
        )
      }
      
      </div>
  </>
  )
}

export default TVLranking
