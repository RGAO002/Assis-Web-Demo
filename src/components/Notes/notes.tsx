import React, { useState, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { FirstDataRenderedEvent } from "ag-grid-community";
import { FiHeart, FiTrash } from "react-icons/fi";

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

  const deleteRow = (params: any) => {
    console.log(params);
    const idToDelete = params.node.data.name;
    setRowData((prevRowData) =>
      prevRowData.filter((row) => row.name !== idToDelete)
    );
  };
  const frameworkComponents = {
    favoritesButton: () => <FiHeart size={20} color="red" />,
    deleteButton: (params: any) => (
      <FiTrash size={20} color="red" onClick={() => deleteRow(params)} />
    ),
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
      cellStyle: { width: "auto" },
      resizable: true,
    },
    {
      headerName: "Type",
      field: "type",
      resizable: true,
      cellStyle: { width: "auto" },
    },
    {
      headerName: "Creation Date",
      field: "creationDate",
      resizable: true,
      cellStyle: { width: "auto" },
    },
    {
      headerName: "Favorites",
      resizable: true,
      cellStyle: { width: "100px" },
      cellRenderer: frameworkComponents.favoritesButton,
    },
    {
      headerName: "Actions",
      resizable: true,
      cellStyle: { width: "100px" },
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
        defaultColDef={{
          editable: true,
          sortable: true,
          filter: "agTextColumnFilter",
        }}
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
