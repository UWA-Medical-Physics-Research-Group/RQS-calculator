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
      if (protocol === "Protocols well documented (+1)") {
        totalScore += 1;
      } else if (protocol === "Public protocol used  (+1)") {
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

    if (newRow.featureReduction === "Yes, either method implemented (+3)") {
      totalScore += 3;
    } else if (
      newRow.featureReduction === "No, neither method implemented (-3)"
    ) {
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

    if (newRow.discrimination.includes("None (0)")) {
      totalScore += 0;
    } else {
      totalScore += newRow.discrimination.length;
    }

    if (newRow.calibration.includes("None (0)")) {
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

    if (newRow.open.length > 0 && !newRow.open.includes("None (0)")) {
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

    // Define the specific headers
    const headers = [
      "Paper name",
      "Year",
      "Image protocol quality",
      "Multiple segmentations",
      "Phantom study",
      "Imaging at multiple time points",
      "Feature reduction or adjustment for multiple testing",
      "Multivariable analysis",
      "Biological correlates",
      "Cut-off analysis",
      "Discrimination statistics",
      "Calibration statistics",
      "Prospective study",
      "Validation",
      "Comparison to 'gold standard'",
      "Potential clinical applications",
      "Cost-effectiveness analysis",
      "Open science and data",
      "Total score",
      "Percentage",
    ].join(",");

    csvContent += headers + "\r\n";

    rows.forEach((row) => {
      let rowValues = [];

      for (const key in row) {
        let value = row[key];

        if (key === "name") {
          // For the "name" column, save the actual name as a string
          rowValues.push(value.toString());
        } else if (key === "year") {
          rowValues.push(value.toString());
        } else if (Array.isArray(value)) {
          // Extract numbers from each array item and sum them
          let sum = value.reduce((acc, item) => {
            if (typeof item === "string") {
              const matches = item.match(/(-?\d+)/g);
              return matches
                ? acc + matches.reduce((sum, num) => sum + parseInt(num), 0)
                : acc;
            }
            return acc;
          }, 0);

          rowValues.push(sum.toString());
        } else if (typeof value === "string") {
          // Extract number from the string
          const match = value.match(/(-?\d+)/);
          rowValues.push(match ? match[1] : "0");
        } else {
          rowValues.push(value.toString());
        }
      }

      // Calculate percentage for "Total score"
      const totalScore = parseInt(rowValues[18] || 0);
      let percentage = ((totalScore / 36) * 100).toFixed(2); // Calculate percentage and round to 2 decimal places
      if (percentage < 0) {
        percentage = 0;
      }

      rowValues.push(percentage.toString());

      csvContent += rowValues.join(",") + "\r\n";
    });

    //   const blob = new Blob([csvContent], { type: "text/csv" });

    //   // Generate default file name with current local date and time
    //   const now = new Date();
    //   const defaultFileName = `RQS-${now
    //     .toLocaleString("default", {
    //       year: "numeric",
    //       month: "2-digit",
    //       day: "2-digit",
    //       hour: "2-digit",
    //       minute: "2-digit",
    //     })
    //     .replace(/[,/: ]/g, "-")}.csv`;

    //   try {
    //     // Prompt user to choose save location
    //     const fileHandle = await window.showSaveFilePicker({
    //       types: [
    //         {
    //           description: "CSV files",
    //           accept: {
    //             "text/csv": [".csv"],
    //           },
    //         },
    //       ],
    //       suggestedName: defaultFileName,
    //     });

    //     // Create a writable stream to the chosen file
    //     const writableStream = await fileHandle.createWritable();

    //     // Write the blob to the file
    //     await writableStream.write(blob);

    //     // Close the file and display success message
    //     await writableStream.close();
    //   } catch (error) {
    //     // Handle the error when user cancels the file selection
    //     if (error.name === "AbortError") {
    //       console.log("User aborted the file selection.");
    //     } else {
    //       console.error("Error exporting CSV:", error);
    //     }
    //   }
    // };

    const csvBlob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    const now = new Date();
    const defaultFileName = `RQS-${now
      .toLocaleString("default", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })
      .replace(/[,/: ]/g, "-")}.csv`;

    const link = document.createElement("a");
    const url = URL.createObjectURL(csvBlob);

    link.setAttribute("href", url);
    link.setAttribute("download", defaultFileName);
    link.style.visibility = "hidden";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
      <header className="header">
        <div className="title">RQS Calculator</div>
        <div className="description">
          A tool designed to calculate the radiomics quality score for radiomics
          papers.
        </div>
      </header>
      {/* Table Section */}
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

      <div class="table-container">
        <div className="description">
          For more information about the criteria, please refer to the table
          below. From:{" "}
          <a href="https://doi.org/10.1038/nrclinonc.2017.141">
            {" "}
            Radiomics: the bridge between medical imaging and personalized
            medicine
          </a>
        </div>
        <table class="data-table">
          <thead class="table-header">
            <tr>
              <th class="text-center " colspan="2">
                <p>Criteria</p>
              </th>
              <th class="text-center">
                <p>Points</p>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="text-left">
                <p>1</p>
              </td>
              <td class="text-left">
                <p>
                  Image protocol quality - well-documented image protocols (for
                  example, contrast, slice thickness, energy, etc.) and/or usage
                  of public image protocols allow reproducibility/replicability
                </p>
              </td>
              <td class="text-left">
                <p>
                  + 1 (if protocols are well-documented) + 1 (if public protocol
                  is used)
                </p>
              </td>
            </tr>
            <tr>
              <td class="text-left">
                <p>2</p>
              </td>
              <td class="text-left">
                <p>
                  Multiple segmentations - possible actions are: segmentation by
                  different physicians/algorithms/software, perturbing
                  segmentations by (random) noise, segmentation at different
                  breathing cycles. Analyse feature robustness to segmentation
                  variabilities
                </p>
              </td>
              <td class="text-left">
                <p>+ 1</p>
              </td>
            </tr>
            <tr>
              <td class="text-left">
                <p>3</p>
              </td>
              <td class="text-left">
                <p>
                  Phantom study on all scanners - detect inter-scanner
                  differences and vendor-dependent features. Analyse feature
                  robustness to these sources of variability
                </p>
              </td>
              <td class="text-left">
                <p>+ 1</p>
              </td>
            </tr>
            <tr>
              <td class="text-left">
                <p>4</p>
              </td>
              <td class="text-left">
                <p>
                  Imaging at multiple time points - collect images of
                  individuals at additional time points. Analyse feature
                  robustness to temporal variabilities (for example, organ
                  movement, organ expansion/shrinkage)
                </p>
              </td>
              <td class="text-left">
                <p>+ 1</p>
              </td>
            </tr>
            <tr>
              <td class="text-left">
                <p>5</p>
              </td>
              <td class="text-left">
                <p>
                  Feature reduction or adjustment for multiple testing -
                  decreases the risk of overfitting. Overfitting is inevitable
                  if the number of features exceeds the number of samples.
                  Consider feature robustness when selecting features
                </p>
              </td>
              <td class="text-left">
                <p>
                  − 3 (if neither measure is implemented) + 3 (if either measure
                  is implemented)
                </p>
              </td>
            </tr>
            <tr>
              <td class="text-left">
                <p>6</p>
              </td>
              <td class="text-left">
                <p>
                  Multivariable analysis with non radiomics features (for
                  example, EGFR mutation) - is expected to provide a more
                  holistic model. Permits correlating/inferencing between
                  radiomics and non radiomics features
                </p>
              </td>
              <td class="text-left">
                <p>+ 1</p>
              </td>
            </tr>
            <tr>
              <td class="text-left">
                <p>7</p>
              </td>
              <td class="text-left">
                <p>
                  Detect and discuss biological correlates - demonstration of
                  phenotypic differences (possibly associated with underlying
                  gene–protein expression patterns) deepens understanding of
                  radiomics and biology
                </p>
              </td>
              <td class="text-left">
                <p>+ 1</p>
              </td>
            </tr>
            <tr>
              <td class="text-left">
                <p>8</p>
              </td>
              <td class="text-left">
                <p>
                  Cut-off analyses - determine risk groups by either the median,
                  a previously published cut-off or report a continuous risk
                  variable. Reduces the risk of reporting overly optimistic
                  results
                </p>
              </td>
              <td class="text-left">
                <p>+ 1</p>
              </td>
            </tr>
            <tr>
              <td class="text-left">
                <p>9</p>
              </td>
              <td class="text-left">
                <p>
                  Discrimination statistics - report discrimination statistics
                  (for example, C-statistic, ROC curve, AUC) and their
                  statistical significance (for example, p-values, confidence
                  intervals). One can also apply resampling method (for example,
                  bootstrapping, cross-validation)
                </p>
              </td>
              <td class="text-left">
                <p>
                  + 1 (if a discrimination statistic and its statistical
                  significance are reported) + 1 (if a resampling method
                  technique is also applied)
                </p>
              </td>
            </tr>
            <tr>
              <td class="text-left">
                <p>10</p>
              </td>
              <td class="text-left">
                <p>
                  Calibration statistics - report calibration statistics (for
                  example, Calibration-in-the-large/slope, calibration plots)
                  and their statistical significance (for example, <i>P</i>
                  -values, confidence intervals). One can also apply resampling
                  method (for example, bootstrapping, cross-validation)
                </p>
              </td>
              <td class="text-left">
                <p>
                  + 1 (if a calibration statistic and its statistical
                  significance are reported) + 1 (if a resampling method
                  technique is also applied)
                </p>
              </td>
            </tr>
            <tr>
              <td class="text-left">
                <p>11</p>
              </td>
              <td class="text-left">
                <p>
                  Prospective study registered in a trial database - provides
                  the highest level of evidence supporting the clinical validity
                  and usefulness of the radiomics biomarker
                </p>
              </td>
              <td class="text-left">
                <p>
                  + 7 (for prospective validation of a radiomics signature in an
                  appropriate trial)
                </p>
              </td>
            </tr>
            <tr>
              <td class="text-left">
                <p>12</p>
              </td>
              <td class="text-left">
                <p>
                  Validation - the validation is performed without retraining
                  and without adaptation of the cut-off value, provides crucial
                  information with regard to credible clinical performance
                </p>
              </td>
              <td class="text-left">
                <p>
                  - 5 (if validation is missing) + 2 (if validation is based on
                  a dataset from the same institute) + 3 (if validation is based
                  on a dataset from another institute) + 4 (if validation is
                  based on two datasets from two distinct institutes) + 4 (if
                  the study validates a previously published signature) + 5 (if
                  validation is based on three or more datasets from distinct
                  institutes)
                </p>
                <p>
                  *Datasets should be of comparable size and should have at
                  least 10 events per model feature
                </p>
              </td>
            </tr>
            <tr>
              <td class="text-left">
                <p>13</p>
              </td>
              <td class="text-left">
                <p>
                  Comparison to 'gold standard' - assess the extent to which the
                  model agrees with/is superior to the current 'gold standard'
                  method (for example, TNM-staging for survival prediction).
                  This comparison shows the added value of radiomics
                </p>
              </td>
              <td class="text-left">
                <p>+ 2</p>
              </td>
            </tr>
            <tr>
              <td class="text-left">
                <p>14</p>
              </td>
              <td class="text-left">
                <p>
                  Potential clinical utility - report on the current and
                  potential application of the model in a clinical setting (for
                  example, decision curve analysis).
                </p>
              </td>
              <td class="text-left">
                <p>+ 2</p>
              </td>
            </tr>
            <tr>
              <td class="text-left">
                <p>15</p>
              </td>
              <td class="text-left">
                <p>
                  Cost-effectiveness analysis - report on the cost-effectiveness
                  of the clinical application (for example, QALYs generated)
                </p>
              </td>
              <td class="text-left">
                <p>+ 1</p>
              </td>
            </tr>
            <tr>
              <td class="text-left">
                <p>16</p>
              </td>
              <td class="text-left">
                <p>
                  Open science and data - make code and data publicly available.
                  Open science facilitates knowledge transfer and
                  reproducibility of the study
                </p>
              </td>
              <td class="text-left">
                <p>
                  + 1 (if scans are open source) + 1 (if region of interest
                  segmentations are open source) + 1 (if code is open source) +
                  1 (if radiomics features are calculated on a set of
                  representative ROIs and the calculated features and
                  representative ROIs are open source)
                </p>
              </td>
            </tr>
            <tr>
              <td class="text-left">&nbsp;</td>
              <td class="text-center " colspan="2">
                <p>Total points (36 = 100%)</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-content">
          <p>
            Tool conceptualised by Nathaniel Barry and created by Kaylee Molin.
          </p>
          <p>
            If you have used this tool, please cite:
            <br />
            <br />
            *Nathaniel's paper will be here*
            <br />
            <br />
            <p>Original paper:</p>
            <a href="https://www.nature.com/articles/nrclinonc.2017.141">
              Radiomics: the bridge between medical imaging and personalized
              medicine
            </a>
            <br />
            Published: 04 October 2017
            <br />
            {/* Radiomics: the bridge between medical imaging and personalized
            medicine */}
          </p>
        </div>
        <br />
        <div className="contact-info">
          <p>
            For inquiries or further information, please contact us at:
            <br />
            Nathaniel Barry{" "}
            <a href="mailto:nathaniel.barry@research.uwa.edu.au">
              nathaniel.barry@research.uwa.edu.au
            </a>
            <br />
            Kaylee Molin{" "}
            <a href="mailto:22734429@student.uwa.edu.au">
              22734429@student.uwa.edu.au
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
