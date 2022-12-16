import { useEffect } from "react";
import { useState} from "react";
import axios from "axios";

function Course({courseName}) {
    return (
        <>
        <button className="buttonCourse">{courseName}</button>
        </>
      );
    }
export default Course;
    