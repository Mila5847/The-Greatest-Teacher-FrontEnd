import { Bar } from "react-chartjs-2";
export const BarChart = ({ chartData }) => {
  return (
    <div className="chart-container" style={{ width: 1000 }}>
      <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Teachers' Ratings"
            },
            legend: {
              display: false
            }
          },
        }}
      />
    </div>
  );
};