import React, { useState } from "react";

import "./Modal.css";

export const Modal = ({ closeModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      name: "",
      imageProtocolQuality: [],
      multipleSegmentations: "",
      phantomStudy: "",
    }
  );
  const [errors, setErrors] = useState("");

  const protocols = [
    "protocols well documented (+1)",
    "public protocol used  (+1)",
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
      ["Yes (+1)", "No (0)"].includes(formState.phantomStudy)
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

      setErrors(errorFields.join(", "));
      return false;
    }
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === "imageProtocolQuality") {
      if (value === "none (0)") {
        if (checked) {
          setFormState({
            ...formState,
            imageProtocolQuality: [value],
          });
        } else {
          setFormState({
            ...formState,
            imageProtocolQuality: [],
          });
        }
      } else {
        let updatedProtocols;
        if (checked) {
          updatedProtocols = formState.imageProtocolQuality.includes("none (0)")
            ? [value]
            : [...formState.imageProtocolQuality, value];
        } else {
          updatedProtocols = formState.imageProtocolQuality.filter(
            (protocol) => protocol !== value
          );
        }
        setFormState({
          ...formState,
          imageProtocolQuality: updatedProtocols,
        });
      }
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
        <form>
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
          {errors && (
            <div className="error">
              {errors === "phantomStudy"
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
