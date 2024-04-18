import { useRef } from "react";
import '../../public/style/Nav.css'
// import { Auth } from '../../FireBaseConfig/Authetication';
import { getAuth, signOut } from "firebase/auth";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Avatar from '@mui/material/Avatar';


function NavLoggedIn(user) {

    const MySwal = withReactContent(Swal)

    const sideBar = useRef();
    const showSidebar = ()=>{
        sideBar.current.style.display = "flex";
    }
    const hideSidebar = ()=>{
        sideBar.current.style.display = "none";
    }

    const logout = () =>{

    MySwal.fire({
        title: "Estas seguro?",
        text: "Estas a punto de cerrar tu seccion.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, cerrar seccion"
    }).then((result) => {
        if (result.isConfirmed) {
            const auth = getAuth();
            signOut(auth).then(() => {
                window.location.replace("/");
            });
        }   
    });

    }

    return (
        <header>
    
        <a href="/" className="logo">
            <img src="../../public/Viticars.png" alt="" width="200px" height="58px"/>
        </a>
    
    
        <nav className="navbar hideOnMoblie">
            <a className={({isActive})=> (isActive ? 'Active' : null)} href="/">Inicio</a>
            <a className={({isActive})=> (isActive ? 'Active' : null)} href="/carlist">Vehículos y +</a>
            <a className={({isActive})=> (isActive ? 'Active' : null)} href="#vende">Vende</a>
            <a className={({isActive})=> (isActive ? 'Active' : null)} id="contactus" href="#contact">Contáctanos</a>  
            <a className={({isActive})=> (isActive ? 'Active' : null)} id="salir" href="#" onClick={logout}>Cerrar Seccion</a> 
            {/* <div className="dropstart">
                <Avatar className="Avatar dropdown ms-2" data-bs-toggle="dropdown"
                    aria-expanded="false" alt={user.name} src={user.photo} />
                <ul className="dropdown-menu"> */}
                    {/* <li><h3 className="dropdown-item">{user.name}</h3></li> */}
                        {/* <li><a className="dropdown-item" href="#"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-gear" viewBox="0 0 16 16">
                    <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0"/>
                    <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z"/>
                </svg>
                Ajustes</a></li>
                    <li><a className="dropdown-item" href="#" onClick={logout}><svg xmlns="http://www.w3.org/2000/svg" height="16" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
                    <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
                </svg>
                Cerrar Seccion</a></li>
                </ul>
            </div> */}
      {/* <a onClick={logout}><LogoutOutlinedIcon/></a> */}
        </nav> 
        
        <a href="#" className="menuButton" onClick={showSidebar} >
            <svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 -960 960 960" width="30"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>
        </a>
    
    
        <nav className="sidebar showSideBar" id='sidebar' ref={sideBar}>
            <a href="#" className="closeButton" onClick={hideSidebar}><svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 -960 960 960" width="30"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg></a>
            <a className={({isActive})=> (isActive ? 'Active' : null)} href="/">Inicio</a>
            <a className={({isActive})=> (isActive ? 'Active' : null)} href="/carlist">Vehículos y +</a>
            {/* <a className={({isActive})=> (isActive ? 'Active' : null)} href="/admin">Administración</a> */}
            <a className={({isActive})=> (isActive ? 'Active' : null)} href="#vende">Vende</a>
            <a className={({isActive})=> (isActive ? 'Active' : null)} id="contactus" href="#footer">Contáctanos</a>
            <div className="dropstart">
                <Avatar className="Avatar dropdown ms-4" data-bs-toggle="dropdown"
                    aria-expanded="false" alt={user.name} src={user.photo} />
                <ul className="dropdown-menu">
                    {/* <li><h3 className="dropdown-item">{user.name}</h3></li><div className="name-divisor-container"><hr className="name-divisor" /></div> */}
                        <li><a className="dropdown-item" href="#"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-gear" viewBox="0 0 16 16">
                    <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0"/>
                    <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z"/>
                </svg>
                Ajustes</a></li>
                    <li><a className="dropdown-item" onClick={logout} href="#"><svg xmlns="http://www.w3.org/2000/svg" height="16" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
                    <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
                </svg>
                Cerrar Seccion</a></li>
                </ul>
            </div>
        </nav> 


    
        
    </header>
    )
}

export default NavLoggedIn