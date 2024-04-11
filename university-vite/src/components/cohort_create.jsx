import React from 'react';
import { useState, useEffect } from 'react';

function CreateCohort() {
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://127.0.0.1:8000/api/cohort/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: `${e.target.id.value}`,
        year: `${e.target.year.value}`,
        name: `${e.target.name.value}`,
        degree: `http://127.0.0.1:8000/api/degree/${e.target.degree.value}/`,
      }),
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [degrees, setDegrees] = useState([]);
  const [selectedDegree, setSelectedDegree] = useState('');
  const [cohortName, setCohortName] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/degree/') // Adjust this URL to where your degrees API is located
      .then(response => response.json())
      .then(data => setDegrees(data))
      .catch(error => console.error('Error fetching degrees:', error));
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input id="name" name="name" type="text" />
      <label htmlFor="id">Course ID</label>
      <input id="id" name="id" type="text" maxLength="8"/>
      <label htmlFor="year">Year</label>
      <input id="year" name="year" type="text" />
      <label htmlFor="email">E-Mail</label>
      <select
        name="degree"
        value={selectedDegree}
        onChange={e => setSelectedDegree(e.target.value)}
      >
        <option value="">Select a Degree</option>
        {degrees.map(degree => (
        <option>
          {degree.shortcode}
        </option>
        ))}
      </select>
      <input type="submit" />
    </form>
  );
}

export default CreateCohort;
