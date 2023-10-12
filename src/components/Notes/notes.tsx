import React, { useState, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { FirstDataRenderedEvent } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import "ag-grid-community/styles/ag-theme-material.css";

type Note = {
  name: string;
  type: string;
  creationDate: string;
  //   favoritesButton: string;
  //   deleteButton: string;
};

const Notes: React.FC = () => {
  const [rowData, setRowData] = useState<Note[]>([
    {
      name: "Note 1",
      type: "Type 1",
      creationDate: "2023-10-12",
      //   favoritesButton: "false",
      //   deleteButton: "false",
    },
    // ... Other notes
  ]);
  const frameworkComponents = {
    favoritesButton: () => <button>Add to Favorites</button>,
    deleteButton: () => <button>Delete</button>,
  };

  const columnDefs: any[] = [
    {
      headerCheckboxSelection: true,
      checkboxSelection: true,
      width: 50,
      resizable: true,
    },
    {
      headerName: "Name",
      field: "name",
      // cellStyle: { textAlign: "center" },
      resizable: true,
    },
    { headerName: "Type", field: "type", resizable: true },
    { headerName: "Creation Date", field: "creationDate", resizable: true },
    {
      headerName: "Favorites",
      resizable: true,
      cellRenderer: frameworkComponents.favoritesButton,
    },
    {
      headerName: "Actions",
      resizable: true,
      cellRenderer: frameworkComponents.deleteButton,
    },
  ];

  const onFirstDataRendered = (params: FirstDataRenderedEvent) => {
    params.api.sizeColumnsToFit();
  };

  return (
    <div
      className="ag-theme-material"
      style={useMemo(() => ({ height: "100%", width: "100%" }), [])}
    >
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={{ editable: true, sortable: true, filter: true }}
        domLayout="print"
        animateRows={true}
        rowSelection="multiple"
        // onFirstDataRendered={onFirstDataRendered}
        // frameworkComponents={frameworkComponents}
      />
    </div>
  );
};

export default Notes;
