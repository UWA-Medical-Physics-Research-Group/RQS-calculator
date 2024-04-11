import React from "react";

import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";

import "./Table.css";

export const Table = ({ rows, deleteRow, editRow }) => {
  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>Paper Name</th>
            <th className="expand"> Image Protocol Quality</th>
            <th>Total Score (/36)</th> {/* Updated column header */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => {
            // const statusText =
            //   row.status.charAt(0).toUpperCase() + row.status.slice(1);

            // Calculate totalScore as a percentage out of 36
            const totalScorePercentage = ((row.totalScore / 36) * 100).toFixed(
              2
            );

            return (
              <tr key={idx}>
                <td>{row.name}</td>
                <td className="expand">
                  {row.imageProtocolQuality.join(", ")}
                </td>
                <td>
                  {`${row.totalScore} (${totalScorePercentage}%)`}{" "}
                  {/* Display totalScore and percentage */}
                </td>
                <td>
                  <span className="actions">
                    <BsFillTrashFill
                      className="delete-btn"
                      onClick={() => deleteRow(idx)}
                    />
                    <BsFillPencilFill onClick={() => editRow(idx)} />
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
