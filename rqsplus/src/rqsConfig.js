const rrlOptions = [
  { value: 1, label: "RRL 1 - Foundational Exploration" },
  { value: 2, label: "RRL 2 - Data Preparation" },
  { value: 3, label: "RRL 3 - Prototype Model Development" },
  { value: 4, label: "RRL 4 - Internal Validation" },
  { value: 5, label: "RRL 5 - Capability Testing" },
  { value: 6, label: "RRL 6 - Trustworthiness Assessment" },
  { value: 7, label: "RRL 7 - Prospective Validity" },
  { value: 8, label: "RRL 8 - Applicability and Sustainability" },
  { value: 9, label: "RRL 9 - Clinical Deployment" },
];

const rqs1Criteria = [
  {
    id: "imageProtocolQuality",
    number: 1,
    label: "Image protocol quality",
    description:
      "Well-documented image protocols and/or use of public image protocols support reproducibility.",
    pointsText:
      "+1 if protocols are well documented, +1 if a public protocol is used",
    inputType: "multi",
    options: [
      { label: "Protocols well documented (+1)", score: 1 },
      { label: "Public protocol used  (+1)", score: 1 },
      { label: "None (0)", score: 0, exclusive: true },
    ],
  },
  {
    id: "multipleSegmentations",
    number: 2,
    label: "Multiple segmentations",
    description:
      "Assess feature robustness to segmentation variability using different observers, algorithms, or perturbations.",
    pointsText: "+1",
    inputType: "single",
    options: [
      { label: "No (0)", score: 0 },
      { label: "Yes (+1)", score: 1 },
    ],
  },
  {
    id: "phantomStudy",
    number: 3,
    label: "Phantom study",
    description:
      "Use phantom studies to detect inter-scanner and vendor-related variability.",
    pointsText: "+1",
    inputType: "single",
    options: [
      { label: "No (0)", score: 0 },
      { label: "Yes (+1)", score: 1 },
    ],
  },
  {
    id: "multipleTimePoints",
    number: 4,
    label: "Imaging at multiple time points",
    description:
      "Assess robustness to temporal variability using repeated imaging over time.",
    pointsText: "+1",
    inputType: "single",
    options: [
      { label: "No (0)", score: 0 },
      { label: "Yes (+1)", score: 1 },
    ],
  },
  {
    id: "featureReduction",
    number: 5,
    label: "Feature reduction or adjustment for multiple testing",
    description:
      "Reduce the risk of overfitting when candidate features outnumber available samples.",
    pointsText: "-3 if not implemented, +3 if implemented",
    inputType: "single",
    options: [
      { label: "No, neither method implemented (-3)", score: -3 },
      { label: "Yes, either method implemented (+3)", score: 3 },
    ],
  },
  {
    id: "multivariable",
    number: 6,
    label: "Multivariable analysis",
    description:
      "Combine radiomics with non-radiomics variables for a more holistic model.",
    pointsText: "+1",
    inputType: "single",
    options: [
      { label: "No (0)", score: 0 },
      { label: "Yes (+1)", score: 1 },
    ],
  },
  {
    id: "biological",
    number: 7,
    label: "Biological correlates",
    description:
      "Discuss biological correlates to strengthen interpretation of radiomic patterns.",
    pointsText: "+1",
    inputType: "single",
    options: [
      { label: "No (0)", score: 0 },
      { label: "Yes (+1)", score: 1 },
    ],
  },
  {
    id: "cutOff",
    number: 8,
    label: "Cut-off analysis",
    description:
      "Define clinically relevant thresholds or report continuous risk to reduce optimistic reporting.",
    pointsText: "+1",
    inputType: "single",
    options: [
      { label: "No (0)", score: 0 },
      { label: "Yes (+1)", score: 1 },
    ],
  },
  {
    id: "discrimination",
    number: 9,
    label: "Discrimination statistics",
    description:
      "Report discrimination metrics and statistical significance, optionally with resampling.",
    pointsText:
      "+1 if discrimination statistics are reported, +1 if resampling is also used",
    inputType: "multi",
    options: [
      {
        label:
          "A discrimination statistic and its statistical significance are reported (+1)",
        score: 1,
      },
      {
        label: "A resampling method technique is also applied  (+1)",
        score: 1,
      },
      { label: "None (0)", score: 0, exclusive: true },
    ],
  },
  {
    id: "calibration",
    number: 10,
    label: "Calibration statistics",
    description:
      "Report calibration metrics and their statistical significance, optionally with resampling.",
    pointsText:
      "+1 if calibration statistics are reported, +1 if resampling is also used",
    inputType: "multi",
    options: [
      {
        label:
          "A calibration statistic and its statistical significance are reported (+1)",
        score: 1,
      },
      { label: "A resampling method technique is applied (+1)", score: 1 },
      { label: "None (0)", score: 0, exclusive: true },
    ],
  },
  {
    id: "prospective",
    number: 11,
    label: "Prospective study",
    description:
      "Prospective validation provides the highest level of evidence for clinical use.",
    pointsText: "+7",
    inputType: "single",
    options: [
      { label: "No (0)", score: 0 },
      { label: "Yes (+7)", score: 7 },
    ],
  },
  {
    id: "validation",
    number: 12,
    label: "Validation",
    description:
      "Validation should be performed without retraining or adapting the cut-off value.",
    pointsText:
      "-5 to +5 depending on the externality and breadth of validation",
    inputType: "single",
    options: [
      { label: "No validation (-5)", score: -5 },
      {
        label: "Validation is based on a dataset from the same institute (+2)",
        score: 2,
      },
      {
        label: "Validation is based on a dataset from another institute (+3)",
        score: 3,
      },
      {
        label:
          "Validation is based on two datasets from two distinct institutes (+4)",
        score: 4,
      },
      {
        label: "The study validates a previously published signature (+4)",
        score: 4,
      },
      {
        label:
          "Validation is based on three or more datasets from distinct institutes (+5)",
        score: 5,
      },
    ],
  },
  {
    id: "gold",
    number: 13,
    label: "Comparison to 'gold standard'",
    description:
      "Compare the model with the current gold-standard approach to show added value.",
    pointsText: "+2",
    inputType: "single",
    options: [
      { label: "No (0)", score: 0 },
      { label: "Yes (+2)", score: 2 },
    ],
  },
  {
    id: "clinicalUtility",
    number: 14,
    label: "Potential clinical applications",
    description:
      "Report current or potential clinical utility, such as decision curve analysis.",
    pointsText: "+2",
    inputType: "single",
    options: [
      { label: "No (0)", score: 0 },
      { label: "Yes (+2)", score: 2 },
    ],
  },
  {
    id: "cost",
    number: 15,
    label: "Cost-effectiveness analysis",
    description:
      "Report cost-effectiveness of the clinical application where relevant.",
    pointsText: "+1",
    inputType: "single",
    options: [
      { label: "No (0)", score: 0 },
      { label: "Yes (+1)", score: 1 },
    ],
  },
  {
    id: "open",
    number: 16,
    label: "Open science and data",
    description:
      "Share data, segmentations, code, or representative features to support reproducibility.",
    pointsText: "+1 per open-science aspect",
    inputType: "multi",
    options: [
      { label: "Scans are open source (+1)", score: 1 },
      { label: "Region of interest segmentations are open source (+1)", score: 1 },
      { label: "Code is open source (+1)", score: 1 },
      {
        label:
          "Radiomics features are calculated on a set of representative ROIs and the calculated features and representative ROIs are open source (+1)",
        score: 1,
      },
      { label: "None (0)", score: 0, exclusive: true },
    ],
  },
];

