    /* eslint-disable no-plusplus,no-underscore-dangle */
    import React, { PureComponent } from 'react';
    import { CustomeTable } from '../components/CustomeTable.js';
    import { columns } from '../components/CustomeTableCol.js';

    export class FinancialTable extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            position: [],
            financialUnit: '',
            calculatedData: [],
            loader: false
        };
    }

    componentDidMount() {
        this.callPositionsApi()
        .then(res => {
            this.setState({ position: res.positions }, () => {
                this.callFinancialUnitsApi()
                .then(res => {
                    this.setState({ financialUnit: res.finUnits }, () => {
                        this.getCalculatedData()
                    })
                })
            })
        }).then(()=> 
        this.setState({loader: false}))
          .catch(err => console.log(err));

    }

    callFinancialUnitsApi = async () => {
        const response = await fetch('/api/getFinancialUnits');
        const body = await response.json();

        if (response.status !== 200) throw Error(body.message);

        return body;
    };

    callPositionsApi = async () => {
        const response = await fetch('/api/getPositions');
        const body = await response.json();

        if (response.status !== 200) throw Error(body.message);

        return body;
    };
    getCcyRate = async(ccy) => {
            const response = await fetch(`/api/getCCyCurrency/${ccy}`);
            const ccyResponse = await response.json();
            return ccyResponse.amount;
        }
    calculateValueInUSD = (price, notionalValue) => {
        return price * notionalValue;
    }

    getCalculatedData = () => {
        this.setState({loader: true, calculatedData: []}, () => {
            const positions = this.state.position;
            const financialUnit = this.state.financialUnit;
    
            Object.values(financialUnit).map((finUnit) => {
                Object.values(positions).map((position) => {
                    this.getCcyRate(position.data.currency.ccy).then(value => {
                        if(finUnit.id === position.fuOriginId){
                            let currentRow = {};
                            currentRow.ccyRate = value;
                            currentRow.name = finUnit.name;
                            currentRow.notionalValue = position.data.currency.notionalValue;
                            currentRow.currency = position.data.currency.ccy;
                            currentRow.valueInUsd = this.calculateValueInUSD(value, position.data.currency.notionalValue); 
    
                            this.setState({calculatedData: this.state.calculatedData.concat(currentRow)});
                        }
                    });
                })
            })
        })

        // this.setState({loader: false})
       
    }
    
    render() {
        return (
        <div className="only-header-draggable-widget">
            <CustomeTable data={this.state.calculatedData} columns={columns} loading={this.state.loader}/>
        </div>
        );
    }
}
