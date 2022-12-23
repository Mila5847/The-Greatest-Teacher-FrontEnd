import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Course from "./Course";
import { useForm } from "react-hook-form";
import { useMediaQuery } from "react-responsive";

//Courses and form to add a new course
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

  const [errorMessage, setErrorMessage] = useState("");
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
          setCourses(response.data);
        }
      })
      .catch(() => {
        setErrorMessage("An error has occured.");
      });
  };

  // Add new course from form
  const handleCourseForm = (data) => {
    const courseName = data.courseName;
    const course = { name: courseName };
    addCourse(course);
    reset();
  };

  const addCourse = (course) => {
    axios
      .post("http://localhost:8080/api/courses/" + teacherId, course)
      .then(function (response) {
        loadCourses();
      })
      .catch(function () {
        setErrorMessage("An error has occured.");
      });
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
                  message: "The name's minimum length is 2 characters",
                },
                maxLength: {
                  value: 15,
                  message: "The name's maximum length is 15 characters",
                },
                pattern: {
                  value: /^[a-zA-Z]+$/i,
                  message: "The name should only contain letters",
                },
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
              <Course
                teacherId={teacherId}
                courseName={course.name}
                courseId={course.id}
                loadCourses={loadCourses}
              ></Course>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default CourseList;
