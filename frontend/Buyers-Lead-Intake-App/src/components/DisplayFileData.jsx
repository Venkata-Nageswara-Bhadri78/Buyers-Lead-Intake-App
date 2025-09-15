// DisplayFileData.js
import React from "react";

const DisplayFileData = ({ jsonData }) => {
  if (!jsonData || jsonData.length === 0) {
    return <div>No valid data to display</div>;
  }

  const headers = Object.keys(jsonData[0]);

  return (
    <div className="overflow-x-auto">
      <table className="table-auto border-collapse border border-gray-300 w-full">
        <thead>
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="border border-gray-300 px-4 py-2 bg-gray-200"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {jsonData.map((row, index) => (
            <tr key={index} className="hover:bg-gray-100">
              {headers.map((header) => (
                <td key={header} className="border border-gray-300 px-4 py-2">
                  {row[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayFileData;
