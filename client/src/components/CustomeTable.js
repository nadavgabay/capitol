import React from 'react';

import ReactTable from 'react-table'
import 'react-table/react-table.css'


export const CustomeTable = (props) => {
  
      return (
        <ReactTable
        loading={props.loading}
            data={props.data}
            columns={props.columns}
      />
      )
  }
  