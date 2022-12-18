import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Course from "./Course";
import { useForm } from "react-hook-form";

function CourseList({ teacherId}) {
  const {
    register,
    handleSubmit, reset,
    formState: { errors },
  } = useForm({
    courseName:""
  });

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
  },[]);


  const loadCourses = () => {
    axios
      .get("http://localhost:8080/api/courses/" + teacherId, {})
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          setCourses(response.data);
        }
      })
      .catch((error) => {});
  };

 const handleCourseForm = (data) => {
    console.log(data);
    const courseName = data.courseName;
    console.log(courseName);
    const course = { name: courseName };
    console.log(course)
    addCourse(course);
    reset();
  };

  const addCourse = (course) => {
    axios
      .post("http://localhost:8080/api/courses/" + teacherId, course)
      .then(function (response) {
        loadCourses();
      })
      .catch(function (error) {});
  };


  return (
    <div>
      <form className="courseForm" onSubmit={handleSubmit(handleCourseForm)}>
            <div className="input-container">
              <input
                class="input"
                type="text"
                placeholder="Course name"
                {...register("courseName", {
                  required: "Required field.",
                  minLength: {
                    value: 2,
                    message: "The input's minimum length is 2 characters",
                  },
                  maxLength: 100,
                })}
              />
              <p>{errors.courseName?.message}</p>
              <button className="submit">Add Course To Teacher</button>
            </div>
          </form>
          <div className="courses">
      {courses.map((course) => {
        return <div className="course"><Course courseName={course.name} courseId={course.id} ></Course></div>;
      })}
      </div>
    </div>
  );
}
export default CourseList;
