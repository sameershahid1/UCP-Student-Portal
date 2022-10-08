import React from 'react'
import './Registeration.css';
import  {Iterator} from './Registeration';
import {IoIosClose} from 'react-icons/io'


const Sections = ({Adding}) => {
const SectionsList=[];
Iterator(SectionsList,15,
                <tr>
                    <td>Sameer Shahid</td>
                    <td>CS1022</td>
                    <td>E1</td>
                    <td>10/50</td>
                    <td>open</td>                    
                    <td><input name='select' type={"radio"} /></td>
                </tr>
        );


return (
    <div className='Section-selector'>
      <section className='Section-container'>
         <div>
            <h2>Add New Course</h2>
            <span onClick={Adding}><IoIosClose/></span>
         </div>
         <span>Course Section</span>
         <div>
         <table>
            <thead>
                <tr>
                    <th>Teacher Name</th>
                    <th>Course Code</th>
                    <th>Section</th>
                    <th>Capacity</th>
                    <th>Status</th>                    
                    <th>Selection</th>
                </tr>
            </thead>
            <tbody>
              {SectionsList.map(x=>x)}
            </tbody>
         </table>
         </div>
         <div className='Section-btn-container'>
           <button className='btn'>Submit</button>
           <button onClick={Adding} className='btn'>Cancel</button>
         </div>
      </section>
      <section></section>
    </div>
  )
}

export default Sections