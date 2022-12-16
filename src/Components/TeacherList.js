import Teacher from "./Teacher";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

function TeacherList() {
  const [teachers, setTeachers] = useState([]);

  useEffect(()=>{
    axios.get("http://localhost:8080/api/teachers", {})
    .then((response) => {
      if (response.status === 200) {
        console.log(response.data)
        setTeachers(response.data)
      }
    })
    .catch((error) => {
    });
  }, [])

    return (
      <>
        <div>
          {teachers.map((teacher) => {
              return (
                <Teacher
                teacherId={teacher.id}
                teacherName={teacher.fullName}
                ></Teacher>
              );
            })}
        </div>
      </>
    );
  }
  
  export default TeacherList;
  