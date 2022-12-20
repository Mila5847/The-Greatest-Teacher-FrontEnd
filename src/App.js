import "./App.css";
import { useForm } from "react-hook-form";
import "./index.css";
//import { Chart as ChartJS } from 'chart.js/auto'
//import { Chart }            from 'react-chartjs-2'
import { useEffect, useState } from "react";
import { Data } from "./utils/Data";
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

  const displayDiagram = () => {
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
            backgroundColor: "rgb(0,0,255)",
            borderColor: "rgba(255, 159, 64, 0.2)",
            borderWidth: 2,
            data:scoresList.map((score) => score)
        }]
    })
    })
    .catch((error) => {});
  };

  const [chartData, setChartData] = useState({
    labels: teachersList.map((teacher) => teacher), 
    datasets: [
      {
        label: "Teachers",
        data: scoresList.map((score) => score),
        backgroundColor: [
            "rgb(0,0,255)",
          ],
          borderColor: [
            "rgb(255, 99, 132)",
          ],
          borderWidth: 2,
      }
    ]
  })

  /*useEffect(() => {
    setChartData({
        labels:teachersList.map((teacher) => teacher),
        datasets:[{
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data:scoresList.map((score) => score)
        }]
    })
  }, [chartData, setChartData]);*/

  return (
    <div>
      <h1>The Greatest Teacher</h1>
      <div class="float-left">
        <TeacherList/>
      </div>
      <div className="float-left">
      <button className="buttonRatings" onClick={() => {displayDiagram()}}>Show Teachers' Ratings</button>
      </div>
      {showRatings && <BarChart chartData={chartData} /> }
    </div>
  );
}
export default App

