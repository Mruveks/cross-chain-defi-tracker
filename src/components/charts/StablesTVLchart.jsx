import React, {useState, useEffect} from 'react'
import { ChartComponent, LineSeries, ColumnSeries, SeriesDirective, SeriesCollectionDirective, Inject, DataLabel, DateTime, Legend, Tooltip, Category } from '@syncfusion/ej2-react-charts'

import axios from 'axios'
import Loader from '../Loader'
import { Formatter } from '../../utilities/Formatter'
import { UnixConverter } from '../../utilities/UnixConverter'

const StablesTVLchart = () => {

  const [stable, setStables] = useState([]);
  const [lastDay, setLastDay] = useState();
  const [day, setDay] = useState();
  
  const datadate = new Array;
  const totalCirculating = new Array;
  const totalPegged = new Array;
  const datasource = [];

  const dates2 = new Array;

  useEffect(() => {
    axios.get('https://stablecoins.llama.fi/stablecoincharts/all?stablecoin=1')
      .then(res => {
        const stables = res.data;
        const dates = stables.map(item => UnixConverter(item.date));        
        const totalCirculating = stables.map(item => item.totalCirculatingUSD);
        const totalPegged = totalCirculating.map(item => item.peggedUSD);
        const datasource = totalPegged.map((value, index) => ({ date: dates[index], value }));

        setStables(datasource);
        
        setLastDay(datasource[767].value)
        setDay(datasource[768].value)
      })
      .catch(err => {
        console.log(err)
      });
  }, []);
console.log(stable)
  const primaryxAxis = { valueType: 'Category', visible: false }
  const primaryyAxis = { labelFormat: '${value}K', visible: false }
  const legendSettings = { visible: true, textStyle: { color: 'white' } }
  const tooltip = { enable: true, shared: false }
  const palette = ["skyblue"]
  
  const num1 = parseFloat(day).toFixed(2)
  const num2 = parseFloat(lastDay).toFixed(2)

  const dollarChange = (num1 - num2).toFixed(2)
  const percentageChange = (((num1 - num2) / num2) * 100).toFixed(2)

  return (
    <>
    {stable.length ?
      (<div className="flex justify-between">

      <div className="items-center w-[30%] p-2 flex flex-col justify-between gap-8">
        
        <div className="border border-white w-full h-full text-4xl text-left py-10 px-4 bg-gray-800 rounded-xl">
              <div className=" pb-2">Total Value Locked</div>
              <div className="pb-2 text-blue-500">{'$' + Formatter(stable[768].value)}</div>
        </div>
          
        <div className="border border-white w-full h-full text-4xl text-left py-10 px-4 bg-gray-800 rounded-xl">
            <div className="pb-2">24h change</div>
            {percentageChange > 0 ? (<div className="text-green-500 pb-2">+{percentageChange}%</div>) : (<div className="text-red-500 pb-2">{ percentageChange }%</div>) }
              {dollarChange > 0 ? (<div className="text-green-500 pb-2">{'+$' + Formatter(dollarChange)}</div>) : (<div className="text-red-500 pb-2">{Formatter(dollarChange)}$</div>) }
        </div>
        
      </div>

      <div className="bg-gray-800 w-[70%] my-2 rounded-xl border border-white">
      <ChartComponent id="charts" primaryXAxis={primaryxAxis} primaryYAxis={primaryyAxis} palettes={palette} legendSettings={legendSettings} tooltip={tooltip}>

        <Inject services={[ColumnSeries, Tooltip, LineSeries, DataLabel, Category, DateTime, Legend]} />
      
        <SeriesCollectionDirective>
          <SeriesDirective dataSource={stable} xName='date' yName='value' legendShape='Circle' />
        </SeriesCollectionDirective>
      
        </ChartComponent>
      </div>
      </div>) : (<Loader />)
    }
    </>
  )
}

export default StablesTVLchart

