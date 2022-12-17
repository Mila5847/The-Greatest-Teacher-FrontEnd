import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Course from "./Course";
import { useForm } from "react-hook-form";

function CourseList({ teacherId, display }) {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/courses/" + teacherId, {})
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          setCourses(response.data);
        }
      })
      .catch((error) => {});
  }, []);


  return (
    <>
      {courses.map((course) => {
        return <Course courseName={course.name}></Course>;
      })}
    </>
  );
}
export default CourseList;
