import { Bar } from "react-chartjs-2";
import { useMediaQuery } from "react-responsive";

// Bar Chart with scores and teachers

export const BarChart = ({ chartData }) => {
  const isPhoneScreen = useMediaQuery({ query: "(max-width: 820px)" });

  return (
    <div
      className={
        isPhoneScreen ? "chart-containerResponsivePhone" : "chart-container"
      }
    >
      <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Teachers' Ratings",
            },
            legend: {
              display: false,
            },
          },
        }}
      />
    </div>
  );
};
