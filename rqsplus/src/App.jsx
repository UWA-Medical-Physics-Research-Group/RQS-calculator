import React, { useState, useEffect } from "react";
// import { saveAs } from "file-saver";
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
  const [isCleared, setIsCleared] = useState(false);
  const [showClearButton, setShowClearButton] = useState(true);

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
    setShowClearButton(false); // Hide the "Clear All" button
    setIsCleared(true); // Set isCleared to true when rows are cleared
  };

  const handleUndoClear = () => {
    const restoredRows = JSON.parse(localStorage.getItem("deletedRows"));
    localStorage.removeItem("deletedRows");
    setDeletedRows([]);
    setRows(restoredRows || []);
    setShowClearButton(true); // Show the "Clear All" button again
    setIsCleared(false); // Set isCleared back to false when rows are restored
  };

  const handleAddRow = () => {
    setIsCleared(false); // Reset isCleared when a new row is added
    setShowClearButton(true); // Show the "Clear All" button when a new row is added
    setModalOpen(true);
  };

  const handleExportCSV = async () => {
    let csvContent = "";

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

    const blob = new Blob([csvContent], { type: "text/csv" });

    // Generate default file name with current local date and time
    const now = new Date();
    const defaultFileName = `RQSplus-${now
      .toLocaleString("default", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })
      .replace(/[,/: ]/g, "-")}.csv`;

    try {
      // Prompt user to choose save location
      const fileHandle = await window.showSaveFilePicker({
        types: [
          {
            description: "CSV files",
            accept: {
              "text/csv": [".csv"],
            },
          },
        ],
        suggestedName: defaultFileName,
      });

      // Create a writable stream to the chosen file
      const writableStream = await fileHandle.createWritable();

      // Write the blob to the file
      await writableStream.write(blob);

      // Close the file and display success message
      await writableStream.close();
    } catch (error) {
      // Handle the error when user cancels the file selection
      if (error.name === "AbortError") {
        console.log("User aborted the file selection.");
      } else {
        console.error("Error exporting CSV:", error);
      }
    }
  };

  useEffect(() => {
    localStorage.setItem("rows", JSON.stringify(rows));
  }, [rows]);

  // Effect to monitor changes in the rows state
  useEffect(() => {
    // If there are rows, show the "Clear All" button
    setShowClearButton(rows.length > 0);
  }, [rows]);

  return (
    <div className="App">
      <Table rows={rows} deleteRow={handleDeleteRow} editRow={handleEditRow} />
      <button className="btn" onClick={handleAddRow}>
        Add
      </button>

      {showClearButton && (
        <button className="btn" onClick={handleClearAll}>
          {isCleared ? "Undo Clear" : "Clear All"}
        </button>
      )}
      {isCleared && deletedRows.length > 0 && (
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