const rqs2Criteria = [
  {
    id: "unmetClinicalNeed",
    number: 1,
    stage: 1,
    stageTitle: "RRL 1 - Foundational Exploration",
    label: "Unmet clinical need",
    description:
      "Define the unmet clinical need, ideally across multiple centres or through a consensus method.",
    pointsText: "+1 multi-centre definition, +2 Delphi or consensus method",
    inputType: "single",
    options: [
      { label: "Not implemented (0)", score: 0 },
      { label: "Implemented: More than one centre (+1)", score: 1 },
      { label: "Implemented: Delphi or consensus method (+2)", score: 2 },
    ],
  },
  {
    id: "hardwareDescription",
    number: 2,
    stage: 1,
    stageTitle: "RRL 1 - Foundational Exploration",
    label: "Hardware description",
    description:
      "Describe imaging hardware in detail, including manufacturer, model, and technical specifications.",
    pointsText: "+1",
    inputType: "single",
    options: [
      { label: "Not implemented (0)", score: 0 },
      { label: "Implemented (+1)", score: 1 },
    ],
  },
  {
    id: "triacProtocolQuality",
    number: 3,
    stage: 1,
    stageTitle: "RRL 1 - Foundational Exploration",
    label: "Image protocol quality (TRIAC)",
    description:
      "Use the TRIAC protocol maturity framing, from local approval through internationally established and future-proof practice.",
    pointsText: "+1 for TRIAC Level 1 or 2, +2 for Level 3 or 4",
    inputType: "single",
    options: [
      { label: "Not implemented (0)", score: 0 },
      { label: "TRIAC Level 1 or 2 (+1)", score: 1 },
      { label: "TRIAC Level 3 or 4 (+2)", score: 2 },
    ],
  },
  {
    id: "inclusionExclusionCriteria",
    number: 4,
    stage: 1,
    stageTitle: "RRL 1 - Foundational Exploration",
    label: "Inclusion and exclusion criteria",
    description:
      "Document patient selection criteria and the rationale for those criteria.",
    pointsText: "+1",
    inputType: "single",
    options: [
      { label: "Not implemented (0)", score: 0 },
      { label: "Implemented (+1)", score: 1 },
    ],
  },
  {
    id: "diversityAndDistribution",
    number: 5,
    stage: 1,
    stageTitle: "RRL 1 - Foundational Exploration",
    label: "Diversity and distribution",
    description:
      "Identify likely biases up front across demographic, geographic, socioeconomic, or clinical dimensions.",
    pointsText: "+1",
    inputType: "single",
    options: [
      { label: "Not implemented (0)", score: 0 },
      { label: "Implemented (+1)", score: 1 },
    ],
  },
  {
    id: "featureRobustness",
    number: 6,
    stage: 2,
    stageTitle: "RRL 2 - Data Preparation",
    applicableMethods: ["Handcrafted Radiomics", "Both"],
    label: "Feature robustness",
    description:
      "Evaluate robustness using test-retest, multiple segmentations, or phantom studies.",
    pointsText: "+1",
    inputType: "single",
    options: [
      { label: "Not implemented (0)", score: 0 },
      { label: "Implemented (+1)", score: 1 },
    ],
  },
  {
    id: "preprocessingOfImages",
    number: 7,
    stage: 2,
    stageTitle: "RRL 2 - Data Preparation",
    label: "Preprocessing of images",
    description:
      "Apply and justify preprocessing steps used to standardise imaging data.",
    pointsText: "+1",
    inputType: "single",
    options: [
      { label: "Not implemented (0)", score: 0 },
      { label: "Implemented (+1)", score: 1 },
    ],
  },
  {
    id: "harmonization",
    number: 8,
    stage: 2,
    stageTitle: "RRL 2 - Data Preparation",
    label: "Harmonization",
    description:
      "Use image-level or feature-level harmonisation methods where appropriate.",
    pointsText: "+1",
    inputType: "single",
    options: [
      { label: "Not implemented (0)", score: 0 },
      { label: "Implemented (+1)", score: 1 },
    ],
  },
  {
    id: "internationalStandards",
    number: 9,
    stage: 2,
    stageTitle: "RRL 2 - Data Preparation",
    applicableMethods: ["Handcrafted Radiomics", "Both"],
    label: "Compliance with international standards",
    description:
      "Use standards-compliant implementations, for example IBSI-aligned feature extraction.",
    pointsText: "+1",
    inputType: "single",
    options: [
      { label: "Not implemented (0)", score: 0 },
      { label: "Implemented (+1)", score: 1 },
    ],
  },
  {
    id: "automaticSegmentation",
    number: 10,
    stage: 2,
    stageTitle: "RRL 2 - Data Preparation",
    label: "Automatic segmentation",
    description:
      "Use automated segmentation for ROI definition.",
    pointsText: "+1",
    inputType: "single",
    options: [
      { label: "Not implemented (0)", score: 0 },
      { label: "Implemented (+1)", score: 1 },
    ],
  },
  {
    id: "featureReductionRqs2",
    number: 11,
    stage: 3,
    stageTitle: "RRL 3 - Prototype Model Development",
    applicableMethods: ["Handcrafted Radiomics", "Both"],
    label: "Feature reduction",
    description:
      "Reduce features to lower overfitting risk, especially when feature counts exceed sample counts.",
    pointsText: "+1",
    inputType: "single",
    options: [
      { label: "Not implemented (0)", score: 0 },
      { label: "Implemented (+1)", score: 1 },
    ],
  },
  {
    id: "robustnessInFeatureSelection",
    number: 12,
    stage: 3,
    stageTitle: "RRL 3 - Prototype Model Development",
    applicableMethods: ["Handcrafted Radiomics", "Both"],
    label: "Feature robustness for feature selection",
    description:
      "Use prior robustness evidence during feature selection.",
    pointsText: "+1",
    inputType: "single",
    options: [
      { label: "Not implemented (0)", score: 0 },
      { label: "Implemented (+1)", score: 1 },
    ],
  },
  {
    id: "hcrDlCombination",
    number: 13,
    stage: 3,
    stageTitle: "RRL 3 - Prototype Model Development",
    label: "HCR + DL combination",
    description:
      "Compare and explore a combined handcrafted radiomics and deep learning approach.",
    pointsText: "+1",
    inputType: "single",
    options: [
      { label: "Not implemented (0)", score: 0 },
      { label: "Implemented (+1)", score: 1 },
    ],
  },
  {
    id: "multivariableRqs2",
    number: 14,
    stage: 3,
    stageTitle: "RRL 3 - Prototype Model Development",
    label: "Multivariable analysis",
    description:
      "Include non-radiomics variables such as clinical, genomic, or proteomic features.",
    pointsText: "+2",
    inputType: "single",
    options: [
      { label: "Not implemented (0)", score: 0 },
      { label: "Implemented (+2)", score: 2 },
    ],
  },
  {
    id: "singleCentreValidation",
    number: 15,
    stage: 4,
    stageTitle: "RRL 4 - Internal Validation",
    label: "Single-centre validation",
    description:
      "Validate on data from the same institute without retraining or threshold adaptation.",
    pointsText: "+1",
    inputType: "single",
    options: [
      { label: "Not implemented (0)", score: 0 },
      { label: "Implemented (+1)", score: 1 },
    ],
  },
  {
    id: "cutOffAnalysesRqs2",
    number: 16,
    stage: 4,
    stageTitle: "RRL 4 - Internal Validation",
    label: "Cut-off analyses",
    description:
      "Use or justify thresholds for classification or survival modelling.",
    pointsText: "+1",
    inputType: "single",
    options: [
      { label: "Not implemented (0)", score: 0 },
      { label: "Implemented (+1)", score: 1 },
    ],
  },
  {
    id: "discriminationStatisticsRqs2",
    number: 17,
    stage: 4,
    stageTitle: "RRL 4 - Internal Validation",
    label: "Discrimination statistics",
    description:
      "Report discrimination metrics with significance, and optionally include resampling.",
    pointsText: "+1 statistic only, +2 with resampling",
    inputType: "single",
    options: [
      { label: "Not implemented (0)", score: 0 },
      { label: "Statistic only (+1)", score: 1 },
      { label: "Resampling method applied (+2)", score: 2 },
    ],
  },
  {
    id: "calibrationStatisticsRqs2",
    number: 18,
    stage: 4,
    stageTitle: "RRL 4 - Internal Validation",
    label: "Calibration statistics",
    description:
      "Report calibration metrics such as calibration slope or calibration plots.",
    pointsText: "+1",
    inputType: "single",
    options: [
      { label: "Not implemented (0)", score: 0 },
      { label: "Implemented (+1)", score: 1 },
    ],
  },
  {
    id: "failureModeAnalysis",
    number: 19,
    stage: 4,
    stageTitle: "RRL 4 - Internal Validation",
    label: "Failure mode analysis",
    description:
      "Document limitations, edge cases, or known failure modes of the model.",
    pointsText: "+1",
    inputType: "single",
    options: [
      { label: "Not implemented (0)", score: 0 },
      { label: "Implemented (+1)", score: 1 },
    ],
  },
  {
    id: "openScienceAndDataRqs2",
    number: 20,
    stage: 4,
    stageTitle: "RRL 4 - Internal Validation",
    label: "Open science and data",
    description:
      "Share scans, segmentations, or code publicly to support reproducibility.",
    pointsText: "+1 one aspect, +2 two aspects, +3 all aspects",
    inputType: "single",
    options: [
      { label: "Not implemented (0)", score: 0 },
      { label: "One aspect open (+1)", score: 1 },
      { label: "Two aspects open (+2)", score: 2 },
      { label: "All aspects open (+3)", score: 3 },
    ],
  },
  {
    id: "multicentreValidation",
    number: 21,
    stage: 5,
    stageTitle: "RRL 5 - Capability Testing",
    label: "Multi-centre validation",
    description:
      "Validate on data from one or more external institutes or a third-party platform.",
    pointsText:
      "+1 one external institute, +2 two or more institutes, +3 third-party platform",
    inputType: "single",
    options: [
      { label: "Not implemented (0)", score: 0 },
      { label: "One external institute (+1)", score: 1 },
      { label: "Two or more external institutes (+2)", score: 2 },
      { label: "Third-party platform with unseen data (+3)", score: 3 },
    ],
  },
  {
    id: "comparisonWithClinicalStandard",
    number: 22,
    stage: 5,
    stageTitle: "RRL 5 - Capability Testing",
    label: "Comparison with current clinical standard",
    description:
      "Compare the model with the current clinical standard or gold-standard approach.",
    pointsText: "+2",
    inputType: "single",
    options: [
      { label: "Not implemented (0)", score: 0 },
      { label: "Implemented (+2)", score: 2 },
    ],
  },
  {
    id: "comparisonToPreviousWork",
    number: 23,
    stage: 5,
    stageTitle: "RRL 5 - Capability Testing",
    label: "Comparison to previous work",
    description:
      "Compare performance with previously published handcrafted radiomics signatures or deep learning algorithms.",
    pointsText: "+1",
    inputType: "single",
    options: [
      { label: "Not implemented (0)", score: 0 },
      { label: "Implemented (+1)", score: 1 },
    ],
  },
  {
    id: "potentialClinicalUtilityRqs2",
    number: 24,
    stage: 5,
    stageTitle: "RRL 5 - Capability Testing",
    label: "Potential clinical utility",
    description:
      "Report the current or potential clinical application of the model.",
    pointsText: "+2",
    inputType: "single",
    options: [
      { label: "Not implemented (0)", score: 0 },
      { label: "Implemented (+2)", score: 2 },
    ],
  },
  {
    id: "explainability",
    number: 25,
    stage: 6,
    stageTitle: "RRL 6 - Trustworthiness Assessment",
    label: "Explainability",
    description:
      "Use explainability methods such as SHAP or GradCAM to clarify predictions.",
    pointsText: "+1",
    inputType: "single",
    options: [
      { label: "Not implemented (0)", score: 0 },
      { label: "Implemented (+1)", score: 1 },
    ],
  },
  {
    id: "explainabilityEvaluation",
    number: 26,
    stage: 6,
    stageTitle: "RRL 6 - Trustworthiness Assessment",
    label: "Explainability evaluation",
    description:
      "Evaluate interpretability methods qualitatively and quantitatively.",
    pointsText: "+1",
    inputType: "single",
    options: [
      { label: "Not implemented (0)", score: 0 },
      { label: "Implemented (+1)", score: 1 },
    ],
  },
  {
    id: "biologicalCorrelatesRqs2",
    number: 27,
    stage: 6,
    stageTitle: "RRL 6 - Trustworthiness Assessment",
    label: "Biological correlates",
    description:
      "Detect and discuss biological correlates underlying model behaviour.",
    pointsText: "+1",
    inputType: "single",
    options: [
      { label: "Not implemented (0)", score: 0 },
      { label: "Implemented (+1)", score: 1 },
    ],
  },
  {
    id: "fairnessEvaluation",
    number: 28,
    stage: 6,
    stageTitle: "RRL 6 - Trustworthiness Assessment",
    label: "Fairness evaluation and mitigation",
    description:
      "Assess for bias and, where needed, apply mitigation or correction strategies.",
    pointsText: "+1 fairness evaluated, +2 with bias correction",
    inputType: "single",
    options: [
      { label: "Not implemented (0)", score: 0 },
      { label: "Fairness evaluated (+1)", score: 1 },
      { label: "Bias correction applied (+2)", score: 2 },
    ],
  },
  {
    id: "usabilityForClinicians",
    number: 29,
    stage: 7,
    stageTitle: "RRL 7 - Prospective Validity",
    label: "Usability for clinicians",
    description:
      "Assess usability, interface quality, or workflow integration for clinicians.",
    pointsText: "+1",
    inputType: "single",
    options: [
      { label: "Not implemented (0)", score: 0 },
      { label: "Implemented (+1)", score: 1 },
    ],
  },
  {
    id: "sampleSizeCalculation",
    number: 30,
    stage: 7,
    stageTitle: "RRL 7 - Prospective Validity",
    label: "Sample size calculation",
    description:
      "Calculate sample size in advance for prospective validation.",
    pointsText: "+1",
    inputType: "single",
    options: [
      { label: "Not implemented (0)", score: 0 },
      { label: "Implemented (+1)", score: 1 },
    ],
  },
  {
    id: "clinicalTrialPreregistration",
    number: 31,
    stage: 7,
    stageTitle: "RRL 7 - Prospective Validity",
    label: "Clinical trial pre-registration",
    description:
      "Register the prospective trial and statistical plan on a clinical trial database.",
    pointsText: "+1",
    inputType: "single",
    options: [
      { label: "Not implemented (0)", score: 0 },
      { label: "Implemented (+1)", score: 1 },
    ],
  },
  {
    id: "prospectiveValidationRqs2",
    number: 32,
    stage: 7,
    stageTitle: "RRL 7 - Prospective Validity",
    label: "Prospective validation",
    description:
      "Carry out prospective or in-silico prospective validation to confirm clinical validity.",
    pointsText: "+3",
    inputType: "single",
    options: [
      { label: "Not implemented (0)", score: 0 },
      { label: "Implemented (+3)", score: 3 },
    ],
  },
  {
    id: "realWorldClinicalAssessment",
    number: 33,
    stage: 7,
    stageTitle: "RRL 7 - Prospective Validity",
    label: "Real-world clinical assessment",
    description:
      "Use human-in-the-loop or real-world assessments to evaluate practical impact.",
    pointsText: "+1",
    inputType: "single",
    options: [
      { label: "Not implemented (0)", score: 0 },
      { label: "Implemented (+1)", score: 1 },
    ],
  },
  {
    id: "softwareTraceability",
    number: 34,
    stage: 8,
    stageTitle: "RRL 8 - Applicability and Sustainability",
    label: "Software traceability",
    description:
      "Document development history, changes, and version control processes.",
    pointsText: "+1",
    inputType: "single",
    options: [
      { label: "Not implemented (0)", score: 0 },
      { label: "Implemented (+1)", score: 1 },
    ],
  },
  {
    id: "softwareSafeguards",
    number: 35,
    stage: 8,
    stageTitle: "RRL 8 - Applicability and Sustainability",
    label: "Software safeguards",
    description:
      "Implement checks to prevent out-of-scope use or unreliable inputs.",
    pointsText: "+1",
    inputType: "single",
    options: [
      { label: "Not implemented (0)", score: 0 },
      { label: "Implemented (+1)", score: 1 },
    ],
  },
  {
    id: "costEffectivenessRqs2",
    number: 36,
    stage: 8,
    stageTitle: "RRL 8 - Applicability and Sustainability",
    label: "Cost-effectiveness analysis",
    description:
      "Report cost-effectiveness of the clinical application.",
    pointsText: "+2",
    inputType: "single",
    options: [
      { label: "Not implemented (0)", score: 0 },
      { label: "Implemented (+2)", score: 2 },
    ],
  },
  {
    id: "performanceDrift",
    number: 37,
    stage: 8,
    stageTitle: "RRL 8 - Applicability and Sustainability",
    label: "Performance drift",
    description:
      "Define how model performance will be re-evaluated over time as data shift.",
    pointsText: "+1",
    inputType: "single",
    options: [
      { label: "Not implemented (0)", score: 0 },
      { label: "Implemented (+1)", score: 1 },
    ],
  },
  {
    id: "continuousLearning",
    number: 38,
    stage: 8,
    stageTitle: "RRL 8 - Applicability and Sustainability",
    label: "Continuous learning",
    description:
      "Define how the model will be improved or updated over time.",
    pointsText: "+1",
    inputType: "single",
    options: [
      { label: "Not implemented (0)", score: 0 },
      { label: "Implemented (+1)", score: 1 },
    ],
  },
  {
    id: "automationLevel",
    number: 39,
    stage: 9,
    stageTitle: "RRL 9 - Clinical Deployment",
    label: "Level of automation in clinical practice",
    description:
      "Define how automated the model is in clinical use, from assistive to fully automated workflows.",
    pointsText: "+1",
    inputType: "single",
    options: [
      { label: "Not implemented (0)", score: 0 },
      { label: "Implemented (+1)", score: 1 },
    ],
  },
  {
    id: "qualityManagementSystem",
    number: 40,
    stage: 9,
    stageTitle: "RRL 9 - Clinical Deployment",
    label: "Quality management system",
    description:
      "Implement and maintain a formal QMS such as ISO 9001.",
    pointsText: "+1",
    inputType: "single",
    options: [
      { label: "Not implemented (0)", score: 0 },
      { label: "Implemented (+1)", score: 1 },
    ],
  },
  {
    id: "regulatoryRequirements",
    number: 41,
    stage: 9,
    stageTitle: "RRL 9 - Clinical Deployment",
    label: "Regulatory requirements",
    description:
      "Evaluate alignment with the relevant regulatory pathway.",
    pointsText: "+1",
    inputType: "single",
    options: [
      { label: "Not implemented (0)", score: 0 },
      { label: "Implemented (+1)", score: 1 },
    ],
  },
  {
    id: "productOnMarket",
    number: 42,
    stage: 9,
    stageTitle: "RRL 9 - Clinical Deployment",
    label: "Product on the market",
    description:
      "Demonstrate successful market introduction with regulatory approval and clinical adoption.",
    pointsText: "+1",
    inputType: "single",
    options: [
      { label: "Not implemented (0)", score: 0 },
      { label: "Implemented (+1)", score: 1 },
    ],
  },
];

