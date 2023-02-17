import React, {useEffect, useState} from 'react'
import axios from 'axios';
import Loader from './Loader';
import { Formatter } from '../utilities/Formatter';

const StablesRanking = () => {

  const [stables, setStables] = useState([]);

  useEffect(() => {
    axios.get('https://stablecoins.llama.fi/stablecoins?includePrices=true')
      .then(res => {
        setStables(res.data.peggedAssets)
      })
      .catch(err => console.log(err))
  }, []);

  return (
    <>
    <div className="h-max mx-10 mb-10 border rounded-xl border-white bg-gray-800 text-white">
      
      <div className="grid grid-cols-7 p-2 uppercase italic border-white border-b ">
        <header className="">Name</header>
        <header className="text-right">Price</header>
        <header className="text-right">Peg Asset</header>
        <header className="text-right">1d Change</header>
        <header className="text-right">7d Change</header>
        <header className="text-right">1m Change</header>
        <header className="text-right">MarketCap</header>
      </div>

      { stables.length ? (
          stables.filter(item => item.circulating.peggedUSD >= 1000000 && item.price != null ).map(stable =>
            <div
              className="grid grid-cols-7 items-center p-2 border-black border-t text-right"
              key={stable.id}
            >
              <div className="text-left">
                <a href={`https://www.coingecko.com/en/coins/${stable.gecko_id}`} alt="site" target="_blank" className="">{stable.name} ({stable.symbol})</a>
              </div>

              {stable.price ? (`${parseFloat(stable.price).toFixed(4)}` >= 1 ? (<div className="text-green-500">{parseFloat(stable.price).toFixed(4)}$</div>):(<div className="text-red-500">{parseFloat(stable.price).toFixed(4)}$</div>)) : ('')}

             {stable.pegType.slice(6)}
 
                {stable.circulatingPrevDay.peggedUSD ?
                  (`${parseFloat(((parseFloat(stable.circulating.peggedUSD).toFixed(2) - parseFloat(stable.circulatingPrevDay.peggedUSD).toFixed(2)) / parseFloat(stable.circulatingPrevDay.peggedUSD).toFixed(2)) * 100).toFixed(2)}` > 0 ?
                    (<div className="text-green-500">+{parseFloat(((parseFloat(stable.circulating.peggedUSD).toFixed(2) - parseFloat(stable.circulatingPrevDay.peggedUSD).toFixed(2)) / parseFloat(stable.circulatingPrevDay.peggedUSD).toFixed(2)) * 100).toFixed(2)}%</div>
                    ) : (<div className="text-red-500">{parseFloat(((parseFloat(stable.circulating.peggedUSD).toFixed(2) - parseFloat(stable.circulatingPrevDay.peggedUSD).toFixed(2)) / parseFloat(stable.circulatingPrevDay.peggedUSD).toFixed(2)) * 100).toFixed(2)}%</div>)) : ('')}

             
                {stable.circulatingPrevWeek.peggedUSD ?
                  (`${parseFloat(((parseFloat(stable.circulating.peggedUSD).toFixed(2) - parseFloat(stable.circulatingPrevWeek.peggedUSD).toFixed(2)) / parseFloat(stable.circulatingPrevWeek.peggedUSD).toFixed(2)) * 100).toFixed(2)}` > 0 ?
                    (<div className="text-green-500">+{parseFloat(((parseFloat(stable.circulating.peggedUSD).toFixed(2) - parseFloat(stable.circulatingPrevWeek.peggedUSD).toFixed(2)) / parseFloat(stable.circulatingPrevWeek.peggedUSD).toFixed(2)) * 100).toFixed(2)}%</div>
                    ) : (<div className="text-red-500">{parseFloat(((parseFloat(stable.circulating.peggedUSD).toFixed(2) - parseFloat(stable.circulatingPrevWeek.peggedUSD).toFixed(2)) / parseFloat(stable.circulatingPrevWeek.peggedUSD).toFixed(2)) * 100).toFixed(2)}%</div>)) : ('')}

              
                {stable.circulatingPrevMonth.peggedUSD ?
                  (`${parseFloat(((parseFloat(stable.circulating.peggedUSD).toFixed(2) - parseFloat(stable.circulatingPrevMonth.peggedUSD).toFixed(2)) / parseFloat(stable.circulatingPrevMonth.peggedUSD).toFixed(2)) * 100).toFixed(2)}` > 0 ?
                    (<div className="text-green-500">+{parseFloat(((parseFloat(stable.circulating.peggedUSD).toFixed(2) - parseFloat(stable.circulatingPrevMonth.peggedUSD).toFixed(2)) / parseFloat(stable.circulatingPrevMonth.peggedUSD).toFixed(2)) * 100).toFixed(2)}%</div>
                    ) : (<div className="text-red-500">{parseFloat(((parseFloat(stable.circulating.peggedUSD).toFixed(2) - parseFloat(stable.circulatingPrevMonth.peggedUSD).toFixed(2)) / parseFloat(stable.circulatingPrevMonth.peggedUSD).toFixed(2)) * 100).toFixed(2)}%</div>)) : ('')}
                      
              {stable.circulating.peggedUSD ? ('$' + Formatter(parseFloat(stable.circulating.peggedUSD))) : ('')}

            </div>)
      ) : <Loader />}
      
    </div>
</>
  )
}
export default StablesRanking
