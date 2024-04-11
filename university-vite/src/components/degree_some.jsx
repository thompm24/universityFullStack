import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

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
        setCohorts(data.map((item) =>
          <li key={item.id}>
            <h2>{item.name}</h2>
            <p>{item.id}</p>
          </li>
            ))
      }
    )
    }, []
  )
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Degree:</h1>
      <ul>{degree}</ul>
      <h3>Cohorts Containing Degree</h3>
      <ul>{cohorts}</ul>
    </div>
  )
}

export default SomeDegrees;
