import RefComp from "./RefComp";
import ReactECharts from "echarts-for-react";
import { useState, useRef, useEffect } from "react";

const App = () => {
  const [timeLeft, setTimeLeft] = useState(60);
  const [counterActive, setCounterActive] = useState(false);
  const intervalId = useRef(null);
  const option = {
    series: [
      {
        name: "second",
        type: "gauge",
        startAngle: 90,
        endAngle: -270,
        min: 0,
        max: 60,
        animationEasingUpdate: "bounceOut",
        clockwise: false,

        axisLine: {
          lineStyle: {
            width: 15,
            color: [[1, "rgba(0,0,0,0.7)"]],
            shadowColor: "rgba(0, 0, 0, 0.5)",
            shadowBlur: 15
          }
        },
        splitLine: {
          lineStyle: {
            shadowColor: "rgba(0, 0, 0, 0.3)",
            shadowBlur: 3,
            shadowOffsetX: 1,
            shadowOffsetY: 2
          }
        },
        axisLabel: {
          fontSize: 20,
          distance: 25,
          formatter: function (value) {
            if (value === 0) {
              return "";
            }
            return value + "";
          }
        },
        anchor: {
          show: true,
          size: 10,
          showAbove: true,
          itemStyle: {
            color: "#C0911F",
            shadowColor: "rgba(0, 0, 0, 0.3)",
            shadowBlur: 8,
            shadowOffsetX: 2,
            shadowOffsetY: 4
          }
        },
        pointer: {
          icon:
            "path://M2.9,0.7L2.9,0.7c1.4,0,2.6,1.2,2.6,2.6v115c0,1.4-1.2,2.6-2.6,2.6l0,0c-1.4,0-2.6-1.2-2.6-2.6V3.3C0.3,1.9,1.4,0.7,2.9,0.7z",
          width: 4,
          length: "85%",
          offsetCenter: [0, "8%"],
          itemStyle: {
            color: "#C0911F",
            shadowColor: "rgba(0, 0, 0, 0.3)",
            shadowBlur: 8,
            shadowOffsetX: 2,
            shadowOffsetY: 4
          }
        },
        detail: {
          show: false
        },
        title: {
          offsetCenter: [0, "30%"]
        },
        data: [
          {
            value: timeLeft
          }
        ]
      }
    ]
  };

  // resetting timer to 60 seconds and stopping countdown
  useEffect(() => {
    if (timeLeft === 0) {
      stopTimer(); // to prevent memory leak
      setTimeLeft(60);
      setCounterActive(false); // enable/disable buttons
    }
  }, [timeLeft]);
  const startTimer = () => {
    setCounterActive(true);
    intervalId.current = setInterval(() => {
      setTimeLeft((timeLeft) => {
        return timeLeft === 0 ? 0 : timeLeft - 1;
      });
    }, 1000);
  };
  const stopTimer = () => {
    setCounterActive(false);
    clearInterval(intervalId.current);
    intervalId.current = null;
  };

  return (
    <div>
      <ReactECharts style={{ height: "400px" }} option={option} />
      <RefComp
        timeLeft={timeLeft}
        isCounterRunning={counterActive}
        startTimer={startTimer}
        stopTimer={stopTimer}
      />
    </div>
  );
};
export default App;
