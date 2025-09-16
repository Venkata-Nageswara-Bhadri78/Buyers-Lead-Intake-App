// FileImportExport.js
import React, { useRef, useState } from "react";
import CSVtoJSON from "../lib/CSVtoJSON";

import DisplayFileData from './DisplayFileData';

const FileImportExport = () => {
  const fileInputRef = useRef(null);

  const [fileContent, setFileContent] = useState("");
  const [fileJsonData, setJsonData] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      setFileContent(text);

      // ✅ Call CSVtoJSON *after* we have the text
      const json = CSVtoJSON(text);
      setJsonData(json);
      // console.log("Parsed JSON:", json);
    };
    reader.readAsText(file);
  };
  // console.log(fileJsonData);
  const [errorCount, setErrorCount] = useState(0);
  const handleSubmit = () => {
    const fetchData = async () => {
      try{
        const response = await fetch("http://localhost:4000/file-data-upload", {
          method: 'POST',
          headers: {'Content-Type' : 'application/json'},
          body: JSON.stringify(fileJsonData)
        })
        const data = await response.json();
        if(data.success){
          alert(data.message)
        }
        if (fileInputRef.current) fileInputRef.current.value = null;
        setFileContent("")
        setJsonData([]);
        setErrorCount(0);
      }
      catch(err){

      }
    }
    fetchData();
  }
  return (
    <div>
      <div className="p-4 flex gap-3 items-center justify-between bg-gray-600">
        <div>
          {errorCount===0 && <button onClick={handleSubmit} className="p-2 rounded-md bg-white">Add to DataBase</button>}
        </div>
        <label className="px-5 py-2 bg-blue-500 text-white rounded-md cursor-pointer">
          Upload File
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept=".csv,text/csv"
            onChange={handleFileUpload}
          />
        </label>
      </div>
      <div>
        <DisplayFileData setErrorCount={setErrorCount} data={fileJsonData}/>
      </div>
    </div>
  );
};

export default FileImportExport;
