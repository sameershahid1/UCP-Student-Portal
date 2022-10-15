import React,{useState} from 'react'
import './Registeration.css';
import {IoIosClose} from 'react-icons/io'
import TimeTable from './TimeTable';

const Sections = ({Course,Adding,ViewSection,setViewSection}) => {
//Selected Section
const [Select,useSelect]=useState({
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
                                   Days:[]}
                                 }
                                );


//Selecting the Course Section
const Selected=(section)=>{
    useSelect({    
                id:Course.id,
                Semester:Course.Semester,
                CourseCode:Course.CourseCode,
                CourseTitle:Course.CourseTitle,
                SelectedSection:{
                                  Section:section.Section,
                                  Status:section.Status,
                                  Teacher:section.Teacher,
                                  Capacity:section.Capacity,
                                  CurrentCapacity:section.CurrentCapacity,
                                  Days:section.Days
                                }
             })
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
            <span onClick={()=>{ViewSection?setViewSection(false):Adding();}}><IoIosClose/></span>
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
              {Course.Sections.map((section,i)=>(
                  <tr key={i+1}>
                    <td>{section.Teacher}</td>
                    <td>{Course.CourseCode}</td>
                    <td>{section.Section}</td>
                    <td>{section.CurrentCapacity}/{section.Capacity}</td>
                    <td>{section.Status}</td>
                    <td>
                    { section.Status==="Close"||section.Status==="Clash"
                      ?<input name='select' type={"radio"} disabled/>
                      :<input onClick={()=>{Selected(section);}} name='select' type={"radio"}/>
                    }
                    </td>
                  </tr>
              ))}
            </tbody>
         </table>
         </div>

         {/*Buttons*/}
         {!ViewSection&&
           <div className='Section-btn-container'>
             <button onClick={Submit} className='btn'>Submit</button>
             <button onClick={()=>{Adding();}} className='btn'>Cancel</button>
           </div>
         }
      </section>
        {<TimeTable Select={Select} isTemp={false}/>}
    </div>
  )
}

export default Sections