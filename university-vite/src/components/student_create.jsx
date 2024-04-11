import React from 'react';
import { useState, useEffect } from 'react';

function CreateStudent() {
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
    <form onSubmit={handleSubmit}>
      <label htmlFor="student_id">Student ID</label>
      <input id="student_id" name="student_id" type="text" maxLength="8"/>
      <label htmlFor="first_name">First Name</label>
      <input id="first_name" name="first_name" type="text" />
      <label htmlFor="last_name">Last Name</label>
      <input id="last_name" name="last_name" type="text" />
      <label htmlFor="email">E-Mail</label>
      <input id="email" name="email" type="text" />
      <input type="submit" value="submit" />
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
      </select>
    </form>
  );
}

export default CreateStudent;
