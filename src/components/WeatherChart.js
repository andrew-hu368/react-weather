import React from "react";
import { Group } from "@vx/group";
import { scaleTime, scaleLinear } from "@vx/scale";
import { LinePath, Bar, Line } from "@vx/shape";
import { AxisLeft, AxisBottom } from "@vx/axis";
import { LinearGradient } from "@vx/gradient";
import { withTooltip, Tooltip } from "@vx/tooltip";
import { localPoint } from "@vx/event";
import { extent, max, bisector } from "d3-array";
import { timeFormat } from "d3-time-format";

const width = window.innerWidth * 0.8;
const height = window.innerHeight * 0.8;
const margin = {
  top: 80,
  bottom: 80,
  right: 100,
  left: 100
};
const xMax = width - margin.right - margin.left;
const yMax = height - margin.right - margin.left;
const x = d => new Date(d.time);
const y = d => d.temp_max;
const bisectDate = bisector(x).left;
const formatDate = timeFormat("%b %d, '%y");

const WeatherChart = props => {
  const {
    weather5Day,
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipTop,
    tooltipLeft
  } = props;

  const xScale = scaleTime({
    range: [margin.left, xMax],
    domain: extent(weather5Day, x)
  });

  const dataYMax = max(weather5Day, y);

  const yScale = scaleLinear({
    range: [yMax, 0],
    domain: [-20, 3 * dataYMax]
  });

  const handleTooltip = ({ event, data, xSelector, xScale, yScale }) => {
    const { showTooltip } = this.props;
    const { x } = localPoint(event);
    const x0 = xScale.invert(x);
    const index = bisectDate(data, x0, 1);
    const d0 = data[index - 1];
    const d1 = data[index];
    let d = d0;
    if (d1 && d1.date) {
      d = x0 - xSelector(d0) > xSelector(d1) - x0 ? d1 : d0;
    }

    showTooltip({
      tooltipData: d,
      tooltipLeft: xScale(xSelector(d)),
      tooltipTop: yScale(y(d))
    });
  };

  const chart = (
    <div className="text-center">
      <svg width={width} height={height}>
        <LinearGradient from="#fbc2eb" to="#a6c1ee" id="gradient" />
        <rect x={0} y={0} width={width} height={height} fill="url(#gradient)" />
        {/* <AxisLeft
            scale={yScale}
            top={0}
            left={0}
            label={"Temperature"}
            stroke={"#1b1a1e"}
            ticketTextFill={"#1b1a1e"}
          />
          <AxisBottom
            scale={xScale}
            top={yMax}
            label={"day"}
            stroke={"#1b1a1e"}
            tickTextFill={"#1b1a1e"}
          /> */}
        <LinePath
          data={weather5Day}
          x={d => xScale(x(d))}
          y={d => yScale(y(d))}
          xScale={xScale}
          yScale={yScale}
          strokeWidth={5}
          stroke="#fff"
          strokeLinecap="round"
          fill="transparent"
        />
        <Bar
          x={0}
          y={0}
          width={width}
          height={0}
          fill="transparent"
          data={weather5Day}
          onMouseMove={data => event =>
            handleTooltip({ event, data, x, xScale, yScale })}
          onMouseLeave={data => event => hideTooltip()}
        />
        {tooltipData && (
          <g>
            <Line
              from={{ x: tooltipLeft, y: 0 }}
              to={{ x: tooltipLeft, y: yMax }}
              stroke="#5C77EB"
              strokeWidth={4}
              style={{ pointerEvents: "none" }}
              strokeDasharray="4,6"
            />
            <circle
              cx={tooltipLeft}
              cy={tooltipTop}
              r={4}
              fill="#5C77EB"
              stroke="#fff"
              strokeWidth={2}
              style={{ pointerEvents: "none" }}
            />
          </g>
        )}
      </svg>
      {tooltipData && (
        <div>
          <Tooltip
            top={tooltipTop - 12}
            left={tooltipLeft + 12}
            style={{
              backgroundColor: "#5C77EB",
              color: "#FFF"
            }}
          >
            {`$${y(tooltipData)}`}
          </Tooltip>
          <Tooltip
            top={yMax - 30}
            left={tooltipLeft}
            style={{
              transform: "translateX(-50%)"
            }}
          >
            {formatDate(x(tooltipData))}
          </Tooltip>
        </div>
      )}
    </div>
  );
  return chart;
};

export default withTooltip(WeatherChart);
