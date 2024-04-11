import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function AllStudents() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate()
  useEffect(()=>{
    fetch("http://127.0.0.1:8000/api/student/")
    .then(response=>response.json())
    .then(data=>{
          setStudents(data.map(e=>e))
          })
    .catch(err=>console.log(err))
  }, []
  )
 
  const displayStudents = () => {
    return students.map(elem=>
    <li key={elem.student_id}>combus1
      <h1>{elem.first_name} {elem.last_name}</h1>
      <p>{elem.email}</p>
    </li>
    )
      
  }
 
  const search = (e) => {
    navigate(`/students/${e.target.studentNo.value}`);
  }

  return (
    <div>
      <form onSubmit={search}>
        <label htmlFor="studentNo">Student Number:</label>
        <input id="studentNo" name="studentNo" type="text" maxLength="8" />
        <input type="submit" />
      </form>

      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <ul>{displayStudents()}</ul>
    </div>
  )
}

export default AllStudents;
