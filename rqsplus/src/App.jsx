import { useState } from "react";

import { Modal } from "./components/Modal";
import { Table } from "./components/Table";
import "./App.css";

function App() {
  const [modalOpen, setModalOpen] = useState(false);

  const [rows, setRows] = useState([]);
  const [rowToEdit, setRowToEdit] = useState(null);

  const handleDeleteRow = (targetIndex) => {
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

    newRow.discrimination.forEach((discrimination) => {
      if (
        discrimination ===
        "a discrimination statistic and its statistical significance are reported (+1)"
      ) {
        totalScore += 1;
      } else if (
        discrimination === "a resampling method technique is also applied  (+1)"
      ) {
        totalScore += 1;
      }
    });

    newRow.calibration.forEach((calibration) => {
      if (
        calibration ===
        "a calibration statistic and its statistical significance are reported (+1)"
      ) {
        totalScore += 1;
      } else if (
        calibration === "a resampling method technique is applied (+1)"
      ) {
        totalScore += 1;
      }
    });

    if (newRow.prospective === "Yes (+7)") {
      totalScore += 7;
    }

    if (newRow.validation === "No validation (-5)") {
      totalScore -= 5;
    } else if (
      newRow.validation ===
      "Validation is based on a dataset from the same institute (+2)"
    ) {
      totalScore += 2;
    } else if (
      newRow.validation ===
      "Validation is based on a dataset from another institute (+3)"
    ) {
      totalScore += 3;
    } else if (
      newRow.validation ===
        "Validation is based on two datasets from two distinct institutes (+4)" ||
      newRow.validation ===
        "The study validates a previously published signature (+4)"
    ) {
      totalScore += 4;
    } else if (
      newRow.validation ===
      "Validation is based on three or more datasets from distinct institutes (+5)"
    ) {
      totalScore += 5;
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

    newRow.totalScore = totalScore;

    rowToEdit === null
      ? setRows([...rows, newRow])
      : setRows(
          rows.map((currRow, idx) => {
            if (idx !== rowToEdit) return currRow;

            return newRow;
          })
        );
  };

  return (
    <div className="App">
      <Table rows={rows} deleteRow={handleDeleteRow} editRow={handleEditRow} />
      <button className="btn" onClick={() => setModalOpen(true)}>
        Add
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
