import { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';

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
        setStudents(data.map((item) => {
          const studentUrl = `/students/${item.student_id}`;
          return (
          <div key={item.student_id} className="w-1/4">
          <li className="bg-white p-4 m-4" key={item.student_id}>
            <h2>{item.first_name} {item.last_name}</h2>
            <p>Email: {item.email} </p>
           
            <p>ID: {item.student_id}</p>
            <Link to={studentUrl}>Read more</Link>
          </li>
          </div>
        )}))
      }
    )
    }, []
  )
  return (
    <div>
    <div className="bg-white m-4 p-4">
      <h1 className="text-3xl font-bold underline">Cohort:</h1>
      <ul>{cohort}</ul>
    </div>
      <h3>Students in Cohort</h3>
      <ul className="flex flex-wrap">{students}</ul>
    </div>
  )
}

export default SomeCohorts;
