import React,{useState} from 'react'
import './Registeration.css';
import {IoIosClose} from 'react-icons/io'


const Sections = ({Course,Adding}) => {
//Selected Section
const Select={
      id:0,
      Semester:0,
      CourseCode:"",
      CourseTitle:"",
      SelectedSection:{
      Section:"",
      Status:"",
      Teacher:"",
      Capacity:0,
      CurrentCapacity:0,
      Days:0
    }
  };


//Selecting the Course Section
const Selected=(section)=>{    
      Select.id=Course.id;
      Select.Semester=Course.Semester;
      Select.CourseCode=Course.CourseCode;
      Select.CourseTitle=Course.CourseTitle;
      Select.SelectedSection.Section=section.Section;
      Select.SelectedSection.Status=section.Status;
      Select.SelectedSection.Teacher=section.Teacher;
      Select.SelectedSection.Capacity=section.Capacity;
      Select.SelectedSection.CurrentCapacity=section.CurrentCapacity;
      Select.SelectedSection.Days=section.Days;
}

//Submiting the Section
const Submit=()=>{
   if(Select.CourseCode!==""&&Select.CourseTitle!=="")
   {
     Select.SelectedSection.CurrentCapacity+=1;
     if(Select.SelectedSection.CurrentCapacity===Select.SelectedSection.Capacity)
     {
        Select.SelectedSection.Status="Close";
     }
     for(let i=0;i<Course.Sections.length;i++)
     {
        if(Course.Sections[i].Section===Select.SelectedSection.Section)
        {
          Course.Sections[i].CurrentCapacity+=1;
          Course.Sections[i].Status=Select.SelectedSection.Status;
          break;
        }
     }
     
    Adding(Select);
   }
  else
  {
    Adding();              
  }
  };


return (
    <div className='Section-selector'>
      <section className='Section-container'>

         {/*Header List*/}
         <div>
            <h2>Add New Course</h2>
            <span onClick={Adding}><IoIosClose/></span>
         </div>
         <span>Course Section</span>
         <div>

         {/*Course Section List*/}
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
              {Course.Sections.map((section)=>(
                  <tr key={section.Section}>
                    <td>{section.Teacher}</td>
                    <td>{Course.CourseCode}</td>
                    <td>{section.Section}</td>
                    <td>{section.CurrentCapacity}/{section.Capacity}</td>
                    <td>{section.Status}</td>
                    <td>
                    { section.Status==="Close"
                      ?<input name='select' type={"radio"} disabled/>
                      :<input 
                        onClick={()=>{
                        Selected(section);
                        }}
                        name='select' type={"radio"}
                        />
                    } 
                    </td>
                  </tr>
              ))}
            </tbody>
         </table>
         </div>

         {/*Buttons*/}
         <div className='Section-btn-container'>
          <button onClick={Submit} className='btn'>Submit</button>
          <button onClick={(e)=>{Adding();}} className='btn'>Cancel</button>
         </div>

      </section>
      <section className='Timing-Container'>
         
      </section>
    </div>
  )
}

export default Sections