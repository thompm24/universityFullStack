import { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';

function SomeDegrees() {
  let {degreeName} = useParams();
  const [degree, setDegree] = useState('');
  const url = `http://127.0.0.1:8000/api/degree/${degreeName}/`;

  useEffect(()=>{
    fetch(url)
    .then(response=>response.json())
    .then(data=>{
          setDegree(data.full_name)
          })
    .catch(err=>console.log(err))
  }, []
  )
  
  const [cohorts, setCohorts] = useState('');
  useEffect(()=>{
    fetch(`http://127.0.0.1:8000/api/cohort/?degree=${degreeName}`)
    .then(response=>response.json())
    .then(data=>{
        setCohorts(data.map((item) => {
          const cohortUrl = `/cohorts/${item.id}`;
          return (
          <li key={item.id} className="bg-white m-4 p-4 md:w-1/4 lg:w-1/4 m-l-auto m-r-auto">
            <h2 className="text-1xl font-bold">{item.name}</h2>
            <p>{item.id}</p>
            <Link to={cohortUrl}>Read More</Link>
          </li>
        )}
            ))
      }
    )
    }, []
  )
  return (
    <div className="bg-white m-4 p-4">
      <h1 className="text-3xl font-bold">{degree}</h1>
      <h3>Cohorts Containing Degree</h3>
      <ul className="flex flex-wrap justify-between">{cohorts}</ul>
    </div>
  )
}

export default SomeDegrees;
