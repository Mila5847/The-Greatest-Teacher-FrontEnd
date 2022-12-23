import CourseList from "./CourseList.js";
import { useMediaQuery } from "react-responsive";

// Teacher and course list
function Teacher({
  teacher,
  teacherId,
  teacherName,
  deleteTeacher,
  id,
  selectedItem,
  setSelectedItem,
}) {
  const isPhoneScreen = useMediaQuery({ query: "(max-width: 820px)" });

  return (
    <div>
      <button
        className="deleteButton"
        onClick={() => {
          deleteTeacher(teacher);
        }}
      >
        X
      </button>
      <button
        className={isPhoneScreen ? "buttonTeacherResponsive" : "buttonTeacher"}
        onClick={() => {
          setSelectedItem(id);
        }}
      >
        {teacherName}
      </button>
      {selectedItem === id && (
        <CourseList
          teacherId={teacherId}
          teacherName={teacherName}
        ></CourseList>
      )}
    </div>
  );
}
export default Teacher;
