import { eq } from "drizzle-orm";
import { MySqlDateTimeStringBuilder } from "drizzle-orm/mysql-core";
import { db } from "../../../../db";
import { usersTable } from "../../../../db/schema";
import type { LifebotUser } from "../../../types/user";
import { jobPaths } from "../jobList";
import { checkUserRequirements } from "./checkUserRequirements";

export const checkForPromotion = async (user: LifebotUser) => {
	// check if this is the last job tier

	const nextTierPossible =
		jobPaths[user.jobPath].tiers.length > user.jobTierIndex + 1;

	if (!nextTierPossible) {
		return false;
	}

	const nextJobIndex = user.jobTierIndex + 1;
	const nextJobDetails = jobPaths[user.jobPath].tiers[nextJobIndex];

	if (
		!checkUserRequirements(
			user,
			jobPaths[user.jobPath].tiers[user.jobTierIndex + 1].requirements,
		)
	) {
		return false;
	}

	await db
		.update(usersTable)
		.set({
			hasJob: true,
			jobName: nextJobDetails.title,
			jobMinPay: nextJobDetails.basePay,
			jobMaxPay: nextJobDetails.maxPay,
			jobTierIndex: nextJobIndex,
		})
		.where(eq(usersTable.userId, user.userId));

	return true;
};
