import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import ScoreList from "./ScoreList.js";

function Course({courseName, courseId}) {

  const [display, setDisplayMode] = useState(false);

  return (
  <div>
    <button
      className="buttonCourse"
      onClick={() => {
        setDisplayMode(!display)
      }}
      >
      {courseName}
    </button>
      {display ? (
        <ScoreList courseId={courseId}></ScoreList>
        ) : (
          ""
        )}
    </div>
  );

}
export default Course;
