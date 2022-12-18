import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";

function ScoreList({ courseId}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    score: "",
  });

  const [scores, setScores] = useState([]);

  const handleScoreForm = (data) => {
    console.log(data);
    const givenScore = data.Score;
    console.log(givenScore);
    const score = { score: givenScore };
    console.log("real score " + score.score);
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
          {...register("Score", { required: true, max: {
            value: 100,
            message: "Please input a number between 0 and 100",
          }, min: {
            value: 0,
            message: "Please input a number between 0 and 100",
          },})}
        />
        <p>{errors.Score?.message}</p>
        <button className="submit">Add Teacher</button>
      </form>
    </div>
  );
}
export default ScoreList;
