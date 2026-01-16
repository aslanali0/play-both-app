import {useState, useEffect} from 'react'
import axios from 'axios'
import useDebounce from '../hooks/useDebounce'
import useLogout from '../hooks/useLogout'
const HomePage = () => {


  const username = localStorage.getItem('username');
  const [feed, setFeed] = useState('');
  const [search, setSearch] = useState('');
  const debouncedText = useDebounce(search, 500);
  const logout = useLogout();
  
  const handleSearch = async (e : React.FormEvent<HTMLInputElement>)=> {

    e.preventDefault();


      try {
        console.log(search)
        const response = await axios.get("http://localhost:8000/games/search", {
        params: {
          game_name: search
        }
      });
        const game_data = response.data;
        setFeed(game_data)
      } catch (error) {

          console.log("search error: "+error)
        
      }
    }


  return (<div>
    <navbar className="navbar"></navbar>
    <h1>Welcome Back {username}</h1>

    <form className="flex relative max-w-xl mx-auto mt-8" onSubmit={handleSearch}>
    <input className="bg-indigo-950/50 rounded-l w-full border-blue text-lg text-white px-4 py-3 focus:outline-none focus:ring-0 placeholder-gray-500" type="text"
      value={search}
      onChange= {(e) => setSearch(e.target.value)} 
      placeholder="Search..." />
    <input type="submit" className="rounded-r p-4 cursor-pointer bg-indigo-950/90" value="Search"/>
    </form>
    <div>{feed ?(
      <div className="flex items-center flex-col justify-center"><h1>{feed.title}</h1>
      <img className="w-75 card m-4 rounded" src={feed.image_url}/>
      <ul className="flex flex-col gap-6 p-4">
        {feed.soundtrack.map((item) =>(
          <li className="card" key={item.youtube_url}>
            
            {item.title} - <a target='_blank' href={`https://www.youtube.com/watch?v=${item.youtube_url}`}>
            Watch on Youtube</a> 
            <iframe src={`https://www.youtube.com/embed/${item.youtube_url}`}>
              </iframe>
          </li>
        ))}
      </ul></div>):
       null 
    }
    </div>
  </div>)
}

export default HomePage;
