import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function SetGrades() {
  const navigate = useNavigate();

  const { studentCode } = useParams();

  const [modules, setModules] = useState([]);
  const [selectedModule, setSelectedModule] = useState('');
  const [student, setStudent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [code, setCode] = useState('');

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/student/${studentCode}/`)
    .then(response => response.json())
    .then(data => {
      setStudent(data);
      const splitUrl = data.cohort.split('/');
      const myCode = splitUrl[splitUrl.length - 2];
      setCode(myCode);
    }
    )}, []
  )

  useEffect(() => {
    if (code) {
      fetch(`http://127.0.0.1:8000/api/module/?delivered_to=${code}`)
      .then(response => response.json())
      .then(data => {
        setModules(data);
        setIsLoading(false);
      })
    }
  }, [code]
  )
    
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://127.0.0.1:8000/api/grade/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body : JSON.stringify({
        student: `http://127.0.0.1:8000/api/student/${studentCode}/`,
        ca_mark: `${e.target.ca_mark.value}`,
        exam_mark:  `${e.target.exam_mark.value}`,
        module: `http://127.0.0.1:8000/api/module/${e.target.module.value}/`,
        cohort: `http://127.0.0.1:8000/api/cohort/${code}/`,
      }),
    })
    navigate(`/grade_set/${studentCode}`);
  }

  


  if (!isLoading) {
  return (
    <div className='flex'>
    <div className='w-1/3 bg-white p-10'>
    <h1 className='text-2xl bold'>{student.first_name} {student.last_name}</h1>
    <p>{student.student_id}</p>
    <form onSubmit={handleSubmit}>
      <label className="w-30"htmlFor='module'>
        <select
        name="module"
        value={selectedModule}
        onChange={e => setSelectedModule(e.target.value)}
        >
        <option value="">Select Module</option>
          {modules.map(module => (
            <option key={module.id} value={module.id}>
              {module.code}
            </option>
          ))} 
        </select>
      </label><br />
    <label className='w-30'  htmlFor="ca_mark">CA Mark</label>
    <input id="ca_mark" name="ca_mark" type="number" className='w-20 border-b-2 border-black'/><br />
    <label htmlFor="exam_mark" className='w-30'>Exam Mark</label>
    <input id="exam_mark" name="exam_mark" className='w-20 border-b-2 border-black' type="number" min="0" max="100"/><br />
    <input type="submit" value="Submit" className='m-2 p-1  bg-slate-900 text-white rounded-md'/><br />
    </form>
    </div>
    <div className='w-2/3'>
      <h1 className='text-3xl font-bold m-4'>Student Grades</h1>
      <DisplayGrades studentCode={studentCode}/>
    </div>
    </div>
  )
  }
}


const DisplayGrades = (params) => {
    const [grades, setGrades] = useState([]);
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/grade/?student=${params.studentCode}`)
        .then(response=>response.json())
        .then(data=>setGrades(data))
        .catch(err=>console.log(err))
      }, []
    )
  
    
  return (
           <div>
            {grades.map((grade) => {
              const splitUrl = grade.module.split('/');
              const moduleCode = splitUrl[splitUrl.length - 2];
              return (
             <li key={grade.id} className='bg-white list-none m-4 p-4'>
              <h1 className='text-xl'>
                {moduleCode}
              </h1>
               <p>CA Mark: {grade.ca_mark}% Exam Mark:{grade.exam_mark}%</p>
              </li>
             )}
             )}
            </div>
          )
  }

export default SetGrades;
