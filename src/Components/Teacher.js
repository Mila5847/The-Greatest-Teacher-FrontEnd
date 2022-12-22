import { Component, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import CourseList from "./CourseList.js";
import { useForm } from "react-hook-form";
import App from "../App.js";
import "./Teacher.css";
import { useMediaQuery } from "react-responsive";

function Teacher({
  teacher,
  teacherId,
  teacherName,
  deleteTeacher,
  id,
  selectedItem,
  setSelectedItem,
}) {
  const isPhoneScreen = useMediaQuery({ query: "(max-width: 800px)" });
  const [display, setDisplayMode] = useState(false);

  return (
    <div>
      <button
        className="deleteButton"
        onClick={() => {
          deleteTeacher(teacher);
        }}
      >
        X
      </button>
      <button
        className={isPhoneScreen ? "buttonTeacherResponsive" : "buttonTeacher"}
        onClick={() => {
          setSelectedItem(id);
        }}
      >
        {teacherName}
      </button>
      {selectedItem === id && (
        <CourseList
          teacherId={teacherId}
          teacherName={teacherName}
        ></CourseList>
      )}
    </div>
  );
}
export default Teacher;
