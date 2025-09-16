import React, { useEffect } from "react";
import validateRow from "../lib/zodValidation";

const DisplayFileBody = ({ rowData, setErrorCount }) => {
  const rowStyling = "border p-2";
  const { result, errorCount } = validateRow(rowData);

  useEffect(() => {
    setErrorCount(prev => prev + errorCount);
  }, []);

  const row = Object.entries(result);

  return (
    <tr>
      {row.map(([column, { success, value, message }]) => (
        <td key={column} className={rowStyling}>
          {success ? value : <span className="text-red-400">{message}</span>}
        </td>
      ))}

      <td className={rowStyling}>{rowData.ownerId}</td>
      <td className={rowStyling}>{rowData.updatedAt}</td>
    </tr>
  );
};

export default DisplayFileBody;
