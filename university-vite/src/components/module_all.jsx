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
    <ul className="flex flex-wrap">{cohorts.map((item, index) =>
          <li className="mb-4 w-1/2 md:w-1/3 lg:w-1/4" key={index}>
           <div className="bg-white m-4 shadow-md rounded-md p-4 h-48">
            <h2 className="text-xl font-bold mb-2">{item.full_name}</h2>
              <p>ID: {item.code} Year: {item.code[2]}</p>
              <p>Delivered to:</p>
              <ul>{item.delivered_to.map((e, i) =>
                <li key={i}>
                  <Link to={cohortUrl(e)}>{lastArg(e)}</Link>
                </li>
              )}</ul>
              <br/>
            </div>
          </li>
          )}
      </ul>
  )
}

export default AllModules;
