import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./utils/Loading";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    try{
      const res = await axios.get("https://randomuser.me/api/?page=1&results=1&seed=abc");
      setData(res.data.results[0]);
      // console.log(data);
    } catch(err){
      console.log("Error while fetching data: ", err);
    } finally{
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return loading ? <Loading/> : (
    <div className="p-4 h-screen flex items-center justify-center bg-slate-800">
      <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
        <div className="w-full p-6 grid grid-cols-2 rounded-lg shadow-md bg-slate-500 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-40">
          <div>
            <img
              src={data.picture.large}
              alt="side_pic"
              className="w-32 h-32 rounded-lg"
            />
          </div>
          <div className="flex flex-col h-full">
            <h1 className="text-white font-bold text-lg tracking-wider">{data.name.first} {data.name.last}</h1>
            <p className="text-gray-50 capitalize">{data.gender}</p>
            <a href={`tel: ${data.phone}`} className="text-gray-100 hover:text-blue-100">{data.phone}</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
