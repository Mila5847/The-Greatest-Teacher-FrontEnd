import "./App.css";
import TeacherList from "./Components/TeacherList";
import { useForm } from "react-hook-form";
import React from "react";
import "./index.css";
import BarChart from "./Components/BarChart";
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart }            from 'react-chartjs-2'

function App() {
  const teachers = ["dfgt", "fvgrht"];

  return (
    <div>
      <h1>The Greatest Teacher</h1>
      <div class="float-left">
        <TeacherList />
      </div>
      <div>
        <BarChart teachers={teachers}/>
      </div>
    </div>
  );
}
export default App;
