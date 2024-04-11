import { useState, useEffect } from 'react';

function CreateModule() {

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://127.0.0.1:8000/api/module/",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "code": `${e.target.code.value}`,
        "full_name": `${e.target.full_name.value}`,
        "delivered_to": selectedCohorts,
        "ca_split": parseInt(`${e.target.ca_split.value}`),
      }),
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const [cohorts, setCohorts] = useState([]);
  const [selectedCohorts, setSelectedCohorts] = useState([]);
  
  const handleCheckbox = (event) => {
    const {value, checked} = event.target;
    setSelectedCohorts((prev) =>
       checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  }


  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() =>{
    fetch("http://127.0.0.1:8000/api/cohort/")
    .then(response => response.json())
    .then(data => {
      setCohorts(data)
      setIsLoaded(true)
      })
    .catch((err) =>
      console.log(err)
    );
  }, []);


  if (!isLoaded) {
    return(<h1>Loading.....</h1>)
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="full_name">Full Name</label>
      <input id="full_name" name="full_name" type="text" />
      <label htmlFor="code">Code</label>
      <input id="code" name="code" type="text" maxLength="8" />
      <label htmlFor="ca_split">CA Split</label>
      <input id="ca_split" name="ca_split" type="int" />
      {cohorts.map((cohort) =>
        <label key={cohort.id}>{cohort.name}
          <input
            type="checkbox"
            value={`http://127.0.0.1:8000/api/cohort/${cohort.id}/`}
            onChange={handleCheckbox}
            checked={selectedCohorts.includes(`http://127.0.0.1:8000/api/cohort/${cohort.id}/`)}
          />
          <br/>
        </label>
       )}
       <input type="submit"/>
    </form>
  )
}

export default CreateModule;
