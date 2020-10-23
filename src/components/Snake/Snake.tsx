import React from "react";
import { createUseStyles } from "react-jss";
import { Position } from "../../util/position";
import Grid from "../Grid";

const useStyles = createUseStyles({
  snake: {
    border: "thin",
    display: "grid"
  },
  cell: {
    height: "10px",
    weight: "10px",
    border: "thin black"
  },
  head: {
    backgroundColor: (props) => props.headColor,
    border: "thin black",
    borderRadius: "50%"
  },
  body: {
    backgroundColor: (props) => props.bodyColor,
    border: "1px",
    borderRadius: "50%"
  }
});

interface Props {
  snakeQueue: Position[];
  headColor?: string;
  bodyColor?: string;
}

export default function Snake(props: Props) {
  const {
    snakeQueue: [head, ...body],
    headColor = "green",
    bodyColor = "greenyellow"
  } = props;
  const classes = useStyles({ headColor, bodyColor });

  return (
    <>
      <Grid.Cell className={classes.head} position={head} />
      {body.map((pos, i) => {
        return <Grid.Cell key={i} className={classes.body} position={pos} />;
      })}
    </>
  );
}
