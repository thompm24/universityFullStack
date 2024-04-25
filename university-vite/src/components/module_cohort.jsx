import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function CohortModules() {
  const { cohortCode } = useParams();
  
  const [modules, setModules] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/module/?delivered_to=${cohortCode}`)
    .then(response => response.json())
    .then(data => {
      setModules(data.map( (item) =>
        (
        <li className="bg-white p-4 m-4 w-1/5" key={item.code}>
          <h1>{item.full_name}</h1>
          <ul>
            {item.delivered_to.map( (url) =>
            {
            const splitUrl = url.split('/');
            let name = splitUrl[splitUrl.length - 2];
            
            return (
              <li key={name}>
                <Link to={url}>{name}</Link>
              </li>
            )})}
          </ul>
        </li>
        ))
      );
      setIsLoading(false);

    })
    .catch(err => console.log(err))}, [cohortCode])
  if (isLoading) {
    return (<h1>Loading...</h1>);
  }
  return (
    <div>
      <h1 className='text-3xl font-bold m-2 underline'>Modules taken by {cohortCode}</h1>
      <ul className='flex flex-wrap justify-around'>
        {modules}
      </ul>
    </div>
  )
}

export default CohortModules;
