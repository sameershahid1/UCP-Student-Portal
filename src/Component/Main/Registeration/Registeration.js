//Importing React Module
import React,{useState,createContext,useEffect} from 'react'
//Style
import "./Registeration.css";
//Components
import Sections from './Sections';
import AskingForDeletion from './AskingForDeletion';
import TimeTable from './TimeTable';
//Importing Data
import {Data} from '../../../Data/Data';

//Context API
export const Context=createContext([]);


//Registeration form
const Registeration = () => {
  //useState
  const [Add,setAdd]=useState(false);
  const [Allow,setAllow]=useState(false);
  const [Course,setCourse]=useState({});
  const [SelectedList,setSelectedList]=useState([]);
  const [AllList,setAllList]=useState(Data);
  const [DeletedCourse,setDeltedCourse]=useState({});
  const [TempTimeTable,setTempTimeTable]=useState(false);
  const [ViewSection,setViewSection]=useState(false);

  useEffect(()=>
  {
     
  },[Add]);

  //List
  let Select=[];
  
  //Filter Data and Function
  let Semester="ALL";
  let CourseType="ALL";
  let Search="";

//Functions

//setting the Semester value
const HandleSemester=(e)=>
{
  Semester=e.currentTarget.value;
};

//setting the CourseType value
const HandleCourseType=(e)=>
{
  CourseType=e.currentTarget.value;
};

//setting the Search value
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
    if(Temp[0].Semester===Semester||Semester==="ALL")
    {
      if(Temp[0].CourseType===CourseType||CourseType==="ALL")
      {
        setAllList(Temp.map(x=>x));
        return;
      }
    }
    setAllList([]);
    return;
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
     AllList.forEach((course)=>
     {
       SectionClashChecker(course,"Open");
     });
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

//This Function will Check the selected Course Section timing with the Selected Coruses Section.
const SectionClashChecker=(Course,value)=>
{
    Course.Sections.forEach((section)=>
    {
        const Match=SelectedList.find((Selected)=>
        {
          for(let i=0;i<section.Days.length;i++)
          {
              const FDay=Selected.SelectedSection.Days.find((SDay)=>
              {
                 if(section.Days[i].Day===SDay.Day&&section.Days[i].StartTime===SDay.StartTime&&section.Days[i].EndTime===SDay.EndTime)
                 {
                   return SDay;
                 }
              });
              if(FDay!==undefined)
              {
                return Selected;
              }

            }
        });

        if(Match!==undefined)
        {
          section.Status=value;
        }
    });
}



return (
  <div className='Registeration'>
      {/*Backgournd Color of the Screen*/}
      {(Allow||Add||TempTimeTable||ViewSection)&&<div className='Registeration__BackgroundColor'></div>}

      {/*Asking for Deletion*/}
      {Allow&&<AskingForDeletion Allowing={Allowing}/>}

      <Context.Provider value={SelectedList}>
        {/*Section selection page*/}
        {(Add||ViewSection)&&<Sections Course={Course} setViewSection={setViewSection} ViewSection={ViewSection} Adding={Adding}/>}

        {/*Student TimeTable*/}
        {TempTimeTable&&<TimeTable isTemp={true} setTempTimeTable={setTempTimeTable}/>}
      </Context.Provider>

      {/*Selected Courses Section*/}
      <section className='Course-Container'>
           <div>
              <h3>Registered Courses ({SelectedList.length}/5)</h3>
              <button onClick={()=>{setTempTimeTable(true)}} className="btn">View TimeTable</button>
           </div>
           <ul className='Headings'>
              <li>No#</li>
              <li>Course-Code</li>
              <li>Course-Title</li>
              <li>Section</li>
              <li>Capacity</li>
              <li>Action</li>
              <li>View Section</li>
           </ul>
           <div>
            {
              SelectedList.length>0&&SelectedList.map((section,index)=>(
               <ul key={index+1} className='Course-Container__Courses'>
                   <li>{index+1}</li>
                   <li>{section.CourseCode}</li>
                   <li>{section.CourseTitle}</li>
                   <li>{section.SelectedSection.Section}</li>
                   <li>{section.SelectedSection.CurrentCapacity}/{section.SelectedSection.Capacity}</li>
                   <li>
                       <button 
                        onClick={()=>{
                            setDeltedCourse(section);
                            setAllow(true);
                            }}
                        className='btn-delete btn'>-Delete</button>
                   </li>
                   <li><button onClick={()=>{setViewSection(true);}} className='btn btn-view'>View Section</button></li>
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
                       <option value="ALL">ALL</option>
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
                    <input onChange={HandleSearch} type="text" placeholder='Course Code'/>
                  </div>
                  <button onClick={Filter} className="btn btn-filter">Filter</button>
             </div>
         </div>

        {/*Heading of the All courses*/}
         <ul className='Headings'>
            <li>Semester</li>
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
            course.Add===true&&
            <ul key={course.id} className='Course-Container__Courses'>
               <li>{course.Semester}</li>
               <li>{course.CourseCode}</li>
               <li>{course.CourseTitle}</li>
               <li></li>
               <li></li>
               <li>
                 <button className='btn-add btn' 
                   onClick={()=>{
                   if(SelectedList.length<5)
                   {
                      SectionClashChecker(course,"Clash");
                      setCourse(course);
                      Adding();
                   }
                   else
                   {
                     setAdd(true);
                   }
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