import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function AllModules() {
  const [cohorts, setCohorts] = useState([]);

  function lastArg(e) {
    return e.split("/").filter(Boolean).pop();
  }

  function cohortUrl(e) {
    return "/cohorts/" + lastArg(e);
    
  }

  useEffect(()=>{
    fetch("http://127.0.0.1:8000/api/module/")
    .then(response=>response.json())
    .then(data=>{
          setCohorts(data)
          })
    .catch(err=>console.log(err))
  }, []
  )
  
  return (
    <ul>{cohorts.map((item, index) =>
          <li key={index}>
            <h3>{item.full_name}</h3>
              <p>ID: {item.code} Year: {item.year}</p>
              <p>Delivered to:</p>
              <ul>{item.delivered_to.map((e, i) =>
                <li key={i}>
                  <Link to={cohortUrl(e)}>{lastArg(e)}</Link>
                </li>
              )}</ul>
              <br/>
          </li>
          )}
      </ul>
  )
}

export default AllModules;
