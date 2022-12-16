import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Course from "./Course";

function CourseList({teacherId}) {

  const [courses, setCourses] = useState([]);

    useEffect(()=>{
        axios.get("http://localhost:8080/api/courses/" + teacherId, {})
        .then((response) => {
          if (response.status === 200) {
            console.log(response.data)
            setCourses(response.data)
          }
        })
        .catch((error) => {
        });
      },
    [])
  
    console.log("coursess" + courses);
  return (
    <>
      <div class="float-right">
        {courses.map((course) => {
            return (
              <div>
              <Course
              courseName={course.name}></Course>
              </div>
            );
          })}
      </div>
    </>
    );
}
  export default CourseList;
  