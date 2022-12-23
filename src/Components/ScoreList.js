import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";

function ScoreList({ courseId, courseName }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    score: "",
  });

  const [scores, setScores] = useState([]);

  // Add new data from form
  const handleScoreForm = (data) => {
    console.log("data is " + data.numberVotes);
    const givenScore = data.Score;
    const score = { score: givenScore };
    addScore(score);
    reset();
  };

  const addScore = (score) => {
    axios
      .post("http://localhost:8080/api/scores/" + courseId, score)
      .then(function (response) {
        setScores(response.data);
      })
      .catch(function (error) {});
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleScoreForm)}>
        <input
          className="scoreInput"
          type="number"
          name="score"
          placeholder="Score"
          {...register("Score", {
            required: true,
            max: {
              value: 100,
              message: "Please input a number between 0 and 100",
            },
            min: {
              value: 0,
              message: "Please input a number between 0 and 100",
            },
          })}
        />
        <div class="scoreErrorMessage">{errors.Score?.message}</div>
        <button className="submitScoreButton">Add Score To {courseName}</button>
        <br />
        <br />
      </form>
    </div>
  );
}
export default ScoreList;
