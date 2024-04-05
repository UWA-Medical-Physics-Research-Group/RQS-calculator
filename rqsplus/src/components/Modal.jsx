import React, { useState } from "react";

import "./Modal.css";

export const Modal = ({ closeModal }) => {
  const [formState, setFormState] = useState({
    page: "",
    description: "",
    status: "Live",
  });

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formState);
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
            <label htmlFor="page">Page</label>
            <input name="page" value={formState.page} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              name="description"
              value={formState.description}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              name="status"
              value={formState.status}
              onChange={handleChange}>
              <option value="live">Live</option>
              <option value="draft">Draft</option>
              <option value="error">Error</option>
            </select>
          </div>
          <button type="submit" className="btn" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
