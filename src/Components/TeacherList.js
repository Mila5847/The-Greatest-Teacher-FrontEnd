import Teacher from "./Teacher";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMediaQuery } from "react-responsive";

// List of teachers and form to add a new teacher
function TeacherList() {
  const isPhoneScreen = useMediaQuery({ query: "(max-width: 820px)" });

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
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(-1);

  useEffect(() => {
    loadTeachers();
  }, []);

  // Get all the teachers for display
  const loadTeachers = () => {
    axios
      .get("http://localhost:8080/api/teachers")
      .then((response) => {
        if (response.status === 200) {
          setTeachers(response.data);
        }
      })
      .catch(() => {
        setErrorMessage("An error has occured.");
      });
  };

  // Add new data from form
  const handleTeacherForm = (data) => {
    const firstNameTeacher = data.firstName;
    const lastNameTeacher = data.lastName;
    const teacher = { firstName: firstNameTeacher, lastName: lastNameTeacher };

    addTeacher(teacher);
    reset();
  };

  const addTeacher = (teacher) => {
    axios
      .post("http://localhost:8080/api/teachers", teacher)
      .then(function (response) {
        loadTeachers();
      })
      .catch(function () {
        setErrorMessage("An error has occured.");
      });
  };

  const deleteTeacher = (teacher) => {
    axios
      .delete("http://localhost:8080/api/teachers/" + teacher.id)
      .then(function (response) {
        loadTeachers();
      })
      .catch(function () {
        setErrorMessage("An error has occured.");
      });
  };

  return (
    <div>
      <form
        className={isPhoneScreen ? "teacherFormResponsive" : "teacherForm"}
        onSubmit={handleSubmit(handleTeacherForm)}
      >
        <div className="input-container">
          <input
            class="input"
            type="text"
            name="firstName"
            placeholder="First name"
            {...register("firstName", {
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
          <p>{errors.firstName?.message}</p>
          <input
            class="input"
            type="text"
            name="lastName"
            placeholder="Last name"
            {...register("lastName", {
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
          <p>{errors.lastName?.message}</p>
          <button className="submit">Add Teacher</button>
        </div>
      </form>
      <div className={isPhoneScreen ? "" : "teachers"}>
        {teachers.map((teacher) => {
          return (
            <Teacher
              teacher={teacher}
              teacherId={teacher.id}
              teacherName={teacher.fullName}
              deleteTeacher={deleteTeacher}
              id={teacher.id}
              selectedTeacher={selectedTeacher}
              setSelectedTeacher={setSelectedTeacher}
            ></Teacher>
          );
        })}
      </div>
    </div>
  );
}
export default TeacherList;
