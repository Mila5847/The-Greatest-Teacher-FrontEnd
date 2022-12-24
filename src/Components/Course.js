import { useState } from "react";
import axios from "axios";
import Score from "./Scores.js";
import { useMediaQuery } from "react-responsive";
import { useForm } from "react-hook-form";

// Update course form
function Course({ teacherId, courseName, courseId, loadCourses }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [display, setDisplayMode] = useState(false);
  const isPhoneScreen = useMediaQuery({ query: "(max-width: 820px)" });

  // Update name of course
  const handleUpdateCourse = (data) => {
    const courseName = data.name;
    const course = { name: courseName };
    updateCourse(course);
    reset();
  };

  const updateCourse = (course) => {
    axios
      .put(
        "http://localhost:8080/api/courses/" + teacherId + "/" + courseId,
        course
      )
      .then(function (response) {
        loadCourses();
      })
      .catch(function () {
        setErrorMessage("An error has occured.");
      });
  };

  return (
    <div>
      <button
        className={isPhoneScreen ? "buttonCourseResponsive" : "buttonCourse"}
        onClick={() => {
          setDisplayMode(!display);
        }}
      >
        {courseName}
      </button>
      {display && (
        <>
          <Score courseId={courseId} courseName={courseName}></Score>
          <form onSubmit={handleSubmit(handleUpdateCourse)}>
            <input
              className="nameUpdateInput"
              type="text"
              name="Name"
              placeholder="Name"
              {...register("name", {
                required: "Required field.",
                minLength: {
                  value: 2,
                  message: "The input's minimum length is 2 characters",
                },
                maxLength: {
                  value: 15,
                  message: "The input's maximum length is 15 characters",
                },
                pattern: {
                  value: /^[a-zA-Z]+$/i,
                  message: "The input should contain only letters",
                },
              })}
            />
            <div class="scoreErrorMessage">{errors.name?.message}</div>
            <button className="updateCourseButton">
              Update name of {courseName}
            </button>
            <br />
            <br />
          </form>
        </>
      )}
    </div>
  );
}
export default Course;
