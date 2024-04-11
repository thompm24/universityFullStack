import { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';

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

    return students.map(elem=> {
      const gradeUrl = `/grade_set/${elem.student_id}`;
      return (
    <li className="mb-4 w-1/2 md:2-1/3 lg:w-1/4" key={elem.student_id}>
      <div className="bg-white m-4 shadow-md rpunded-md p-4 h-48">
      <h1 className="text-xl">{elem.first_name} {elem.last_name}</h1>
      <p>{elem.email}</p>
      <Link to={gradeUrl}>Set Grades</Link>
      </div>
    </li>
      )}
      )
    
      
  }
 
  const search = (e) => {
    navigate(`/students/${e.target.studentNo.value}`);
  }

  return (
    <div>


    <div className="m-10 p-10 bg-white">
      <h1 className="m-4 text-xl">View All Students</h1>
      <form onSubmit={search}>
        <label htmlFor="studentNo">Student Number:</label>
        <input id="studentNo" className="border-b-2 border-slate-900" name="studentNo" type="text" maxLength="8" />
        <input type="submit" className="bg-slate-900 rounded-md padding-2 text-white"/>
      </form>
    </div>
      <ul className="flex flex-wrap">{displayStudents()}</ul>
    </div>
  )
}

export default AllStudents;
