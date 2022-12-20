import { Component, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import CourseList from "./CourseList.js";
import { useForm } from "react-hook-form";
import App from "../App.js";

function Teacher({ teacher, teacherId, teacherName, deleteTeacher, isClicked }) {
  const [display, setDisplayMode] = useState(false);

  return (
    <>
      <div>
      <button className="deleteButton" onClick={() => {deleteTeacher(teacher)}}>X</button>
        <button
          className="buttonTeacher"
          onClick={() => {
            setDisplayMode(!display)
          }}
        >
          {teacherName}
        </button>
        {display  ? (
          <div className={`course-list course-list-${teacherId}`}>
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
