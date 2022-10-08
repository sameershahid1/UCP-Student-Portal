import React,{useState} from 'react'
import "./Registeration.css";
import Sections from './Sections';


export const Iterator=(List,size,Data)=>
{
  for(let i=0;i<size;i++)
  {
    List.push(Data);
  }
}



const Registeration = () => {
const [Add,setAdd]=useState(false);
const Adding=()=>{setAdd(!Add)};
const SelectedList=[];
const AllList=[];

Iterator(SelectedList,5,<ul className='Course-Container__Courses'>
                        <li>No#</li>
                        <li>Course-Code</li>
                        <li>Course-Title</li>
                        <li>Section</li>
                        <li>Capacity</li>
                        <li><button className='btn-delete btn'>-Delete</button></li>
                        </ul>
        );

Iterator(AllList,5,<ul className='Course-Container__Courses'>
                        <li>No#</li>
                        <li>Course-Code</li>
                        <li>Course-Title</li>
                        <li></li>
                        <li></li>
                        <li><button className='btn-add btn' onClick={()=>{Adding()}} >+Add</button></li>
                        </ul>
        );




return (
  <div className='Registeration'>
      {Add&&<div className='Registeration__BackgroundColor'></div>}
      {Add&&<Sections Adding={Adding}/>}
      <section className='Course-Container'>
           <div>
              <h3>Registered Courses (0/5)</h3>
              <button className="btn">View TimeTable</button>
           </div>
           <ul className='Headings'>
              <li>No#</li>
              <li>Course-Code</li>
              <li>Course-Title</li>
              <li>Section</li>
              <li>Capacity</li>
              <li>Action</li>
           </ul>
           <div>
             {SelectedList.map((x)=>x)}
           </div>
      </section>

      <section className='Course-Container'>
        <div>
            <h3>Registered Courses (0/5)</h3>
        </div>
        <ul className='Headings'>
           <li>Semester-No</li>
           <li>Course-Code</li>
           <li>Course-Title</li>
           <li>Preque-Course</li>
           <li>Preque-Title</li>
           <li>Action</li>
        </ul>
        <div>
          {AllList.map((x)=>x)}
        </div>
      </section>

  </div>
  )
}

export default Registeration