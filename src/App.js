import React from 'react';
import {AgGridColumn, AgGridReact} from 'ag-grid-react';
import {Loader} from 'react-loader-spinner';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import MakeEditor from './MakeEditor';

const App = () => {
   const rowData = [
       {make: "Toyota", model: "Celica", price: 35000, edicell : "Bug"},
       {make: "Ford", model: "Mondeo", price: 32000, edicell : "Bug"},
       {make: "Porsche", model: "Boxter", price: 72000, edicell : "Bug"},
       {make: "Toyota", model: "Corola", price: 35000, edicell : "Bug"},
       {make: "Ford", model: "Fiesta", price: 32000, edicell : "Bug"},
       {make: "Hundai", model: "Verna", price: 72000, edicell : "Bug"},
       {make: "Toyota", model: "Celica", price: 35000, edicell : "Bug"},
       {make: "Ford", model: "Mondeo", price: 32000, edicell : "Bug"},
       {make: "Porsche", model: "Boxter", price: 72000, edicell : "Bug"}
   ];
   const columns = [
    { key: "make", name: "MAKE" },
    { key: "model", name: "MODEL" },
    { key: "price", name: "PRICE" },
    { key: "edicell", name: "Task Type", cellEditorFramework: MakeEditor }
  ];
  const frameworkComponents = {
    'MakeEditor': MakeEditor    
    };

   return (
       <div className="ag-theme-alpine" style={{height: 400, width: 600}}>
           <AgGridReact
               rowData={rowData}
               columns={columns}
               pagination={true}
               frameworkComponents={frameworkComponents}
               >
               <AgGridColumn field="make"></AgGridColumn>
               <AgGridColumn field="model"></AgGridColumn>
               <AgGridColumn field="price"></AgGridColumn>
               <AgGridColumn field="edicell" editable={true} cellEditor="MakeEditor"></AgGridColumn>
           </AgGridReact>
       </div>
   );
};

export default App;