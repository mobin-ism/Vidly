import React, { Component } from "react";
import Case from "case";
class TableHeader extends Component {
  render() {
    const { columns, onSort } = this.props;
    return (
      <thead className="thead-dark">
        <tr>
          {columns.map((column) => (
            <th
              key={column.label}
              className= {column.path ? "clickable" : ""}
              onClick={column.path ? () => onSort(column.path) : () => {}}
              scope="col"
            >
              {Case.title(column.label)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
