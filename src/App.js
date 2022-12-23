import "./App.css";
import "./index.css";
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { BarChart } from "./Components/BarChart";
import { ArcElement } from "chart.js";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import TeacherList from "./Components/TeacherList";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useMediaQuery } from "react-responsive";

function App() {
  const isPhoneScreen = useMediaQuery({ query: "(max-width: 820px)" });
  const isIpadScreen = useMediaQuery({ query: "(max-width: 1024px)" });

  const scoresList = [];
  const teachersList = [];

  const [errorMessage, setErrorMessage] = useState("");
  const [highestScore, setHighestScore] = useState([]);
  const [teacherWithHighestScore, setTeacherWithHighestScore] = useState([]);
  const [teacherFiveStars, setTeacherFiveStars] = useState(
    "No teachers and scores defined."
  );

  // Get the scores to display on the Bar Chart
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/scores")
      .then((response) => {
        if (response.status === 200) {
          for (let i = 0; i < response.data.length; i++) {
            scoresList.push(response.data[i].overallScore);
            const numberOfVotes = response.data[i].overallNumberOfVotes;
            teachersList.push(
              response.data[i].fullName + "(" + numberOfVotes + ")"
            );
          }
        }
        setChartData({
          labels: teachersList.map((teacher) => teacher),
          datasets: [
            {
              label: "Score",
              backgroundColor: "rgba(255, 143, 99, 0.3)",
              borderColor: "rgb(255, 99, 132)",
              borderWidth: 2,
              data: scoresList.map((score) => score),
            },
          ],
        });
      })
      .catch(() => {
        setErrorMessage("An error has occured.");
      });
  }, [scoresList, teachersList]);

  // Update the scores' list and the teachers' list for the Bar Chart
  const [chartData, setChartData] = useState({
    labels: teachersList.map((teacher) => teacher),
    datasets: [
      {
        data: scoresList.map((score) => score),
        backgroundColor: ["rgba(255, 143, 99)"],
        borderColor: ["rgb(255, 99, 132)"],
        borderWidth: 2,
      },
    ],
  });

  // Get the highest score to display with the rating stars
  useEffect(() => {
    if (chartData.labels.length === 0) {
      setTeacherFiveStars("No teachers and scores defined.");
    }
    const highestScore = Math.max(...chartData.datasets[0].data);
    setHighestScore(highestScore);
    for (let i = 0; i < chartData.datasets[0].data.length; i++) {
      if (highestScore === chartData.datasets[0].data[i]) {
        let teacherWithHighestScore = chartData.labels[i];
        setTeacherWithHighestScore(teacherWithHighestScore);
        setTeacherFiveStars(
          teacherWithHighestScore +
            "has the highest score of " +
            highestScore +
            "/100."
        );
      }
    }
  }, [scoresList, teachersList]);

  return isPhoneScreen || isIpadScreen ? (
    <div>
      <h1>The Greatest Teacher</h1>
      <div class="float-left">
        <TeacherList />
      </div>
      <BarChart chartData={chartData} />
      <div>
        <h3>{teacherFiveStars}</h3>
        <Rating name="read-only" style={{ maxWidth: 250 }} value={5} readOnly />
      </div>
    </div>
  ) : (
    <div>
      <h1>The Greatest Teacher</h1>
      <div class="float-left">
        <TeacherList />
      </div>
      <BarChart chartData={chartData} />
      <h2>{teacherFiveStars}</h2>
      <div class="float-right">
        <Rating name="read-only" style={{ maxWidth: 250 }} value={5} readOnly />
      </div>
    </div>
  );
}
export default App;
