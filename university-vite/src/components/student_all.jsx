import { useNavigate, Link } from 'react-router-dom';

function AllStudents() {
  const navigate = useNavigate()
 
 
  const search = (e) => {
    navigate(`/students/${e.target.studentNo.value}`);
  }

  return (
    <div>


    <div className="m-10 p-10 bg-white">
      <h1 className="m-4 text-xl">View All Students</h1>
      <form onSubmit={search}>
        <input id="studentNo" placeholder="Student Number"  className="border-b-2 border-slate-900" name="studentNo" type="text" maxLength="8" />
        <input type="submit" className="bg-slate-900 rounded-md padding-2 text-white w-20"  value="Search" />
      </form>
    <br/><Link to="/students/create" className="bg-slate-900 text-white w-30 rounded-md text-xl font-bold p-1">Create New</Link>
    </div>
    </div>
  )
}

export default AllStudents;
