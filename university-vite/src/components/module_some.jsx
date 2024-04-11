import { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';


function SomeModules() {
  let {moduleCode} = useParams();
  const [module, setModule] = useState(null);
  const url = `http://127.0.0.1:8000/api/module/${moduleCode}/`;

  function lastArg(e) {
    return e.split("/").filter(Boolean).pop();
  }

  function cohortUrl(e) {
    return "/cohorts/" + lastArg(e);
  }

  console.log("HellO");

  useEffect(()=>{
    fetch(`http://127.0.0.1:8000/api/module/${moduleCode}/`)
    .then(response=>response.json())
    .then(data=>{
          setModule(data)
          })
    .catch(err=>console.log(err))
  }, []
  )
  
  if (!module) {
    return(<h1>Loading...</h1>)
  }
  return (
    <div>
      <h1>{module.full_name}</h1>
      <p>ID: {module.code} Year: {module.year}</p>
      <h2>Delivered to:</h2>
      <ul>
        {module.delivered_to.map((item) =>
          <li>
            <Link to={cohortUrl(item)}>{lastArg(item)}</Link>
          </li>
        )}
      </ul>
    </div>
  )
}

export default SomeModules;
/*

*/
