export const BRANDS = [
  "Abecab",
  "Abetis",
  "Aptin",
  "Arbitel",
  "Avloclav",
  "Biocal",
  "Cefim-3",
  "Cerox CV",
  "Citalam"
];

// Catalog matching Android Phase 7 reconstruct
export const BUSINESS_AREAS: Record<string, Record<string, Record<string, string[]>>> = {
  "Pharmaceuticals (demo)": {
    "Rajshahi (demo)": {
      "Sample Area (demo)": [
        "Sample FME (demo)"
      ]
    }
  }
};

export const WORK_WITH_OPTIONS = [
  "Alone (demo)",
  "Colleague (demo)",
  "Other (demo)"
];

export const API_INVENTORY = {
  host: "https://workplan.acibd.com/",
  endpoints: [
    { key: "LOGIN", path: "authenticate/login", desc: "User authentication gateway", requiresAuth: false },
    { key: "DOCTORS", path: "doctor-info/{level}", desc: "Doctor directory lookup by hierarchy level", requiresAuth: true },
    { key: "DOCTOR_PRIORITY", path: "doctor-priority-info/{level1}/{doctorId}", desc: "Doctor tier & prioritization data", requiresAuth: true },
    { key: "AREAS", path: "area-info/{level3}", desc: "Territory / Area hierarchy breakdown", requiresAuth: true },
    { key: "TERRITORIES", path: "territory-info/{level2}/{SBID}", desc: "Territory master info by Strategic Business ID", requiresAuth: true },
    { key: "BRANDS", path: "region-brand-info/{SBId}", desc: "Target brands assigned per region", requiresAuth: true },
    { key: "DCR_LIST", path: "dcr-list", desc: "Submitted Doctor Call Reports listing", requiresAuth: true },
    { key: "DCR_DETAILS", path: "dcr-details/{dcrID}", desc: "Detailed breakdown of single DCR record", requiresAuth: true },
    { key: "DCR_ADD", path: "dcr-add", desc: "Submit new DCR payload to server", requiresAuth: true },
    { key: "DASHBOARD", path: "my-dcr-dashboard", desc: "Field executive weekly performance stats", requiresAuth: true },
    { key: "GENERAL", path: "general-info", desc: "Application metadata and version flags", requiresAuth: false },
    { key: "GIFTS", path: "get-user-gift-list", desc: "Promotional gift inventory assigned to rep", requiresAuth: true }
  ]
};
