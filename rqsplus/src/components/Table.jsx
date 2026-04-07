import React from "react";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import {
  formatAnswer,
  getVisibleCriteria,
  getVisibleCriteriaForSelection,
} from "../rqsConfig";
import "./Table.css";

export const Table = ({ rows, versionConfig, deleteRow, editRow }) => {
  if (rows.length === 0) {
    return (
      <div className="empty-state">
        <h3>No papers added yet</h3>
        <p>
          Use <strong>Add Paper</strong> to score a paper with{" "}
          <strong>{versionConfig.shortLabel}</strong>. Entries are saved in this
          browser until you clear them.
        </p>
      </div>
    );
  }

  const highestRrl =
    versionConfig.key === "rqs2"
      ? Math.max(...rows.map((row) => Number(row.maxRrl || 1)))
      : null;

  const visibleCriteria = getVisibleCriteria(versionConfig.key, highestRrl);

  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>First author</th>
            <th>Year</th>
            {versionConfig.key === "rqs2" && <th>Method</th>}
            {versionConfig.key === "rqs2" && <th>Max RRL</th>}
            {visibleCriteria.map((criterion) => (
              <th className="expand" key={criterion.id}>
                {criterion.label}
              </th>
            ))}
            <th>Total score</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const percentage =
              row.maxScore > 0
                ? Math.max(0, ((row.totalScore / row.maxScore) * 100).toFixed(2))
                : "0.00";

            return (
              <tr key={row.sourceIndex}>
                <td>{row.name}</td>
                <td>{row.year}</td>
                {versionConfig.key === "rqs2" && <td>{row.method}</td>}
                {versionConfig.key === "rqs2" && <td>{`RRL ${row.maxRrl}`}</td>}
                {visibleCriteria.map((criterion) => {
                  const rowCriteria = getVisibleCriteriaForSelection(
                    versionConfig.key,
                    row.maxRrl,
                    row.method
                  );
                  const isVisibleForRow = rowCriteria.some(
                    (rowCriterion) => rowCriterion.id === criterion.id
                  );
                  const answer = isVisibleForRow
                    ? formatAnswer(criterion, row.answers?.[criterion.id])
                    : "-";

                  return (
                    <td
                      className={`expand wrap-cell ${!isVisibleForRow ? "muted-cell" : ""}`}
                      key={`${row.sourceIndex}-${criterion.id}`}>
                      {answer.split("\n").map((line, index) => (
                        <React.Fragment key={`${criterion.id}-${index}`}>
                          {line}
                          {index < answer.split("\n").length - 1 && <br />}
                        </React.Fragment>
                      ))}
                    </td>
                  );
                })}
                <td>{`${row.totalScore} / ${row.maxScore} (${percentage}%)`}</td>
                <td>
                  <span className="actions">
                    <BsFillTrashFill
                      className="delete-btn"
                      onClick={() => deleteRow(row.sourceIndex)}
                    />
                    <BsFillPencilFill onClick={() => editRow(row.sourceIndex)} />
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
