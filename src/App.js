import "./App.css";
import TeacherList from "./Components/TeacherList";
import { useForm } from "react-hook-form";
import React from "react";
import "./index.css";
import CourseList from "./Components/CourseList";

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });
  const onSubmit = (data) => console.log(data);
  //console.log(errors);

  return (
    <div>
      <h1>The Greatest Teacher</h1>
      <div>
        <div>
          <div class="float-left">
            <form onSubmit={handleSubmit((onSubmit) => {})}>
              <div className="input-container">
                <input
                  class="input"
                  type="text"
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
          <div class="float-left">
            <TeacherList />
          </div>
        </div>
        <div>
          {/*<div class="float-right">
            <form onSubmit={handleSubmit((onSubmit) => {})}>
              <div className="input-container">
                <input
                  class="input"
                  type="text"
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
                </div>*/}
        </div>
      </div>
    </div>
  );
}

export default App;
