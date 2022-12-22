import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import ScoreList from "./ScoreList.js";
import { useMediaQuery } from "react-responsive";

function Course({ courseName, courseId }) {
  const [display, setDisplayMode] = useState(false);
  const isPhoneScreen = useMediaQuery({ query: "(max-width: 820px)" });

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
        <ScoreList courseId={courseId} courseName={courseName}></ScoreList>
      )}
    </div>
  );
}
export default Course;
