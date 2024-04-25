import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function AllModules() {
  const navigate = useNavigate();
  const [cohorts, setCohorts] = useState([]);

  function lastArg(e) {
    return e.split("/").filter(Boolean).pop();
  }

  function cohortUrl(e) {
    return "/cohorts/" + lastArg(e);
    
  }

  useEffect(()=>{
    fetch("http://127.0.0.1:8000/api/module/")
    .then(response=>response.json())
    .then(data=>{
          setCohorts(data)
          })
    .catch(err=>console.log(err))
  }, []
  )
 
  const searchModule = (e) => {
    navigate(`/modules/${e.target.moduleCode.value}`);
  }

  const searchCohort = (e) => {
    navigate(`/cohort/${e.target.cohortCode.value}/modules`)
  }

  return (
    <div>
      <div className="bg-white m-4 p-4 flex justify-around">
        <form onSubmit={searchModule}>
          <label className="2xl-text">Search by Module</label><br />
          <input id="moduleCode" className="border-b-2 border-black" name="moduleCode" type="text" placeholder="Module Code" />
          <input type="submit" className="bg-slate-900 text-white rounded-md" value="Search" />
        </form>
        <form onSubmit={searchCohort}>
          <label className="2xl-text">Search by Cohort</label><br />
          <input type="text" className="border-b-2 border-black" name="cohortCode" id="cohortCode" placeholder="Cohort Code" />
          <input type="submit" className="bg-slate-900 rounded-md text-white" value="Search"/>
        </form>
      </div>
    <br/><Link to="/modules/create" className="bg-slate-900 text-white w-30 rounded-md text-xl font-bold p-1">Create New</Link>
    <ul className="flex flex-wrap">{cohorts.map((item, index) =>
          <li className=" w-1/2 md:w-1/3 lg:w-1/4" key={index}>
           <div className="bg-white m-4 shadow-md rounded-md p-4 h-48">
            <h2 className="text-xl font-bold mb-2">{item.full_name}</h2>
              <p>ID: {item.code} Year: {item.code[2]}</p>
              <p>Delivered to:</p>
              <ul>{item.delivered_to.map((e, i) =>
                <li key={i}>
                  <Link to={cohortUrl(e)}>{lastArg(e)}</Link>
                </li>
              )}</ul>
              <br/>
            </div>
          </li>
          )}
      </ul>
    </div>
  )
}

export default AllModules;
