import Teacher from "./Teacher";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";

function TeacherList() {
  const {
    register,
    handleSubmit, reset,
    formState: { errors },
  } = useForm({
    defaultValues:{
      firstName: "",
      lastName: ""
    }
  });

  const [teachers, setTeachers] = useState([]);
  //the selected item will be changed everytime we click on an item
  const [selectedItem, setSelectedItem] = useState(-1); // id of the one you want to display the form for

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

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/teachers")
      .then((response) => {
        if (response.status === 200) {
          setTeachers(response.data);
        }
      })
      .catch((error) => {});
  });

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
    <>
      <div>
        <form className="teacherForm" onSubmit={handleSubmit(handleTeacherForm)}>
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
      </div>
      <div className="teachers">
        {teachers.map((teacher) => {
          return (
            <div><Teacher
              teacher={teacher}
              teacherId={teacher.id}
              teacherName={teacher.fullName}
              deleteTeacher={deleteTeacher}
              id={teacher.id} selectedItem={selectedItem} setSelectedItem={setSelectedItem}
            ></Teacher></div>
          );
        })}
      </div>
    </>
  );
}
export default TeacherList;