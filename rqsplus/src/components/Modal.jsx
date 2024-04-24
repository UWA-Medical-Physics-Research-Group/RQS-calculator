import React, { useState } from "react";
import "./Modal.css";

export const Modal = ({ closeModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      name: "",
      year: "",
      imageProtocolQuality: ["None (0)"],
      multipleSegmentations: "No (0)",
      phantomStudy: "No (0)",
      multipleTimePoints: "No (0)",
      featureReduction: "No, neither method implemented (-3)",
      multivariable: "No (0)",
      biological: "No (0)",
      cutOff: "No (0)",
      discrimination: ["None (0)"],
      calibration: ["None (0)"],
      prospective: "No (0)",
      validation: "No validation (-5)",
      gold: "No (0)",
      clinicalUtility: "No (0)",
      cost: "No (0)",
      open: ["None (0)"],
    }
  );
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (
      formState.name &&
      formState.year &&
      ((formState.imageProtocolQuality.includes("None (0)") &&
        formState.imageProtocolQuality.length === 1) ||
        (formState.imageProtocolQuality.length > 0 &&
          !formState.imageProtocolQuality.includes("None (0)"))) &&
      ["Yes (+1)", "No (0)"].includes(formState.multipleSegmentations) &&
      ["Yes (+1)", "No (0)"].includes(formState.phantomStudy) &&
      ["Yes (+1)", "No (0)"].includes(formState.multipleTimePoints) &&
      [
        "Yes, either method implemented (+3)",
        "No, neither method implemented (-3)",
      ].includes(formState.featureReduction) &&
      ["Yes (+1)", "No (0)"].includes(formState.multivariable) &&
      ["Yes (+1)", "No (0)"].includes(formState.biological) &&
      ["Yes (+1)", "No (0)"].includes(formState.cutOff) &&
      ((formState.discrimination.includes("None (0)") &&
        formState.discrimination.length === 1) ||
        (formState.discrimination.length > 0 &&
          !formState.discrimination.includes("None (0)"))) &&
      ((formState.calibration.includes("None (0)") &&
        formState.calibration.length === 1) ||
        (formState.calibration.length > 0 &&
          !formState.calibration.includes("None (0)"))) &&
      ["Yes (+7)", "No (0)"].includes(formState.prospective) &&
      [
        "No validation (-5)",
        "Validation is based on a dataset from the same institute (+2)",
        "Validation is based on a dataset from another institute (+3)",
        "Validation is based on two datasets from two distinct institutes (+4)",
        "The study validates a previously published signature (+4)",
        "Validation is based on three or more datasets from distinct institutes (+5)",
      ].includes(formState.validation) &&
      ["Yes (+2)", "No (0)"].includes(formState.gold) &&
      ["Yes (+2)", "No (0)"].includes(formState.clinicalUtility) &&
      ["Yes (+1)", "No (0)"].includes(formState.cost) &&
      formState.open.length > 0
    ) {
      setErrors("");
      return true;
    } else {
      let errorFields = [];

      if (!formState.name) {
        errorFields.push("first author");
      }

      if (!formState.year) {
        errorFields.push("year");
      }

      if (formState.imageProtocolQuality.length === 0) {
        errorFields.push("image protocol quality");
      }

      if (!formState.multipleSegmentations) {
        errorFields.push("multiple segmentations");
      }

      if (!formState.phantomStudy) {
        errorFields.push("phantom study on all scanners");
      }

      if (!formState.multipleTimePoints) {
        errorFields.push("imaging at multiple time points");
      }

      if (!formState.featureReduction) {
        errorFields.push(
          "feature reduction or adjustment for multiple testing"
        );
      }

      if (!formState.multivariable) {
        errorFields.push("multivariable analysis with non radiomics features");
      }

      if (!formState.biological) {
        errorFields.push("detect and discuss biological correlates");
      }

      if (!formState.cutOff) {
        errorFields.push("cut-off analyses");
      }

      if (formState.discrimination.length === 0) {
        errorFields.push("discrimination statistics reported");
      }

      if (formState.calibration.length === 0) {
        errorFields.push("calibration statistics reported");
      }

      if (!formState.prospective) {
        errorFields.push("prospective study registered in a trial database");
      }

      if (!formState.validation) {
        errorFields.push("validation");
      }

      if (!formState.gold) {
        errorFields.push("comparison to 'gold standard'");
      }

      if (!formState.clinicalUtility) {
        errorFields.push("reports potential clinical utility");
      }

      if (!formState.cost) {
        errorFields.push("reports cost-effectiveness");
      }

      if (formState.open.length === 0) {
        errorFields.push("open science and data");
      }

      const errorMessage = `Please include: ${errorFields.join(", ")}`;
      setErrors(errorMessage);
      return false;
    }
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    if (type === "checkbox") {
      let updatedArray;

      if (value === "None (0)") {
        if (checked) {
          updatedArray = [value];
        } else {
          updatedArray = formState[name].filter((item) => item !== "None (0)");
        }
      } else {
        if (checked) {
          updatedArray = formState[name].filter((item) => item !== "None (0)");
          updatedArray.push(value);
        } else {
          updatedArray = formState[name].filter((item) => item !== value);
        }
      }

      setFormState({
        ...formState,
        [name]: updatedArray,
      });
    } else {
      setFormState({ ...formState, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    onSubmit(formState);

    closeModal();
  };

  const protocols = [
    "Protocols well documented (+1)",
    "Public protocol used  (+1)",
    "None (0)",
  ];
  const discriminations = [
    "A discrimination statistic and its statistical significance are reported (+1)",
    "A resampling method technique is also applied  (+1)",
    "None (0)",
  ];
  const calibrations = [
    "A calibration statistic and its statistical significance are reported (+1)",
    "A resampling method technique is applied (+1)",
    "None (0)",
  ];
  const openSources = [
    "Scans are open source (+1)",
    "Region of interest segmentations are open source (+1)",
    "Code is open source (+1)",
    "Radiomics features are calculated on a set of representative ROIs and the calculated features and representative ROIs are open source (+1)",
    "None (0)",
  ];

  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") closeModal();
      }}>
      <div className="modal">
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">First author</label>
            <input name="name" onChange={handleChange} value={formState.name} />
          </div>
          <div className="form-group">
            <label htmlFor="year">Year</label>
            <input name="year" onChange={handleChange} value={formState.year} />
          </div>
          <div className="form-group">
            <label>Image protocol quality</label>
            {protocols.map((protocol) => (
              <div key={protocol}>
                <label>
                  <input
                    type="checkbox"
                    name="imageProtocolQuality"
                    value={protocol}
                    onChange={handleChange}
                    checked={formState.imageProtocolQuality.includes(protocol)}
                  />
                  {protocol}
                </label>
              </div>
            ))}
          </div>
          <div className="form-group">
            <label htmlFor="multipleSegmentations">
              Multiple segmentations
            </label>
            <select
              name="multipleSegmentations"
              onChange={handleChange}
              value={formState.multipleSegmentations}>
              <option value="No (0)">No (0)</option>
              <option value="Yes (+1)">Yes (+1)</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="phantomStudy">Phantom study on all scanners</label>
            <select
              name="phantomStudy"
              onChange={handleChange}
              value={formState.phantomStudy}>
              <option value="No (0)">No (0)</option>
              <option value="Yes (+1)">Yes (+1)</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="multipleTimePoints">
              Imaging at multiple time points
            </label>
            <select
              name="multipleTimePoints"
              onChange={handleChange}
              value={formState.multipleTimePoints}>
              <option value="No (0)">No (0)</option>
              <option value="Yes (+1)">Yes (+1)</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="featureReduction">
              Feature reduction or adjustment for multiple testing
            </label>
            <select
              name="featureReduction"
              onChange={handleChange}
              value={formState.featureReduction}>
              <option value="No, neither method implemented (-3)">
                No, neither method implemented (-3)
              </option>
              <option value="Yes, either method implemented (+3)">
                Yes, either method implemented (+3)
              </option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="multivariable">
              Multivariable analysis with non radiomics features
            </label>
            <select
              name="multivariable"
              onChange={handleChange}
              value={formState.multivariable}>
              <option value="No (0)">No (0)</option>
              <option value="Yes (+1)">Yes (+1)</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="biological">
              Detect and discuss biological correlates
            </label>
            <select
              name="biological"
              onChange={handleChange}
              value={formState.biological}>
              <option value="No (0)">No (0)</option>
              <option value="Yes (+1)">Yes (+1)</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="cutOff">Cut-off analyses</label>
            <select
              name="cutOff"
              onChange={handleChange}
              value={formState.cutOff}>
              <option value="No (0)">No (0)</option>
              <option value="Yes (+1)">Yes (+1)</option>
            </select>
          </div>
          <div className="form-group">
            <label>Discrimination statistics</label>
            {discriminations.map((disc) => (
              <div key={disc}>
                <label>
                  <input
                    type="checkbox"
                    name="discrimination"
                    value={disc}
                    onChange={handleChange}
                    checked={formState.discrimination.includes(disc)}
                  />
                  {disc}
                </label>
              </div>
            ))}
          </div>
          <div className="form-group">
            <label>Calibration statistics</label>
            {calibrations.map((cal) => (
              <div key={cal}>
                <label>
                  <input
                    type="checkbox"
                    name="calibration"
                    value={cal}
                    onChange={handleChange}
                    checked={formState.calibration.includes(cal)}
                  />
                  {cal}
                </label>
              </div>
            ))}
          </div>
          <div className="form-group">
            <label htmlFor="prospective">
              Prospective study registered in a trial database
            </label>
            <select
              name="prospective"
              onChange={handleChange}
              value={formState.prospective}>
              <option value="No (0)">No (0)</option>
              <option value="Yes (+7)">Yes (+7)</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="validation">Validation</label>
            <select
              name="validation"
              onChange={handleChange}
              value={formState.validation}>
              <option value="No validation (-5)">No validation (-5)</option>
              <option value="Validation is based on a dataset from the same institute (+2)">
                Validation is based on a dataset from the same institute (+2)
              </option>
              <option value="Validation is based on a dataset from another institute (+3)">
                Validation is based on a dataset from another institute (+3)
              </option>
              <option value="Validation is based on two datasets from two distinct institutes (+4)">
                Validation is based on two datasets from two distinct institutes
                (+4)
              </option>
              <option value="The study validates a previously published signature (+4)">
                The study validates a previously published signature (+4)
              </option>
              <option value="Validation is based on three or more datasets from distinct institutes (+5)">
                Validation is based on three or more datasets from distinct
                institutes (+5)
              </option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="gold">Comparison to 'gold standard'</label>
            <select name="gold" onChange={handleChange} value={formState.gold}>
              <option value="No (0)">No (0)</option>
              <option value="Yes (+2)">Yes (+2)</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="clinicalUtility">
              Reports potential clinical utility
            </label>
            <select
              name="clinicalUtility"
              onChange={handleChange}
              value={formState.clinicalUtility}>
              <option value="No (0)">No (0)</option>
              <option value="Yes (+2)">Yes (+2)</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="cost">Reports cost-effectiveness</label>
            <select name="cost" onChange={handleChange} value={formState.cost}>
              <option value="No (0)">No (0)</option>
              <option value="Yes (+1)">Yes (+1)</option>
            </select>
          </div>
          <div className="form-group">
            <label>Open science and data</label>
            {openSources.map((openSource) => (
              <div key={openSource}>
                <label>
                  <input
                    type="checkbox"
                    name="open"
                    value={openSource}
                    onChange={handleChange}
                    checked={formState.open.includes(openSource)}
                  />
                  {openSource}
                </label>
              </div>
            ))}
          </div>

          {errors && <div className="error">{errors}</div>}
          <button type="submit" className="btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
