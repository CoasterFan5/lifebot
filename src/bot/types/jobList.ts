const skillList = [
  "technicalSkills",
  "creativity",
  "customerService",
  "organization",
  "leadership",
  "timeManagement",
  "teamwork",
  "workEthic",
  "criminality",
  "reputation",
  "nepotism",
] as const;

type SkillName = (typeof skillList)[number];

type JobTier = {
  title: string;
  basePay: number;
  maxPay: number;
  requirements: Partial<Record<SkillName, number>>;
  xpGrants: Partial<Record<SkillName, number>>;
};

export type JobList = {
  [key: string]: {
    companies: string[];
    tiers: JobTier[];
  };
};
