import React, { useState } from "react";

import "./Modal.css";

export const Modal = ({ closeModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      name: "",
      imageProtocolQuality: [],
      status: "live",
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
      formState.status
    ) {
      setErrors("");
      return true;
    } else {
      let errorFields = [];

      if (!formState.name) {
        errorFields.push("name");
      }

      if (formState.imageProtocolQuality.length === 0) {
        errorFields.push("imageProtocolQuality (lenght 0)");
      }

      if (!formState.status) {
        errorFields.push("status");
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
            <label htmlFor="status">Status</label>
            <select
              name="status"
              onChange={handleChange}
              value={formState.status}>
              <option value="live">Live</option>
              <option value="draft">Draft</option>
              <option value="error">Error</option>
            </select>
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
