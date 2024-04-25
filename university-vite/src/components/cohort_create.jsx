import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateCohort() {
  const navigate = useNavigate();
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
    navigate(`/cohorts/${e.target.id.value}`);
  };

  const [degrees, setDegrees] = useState([]);
  const [selectedDegree, setSelectedDegree] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/degree/') // Adjust this URL to where your degrees API is located
      .then(response => response.json())
      .then(data => setDegrees(data))
      .catch(error => console.error('Error fetching degrees:', error));
  }, []);

  return (
    <div>
    <form className='bg-white m-10 p-10' onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input id="name" className="border-b-2 border-black" name="name" type="text" /><br/>
      <label htmlFor="id">Course ID</label>
      <input id="id" className="border-b-2 border-black" name="id" type="text" maxLength="8"/><br/>
      <label htmlFor="year">Year</label>
      <input id="year" className="border-b-2 border-black" name="year" type="text" /><br/>
      <select
        name="degree"
        value={selectedDegree}
        onChange={e => setSelectedDegree(e.target.value)}
      >
        <option value="">Select a Degree</option>
        {degrees.map(degree => (
        <option key={degree.shortcode}>
          {degree.shortcode}
        </option>
        ))}
      </select><br/>
      <input type="submit" className='bg-slate-900 rounded-md text-white p-1 m-1'/>
    </form>
    </div>
  );
}

export default CreateCohort;
