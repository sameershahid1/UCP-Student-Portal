import React from 'react'
import Logo from '../../Assets/Images/Logo.svg';
import UserPic from '../../Assets/Images/User.jpeg'
import {GoChevronDown} from 'react-icons/go'
import './Header.css';

const Header = () => {
  return (
    <div className='Header'>
     {/*Section-1 of the Header*/}
      <section className="Header__S1">
       {/*Logo Start*/}
        <div className="Header__S1__Logo">
          <figure>
            <img src={Logo} alt="UCP Logo" />
          </figure>
          <span>UCP Student Portal</span>
       </div>

       {/*USER Start*/}
       <div className='Header__S1__USER'>
          <div>
             <span>Sameer Shahid</span>
             <GoChevronDown/>
          </div>
          <figure><img src={UserPic} alt="use pic" /></figure>
       </div>
      </section>

      {/*Section-2 of the Header*/}
      <section className="Header__S2">

        {/*Navbar on the left*/}
         <nav className="Header__S2__nav-1">
             <ul>
               <li><a href="#">Home</a></li>
               <li><a href="#">Student-Service</a></li>
               <li><a href="#">Courses</a></li>
               <li><a href="#">Academic-Traning</a></li>
               <li><a href="#">Vaccination</a></li>
               <li><a href="#">Touch-Points</a></li>
             </ul>
         </nav>

        {/*Navbar on the right*/}
         <div className="Header__S2__nav-2">
            <ul>
              <li><a href="#">Complain</a></li>
              <li><a href="#">Download</a></li>
            </ul>
         </div>
      </section>
    </div>
  )
}

export default Header