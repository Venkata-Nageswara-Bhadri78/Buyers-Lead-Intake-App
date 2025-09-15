// FileImportExport.js
import React, { useState } from "react";
import DisplayFileData from "./DisplayFileData";

const FileImportExport = () => {
  const [jsonData, setJsonData] = useState([]);
  const [errors, setErrors] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const rows = text.split("\n").map((r) => r.trim()).filter((r) => r);

      if (rows.length === 0) return;

      // First row is header
      const headers = rows[0].split(",").map((h) => h.trim());

      const validRows = [];
      const errorRows = [];

      rows.slice(1).forEach((row, index) => {
        const values = row.split(",");
        const rowObj = {};
        headers.forEach((h, i) => (rowObj[h] = values[i] ? values[i].trim() : ""));

        // Basic validation examples
        const rowErrors = [];
        if (!rowObj.fullName || rowObj.fullName.length < 2) {
          rowErrors.push("Full Name must be at least 2 characters");
        }
        if (!rowObj.phone || !/^\d{10,15}$/.test(rowObj.phone)) {
          rowErrors.push("Phone must be numeric 10-15 digits");
        }
        if (rowObj.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(rowObj.email)) {
          rowErrors.push("Invalid email format");
        }
        if (rowObj.budgetMax && rowObj.budgetMin && Number(rowObj.budgetMax) < Number(rowObj.budgetMin)) {
          rowErrors.push("Max budget must be greater than min budget");
        }
        if ((rowObj.propertyType === "Apartment" || rowObj.propertyType === "Villa") && !rowObj.bhk) {
          rowErrors.push("BHK is required for Apartment/Villa");
        }

        if (rowErrors.length > 0) {
          errorRows.push({ row: index + 2, errors: rowErrors }); // +2 for header + 0-index
        } else {
          validRows.push(rowObj);
        }
      });

      setJsonData(validRows);
      setErrors(errorRows);
    };

    reader.readAsText(file);
  };

  // Function to send valid data to backend
  const handleSendToDatabase = async () => {
    if (jsonData.length === 0) return;

    try {
      const response = await fetch("http://localhost:4000/import-csv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: jsonData }),
      });

      const result = await response.json();
      if (result.success) {
        alert("Data successfully inserted!");
        setJsonData([]); // clear table after success
      } else {
        alert("Error inserting data: " + result.message);
      }
    } catch (err) {
      console.error(err);
      alert("Network or server error");
    }
  };

  return (
    <div className="p-4">
      <div className="flex flex-row justify-between items-center bg-gray-200 p-4 rounded-md mb-4">
        <div>Please choose a CSV file to import and process the data</div>
        <label className="px-5 py-2 bg-blue-500 text-white rounded-md cursor-pointer">
          Upload CSV
          <input
            className="hidden"
            type="file"
            accept=".csv,text/csv"
            onChange={handleFileUpload}
          />
        </label>
      </div>

      {/* Display Errors if any */}
      {errors.length > 0 && (
        <div className="mb-4">
          <h2 className="font-bold mb-2">Errors:</h2>
          <table className="table-auto border-collapse border border-gray-300 w-full">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2 bg-red-200">Row</th>
                <th className="border border-gray-300 px-4 py-2 bg-red-200">Errors</th>
              </tr>
            </thead>
            <tbody>
              {errors.map((err, i) => (
                <tr key={i}>
                  <td className="border border-gray-300 px-4 py-2">{err.row}</td>
                  <td className="border border-gray-300 px-4 py-2">{err.errors.join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Display valid data and Send button if no errors */}
      {errors.length === 0 && jsonData.length > 0 && (
        <div>
          <button
            className="mb-2 px-4 py-2 bg-green-600 text-white rounded-md"
            onClick={handleSendToDatabase}
          >
            Send to Database
          </button>
          <DisplayFileData jsonData={jsonData} />
        </div>
      )}
    </div>
  );
};

export default FileImportExport;
