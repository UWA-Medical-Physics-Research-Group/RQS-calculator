import React, { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import { Modal } from "./components/Modal";
import { Table } from "./components/Table";
import "./App.css";

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState(() => {
    const savedRows = localStorage.getItem("rows");
    return savedRows ? JSON.parse(savedRows) : [];
  });
  const [rowToEdit, setRowToEdit] = useState(null);
  const [deletedRows, setDeletedRows] = useState([]);

  const handleDeleteRow = (targetIndex) => {
    const deletedRow = rows[targetIndex];
    setDeletedRows([...deletedRows, deletedRow]);
    setRows(rows.filter((_, idx) => idx !== targetIndex));
  };

  const handleEditRow = (idx) => {
    setRowToEdit(idx);
    setModalOpen(true);
  };

  const handleSubmit = (newRow) => {
    let totalScore = 0;

    newRow.imageProtocolQuality.forEach((protocol) => {
      if (protocol === "protocols well documented (+1)") {
        totalScore += 1;
      } else if (protocol === "public protocol used  (+1)") {
        totalScore += 1;
      }
    });

    if (newRow.multipleSegmentations === "Yes (+1)") {
      totalScore += 1;
    }

    if (newRow.phantomStudy === "Yes (+1)") {
      totalScore += 1;
    }

    if (newRow.multipleTimePoints === "Yes (+1)") {
      totalScore += 1;
    }

    if (newRow.featureReduction === "Yes, either method (+3)") {
      totalScore += 3;
    } else if (newRow.featureReduction === "No, neither method (-3)") {
      totalScore -= 3;
    }

    if (newRow.multivariable === "Yes (+1)") {
      totalScore += 1;
    }

    if (newRow.biological === "Yes (+1)") {
      totalScore += 1;
    }

    if (newRow.cutOff === "Yes (+1)") {
      totalScore += 1;
    }

    if (newRow.discrimination.includes("none (0)")) {
      totalScore += 0;
    } else {
      totalScore += newRow.discrimination.length;
    }

    if (newRow.calibration.includes("none (0)")) {
      totalScore += 0;
    } else {
      totalScore += newRow.calibration.length;
    }

    if (newRow.prospective === "Yes (+7)") {
      totalScore += 7;
    }

    switch (newRow.validation) {
      case "No validation (-5)":
        totalScore -= 5;
        break;
      case "Validation is based on a dataset from the same institute (+2)":
        totalScore += 2;
        break;
      case "Validation is based on a dataset from another institute (+3)":
        totalScore += 3;
        break;
      case "Validation is based on two datasets from two distinct institutes (+4)":
        totalScore += 4;
        break;
      case "The study validates a previously published signature (+4)":
        totalScore += 4;
        break;
      case "Validation is based on three or more datasets from distinct institutes (+5)":
        totalScore += 5;
        break;
      default:
        break;
    }

    if (newRow.gold === "Yes (+2)") {
      totalScore += 2;
    }

    if (newRow.clinicalUtility === "Yes (+2)") {
      totalScore += 2;
    }

    if (newRow.cost === "Yes (+1)") {
      totalScore += 1;
    }

    if (newRow.open.length > 0 && !newRow.open.includes("none (0)")) {
      totalScore += newRow.open.length;
    }

    newRow.totalScore = totalScore;

    const updatedRows =
      rowToEdit !== null
        ? rows.map((currRow, idx) => (idx !== rowToEdit ? currRow : newRow))
        : [...rows, newRow];

    setRows(updatedRows);
    localStorage.setItem("rows", JSON.stringify(updatedRows));
  };

  const handleClearAll = () => {
    localStorage.setItem("deletedRows", JSON.stringify(rows));
    setDeletedRows([...deletedRows, ...rows]);
    setRows([]);
  };

  const handleUndoClear = () => {
    const restoredRows = JSON.parse(localStorage.getItem("deletedRows"));
    localStorage.removeItem("deletedRows");
    setDeletedRows([]);
    setRows(restoredRows || []);
  };

  const handleExportCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";

    // Add headers
    const headers = Object.keys(rows[0]).join(",");
    csvContent += headers + "\r\n";

    rows.forEach((row) => {
      let rowValues = [];

      for (const key in row) {
        if (Array.isArray(row[key])) {
          rowValues.push(`"${row[key].join(", ")}"`);
        } else {
          rowValues.push(`"${row[key]}"`);
        }
      }

      csvContent += rowValues.join(",") + "\r\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);

    // Generate default file name
    const dateTime = new Date().toISOString().replace(/[:\-ZT]/g, "");
    const defaultFileName = `RQSplus_${dateTime}.csv`;

    // Prompt user for filename
    const userFileName = window.prompt(
      "Please enter the filename:",
      defaultFileName
    );
    if (!userFileName) return; // Exit if user cancels

    // Set download attribute with user's filename
    link.setAttribute("download", userFileName);

    // Append link to body to trigger the file save dialog
    document.body.appendChild(link);

    // Trigger download
    link.click();

    // Remove temporary link element
    document.body.removeChild(link);
  };

  useEffect(() => {
    localStorage.setItem("rows", JSON.stringify(rows));
  }, [rows]);

  return (
    <div className="App">
      <Table rows={rows} deleteRow={handleDeleteRow} editRow={handleEditRow} />
      <button className="btn" onClick={() => setModalOpen(true)}>
        Add
      </button>
      <button className="btn" onClick={handleClearAll}>
        Clear All
      </button>
      {deletedRows.length > 0 && (
        <button className="btn" onClick={handleUndoClear}>
          Undo Clear
        </button>
      )}
      <button className="btn" onClick={handleExportCSV}>
        Export as CSV
      </button>
      {modalOpen && (
        <Modal
          closeModal={() => {
            setModalOpen(false);
            setRowToEdit(null);
          }}
          onSubmit={handleSubmit}
          defaultValue={rowToEdit !== null && rows[rowToEdit]}
        />
      )}
    </div>
  );
}

export default App;
