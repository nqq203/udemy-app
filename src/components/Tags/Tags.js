import React from "react";
import { Tag } from "./TagsStyle";

const TAG = (props) => {
  const { txt = "Bestseller", extraCss = {} } = props;
  return (
    <Tag style={{ ...extraCss }}>
      {txt}
    </Tag>
  );
};

export default TAG;
