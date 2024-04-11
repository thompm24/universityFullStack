import { Link } from 'react-router-dom'

function Nav() {
  const links = [
    {id: 1, text: "Degrees", path: "/degrees/"},
    {id: 2, text: "Students", path: "/students/"},
    {id: 3, text: "Cohorts", path: "/cohorts/"},
    {id: 4, text: "Modules", path: "/modules/"},
  ]

  return (
    <ul className="flex justify-between items-center sticky top-0 bg-red-500"> 
    {
      links.map((item) => (
        <li key={item.id}>
          <Link to={item.path}>{item.text}</Link>
        </li>
        )
      )
    }
      </ul>
  ) 
}

export default Nav;
