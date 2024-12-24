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
export type SkillValues = Partial<Record<SkillName, number>>;

export type JobTier = {
  title: string;
  basePay: number;
  maxPay: number;
  requirements: SkillValues;
  xpGrants: SkillValues;
};

export type JobDetails = {
  companies: string[];
  tiers: JobTier[];
};

export type JobList = {
  [key: string]: JobDetails;
};
