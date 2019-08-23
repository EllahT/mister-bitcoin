import React from "react";
import { Sparklines, SparklinesLine, SparklinesSpots } from "react-sparklines";

import "./ChartContainer.scss";

export default props => {
  const { data, color, title, subTitle } = props;
  return (
    <div>
      <h1>{title}</h1>
      <h4>{subTitle}</h4>
      <Sparklines data={data}>
        <SparklinesLine color={color} />
        <SparklinesSpots />
      </Sparklines>
    </div>
  );
};
