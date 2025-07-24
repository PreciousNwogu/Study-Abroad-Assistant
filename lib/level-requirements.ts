export interface LevelRequirement {
  level: string;
  displayName: string;
  description: string;
  duration: string;
  admissionDocuments: string[];
  immigrationDocuments: string[];
  financialRequirements: {
    canada: string;
    uk: string;
  };
  languageRequirements: {
    canada: string;
    uk: string;
  };
  specificRequirements: string[];
  applicationTimeline: string;
  sopFocus: {
    admission: string[];
    immigration: string[];
  };
}

export const levelRequirements: LevelRequirement[] = [
  {
    level: "undergraduate",
    displayName: "Undergraduate/Bachelor's Degree",
    description:
      "4-year bachelor's degree programs at universities in Canada and UK",
    duration: "3-4 years",
    admissionDocuments: [
      "High school transcripts/certificates",
      "Academic reference letters (2-3)",
      "Personal statement/essay",
      "English language test scores (IELTS/TOEFL)",
      "CV/Resume",
      "Portfolio (if required by program)",
      "Application form",
      "Application fee payment",
    ],
    immigrationDocuments: [
      "Valid passport",
      "Letter of acceptance from university",
      "Proof of financial support",
      "Medical examination results",
      "Police clearance certificate",
      "Photographs (passport size)",
      "Study permit application form",
      "Biometric fee payment",
    ],
    financialRequirements: {
      canada: "CAD $20,000-$50,000 per year (tuition + living expenses)",
      uk: "£15,000-£35,000 per year (tuition + living expenses)",
    },
    languageRequirements: {
      canada: "IELTS 6.0-6.5 overall, TOEFL 80-90 iBT",
      uk: "IELTS 6.0-6.5 overall, TOEFL 80-90 iBT",
    },
    specificRequirements: [
      "Minimum 70-80% in high school",
      "Subject-specific prerequisites",
      "Extracurricular activities",
      "Work experience (if applicable)",
    ],
    applicationTimeline: "Apply 8-12 months before intended start date",
    sopFocus: {
      admission: [
        "Academic achievements and goals",
        "Why you chose this program",
        "Career aspirations",
        "Extracurricular involvement",
        "Future contributions to the field",
      ],
      immigration: [
        "Genuine intention to study",
        "Strong ties to home country",
        "Financial stability",
        "Plans to return after studies",
        "Compliance with immigration laws",
      ],
    },
  },
  {
    level: "masters",
    displayName: "Master's Degree",
    description:
      "1-2 year postgraduate programs for specialized knowledge and research",
    duration: "1-2 years",
    admissionDocuments: [
      "Bachelor's degree transcripts",
      "Academic reference letters (2-3)",
      "Statement of purpose",
      "Research proposal (if required)",
      "English language test scores",
      "CV/Resume with work experience",
      "Letters of recommendation from employers",
      "GRE/GMAT scores (if required)",
      "Portfolio/writing samples (if required)",
    ],
    immigrationDocuments: [
      "Valid passport",
      "Letter of acceptance from university",
      "Proof of financial support",
      "Medical examination results",
      "Police clearance certificate",
      "Academic transcripts and certificates",
      "Work experience certificates",
      "Study permit application form",
    ],
    financialRequirements: {
      canada: "CAD $25,000-$60,000 per year (tuition + living expenses)",
      uk: "£20,000-£45,000 per year (tuition + living expenses)",
    },
    languageRequirements: {
      canada: "IELTS 6.5-7.0 overall, TOEFL 90-100 iBT",
      uk: "IELTS 6.5-7.0 overall, TOEFL 90-100 iBT",
    },
    specificRequirements: [
      "Relevant bachelor's degree",
      "Minimum 75-80% in undergraduate studies",
      "Relevant work experience (preferred)",
      "Research experience (for thesis-based programs)",
      "Professional certifications (if applicable)",
    ],
    applicationTimeline: "Apply 10-15 months before intended start date",
    sopFocus: {
      admission: [
        "Research interests and goals",
        "Relevant work experience",
        "Academic background alignment",
        "Why this specific program/university",
        "Future research contributions",
        "Professional development plans",
      ],
      immigration: [
        "Genuine intention to study",
        "Strong ties to home country",
        "Financial stability and support",
        "Plans to return and contribute",
        "Compliance with study permit conditions",
      ],
    },
  },
  {
    level: "phd",
    displayName: "PhD/Doctoral Degree",
    description: "3-5 year research-intensive programs leading to doctorate",
    duration: "3-5 years",
    admissionDocuments: [
      "Master's degree transcripts",
      "Research proposal (detailed)",
      "Academic reference letters (3-4)",
      "Statement of purpose",
      "English language test scores",
      "CV/Resume with publications",
      "Writing samples/publications",
      "GRE scores (if required)",
      "Interview (may be required)",
    ],
    immigrationDocuments: [
      "Valid passport",
      "Letter of acceptance from university",
      "Proof of financial support/funding",
      "Medical examination results",
      "Police clearance certificate",
      "Academic transcripts and certificates",
      "Research experience certificates",
      "Publication records",
      "Study permit application form",
    ],
    financialRequirements: {
      canada:
        "CAD $30,000-$70,000 per year (often with funding/assistantships)",
      uk: "£25,000-£50,000 per year (often with funding/assistantships)",
    },
    languageRequirements: {
      canada: "IELTS 7.0-7.5 overall, TOEFL 100-110 iBT",
      uk: "IELTS 7.0-7.5 overall, TOEFL 100-110 iBT",
    },
    specificRequirements: [
      "Relevant master's degree",
      "Strong research background",
      "Publications in relevant field",
      "Research proposal aligned with supervisor",
      "Academic excellence (85%+ in previous studies)",
      "Funding/scholarship (often required)",
    ],
    applicationTimeline: "Apply 12-18 months before intended start date",
    sopFocus: {
      admission: [
        "Research objectives and methodology",
        "Academic and research background",
        "Why this specific program/supervisor",
        "Original research contributions",
        "Long-term academic/research goals",
        "Fit with department's research focus",
      ],
      immigration: [
        "Genuine intention for doctoral studies",
        "Strong ties to home country",
        "Financial stability and funding",
        "Plans to return as expert in field",
        "Compliance with study permit conditions",
      ],
    },
  },
  {
    level: "diploma",
    displayName: "Diploma/Certificate Programs",
    description: "6 months to 2 years focused professional/technical programs",
    duration: "6 months - 2 years",
    admissionDocuments: [
      "High school or relevant qualification transcripts",
      "Professional reference letters (if applicable)",
      "Personal statement",
      "English language test scores",
      "CV/Resume",
      "Work experience certificates",
      "Professional certifications",
      "Application form",
    ],
    immigrationDocuments: [
      "Valid passport",
      "Letter of acceptance from institution",
      "Proof of financial support",
      "Medical examination results",
      "Police clearance certificate",
      "Educational certificates",
      "Work experience certificates",
      "Study permit application form",
    ],
    financialRequirements: {
      canada: "CAD $15,000-$35,000 per year (tuition + living expenses)",
      uk: "£12,000-£25,000 per year (tuition + living expenses)",
    },
    languageRequirements: {
      canada: "IELTS 5.5-6.0 overall, TOEFL 70-80 iBT",
      uk: "IELTS 5.5-6.0 overall, TOEFL 70-80 iBT",
    },
    specificRequirements: [
      "Relevant educational background",
      "Work experience in related field (preferred)",
      "Professional goals alignment",
      "Technical skills (if applicable)",
      "Industry certifications (if applicable)",
    ],
    applicationTimeline: "Apply 6-10 months before intended start date",
    sopFocus: {
      admission: [
        "Professional goals and career plans",
        "Relevant work experience",
        "Why this specific program",
        "Skills development objectives",
        "Industry knowledge and interests",
      ],
      immigration: [
        "Genuine intention to study",
        "Strong ties to home country",
        "Financial stability",
        "Plans to return with enhanced skills",
        "Compliance with study permit conditions",
      ],
    },
  },
];

export const getLevelRequirement = (
  level: string
): LevelRequirement | undefined => {
  return levelRequirements.find((req) => req.level === level);
};

export const getCountrySpecificInfo = (
  level: string,
  country: "canada" | "uk"
) => {
  const requirement = getLevelRequirement(level);
  if (!requirement) return null;

  return {
    financialRequirement: requirement.financialRequirements[country],
    languageRequirement: requirement.languageRequirements[country],
    level: requirement.level,
    displayName: requirement.displayName,
    description: requirement.description,
    duration: requirement.duration,
    admissionDocuments: requirement.admissionDocuments,
    immigrationDocuments: requirement.immigrationDocuments,
    specificRequirements: requirement.specificRequirements,
    applicationTimeline: requirement.applicationTimeline,
    sopFocus: requirement.sopFocus,
  };
};
