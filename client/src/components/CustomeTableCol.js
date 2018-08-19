export const columns = [{
    Header: 'Financial Name',
    accessor: 'name'
  }, {
    Header: 'Notional Value',
    accessor: 'notionalValue',
  }, {
    accessor: 'ccyRate', 
    Header: 'Rate',
  }, {
    Header: 'Currency',
    accessor: 'currency'
  },{
    Header: 'Calculated Value (in USD)',
    accessor: 'valueInUsd'
  }]