import { useEffect } from "react";
import { useState} from "react";
import axios from "axios";
import CourseList from "./CourseList.js";

function Teacher({teacherId, teacherName}) {
  const [display, setDisplayMode] = useState(false);

    return (
      <>
        <div>
          <button className="buttonTeacher" onClick={() => setDisplayMode(!display)}>{teacherName}</button> <br/>
          {display ? 
              <CourseList 
              teacherId = {teacherId}>
              </CourseList> 
             : ""}
          </div>
      </>
    );
  }
  export default Teacher;
  