import React,{useContext} from 'react';
import { Context } from './Registeration';
import {IoIosClose} from 'react-icons/io'

const TimeSlot=["08:00AM to 09:20AM","09:30AM to 10:50AM","11:00AM to 12:20PM","12:30PM to 01:50PM",
                "02:00PM to 03:20PM","03:30PM to 04:50PM","05:00PM to 06:20PM","06:30PM to 07:50PM","08:00PM to 09:20PM"];
const Days=["MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY","SATURDAY","SUNDAY"];


const TimeTable = ({Select,isTemp,setTempTimeTable}) => {

  //UseState
const List=useContext(Context);
const SelectedList=List.map(x=>x);
if(Select!==undefined)
{
  SelectedList.push(Select);
}

const SectionTime=(Day)=>{
    const Present=[];
    SelectedList.forEach((section)=>{
    const Temp=section.SelectedSection.Days.find((DA)=>
       {
          if(DA.Day===Day)
          {
            return DA;
          }
       })

       if(Temp!==undefined)
       {
          Present.push({
                        CourseCode:section.CourseCode,
                        Teacher:section.SelectedSection.Teacher,
                        Days:Temp
                       });
      }
      
    })

    const LectureTime=[];
    TimeSlot.forEach((Time,i)=>{
       const Lecture=Present.find((lec)=>{
          let lecTime=lec.Days.StartTime+" to "+lec.Days.EndTime;
          if(lecTime===Time)
          {
            return lec;
          }
       });
       if(Lecture!==undefined)
       {
         LectureTime.push(<td key={i+1}>
                            <div className="TimeTable-Container__day__Lecture">
                              <p>{Lecture.CourseCode}</p>
                              <p>{Lecture.Teacher}</p>
                              <p>[{Lecture.Days.Place}]</p>
                            </div>
                          </td>
                         );
      }
      else 
       {
          LectureTime.push(<td key={i+1}></td>);
       }
    });
  return LectureTime;
}

SectionTime("MONDAY");

  return (
    <div className={`TimeTable-Container ${isTemp&&"TimeTable-Container--Position"}`}>
      <div>
        <h2>Student TimeTable</h2>
        <span onClick={()=>{setTempTimeTable(false)}}><IoIosClose/></span>
      </div>
      <div>
      <table>
         <thead>
           <tr>
           <th>Day/Slot</th>
            {TimeSlot.map((LectureTime,i)=>(
                <th key={i+1}>{LectureTime}</th>
            ))}
            </tr>
         </thead>
         <tbody>
           {Days.map((day,i)=>(
            <tr key={i+1}>
              <td className='TimeTable-Container__day'>{day}</td>
              {SectionTime(day).map(x=>x)}
            </tr>
           ))}
         </tbody>
      </table>
      </div>
    </div>
  )
}

export default TimeTable