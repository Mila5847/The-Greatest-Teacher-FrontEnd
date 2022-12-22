import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Course from "./Course";
import { useForm } from "react-hook-form";
import { useMediaQuery } from "react-responsive";

function CourseList({
  teacherId,
  teacherName,
  id,
  selectedItem,
  setSelectedItem,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    courseName: "",
  });

  const isPhoneScreen = useMediaQuery({ query: "(max-width: 820px)" });
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    loadCourses();
  }, []);

  // Get courses for a teacher
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

  // Add new data from form
  const handleCourseForm = (data) => {
    console.log(data);
    const courseName = data.courseName;
    console.log(courseName);
    const course = { name: courseName };
    console.log(course);
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
      {selectedItem === id && (
        <form
          className={isPhoneScreen ? "courseFormResponsive" : "courseForm"}
          onSubmit={handleSubmit(handleCourseForm)}
        >
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
            {isPhoneScreen ? (
              <h5>{errors.courseName?.message}</h5>
            ) : (
              <p>{errors.courseName?.message}</p>
            )}
            <button className="submit">Add Course To {teacherName}</button>
          </div>
        </form>
      )}
      <div className={isPhoneScreen ? "" : "courses"}>
      {courses.map((course) => {
        return (
          <div
            className={isPhoneScreen ? "" : "course"}
            onClick={() => {
              setSelectedItem(id);
            }}
          >
            <Course courseName={course.name} courseId={course.id}></Course>
          </div>
        );
      })}
      </div>
    </div>
  );
}
export default CourseList;
