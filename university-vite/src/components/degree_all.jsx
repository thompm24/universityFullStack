import { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';

function AllDegrees() {
  const navigate = useNavigate();
  const [degrees, setDegrees] = useState([]);
  useEffect(()=>{
    fetch("http://127.0.0.1:8000/api/degree/")
    .then(response=>response.json())
    .then(data=>{
          setDegrees(data.map((item) =>
            {
              const courseUrl = `/degrees/${item.shortcode}`
              return (
          <li className="bg-white p-4 m-4 w-1/2 md:w-1/3 lg:w-1/4" key={item.shortcode}>
            <h3>{item.full_name}</h3>
            <p>{item.shortcode}</p>
            <Link to={courseUrl}>Read More</Link>
          </li>
              )
      }
          )
    )
    .catch(err=>console.log(err))
  }, []
  )})
 
   const search = (e) => {
     navigate(`/degrees/${e.target.shortcode.value}`)
   }

  return (
    <div>
      <div className="bg-white m-4 p-5">
      <form onSubmit={search}>
        <input placeholder="Degree Shortcode" type="text" id="shortcode" className="border-b-2 border-black"/>
    <input type="submit" value="Search" className="bg-slate-900 text-white rounded-md w-20"/>
         
    </form>
    <br/><Link to="/degrees/create" className="bg-slate-900 text-white w-30 rounded-md text-xl font-bold p-1">Create New</Link>
    </div>
      <ul className="flex flex-wrap">{degrees}</ul>
    </div>
  )
}

export default AllDegrees;
