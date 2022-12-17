import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import CourseList from "./CourseList.js";
import { useForm } from "react-hook-form";
import App from "../App.js";


function Teacher({ teacherId, teacherName }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      courseName: ""
    },
  });
  const [display, setDisplayMode] = useState(false);

  return (
    <>
      <div>
        <button
          className="buttonTeacher"
          onClick={() => {
            setDisplayMode(!display)
            App(teacherId, )
          }}
        >
          {teacherName}
        </button>{" "}
        <br />
        {display ? (
          <div>
            <div className="courses">
              <CourseList
                teacherId={teacherId}
                displayCourses={display}
              ></CourseList>{" "}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
export default Teacher;
