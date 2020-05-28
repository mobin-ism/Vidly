import React from "react";
const Like = (props) => {
    let classes = "fa fa-heart";
    classes += props.isLiked ? "" : "-o";
  return <i className={classes} onClick = {props.onClick}></i>;
};

export default Like;
