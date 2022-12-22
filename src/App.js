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
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { useRef } from "react";
import { useMediaQuery } from 'react-responsive'


function App() {

  const isPhoneScreen = useMediaQuery({ query: '(max-width: 820px)' })
  const isIpadScreen = useMediaQuery({ query: '(max-width: 1024px)' })
  const scoresList = [];
  const teachersList = [];
  const [highestScore, setHighestScore] = useState([]);
  const [teacherWithHighestScore, setTeacherWithHighestScore] = useState([]);

  useEffect(() => {
    axios
    .get("http://localhost:8080/api/scores")
    .then((response) => {
      if (response.status === 200) {
       for (let i = 0; i < response.data.length; i++){
        scoresList.push(response.data[i].overallScore);
        const numberOfVotes = response.data[i].overallNumberOfVotes;
        teachersList.push(response.data[i].fullName + "(" + numberOfVotes + ")");
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

  useEffect(() => {
    const highestScore = Math.max(...chartData.datasets[0].data);
    setHighestScore(highestScore);
    for (let i = 0; i < chartData.datasets[0].data.length; i++){
      if(highestScore === chartData.datasets[0].data[i]){
        let teacherWithHighestScore = chartData.labels[i];
        setTeacherWithHighestScore(teacherWithHighestScore);
      }
    }
  }, [scoresList, teachersList]);


  return (
    (isPhoneScreen || isIpadScreen ? <div>
      <h1>The Greatest Teacher</h1>
      <div class="float-left">
        <TeacherList/>
      </div>
      <BarChart chartData={chartData} /> 
      <div>
      <h3>{teacherWithHighestScore} has the highest score of {highestScore}/100</h3>
        <Rating name="read-only" style={{ maxWidth: 250 }} value={5} readOnly />
      </div>
    </div> : <div>
      <h1>The Greatest Teacher</h1>
      <div class="float-left">
        <TeacherList/>
      </div>
      <BarChart chartData={chartData} /> 
      <h2>{teacherWithHighestScore} has the highest score of {highestScore}/100</h2>
      <div class="float-right">
        <Rating name="read-only" style={{ maxWidth: 250 }} value={5} readOnly />
      </div>
    </div>)
  );
}
export default App

