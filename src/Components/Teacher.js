import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import CourseList from "./CourseList.js";
import { useForm } from "react-hook-form";
import App from "../App.js";

function Teacher({ teacher, teacherId, teacherName, deleteTeacher }) {
  const [display, setDisplayMode] = useState(false);
  return (
    <>
      <div>
      <button class="deleteButton" onClick={() => {deleteTeacher(teacher)}}>X</button>
        <button
          className="buttonTeacher"
          onClick={() => {
            setDisplayMode(!display)
          }}
        >
          {teacherName}
        </button>
        {display ? (
          <div>
              <CourseList
                teacherId={teacherId}
                teacherName={teacherName}
              ></CourseList>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
export default Teacher;
