import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "./components/Modal";
import { Table } from "./components/Table";
import {
  RQS_VERSIONS,
  createInitialRow,
  getVisibleCriteria,
  migrateStoredRows,
} from "./rqsConfig";
import "./App.css";

function App() {
  const [activeVersion, setActiveVersion] = useState("rqs1");
  const [modalOpen, setModalOpen] = useState(false);
  const [rowToEdit, setRowToEdit] = useState(null);
  const [rows, setRows] = useState(() => {
    const savedRows = localStorage.getItem("rows");
    return savedRows ? migrateStoredRows(JSON.parse(savedRows)) : [];
  });
  const [lastClearedRows, setLastClearedRows] = useState([]);
  const [clearedVersion, setClearedVersion] = useState(null);

  const versionConfig = RQS_VERSIONS[activeVersion];

  const visibleRows = useMemo(
    () =>
      rows
        .map((row, sourceIndex) => ({ ...row, sourceIndex }))
        .filter((row) => row.version === activeVersion),
    [rows, activeVersion]
  );

  const averageScore =
    visibleRows.length > 0
      ? (
          visibleRows.reduce((sum, row) => sum + (row.totalScore || 0), 0) /
          visibleRows.length
        ).toFixed(1)
      : "0.0";

  const bestScore =
    visibleRows.length > 0
      ? Math.max(...visibleRows.map((row) => row.totalScore || 0))
      : 0;

  const showClearButton = visibleRows.length > 0;
  const canUndoClear =
    clearedVersion === activeVersion && lastClearedRows.length > 0;

  const handleDeleteRow = (sourceIndex) => {
    setRows((currentRows) => currentRows.filter((_, idx) => idx !== sourceIndex));
  };

  const handleEditRow = (sourceIndex) => {
    setRowToEdit(sourceIndex);
    setModalOpen(true);
  };

  const handleSubmit = (newRow) => {
    const updatedRows =
      rowToEdit !== null
        ? rows.map((currentRow, index) => (index === rowToEdit ? newRow : currentRow))
        : [...rows, newRow];

    setRows(updatedRows);
  };

  const handleAddRow = () => {
    setRowToEdit(null);
    setModalOpen(true);
  };

  const handleClearAll = () => {
    const shouldClear = window.confirm(
      `Are you sure you want to clear all papers scored with ${versionConfig.shortLabel}?`
    );

    if (!shouldClear) {
      return;
    }

    setLastClearedRows(visibleRows.map(({ sourceIndex, ...row }) => row));
    setClearedVersion(activeVersion);
    setRows((currentRows) => currentRows.filter((row) => row.version !== activeVersion));
  };

  const handleUndoClear = () => {
    if (!canUndoClear) {
      return;
    }

    setRows((currentRows) => [...currentRows, ...lastClearedRows]);
    setLastClearedRows([]);
    setClearedVersion(null);
  };

  const handleExportCSV = () => {
    const highestRrl =
      activeVersion === "rqs2"
        ? Math.max(1, ...visibleRows.map((row) => Number(row.maxRrl || 1)))
        : null;
    const criteria = getVisibleCriteria(activeVersion, highestRrl);
    const headers = [
      "First author",
      "Year",
      ...(activeVersion === "rqs2" ? ["Method", "Maximum RRL"] : []),
      ...criteria.map((criterion) => criterion.label),
      "Total score",
      "Max score",
      "Percentage",
    ];

    const csvRows = visibleRows.map((row) => {
      const percentage =
        row.maxScore > 0 ? ((row.totalScore / row.maxScore) * 100).toFixed(2) : "0.00";

      return [
        row.name,
        row.year,
        ...(activeVersion === "rqs2" ? [row.method, `RRL ${row.maxRrl}`] : []),
        ...criteria.map((criterion) => {
          const isVisibleForRow =
            activeVersion !== "rqs2" || criterion.stage <= Number(row.maxRrl);
          if (!isVisibleForRow) {
            return "";
          }

          const answer = row.answers?.[criterion.id];
          return Array.isArray(answer) ? answer.join(" | ") : answer;
        }),
        row.totalScore,
        row.maxScore,
        percentage,
      ]
        .map((value) => `"${String(value ?? "").replace(/"/g, '""')}"`)
        .join(",");
    });

    const csvContent = [headers.join(","), ...csvRows].join("\r\n");
    const csvBlob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const now = new Date();
    const defaultFileName = `${versionConfig.shortLabel
      .replace(/\s+/g, "-")
      .toLowerCase()}-${now
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

  const currentRow = rowToEdit !== null ? rows[rowToEdit] : null;
  const referenceCriteria = getVisibleCriteria(activeVersion, 9);

  return (
    <div className="App">
      <header className="hero">
        <div className="hero-copy">
          <p className="eyebrow">{versionConfig.heroLabel}</p>
          <h1 className="title">{versionConfig.title}</h1>
          <p className="description">{versionConfig.description}</p>

          <div className="version-switcher" role="tablist" aria-label="RQS version">
            {Object.values(RQS_VERSIONS).map((version) => (
              <button
                key={version.key}
                className={`version-tab ${
                  activeVersion === version.key ? "version-tab-active" : ""
                }`}
                onClick={() => setActiveVersion(version.key)}
                type="button">
                {version.shortLabel}
              </button>
            ))}
          </div>

          <div className="button-container">
            <button className="btn btn-primary" onClick={handleAddRow}>
              Add Paper
            </button>
            <button className="btn btn-secondary" onClick={handleExportCSV}>
              Export as CSV
            </button>
            {showClearButton && (
              <button className="btn btn-ghost" onClick={handleClearAll}>
                Clear All
              </button>
            )}
            {canUndoClear && (
              <button className="btn btn-secondary" onClick={handleUndoClear}>
                Undo Clear
              </button>
            )}
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-label">Saved papers</span>
            <strong>{visibleRows.length}</strong>
          </div>
          <div className="stat-card">
            <span className="stat-label">Average score</span>
            <strong>{averageScore}</strong>
          </div>
          <div className="stat-card">
            <span className="stat-label">Best score</span>
            <strong>{bestScore}</strong>
          </div>
        </div>
      </header>

      <section className="panel main-panel">
        <div className="panel-header">
          <div>
            <h2>Paper Comparison</h2>
            <p>
              Scroll horizontally to compare papers scored with{" "}
              {versionConfig.shortLabel}.
            </p>
          </div>
        </div>
        <Table
          rows={visibleRows}
          versionConfig={versionConfig}
          deleteRow={handleDeleteRow}
          editRow={handleEditRow}
        />
      </section>

      {modalOpen && (
        <Modal
          closeModal={() => {
            setModalOpen(false);
            setRowToEdit(null);
          }}
          onSubmit={handleSubmit}
          defaultValue={currentRow || createInitialRow(activeVersion)}
          version={activeVersion}
        />
      )}

      <section className="panel table-container">
        <div className="panel-header panel-header-spaced">
          <div>
            <h2>Criteria Reference</h2>
            <p>
              Based on{" "}
              <a href={versionConfig.sourceUrl}>{versionConfig.sourceLabel}</a>.
            </p>
            {activeVersion === "rqs2" && (
              <p className="reference-note">
                For RQS 2.0, select the maximum RRL in the form first. The app
                then includes all questions up to that stage for the chosen
                paper.
              </p>
            )}
          </div>
        </div>
        <table className="data-table">
          <colgroup>
            <col className="criteria-number-column" />
            <col className="criteria-text-column" />
            <col className="criteria-points-column" />
          </colgroup>
          <thead className="table-header">
            <tr>
              <th className="text-center" colSpan="2">
                <p>Criteria</p>
              </th>
              <th className="text-center">
                <p>Points</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {referenceCriteria.map((criterion, index) => {
              const previous = referenceCriteria[index - 1];
              const showStageRow =
                activeVersion === "rqs2" &&
                criterion.stageTitle &&
                criterion.stageTitle !== previous?.stageTitle;

              return (
                <React.Fragment key={criterion.id}>
                  {showStageRow && (
                    <tr className="criteria-stage-row">
                      <td colSpan="3">{criterion.stageTitle}</td>
                    </tr>
                  )}
                  <tr>
                    <td className="text-left">
                      <p>{criterion.number}</p>
                    </td>
                    <td className="text-left">
                      <p>
                        <strong>{criterion.label}</strong> - {criterion.description}
                      </p>
                    </td>
                    <td className="text-left">
                      <p>{criterion.pointsText}</p>
                    </td>
                  </tr>
                </React.Fragment>
              );
            })}
            <tr>
              <td className="text-left">&nbsp;</td>
              <td className="text-center" colSpan="2">
                <p>
                  Total points (
                  {activeVersion === "rqs1" ? "36 = 100%" : "dynamic by selected RRL"}
                  )
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <footer className="footer">
        <div className="footer-logo-wrap">
          <img
            className="footer-brand-logo"
            src={`${process.env.PUBLIC_URL}/med-phys-logo.avif`}
            alt="UWA Medical Physics logo"
          />
        </div>
        <div className="footer-content">
          <p>
            Tool conceptualised by Nathaniel Barry and created by Kaylee Molin.
          </p>
          <br />
          <p>
            If you have used this tool, please cite the following publication:
            <br />
            <strong>Barry N, Kendrick J, Molin K, et al.</strong>{" "}
            <em>
              Evaluating the impact of the Radiomics Quality Score: a systematic
              review and meta-analysis.
            </em>
            <br />
            <em>European Radiology.</em> 2025.{" "}
            <a href="https://doi.org/10.1007/s00330-024-11341-y">
              https://doi.org/10.1007/s00330-024-11341-y
            </a>
          </p>
          <br />
          <p>
            Original foundational paper:
            <br />
            <strong>Lambin P, Rios-Velazquez E, Leijenaar R, et al.</strong>{" "}
            <em>
              Radiomics: the bridge between medical imaging and personalized
              medicine.
            </em>
            <br />
            <em>Nature Reviews Clinical Oncology.</em> 2017. <br />
            <a href="https://doi.org/10.1038/nrclinonc.2017.141">
              https://doi.org/10.1038/nrclinonc.2017.141
            </a>
          </p>
        </div>
        <br />
        <div className="contact-info">
          <p>
            For inquiries or further information, please contact us at:
            <br />
            <strong>Nathaniel Barry:</strong>{" "}
            <a href="mailto:nathaniel.barry@health.wa.gov.au">
              nathaniel.barry@health.wa.gov.au
            </a>
            <br />
            <strong>Kaylee Molin:</strong>{" "}
            <a href="mailto:kaylee.molin@research.uwa.edu.au">
              kaylee.molin@research.uwa.edu.au
            </a>
            {" | "}
            <a href="https://www.linkedin.com/in/kaylee-molin/">LinkedIn</a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