export const RQS_VERSIONS = {
  rqs1: {
    key: "rqs1",
    shortLabel: "RQS 1.0",
    title: "RQS Calculator 1.0",
    heroLabel: "Radiomics quality scoring",
    description:
      "Score radiomics papers against the original Radiomics Quality Score criteria, compare studies side by side, and export your working dataset as a CSV.",
    sourceLabel:
      "Radiomics: the bridge between medical imaging and personalized medicine",
    sourceUrl: "https://doi.org/10.1038/nrclinonc.2017.141",
    criteria: rqs1Criteria,
    methodOptions: [],
  },
  rqs2: {
    key: "rqs2",
    shortLabel: "RQS 2.0",
    title: "RQS Calculator 2.0",
    heroLabel: "Radiomics quality scoring",
    description:
      "Evaluate papers against RQS 2.0, including Radiomics Readiness Levels, then compare studies within the same framework.",
    sourceLabel:
      "Radiomics Quality Score (RQS) 2.0 with Radiomics Readiness Levels",
    sourceUrl: "https://www.radiomics.world/rqs2",
    criteria: rqs2Criteria,
    methodOptions: [
      "Handcrafted Radiomics",
      "Deep Learning",
      "Both",
    ],
    rrlOptions,
  },
};

const legacyFieldIds = rqs1Criteria.map((criterion) => criterion.id);

