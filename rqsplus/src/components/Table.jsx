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
            <th>Multiple segmentations?</th>
            <th>Phantom study on all scanners?</th>
            <th>Imaging at multiple time points?</th>
            <th>Feature reduction or adjustment for multiple testing?</th>
            <th>Multivariable analysis with non radiomics features?</th>
            <th>Detect and discuss biological correlates?</th>
            <th>Cut-off analyses?</th>
            <th>Discrimination statistics reported?</th>
            <th>Calibration statistics reported?</th>
            <th>Total Score</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => {
            let totalScorePercentage = ((row.totalScore / 36) * 100).toFixed(2);
            // Calculate totalScore as a percentage out of 36
            if (totalScorePercentage < 0) {
              totalScorePercentage = 0;
            }

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
                <td>{row.featureReduction}</td>
                <td>{row.multivariable}</td>
                <td>{row.biological}</td>
                <td>{row.cutOff}</td>
                <td className="expand">
                  {row.discrimination.map((disc, index) => (
                    <React.Fragment key={index}>
                      {disc}
                      <br />
                    </React.Fragment>
                  ))}
                </td>
                <td className="expand">
                  {row.calibration.map((cal, index) => (
                    <React.Fragment key={index}>
                      {cal}
                      <br />
                    </React.Fragment>
                  ))}
                </td>

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
