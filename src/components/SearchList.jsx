import React, {useState, useEffect} from 'react'
import axios from 'axios';
import useComponentVisible from '../utilities/isComponentVisible'

const SearchList = () => {

  const [protocols, setProtocols] = useState([])
  const [searchData, setSearchData] = useState("")
  const { ref, isComponentVisible } = useComponentVisible(true);


  useEffect(() => {
    axios.get('https://api.llama.fi/protocols')
      .then(res => {
        setProtocols(res.data)
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, []);
  

  return (
 
    <form className="text-md">
      <div className="relative pl-2">
        <div className="absolute inset-y-0 left-0 flex items-center p-4 cursor-pointer">
          <svg aria-hidden="true" className="w-5 h-5 text-gray-500 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        <input type="search" className="border border-b-0 rounded-b-none block w-full p-4 pl-10 text-white rounded-xl bg-gray-800"
          placeholder="Search Protocols..." required onChange={e => { setSearchData(e.target.value) }}
        />
      </div>

        <div className="max-h-60 z-10 absolute ml-8 mr-6 right-4 left-52 border border-t-transparent bg-gray-800 rounded-b-xl text-white overflow-y-auto">
          {protocols.filter((val) => {
              if (searchData === "") {
                return null
              } else if (val.name.toLowerCase().includes(searchData.toLowerCase())) {
                return val
              }
            }).map((val, key) => {
              return (
                <div key={key} className="flex p-2 items-center border-t-gray-600 border-t hover:bg-gray-600">
                  <img src={val.logo} alt="logo" className="h-8 w-8 rounded-full mr-2"/>
                  <a href={val.url} target="_blank">{val.name}</a>
                </div>
              )
            })
          }
        </div>  
    </form>

  );
};

  
  export default SearchList;
  
