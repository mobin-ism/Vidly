import React from "react";
const ListGroup = (props) => {
  const {items, valueProperty, textProperty, onItemSelect, currentItem} = props;
  return (
    <ul className="list-group">
      {items.map((item) => (
        <li className={currentItem === item[valueProperty] ? "list-group-item active" : "list-group-item"} key={item[valueProperty]} onClick = {() => onItemSelect(item[valueProperty])}>
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;
