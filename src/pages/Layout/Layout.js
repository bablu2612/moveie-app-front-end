import { Outlet, Link, useNavigate } from "react-router-dom";
import logoutLogo from '../../Assets/logout.svg'

import movieAddLogo from '../../Assets/movieAdd.svg'


const Layout = () => {
    const navigate=useNavigate()
  return (
    <>
      <nav>
        <ul>
          <li>
            <button onClick={(e)=>{navigate('/movies')}} >My Movies</button>
          </li>
          <li>

            <button  onClick={(e)=>{navigate('/create-movie')}}><img src={movieAddLogo} /> </button>
          </li>
          <li>
            <button><strong>Logout</strong><img src={logoutLogo} /> </button>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;
