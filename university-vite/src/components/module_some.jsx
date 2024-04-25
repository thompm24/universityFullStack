import { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';


function SomeModules() {
  let {moduleCode} = useParams();
  const [module, setModule] = useState(null);

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
    <div className="bg-white m-4 p-4">
      <h1 className="text-2xl font-bold">{module.full_name}</h1>
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
