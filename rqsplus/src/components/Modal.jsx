import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  RQS_VERSIONS,
  calculateRowScores,
  createInitialRow,
  getVisibleCriteriaForSelection,
} from "../rqsConfig";
import "./Modal.css";

export const Modal = ({ closeModal, onSubmit, defaultValue, version }) => {
  const initialValueRef = useRef(defaultValue || createInitialRow(version));
  const [formState, setFormState] = useState(initialValueRef.current);
  const [errors, setErrors] = useState("");

  const config = RQS_VERSIONS[formState.version];

  const visibleCriteria = useMemo(
    () =>
      getVisibleCriteriaForSelection(
        formState.version,
        formState.maxRrl,
        formState.method
      ),
    [formState.version, formState.maxRrl, formState.method]
  );

  const liveScore = useMemo(() => calculateRowScores(formState), [formState]);
  const livePercentage =
    liveScore.maxScore > 0
      ? ((liveScore.totalScore / liveScore.maxScore) * 100).toFixed(2)
      : "0.00";

  const hasUnsavedChanges =
    JSON.stringify(formState) !== JSON.stringify(initialValueRef.current);

  const handleRequestClose = () => {
    if (!hasUnsavedChanges) {
      closeModal();
      return;
    }

    const shouldDiscard = window.confirm(
      "You have unsaved changes. Discard them and close this form?"
    );

    if (shouldDiscard) {
      closeModal();
    }
  };

  const updateField = (field, value) => {
    setFormState((current) => ({ ...current, [field]: value }));
  };

  const updateAnswer = (criterion, value, checked = false) => {
    setFormState((current) => {
      if (criterion.inputType === "multi") {
        const currentValue = Array.isArray(current.answers[criterion.id])
          ? current.answers[criterion.id]
          : [];
        const selectedOption = criterion.options.find(
          (option) => option.label === value
        );

        let updatedValue;

        if (selectedOption?.exclusive) {
          updatedValue = checked ? [value] : [];
        } else if (checked) {
          updatedValue = currentValue.filter((item) => {
            const option = criterion.options.find((candidate) => candidate.label === item);
            return !option?.exclusive;
          });
          updatedValue.push(value);
        } else {
          updatedValue = currentValue.filter((item) => item !== value);
        }

        return {
          ...current,
          answers: {
            ...current.answers,
            [criterion.id]: updatedValue,
          },
        };
      }

      return {
        ...current,
        answers: {
          ...current.answers,
          [criterion.id]: value,
        },
      };
    });
  };

  const isBinaryChoice = (criterion) =>
    criterion.inputType === "single" &&
    criterion.options.length === 2 &&
    criterion.options.every((option) => option.label.length <= 12);

  const getSelectionHint = (criterion) =>
    criterion.inputType === "multi" ? "Select multiple" : "Select one";

  const validateForm = () => {
    const missingFields = [];

    if (!formState.name.trim()) {
      missingFields.push("first author");
    }

    if (!formState.year.trim()) {
      missingFields.push("year");
    }

    if (formState.version === "rqs2" && !formState.method) {
      missingFields.push("method");
    }

    if (formState.version === "rqs2" && !formState.maxRrl) {
      missingFields.push("maximum RRL");
    }

    visibleCriteria.forEach((criterion) => {
      const answer = formState.answers[criterion.id];

      if (criterion.inputType === "multi") {
        if (!Array.isArray(answer) || answer.length === 0) {
          missingFields.push(criterion.label.toLowerCase());
        }
      } else if (!answer) {
        missingFields.push(criterion.label.toLowerCase());
      }
    });

    if (missingFields.length > 0) {
      setErrors(`Please include: ${missingFields.join(", ")}`);
      return false;
    }

    setErrors("");
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSubmit(calculateRowScores(formState));
    closeModal();
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (!hasUnsavedChanges) {
        return;
      }

      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasUnsavedChanges]);

  return (
    <div
      className="modal-container"
      onClick={(event) => {
        if (event.target.className === "modal-container") {
          handleRequestClose();
        }
      }}>
      <div className="modal">
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="modal-title-block">
            <p className="modal-eyebrow">{config.shortLabel}</p>
            <h2>{defaultValue ? "Edit paper" : "Add paper"}</h2>
            {formState.version === "rqs2" && (
              <p className="modal-helper">
                Select the method and the highest RRL to include. The form then
                shows all RQS 2.0 questions up to that stage.
              </p>
            )}
          </div>

          <div className="modal-form-group">
            <label htmlFor="name">First author</label>
            <input
              name="name"
              onChange={(event) => updateField("name", event.target.value)}
              value={formState.name}
            />
          </div>

          <div className="modal-form-group">
            <label htmlFor="year">Year</label>
            <input
              name="year"
              onChange={(event) => updateField("year", event.target.value)}
              value={formState.year}
            />
          </div>

          {formState.version === "rqs2" && (
            <div className="modal-meta-grid">
              <div className="modal-form-group">
                <label htmlFor="method">Method</label>
                <select
                  name="method"
                  onChange={(event) => updateField("method", event.target.value)}
                  value={formState.method}>
                  <option value="">Select a method</option>
                  {config.methodOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="modal-form-group">
                <label htmlFor="maxRrl">Maximum RRL level</label>
                <select
                  name="maxRrl"
                  onChange={(event) =>
                    updateField(
                      "maxRrl",
                      event.target.value ? Number(event.target.value) : null
                    )
                  }
                  value={formState.maxRrl ?? ""}>
                  <option value="">Select a maximum RRL level</option>
                  {config.rrlOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {formState.version === "rqs2" && visibleCriteria.length === 0 && (
            <div className="modal-placeholder">
              Choose both a method and a maximum RRL level to display the
              relevant RQS 2.0 questions.
            </div>
          )}

          {visibleCriteria.map((criterion, index) => {
            const previousCriterion = visibleCriteria[index - 1];
            const showStageHeading =
              formState.version === "rqs2" &&
              criterion.stageTitle &&
              criterion.stageTitle !== previousCriterion?.stageTitle;

            return (
              <React.Fragment key={criterion.id}>
                {showStageHeading && (
                  <div className="modal-stage-heading">{criterion.stageTitle}</div>
                )}

                <div className="modal-form-group">
                  <div className="question-heading-row">
                    <label className="question-title">
                      {criterion.number}. {criterion.label}
                    </label>
                    <span className="question-hint">
                      {getSelectionHint(criterion)}
                    </span>
                  </div>
                  {criterion.description && (
                    <p className="question-description">{criterion.description}</p>
                  )}

                  {criterion.inputType === "multi" ? (
                    <div className="checkbox-group">
                      {criterion.options.map((option) => {
                        const isSelected =
                          Array.isArray(formState.answers[criterion.id]) &&
                          formState.answers[criterion.id].includes(option.label);

                        return (
                          <label
                            className={`checkbox-option ${
                              isSelected ? "option-selected" : ""
                            }`}
                            key={option.label}>
                            <input
                              type="checkbox"
                              name={criterion.id}
                              value={option.label}
                              onChange={(event) =>
                                updateAnswer(
                                  criterion,
                                  option.label,
                                  event.target.checked
                                )
                              }
                              checked={isSelected}
                            />
                            <span>{option.label}</span>
                          </label>
                        );
                      })}
                    </div>
                  ) : (
                    <div
                      className={`radio-group ${
                        isBinaryChoice(criterion) ? "radio-group-inline" : ""
                      }`}>
                      {criterion.options.map((option) => {
                        const isSelected =
                          formState.answers[criterion.id] === option.label;

                        return (
                          <label
                            className={`radio-option ${
                              isSelected ? "option-selected" : ""
                            }`}
                            key={option.label}>
                            <input
                              type="radio"
                              name={criterion.id}
                              value={option.label}
                              checked={isSelected}
                              onChange={(event) =>
                                updateAnswer(criterion, event.target.value)
                              }
                            />
                            <span>{option.label}</span>
                          </label>
                        );
                      })}
                    </div>
                  )}
                </div>
              </React.Fragment>
            );
          })}

          <div className="modal-score-summary">
            <span className="modal-score-label">Current score</span>
            <strong>{`${liveScore.totalScore} / ${liveScore.maxScore}`}</strong>
            <span className="modal-score-percentage">{`${livePercentage}%`}</span>
          </div>

          {errors && <div className="error">{errors}</div>}

          <button type="submit" className="btn btn-primary">
            Save paper
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
