import { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';


function SomeStudents() {
  let {studentID} = useParams();
  const [student, setStudent] = useState('');
  const url = `http://127.0.0.1:8000/api/student/${studentID}/`;

  const gradeUrl = `/grade_set/${studentID}`;
  useEffect(()=>{
    fetch(url)
    .then(response=>response.json())
    .then(data=>{
          setStudent(
          <li>
            <h2>{data.first_name} {data.last_name}</h2>
            <p>{data.email}</p>
            <Link to={gradeUrl}>Submit Grade</Link>
          </li>
          )
          })
    .catch(err=>console.log(err))
  }, []
  )

  if (!student) {
    return(<h1>Loading...</h1>)
  }
 return (
    <div>
      <h1 className="text-3xl font-bold underline">Degree:</h1>
      <ul>{student}</ul>
    </div>
  )
}

export default SomeStudents;
