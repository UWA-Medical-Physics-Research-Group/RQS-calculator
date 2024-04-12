import React, { useState } from "react";

import "./Modal.css";

export const Modal = ({ closeModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      name: "",
      imageProtocolQuality: [],
      multipleSegmentations: "",
      phantomStudy: "",
      multipleTimePoints: "",
      featureReduction: "",
      multivariable: "",
      biological: "",
      cutOff: "",
      discrimination: [],
      calibration: [],
    }
  );
  const [errors, setErrors] = useState("");

  const protocols = [
    "protocols well documented (+1)",
    "public protocol used  (+1)",
    "none (0)",
  ];

  const discriminations = [
    "a discrimination statistic and its statistical significance are reported (+1)",
    "a resampling method technique is also applied  (+1)",
    "none (0)",
  ];

  const calibrations = [
    "a calibration statistic and its statistical significance are reported (+1)",
    "a resampling method technique is applied (+1)",
    "none (0)",
  ];

  const validateForm = () => {
    if (
      formState.name &&
      ((formState.imageProtocolQuality.includes("none (0)") &&
        formState.imageProtocolQuality.length === 1) ||
        (formState.imageProtocolQuality.length > 0 &&
          !formState.imageProtocolQuality.includes("none (0)"))) &&
      formState.multipleSegmentations &&
      ["Yes (+1)", "No (0)"].includes(formState.multipleSegmentations) &&
      ["Yes (+1)", "No (0)"].includes(formState.phantomStudy) &&
      ["Yes (+1)", "No (0)"].includes(formState.multipleTimePoints) &&
      ["Yes, either method (+3)", "No, neither method (-3)"].includes(
        formState.featureReduction
      ) &&
      ["Yes (+1)", "No (0)"].includes(formState.multivariable) &&
      ["Yes (+1)", "No (0)"].includes(formState.biological) &&
      ["Yes (+1)", "No (0)"].includes(formState.cutOff) &&
      ((formState.discrimination.includes("none (0)") &&
        formState.discrimination.length === 1) ||
        (formState.discrimination.length > 0 &&
          !formState.discrimination.includes("none (0)"))) &&
      ((formState.calibration.includes("none (0)") &&
        formState.calibration.length === 1) ||
        (formState.calibration.length > 0 &&
          !formState.calibration.includes("none (0)")))
    ) {
      setErrors("");
      return true;
    } else {
      let errorFields = [];

      if (!formState.name) {
        errorFields.push("name");
      }

      if (formState.imageProtocolQuality.length === 0) {
        errorFields.push("imageProtocolQuality");
      }

      if (!formState.multipleSegmentations) {
        errorFields.push("multipleSegmentations");
      }

      if (!formState.phantomStudy) {
        errorFields.push("phantomStudy");
      }

      if (!formState.multipleTimePoints) {
        errorFields.push("multipleTimePoints");
      }

      if (!formState.featureReduction) {
        errorFields.push("featureReduction");
      }

      if (!formState.multivariable) {
        errorFields.push("multivariable");
      }

      if (!formState.biological) {
        errorFields.push("biological");
      }

      if (!formState.cutOff) {
        errorFields.push("cutOff");
      }

      if (formState.discrimination.length === 0) {
        errorFields.push("discrimination");
      }

      if (formState.calibration.length === 0) {
        errorFields.push("calibration");
      }

      setErrors(errorFields.join(", "));
      return false;
    }
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    if (
      name === "imageProtocolQuality" ||
      name === "discrimination" ||
      name === "calibration"
    ) {
      let updatedArray;
      if (value === "none (0)") {
        if (checked) {
          updatedArray = [value];
        } else {
          updatedArray = [];
        }
      } else {
        if (checked) {
          updatedArray = formState[name].includes("none (0)")
            ? [value]
            : [...formState[name], value];
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

  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") closeModal();
      }}>
      <div className="modal">
        <form className="modal-form">
          <div className="form-group">
            <label htmlFor="name">Paper Name</label>
            <input name="name" onChange={handleChange} value={formState.name} />
          </div>
          <div className="form-group">
            <label>Image Protocol Quality</label>
            {protocols.map((protocol) => (
              <div key={protocol}>
                <input
                  type="checkbox"
                  name="imageProtocolQuality"
                  value={protocol}
                  onChange={handleChange}
                  checked={formState.imageProtocolQuality.includes(protocol)}
                />
                <label>{protocol}</label>
              </div>
            ))}
          </div>
          <div className="form-group">
            <label htmlFor="multipleSegmentations">
              Multiple Segmentations?
            </label>
            <select
              name="multipleSegmentations"
              onChange={handleChange}
              value={formState.multipleSegmentations}>
              <option value="">Select</option>
              <option value="Yes (+1)">Yes (+1)</option>
              <option value="No (0)">No (0)</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="phantomStudy">Phantom study on all Scanners?</label>
            <select
              name="phantomStudy"
              onChange={handleChange}
              value={formState.phantomStudy}>
              <option value="">Select</option>
              <option value="Yes (+1)">Yes (+1)</option>
              <option value="No (0)">No (0)</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="multipleTimePoints">
              Imaging at multiple time points?
            </label>
            <select
              name="multipleTimePoints"
              onChange={handleChange}
              value={formState.multipleTimePoints}>
              <option value="">Select</option>
              <option value="Yes (+1)">Yes (+1)</option>
              <option value="No (0)">No (0)</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="featureReduction">
              Feature reduction or adjustment for multiple testing?
            </label>
            <select
              name="featureReduction"
              onChange={handleChange}
              value={formState.featureReduction}>
              <option value="">Select</option>
              <option value="Yes, either method (+3)">
                Yes, either method (+3)
              </option>
              <option value="No, neither method (-3)">
                No, neither method (-3)
              </option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="multivariable">
              Multivariable analysis with non radiomics features?
            </label>
            <select
              name="multivariable"
              onChange={handleChange}
              value={formState.multivariable}>
              <option value="">Select</option>
              <option value="Yes (+1)">Yes (+1)</option>
              <option value="No (0)">No (0)</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="biological">
              Detect and discuss biological correlates?
            </label>
            <select
              name="biological"
              onChange={handleChange}
              value={formState.biological}>
              <option value="">Select</option>
              <option value="Yes (+1)">Yes (+1)</option>
              <option value="No (0)">No (0)</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="cutOff">Cut-off analyses?</label>
            <select
              name="cutOff"
              onChange={handleChange}
              value={formState.cutOff}>
              <option value="">Select</option>
              <option value="Yes (+1)">Yes (+1)</option>
              <option value="No (0)">No (0)</option>
            </select>
          </div>
          <div className="form-group">
            <label>Discrimination statistics</label>
            {discriminations.map((disc) => (
              <div key={disc}>
                <input
                  type="checkbox"
                  name="discrimination"
                  value={disc}
                  onChange={handleChange}
                  checked={formState.discrimination.includes(disc)}
                />
                <label>{disc}</label>
              </div>
            ))}
          </div>
          <div className="form-group">
            <label>Calibration statistics</label>
            {calibrations.map((cal) => (
              <div key={cal}>
                <input
                  type="checkbox"
                  name="calibration"
                  value={cal}
                  onChange={handleChange}
                  checked={formState.calibration.includes(cal)}
                />
                <label>{cal}</label>
              </div>
            ))}
          </div>

          {errors && (
            <div className="error">
              {errors === "imageProtocolQuality"
                ? "Please select at least one imaging protocol"
                : `Please include: ${errors}`}
            </div>
          )}
          <button type="submit" className="btn" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
