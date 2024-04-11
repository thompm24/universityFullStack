import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

function SomeCohorts() {
  let {cohortName} = useParams();
  const [cohort, setCohort] = useState('');
  const url = `http://127.0.0.1:8000/api/cohort/${cohortName}/`;

  useEffect(()=>{
    fetch(url)
    .then(response=>response.json())
    .then(data=>{
          setCohort(
          <div>
            <h1>{data.name}</h1>
            <p>{data.id}</p>
          </div>
          )})
    .catch(err=>console.log(err))
  }, []
  )
  
  const [students, setStudents] = useState('');
  useEffect(()=>{
    fetch(`http://127.0.0.1:8000/api/student/?cohort=${cohortName}`)
    .then(response=>response.json())
    .then(data=>{
        setStudents(data.map((item) =>
          <li key={item.student_id}>
            <h2>{item.first_name} {item.last_name}</h2>
            <p>Email: {item.email} ID: {item.student_id}</p>
          </li>
            ))
      }
    )
    }, []
  )
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Cohort:</h1>
      <ul>{cohort}</ul>
      <h3>Students in Cohort</h3>
      <ul>{students}</ul>
    </div>
  )
}

export default SomeCohorts;
