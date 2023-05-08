import { AgGridReact } from "ag-grid-react";
import { useState } from "react";

const MonthlyDividendsView = () => {
  const [showEx, setShowEx] = useState();
  const [showPay, setShowPay] = useState();

  const columnDefs: any = [{ field: "name" }];

  const rowDataAssets = [{ name: "erez" }];

  return (
    <div className="ag-theme-alpine " style={{ height: 500 }}>
      <AgGridReact
        rowData={rowDataAssets}
        columnDefs={columnDefs}
      />
    </div>
  );
};

export default MonthlyDividendsView;
