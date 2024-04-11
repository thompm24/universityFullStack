import { useState, useEffect } from "react";

function AllCohorts() {
  const [cohorts, setCohorts] = useState([]);
  useEffect(()=>{
    fetch("http://127.0.0.1:8000/api/cohort/")
    .then(response=>response.json())
    .then(data=>{
          setCohorts(data.map((item) =>
          <li>
            <h3>{item.name}</h3>
              <p>ID: {item.id} Year: {item.year}</p>
          </li>
          ))
          })
    .catch(err=>console.log(err))
  }, []
  )
  
  return (
    <ul>{cohorts}</ul>
  )
}

export default AllCohorts;
