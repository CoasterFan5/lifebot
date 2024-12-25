import type { SkillValues } from "../../../types/jobs";
import type { StringedObject } from "../../../types/stringedObject";
import type { LifebotUser } from "../../../types/user";

export const checkUserRequirements: (
	user: LifebotUser,
	jobRequirements: SkillValues,
) => boolean = (user, jobRequirements) => {
	for (const skillName in jobRequirements) {
		const requiredXp = (jobRequirements as StringedObject<number>)[skillName];
		if (
			(user as unknown as StringedObject<number>)[skillName as string] <
			requiredXp
		) {
			return false;
		}
	}
	return true;
};
