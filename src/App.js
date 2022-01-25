import React, { useState, useEffect } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import MakeEditor from './MakeEditor';
import GenderRenderer from './genderRenderer';
import MoodRenderer from './moodRenderer';

const App = () => {
    const rowData = [
        { make: "Toyota", model: "Celica", price: 35000, edicell: "Bug" ,value: 'male' },
        { make: "Ford", model: "Mondeo", price: 32000, edicell: "Bug", value: 'male' },
        { make: "Porsche", model: "Boxter", price: 72000, edicell: "Bug",value: 'male' },
        { make: "Toyota", model: "Corola", price: 35000, edicell: "Bug",value: 'male' },
        { make: "Ford", model: "Fiesta", price: 32000, edicell: "Bug",value: 'male' },
        { make: "Hundai", model: "Verna", price: 72000, edicell: "Bug",value: 'male' },
        { make: "Toyota", model: "Celica", price: 35000, edicell: "Bug",value: 'male' },
        { make: "Ford", model: "Mondeo", price: 32000, edicell: "Bug",value: 'male' },
        { make: "Porsche", model: "Boxter", price: 72000, edicell: "Bug",value: 'male' }
    ];
    const columns = [
        { key: "make", name: "MAKE" },
        { key: "model", name: "MODEL" },
        { key: "price", name: "PRICE" },
        { key: "edicell", name: "Task Type", cellEditorFramework: MakeEditor },
        {key: "value", name: "Value"}
    ];
    const frameworkComponents = {
        'MakeEditor': MakeEditor,
        genderCellRenderer: GenderRenderer,
            moodCellRenderer: MoodRenderer,
    };
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);
    // const [rowData, setRowData] = useState(null);
    // useEffect(() => {
    //     onLoad();
    // }, []); 
    const onGridReady = (params) => {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);

        // const updateData = (data) => params.api.setRowData(data);

        // fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
        //   .then((resp) => resp.json())
        //   .then((data) => updateData(data));
    };
    const onPaginationChanged = () => {
       // console.log('onPaginationPageLoaded');
        if (gridApi) {
            setText('#lbLastPageFound', gridApi.paginationIsLastPageFound());
            setText('#lbPageSize', gridApi.paginationGetPageSize());
            setText('#lbCurrentPage', gridApi.paginationGetCurrentPage() + 1);
            setText('#lbTotalPages', gridApi.paginationGetTotalPages());
            setLastButtonDisabled(!gridApi.paginationIsLastPageFound());
        }
    };
    function setText(selector, text) {
        document.querySelector(selector).innerHTML = text;
    }
    function setLastButtonDisabled(disabled) {
        document.querySelector('#btLast').disabled = disabled;
    }

    const onLoad = () => {
        gridApi.paginationGoToPage(0);
    }

    const onBtFirst = () => {
        gridApi.paginationGoToFirstPage();
    };

    const onBtLast = () => {
        gridApi.paginationGoToLastPage();
    };

    const onBtNext = () => {
        gridApi.paginationGoToNextPage();
    };

    const onBtPrevious = () => {
        gridApi.paginationGoToPreviousPage();
    };

    const onBtPageFive = () => {
        gridApi.paginationGoToPage(4);
    };

    const onBtPageFifty = () => {
        gridApi.paginationGoToPage(49);
    };

    const onPageSizeChanged = (newPageSize) => {
        var value = document.getElementById('page-size').value;
        gridApi.paginationSetPageSize(Number(value));
    };

    return (
        <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
            <AgGridReact
                rowData={rowData}
                columns={columns}
                paginationPageSize={5}
                pagination={true}
                // suppressPaginationPanel={true}
                suppressScrollOnNewData={true}
                onGridReady={onGridReady}
                onPaginationChanged={onPaginationChanged}
                frameworkComponents={frameworkComponents}
            >
                <AgGridColumn field="make"></AgGridColumn>
                <AgGridColumn field="model"></AgGridColumn>
                <AgGridColumn field="price"></AgGridColumn>
                <AgGridColumn field="edicell" editable={true} cellEditor="MakeEditor"></AgGridColumn>
                <AgGridColumn
                   // headerName="Rendered Value"
                    field="value"
                    cellRendererSelector={(params) => {
                        const moodDetails = { component: 'moodCellRenderer' };
                        const genderDetails = {
                            component: 'genderCellRenderer',
                            params: {
                                values: ['Male', 'Female'],
                            },
                        };
                        console.log(params);
                        if (params.value === 'male') return genderDetails;
                        else if (params.value === 'happy') return moodDetails;
                        else return undefined;
                    }}
                />

            </AgGridReact>
            <div className="example-wrapper">
                <div className="example-header">

                    Items per page:
                    <select onChange={() => onPageSizeChanged()} id="page-size">
                        <option value="10" selected={true}>
                            10
                        </option>
                        <option value="100">100</option>
                        <option value="500">500</option>
                        <option value="1000">1000</option>
                    </select>

                    <span> 1- itemsize of totalnoofitems</span>
                    {/* <button onClick={() => onBtFirst()}>To First</button>
                        <button onClick={() => onBtLast()} id="btLast">
                            To Last
                        </button> */}
                    <span>CurrentPage of TotalPages</span>
                    <button onClick={() => onBtPrevious()}>To Previous</button>
                    <button onClick={() => onBtNext()}>To Next</button>
                    <button onClick={() => onBtPageFive()}>To Page 5</button>
                    <button onClick={() => onBtPageFifty()}>To Page 50</button>


                    <div style={{ marginTop: '6px' }}>
                        <span className="label">Last Page Found:</span>
                        <span className="value" id="lbLastPageFound">
                            -
                        </span>
                        <span className="label">Page Size:</span>
                        <span className="value" id="lbPageSize">
                            -
                        </span>
                        <span className="label">Total Pages:</span>
                        <span className="value" id="lbTotalPages">
                            -
                        </span>
                        <span className="label">Current Page:</span>
                        <span className="value" id="lbCurrentPage">
                            -
                        </span>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default App;