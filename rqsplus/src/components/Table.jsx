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
            <th className="expand">Image Protocol Quality</th>
            <th>Multiple Segmentations?</th>
            <th>Phantom Study on all Scanners?</th>
            <th>Imaging at Multiple Time Points?</th>
            <th>Total Score</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => {
            // Calculate totalScore as a percentage out of 36
            const totalScorePercentage = ((row.totalScore / 36) * 100).toFixed(
              2
            );

            return (
              <tr key={idx}>
                <td>{row.name}</td>
                <td className="expand">
                  {row.imageProtocolQuality.map((protocol, index) => (
                    <React.Fragment key={index}>
                      {protocol}
                      <br />
                    </React.Fragment>
                  ))}
                </td>
                <td>{row.multipleSegmentations}</td>
                <td>{row.phantomStudy}</td>
                <td>{row.multipleTimePoints}</td>
                <td>{`${row.totalScore} (${totalScorePercentage}%)`}</td>
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
