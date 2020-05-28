import React, { Component } from 'react';
class TableHeader extends Component {
    render() { 
        return ( 
            <thead className="thead-dark">
                <tr>
                  <th
                    className="clickable"
                    onClick={() => this.onSort("title")}
                    scope="col"
                    
                  >
                    Title
                  </th>
                </tr>
              </thead>
         );
    }
}
 
export default TableHeader;