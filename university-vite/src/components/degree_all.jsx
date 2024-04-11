import { useState, useEffect } from "react";

function AllDegrees() {
  const [degrees, setDegrees] = useState([]);
  useEffect(()=>{
    fetch("http://127.0.0.1:8000/api/degree/")
    .then(response=>response.json())
    .then(data=>{
          setDegrees(data.map((item) =>
          <li>
            <h3>{item.full_name}</h3>
            <p>{item.shortcode}</p>
          </li>
          )
        )
      }
    )
    .catch(err=>console.log(err))
  }, []
 
  )
 
  
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <ul>{degrees}</ul>
    </div>
  )
}

export default AllDegrees;
