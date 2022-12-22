import { Bar } from "react-chartjs-2";
import { useMediaQuery } from "react-responsive";

export const BarChart = ({ chartData }) => {
  const isPhoneScreen = useMediaQuery({ query: "(max-width: 900px)" });
  const isIpadScreen = useMediaQuery({ query: '(max-width: 1000px)' })

  return (
    <div className= {isPhoneScreen ? "chart-containerResponsivePhone" : "chart-container" ? isIpadScreen : "chart-containerResponsiveIpad"}>
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
