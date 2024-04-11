import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function SetGrades() {

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
  }


  if (!isLoading) {
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='module'>
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
      </label>
    <label htmlFor="ca_mark">CA Mark</label>
    <input id="ca_mark" name="ca_mark" type="number" />
    <label htmlFor="exam_mark">Exam Mark</label>
    <input id="exam_mark" name="exam_mark" type="number" min="0" max="100"/>
    <input type="submit" />
    </form>
  )
  }
}
export default SetGrades;
