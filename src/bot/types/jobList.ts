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

export type JobTier = {
  title: string;
  basePay: number;
  maxPay: number;
  requirements: Partial<Record<SkillName, number>>;
  xpGrants: Partial<Record<SkillName, number>>;
};

export type JobDetails = {
  companies: string[];
  tiers: JobTier[];
};

export type JobList = {
  [key: string]: JobDetails;
};
