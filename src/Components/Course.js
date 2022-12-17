import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

function Course({ courseName }) {
  return (
    <div>
      <button className="buttonCourse">{courseName}</button> <br />
    </div>
  );
}
export default Course;
