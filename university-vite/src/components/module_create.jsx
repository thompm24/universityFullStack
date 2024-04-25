import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateModule() {
  const navigate = useNavigate();
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
    navigate(`/modules/${e.target.code.value}`);
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
    <form className="flex bg-white m-5 p-10 justify-around item-center" onSubmit={handleSubmit}>
      <div className='flex flex-col justify-center align-items'>
    <h1 className="text-2xl">Create New Module:</h1>
      <label htmlFor="full_name">Full Name</label>
      <input id="full_name" className='border-b-2 border-black' name="full_name" type="text" /><br/>
      <label htmlFor="code">Code</label>
      <input id="code" className='border-b-2 border-black' name="code" type="text" maxLength="8" /><br/>
      <label htmlFor="ca_split">CA Split</label>
      <input id="ca_split"  className='border-b-2 border-black' name="ca_split" type="int" /><br/>
       <input type="submit" className='bg-slate-900 text-white font-bold p-1 rounded-md m-2' value="Create"/>
    </div>
    <div className='flex flex-col justify-end'>
      {cohorts.map((cohort) =>
        <label className="text-right" key={cohort.id}>{cohort.name}
          <input
            type="checkbox"
            className='text-right'
            value={`http://127.0.0.1:8000/api/cohort/${cohort.id}/`}
            onChange={handleCheckbox}
            checked={selectedCohorts.includes(`http://127.0.0.1:8000/api/cohort/${cohort.id}/`)}
          />
          <br/>
        </label>
       )}
    </div>
    </form>
  )
}

export default CreateModule;
