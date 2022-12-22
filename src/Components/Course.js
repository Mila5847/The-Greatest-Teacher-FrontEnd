import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import ScoreList from "./ScoreList.js";

function Course({courseName, courseId}) {

  const [display, setDisplayMode] = useState(false);

  return (
  <div>
    <button
      className="buttonCourseResponsive"
      onClick={() => {
        setDisplayMode(!display)
      }}
      >
      {courseName}
    </button>
      {display ? (
        <ScoreList courseId={courseId} courseName={courseName}></ScoreList>
        ) : (
          ""
        )}
    </div>
  );

}
export default Course;