const getDefaultAnswer = (criterion) => {
  if (criterion.inputType === "multi") {
    const exclusive = criterion.options.find((option) => option.exclusive);
    return exclusive ? [exclusive.label] : [];
  }

  return criterion.options[0]?.label || "";
};

export const createInitialRow = (version = "rqs1") => {
  const config = RQS_VERSIONS[version];
  const answers = {};

  config.criteria.forEach((criterion) => {
    answers[criterion.id] = getDefaultAnswer(criterion);
  });

  return {
    version,
    name: "",
    year: "",
    method: version === "rqs2" ? "" : "",
    maxRrl: version === "rqs2" ? null : null,
    answers,
    totalScore: 0,
    maxScore: getMaxScore(version, version === "rqs2" ? null : null),
  };
};

export const getVisibleCriteria = (version, maxRrl = null) => {
  const config = RQS_VERSIONS[version];

  if (version !== "rqs2") {
    return config.criteria;
  }

  if (maxRrl == null) {
    return [];
  }

  return config.criteria.filter((criterion) => criterion.stage <= Number(maxRrl));
};

export const getVisibleCriteriaForSelection = (
  version,
  maxRrl = null,
  method = ""
) => {
  if (version === "rqs2" && (!maxRrl || !method)) {
    return [];
  }

  return getVisibleCriteria(version, maxRrl).filter((criterion) => {
    if (version !== "rqs2" || !criterion.applicableMethods) {
      return true;
    }

    return criterion.applicableMethods.includes(method);
  });
};

