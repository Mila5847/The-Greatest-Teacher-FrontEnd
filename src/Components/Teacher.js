import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import CourseList from "./CourseList.js";
import { useForm } from "react-hook-form";
import App from "../App.js";

function Teacher({ teacherId, teacherName }) {
  const [display, setDisplayMode] = useState(false);

  return (
    <>
      <div>
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
