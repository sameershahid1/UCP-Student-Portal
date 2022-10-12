import React,{useState} from 'react'
import "./Registeration.css";
import Sections from './Sections';
import AskingForDeletion from './AskingForDeletion';
import {Data} from '../../../Data/Data';


const Registeration = () => {
  //useState
  const [Add,setAdd]=useState(false);
  const [Allow,setAllow]=useState(false);
  const [Course,setCourse]=useState({});
  const [SelectedList,setSelectedList]=useState([]);
  const [AllList,setAllList]=useState(Data);
  const [DeletedCourse,setDeltedCourse]=useState({});
  
  //List
  let Select=[];
  
  //Filter Data and Function
  let Semester="ALL";
  let CourseType="ALL";
  let Search="";

//Functions
const HandleSemester=(e)=>
{
  Semester=e.currentTarget.value;
};
const HandleCourseType=(e)=>
{
  CourseType=e.currentTarget.value;
};
const HandleSearch=(e)=>
{
  Search=e.currentTarget.value;
}


//Filtering the Searchbar, Semester and CourseType
const Filter=()=>
{
  //Filtering the Courses
  let Temp=[];
  
//Filter through Search bar
  if(Search!=="")
  {
    Temp.push(AllList.find((course)=>
    {
      if(course.CourseCode===Search)
      {
        return Course;
      }
    }
    ));
    if(Temp[0]===undefined)
    {
      setAllList([]);
      return;
    }
  }

  //Filter through Semester and CourseType
  if(Search==="")
  {
    Temp=FilterAllList(SelectedList);
    if(Semester!=="ALL"&&CourseType!=="ALL")
    {
      Temp=Temp.filter((course)=>
        {
            if(course.Semester===Semester&&course.CourseType===CourseType)
            {
               return course;
            }
        });
      setAllList(Temp.map(x=>x));        
      return;
    }

    if(Semester!=="ALL")
    {
      Temp=Temp.filter((course)=>
        {
            if(course.Semester===Semester)
            {
               return course;
            }
        });
    }
    if(CourseType!=="ALL")
    {
      Temp=Temp.filter((course)=>
      {
         if(course.CourseType===CourseType)
         {
           return course;
         }
      });
    }
    setAllList(Temp.map(x=>x));
  }
  else
  {
    Temp=Temp[0].Semester===Semester?
    Temp[0].CourseType===CourseType?
    Temp[0]:[]
    :[];
    setAllList(Temp.map(x=>x));
  }
      
    }
    
    
    //This is Funciton is used to Add the Course in the Selective Courses
const Adding=(Selected={})=>
{
  if(Object.keys(Selected).length!==0)
  {
     if(SelectedList.length!==0)
     {
       Select=SelectedList.map((x)=>x);
     }
     Select.push(Selected);
     setSelectedList(Select.map((x)=>x));
     //Filtering the data
     setAllList(
      AllList.filter((course)=>{
        if(course.CourseCode!==Selected.CourseCode&&course.CourseTitle!==Selected.CourseTitle)
        { 
           return course;
        }
      })
     );
  }
  setAdd(!Add);
};

//This function Allow to Delete selective courses from the Selective Courses
const Allowing=(Delete)=>{
  if(Delete)
  {
     Deleter();  
  }
  setAllow(false)
}


//This function is used to Delete the Courses from the selective courses
const Deleter=()=>
{
  
  /*Removing the Course from the Selected List*/
  const Selected=SelectedList.filter((section)=>{
      if(section.CourseCode!==DeletedCourse.CourseCode&&section.CourseTitle!==DeletedCourse.CourseTitle)
      {
        return section
      };
     });
    setSelectedList(Selected.map(x=>x));
  
  /*Finding the Course of the Deleted Section from the Data*/
  const COU=Data.find((course)=>{
   if(course.CourseCode===DeletedCourse.CourseCode&&course.CourseTitle===DeletedCourse.CourseTitle)
   {
     return course;
   }
  });
  
  /*Finding the Deleted Section from the Course*/
  const Section=COU.Sections.find((section)=>
  {
   if(section.Section===DeletedCourse.SelectedSection.Section)
   {
     return section;
   }
  });
  
  /*Decrementing the Current Capacity*/
  Section.CurrentCapacity-=1;
  if(Section.Status==="Close")
  {
   Section.Status="Open";
  }
  
/*Removing the Selected the Courses from the Data Course*/
 setAllList(FilterAllList(Selected));
}


const FilterAllList=(Selected)=>
{

  let Temp={};
  const alllist=Data.filter(course=>
  {

    Temp=Selected.find(Section=>
    {
       if(Section.CourseCode===course.CourseCode&&Section.CourseTitle===course.CourseTitle)
       {
         return Section;
       }          
    });

    if(Temp===undefined)
    {
       return course;
    }

  }
  );

  return alllist;
}


return (
  <div className='Registeration'>

      {/*Asking for Deletion*/}
      {Allow&&<div className='Registeration__BackgroundColor'></div>}
      {Allow&&<AskingForDeletion Allowing={Allowing}/>}


      {/*Section selection page*/}
      {Add&&<div className='Registeration__BackgroundColor'></div>}
      {Add&&<Sections Course={Course} Adding={Adding}/>}


      {/*Selected Courses Section*/}
      <section className='Course-Container'>
           <div>
              <h3>Registered Courses ({SelectedList.length}/5)</h3>
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
            {
              SelectedList.length>0&&SelectedList.map((section,index)=>(
               <ul className='Course-Container__Courses'>
                   <li>{index+1}</li>
                   <li>{section.CourseCode}</li>
                   <li>{section.CourseTitle}</li>
                   <li>{section.SelectedSection.Section}</li>
                   <li>{section.SelectedSection.CurrentCapacity}/{section.SelectedSection.Capacity}</li>
                   <li><button onClick={()=>{ 
                    setDeltedCourse(section);
                    setAllow(true);}}
                   className='btn-delete btn'>-Delete</button></li>
               </ul>
               ))
            }
           </div>
      </section>


      {/*All Courses*/}
      <section className='Course-Container'>
 
        {/*Header of the All Courses*/}
         <div>         
             <h3>Registered Courses (Limited 5)</h3>
             <div className='Filter'>

                  <div className='Filter__Select'>
                    <label htmlFor="CourseType" >Course-Type</label>
                    <select name="CourseType" id="CourseType" onChange={HandleCourseType}>
                       <option className='l1' value="ALL">ALL</option>
                       <option value="CS">CS</option>
                       <option value="UNI">UNI</option>
                       <option value="CORE">CORE</option>
                    </select>
                  </div>

                  <div className="Filter__Select">
                    <label htmlFor="Semester">Semester</label>
                    <select name="Semester" id="Semester" onChange={HandleSemester}>
                      <option value="ALL">ALL</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                    </select>
                  </div>

                  <div className='Filter__Search-Course'>
                    <input onChange={HandleSearch} type="text" placeholder='Enter the Course Code'/>
                  </div>
                  <button onClick={Filter} className="btn btn-filter">Filter</button>
             </div>
         </div>

        {/*Heading of the All courses*/}
         <ul className='Headings'>
            <li>Semester-No</li>
            <li>Course-Code</li>
            <li>Course-Title</li>
            <li>Preque-Course</li>
            <li>Preque-Title</li>
            <li>Action</li>
         </ul>

        {/*All Courses*/}
         <div>
          {
            AllList.length>0&&AllList.map((course)=>(
           <ul key={course.id} className='Course-Container__Courses'>
              <li>{course.Semester}</li>
              <li>{course.CourseCode}</li>
              <li>{course.CourseTitle}</li>
              <li></li>
              <li></li>
              <li>
                <button className='btn-add btn' 
                  onClick={()=>{
                  setCourse(course);
                  Adding();
                  }}
                >+Add</button>
              </li>
           </ul>))
          }
         </div>
      </section>

  </div>
  )
}

export default Registeration