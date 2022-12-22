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

  const [teachers, setTeachers] = useState([]);

  const [selectedItem, setSelectedItem] = useState(-1);

  useEffect(() => {
    loadTeachers();
  }, []);

  // Get all the teachers for display
  const loadTeachers = () => {
    axios
      .get("http://localhost:8080/api/teachers")
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          setTeachers(response.data);
        }
      })
      .catch((error) => {});
  };

  // Add new data from form
  const handleTeacherForm = (data) => {
    console.log(data);
    const firstNameTeacher = data.firstName;
    const lastNameTeacher = data.lastName;
    console.log(firstNameTeacher + lastNameTeacher);
    const teacher = { firstName: firstNameTeacher, lastName: lastNameTeacher };
    console.log(teacher);
    addTeacher(teacher);
    reset();
  };

  const addTeacher = (teacher) => {
    axios
      .post("http://localhost:8080/api/teachers", teacher)
      .then(function (response) {
        loadTeachers();
      })
      .catch(function (error) {});
  };

  const deleteTeacher = (teacher) => {
    axios
      .delete("http://localhost:8080/api/teachers/" + teacher.id)
      .then(function (response) {
        loadTeachers();
      })
      .catch(function (error) {});
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
                message: "The input's minimum length is 2 characters",
              },
              maxLength: 100,
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
              maxLength: 100,
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
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
            ></Teacher>
          );
        })}
      </div>
    </div>
  );
}
export default TeacherList;
