import { Component, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import CourseList from "./CourseList.js";
import { useForm } from "react-hook-form";
import App from "../App.js";
import "./Teacher.css";

function Teacher({ teacher, teacherId, teacherName, deleteTeacher, isClicked }) {
  const [display, setDisplayMode] = useState(false);

  return (
    <>
      <div>
      <button className="deleteButton" onClick={() => {deleteTeacher(teacher)}}>X</button>
        <button
          className="buttonTeacher"
          onClick={(e) => {
            setDisplayMode(!display);
            let teachersDiv = e.target.parentElement.parentElement.parentElement;
            let courseListElements = teachersDiv.querySelectorAll(".course-list");
            console.log(courseListElements);
            if(courseListElements != null){
              for(let i = 0; i < courseListElements.length; i++){
                console.log(courseListElements[i].classList);
                if(courseListElements[i].classList.contains(`course-list-${teacherId}`)){
                  courseListElements[i].classList.remove("hidden");
                  setDisplayMode(true);
                  continue;
                }
                courseListElements[i].classList.add("hidden");
              }
            }
            console.log(e.target.parentElement);
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
