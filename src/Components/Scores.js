import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

// Score form
function Scores({ courseId, courseName }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    score: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [scores, setScores] = useState([]);

  // Add new score from form
  const handleScoreForm = (data) => {
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
      .catch(function () {
        setErrorMessage("An error has occured.");
      });
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
              message: "The score should be between 0 and 100.",
            },
            min: {
              value: 0,
              message: "The score should be between 0 and 100.",
            },
            pattern: {
              value: /^[0-9]+$/,
              message: "The score should only contain numbers.",
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
export default Scores;
