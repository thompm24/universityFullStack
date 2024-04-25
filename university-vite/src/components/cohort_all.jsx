import { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';

function AllCohorts() {
  const navigate = useNavigate()
  const [cohorts, setCohorts] = useState([]);
  useEffect(()=>{
    fetch("http://127.0.0.1:8000/api/cohort/")
    .then(response=>response.json())
    .then(data=>{
          setCohorts(data.map((item) => {
            const cohortUrl=`/cohorts/${item.id}`;
            return(<div key={item.id} className="w-1/4 p-4">
          <li key={item.id} className="bg-white p-4">
            <h3>{item.name}</h3>
              <p>ID: {item.id} Year: {item.year}</p>
              <Link to={cohortUrl}>Read More</Link>
          </li>
            </div>)
          }))
          })
    .catch(err=>console.log(err))
  }, []
  )
  
  const search = (e) => {
    navigate(`/cohorts/${e.target.cohortCode.value}`)
  }
  return (
    <div>
    <div className="bg-white m-4 p-4">
    <h1 className="3xl-text">View All Cohorts</h1>
    <form onSubmit={search}>
    <input className="border-b-2 border-black" type="text" name="cohortCode" placeholder="Cohort Code" id="cohortCode" />
    <input type="submit" value="Search" />
    </form>
    <br/><Link to="/cohorts/create" className="bg-slate-900 text-white w-30 rounded-md text-xl font-bold p-1">Create New</Link>
    </div>
    <ul className="flex flex-wrap">{cohorts}</ul>
    </div>
  )
}

export default AllCohorts;
