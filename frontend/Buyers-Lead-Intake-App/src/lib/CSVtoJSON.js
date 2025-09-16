// lib/CSVtoJSON.js

export default function CSVtoJSON(csvText) {
  const rows = csvText.split("\n").map(r => r.trim()).filter(r => r);
  if (rows.length === 0) return [];

  const headers = parseCSVLine(rows[0]);

  return rows.slice(1).map(row => {
    const values = parseCSVLine(row);
    const obj = {};
    headers.forEach((h, i) => {
      obj[h] = values[i] ? values[i].trim().replace(/^"|"$/g, "") : "";
    });
    return obj;
  });
}

// Helper: parse a single CSV line (handles quoted commas)
function parseCSVLine(line) {
  const result = [];
  let current = "";
  let insideQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      // Toggle inside quotes (and handle double quotes as escape)
      if (insideQuotes && line[i + 1] === '"') {
        current += '"';
        i++; // skip the escaped quote
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === "," && !insideQuotes) {
      result.push(current);
      current = "";
    } else {
      current += char;
    }
  }

  result.push(current);
  return result;
}
