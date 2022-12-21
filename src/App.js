import "./App.css";
import { useForm } from "react-hook-form";
import "./index.css";
import { useEffect, useState } from "react";
import { BarChart } from "./Components/BarChart";
import React from "react";
import { ArcElement } from "chart.js";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import TeacherList from "./Components/TeacherList";
import axios from "axios";

function App() {

  const [showRatings, setShowRatings] = useState(true);
  const scoresList = [];
  const teachersList = [];

  useEffect(() => {
    axios
    .get("http://localhost:8080/api/scores")
    .then((response) => {
      if (response.status === 200) {
       for (let i = 0; i < response.data.length; i++){
        scoresList.push(response.data[i].overallScore);
        console.log(scoresList);
        teachersList.push(response.data[i].fullName);
        console.log(teachersList);
       }
      }
      setChartData({
        labels:teachersList.map((teacher) => teacher),
        datasets:[{
            label: 'Score',
            backgroundColor: "rgba(255, 143, 99, 0.3)",
            borderColor: "rgb(255, 99, 132)",
            borderWidth: 2,
            data:scoresList.map((score) => score)
        }]
    })
    })
    .catch((error) => {});
  }, [scoresList, teachersList]);

  const [chartData, setChartData] = useState({
    labels: teachersList.map((teacher) => teacher), 
    datasets: [{
        data: scoresList.map((score) => score),
        backgroundColor: [
            "rgba(255, 143, 99)",
          ],
          borderColor: [
            "rgb(255, 99, 132)",
          ],
          borderWidth: 2,
      }
    ]
  })

  return (
    <div>
      <h1>The Greatest Teacher</h1>
      <div class="float-left">
        <TeacherList/>
      </div>
      <div className="float-left">
      <button className="buttonRatings">Show Teachers' Ratings</button>
      </div>
      {showRatings && <BarChart chartData={chartData} /> }
    </div>
  );
}
export default App

