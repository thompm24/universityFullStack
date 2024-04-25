import './App.css'
import Nav from './components/Nav'
import AllDegrees from './components/degree_all';
import SomeDegrees from './components/degree_some';
import CreateDegree from './components/degree_create'
import AllStudents from './components/student_all';
import SomeStudents from './components/student_some';
import CreateStudent from './components/student_create';
import AllCohorts from './components/cohort_all';
import SomeCohorts from './components/cohort_some';
import CreateCohort from './components/cohort_create';
import AllModules from './components/module_all';
import SomeModules from './components/module_some';
import CreateModules from './components/module_create';
import CohortModules from './components/module_cohort';
import SetGrades from './components/grade_set';
import HomePage from './components/HomePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {

  return (
    <Router>
      <div className="App bg-slate-200 min-h-screen">
        <Nav />
        <div className="content">
          <Routes>
            <Route path="" element={<HomePage />} />
            <Route path="/degrees" element={<AllDegrees/>} />
            <Route path="/degrees/:degreeName" element={<SomeDegrees/>} />
            <Route path="/degrees/create" element={<CreateDegree/>}/>
            <Route path="/students" element={<AllStudents/>} />
            <Route path="/students/:studentID" element={<SomeStudents/>} />
            <Route path="/students/create" element={<CreateStudent/>} />
            <Route path="/cohorts" element={<AllCohorts />} />
            <Route path="/cohorts/:cohortName" element={<SomeCohorts />} />
            <Route path="/cohorts/create" element={<CreateCohort />} />
            <Route path="/modules" element={<AllModules />} />
            <Route path="/modules/:moduleCode" element={<SomeModules />} />
            <Route path="/modules/create" element={<CreateModules />} />
            <Route path="/cohort/:cohortCode/modules" element={<CohortModules />} />
            <Route path="/grade_set/:studentCode" element={<SetGrades />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
