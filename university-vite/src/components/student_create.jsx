import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateStudent() {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://127.0.0.1:8000/api/student/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        student_id: `${e.target.student_id.value}`,
        first_name: `${e.target.first_name.value}`,
        last_name: `${e.target.last_name.value}`,
        cohort: `http://127.0.0.1:8000/api/cohort/${e.target.cohort.value}/`,
        email:  `${e.target.email.value}`,
      }),
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
     navigate(`/students/${e.target.student_id.value}`);
  };

  const [cohorts, setCohorts] = useState([]);
  const [selectedCohort, setSelectedCohort] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/cohort/') // Adjust this URL to where your cohorts API is located
      .then(response => response.json())
      .then(data => setCohorts(data))
      .catch(error => console.error('Error fetching cohorts:', error));
  }, []);

  return (
    <div>
    <form onSubmit={handleSubmit} className="bg-white m-20 p-20">
      <label htmlFor="student_id">Student ID</label>
      <input id="student_id" className="border-b-2 border-black" name="student_id" type="text" maxLength="8"/><br/>
      <label htmlFor="first_name">First Name</label>
      <input id="first_name" name="first_name" className="border-b-2 border-black" type="text" /><br/>
      <label htmlFor="last_name">Last Name</label>
      <input id="last_name" name="last_name" className="border-b-2 border-black" type="text" /><br/>
      <label htmlFor="email">E-Mail</label>
      <input id="email" className='border-b-2 border-black' name="email" type="text" /><br/>
      <select
        name="cohort"
        value={selectedCohort}
        onChange={e => setSelectedCohort(e.target.value)}
      >
        <option value="">Select a Cohort</option>
        {cohorts.map(cohort => (
        <option key={cohort.id} value={cohort.id}>
          {cohort.name}
        </option>
        ))}
      </select><br/>
    <input type="submit" className="bg-slate-900 rounded-md text-white p-1" value="Submit" />
    </form>
    </div>
  );
}

export default CreateStudent;
