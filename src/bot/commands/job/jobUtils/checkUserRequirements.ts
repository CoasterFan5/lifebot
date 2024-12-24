import type { LifebotUser } from "../../../types/user";
import type { SkillValues } from "../../../types/jobs";
import type { StringedObject } from "../../../types/stringedObject";

export const checkUserRequirements: (
  user: LifebotUser,
  jobRequirements: SkillValues,
) => boolean = (user, jobRequiremnts) => {
  for (const skillName in jobRequiremnts) {
    const requiredXp = (jobRequiremnts as StringedObject<number>)[skillName];
    if (
      (user as unknown as StringedObject<number>)[skillName as string] <
      requiredXp
    ) {
      return false;
    }
  }
  return true;
};