export const getMaxScore = (version, maxRrl = null) =>
  getVisibleCriteria(version, maxRrl).reduce((sum, criterion) => {
    const maxOptionScore = Math.max(
      ...criterion.options.map((option) => option.score)
    );

    return sum + maxOptionScore;
  }, 0);

export const calculateRowScores = (row) => {
  const visibleCriteria = getVisibleCriteria(row.version, row.maxRrl);

  const totalScore = visibleCriteria.reduce((sum, criterion) => {
    const answer = row.answers?.[criterion.id];

    if (criterion.inputType === "multi") {
      const selected = Array.isArray(answer) ? answer : [];
      const optionScore = selected.reduce((optionSum, label) => {
        const option = criterion.options.find((item) => item.label === label);
        return optionSum + (option?.score || 0);
      }, 0);

      return sum + optionScore;
    }

    const option = criterion.options.find((item) => item.label === answer);
    return sum + (option?.score || 0);
  }, 0);

  return {
    ...row,
    totalScore,
    maxScore: getMaxScore(row.version, row.maxRrl),
  };
};

export const formatAnswer = (criterion, answer) => {
  if (Array.isArray(answer)) {
    return answer.join("\n");
  }

  return answer || "-";
};

export const migrateStoredRows = (storedRows) =>
  (storedRows || []).map((row) => {
    if (row?.version && row?.answers) {
      return calculateRowScores(row);
    }

    const migrated = createInitialRow("rqs1");
    migrated.name = row?.name || "";
    migrated.year = row?.year || "";

    legacyFieldIds.forEach((fieldId) => {
      if (row && Object.prototype.hasOwnProperty.call(row, fieldId)) {
        migrated.answers[fieldId] = row[fieldId];
      }
    });

    return calculateRowScores(migrated);
  });
