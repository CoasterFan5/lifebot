import type { JobList } from "../../types/jobs";

/*
This is a long list of jobs, Don't try and use this for reference, use this google sheet:
https://docs.google.com/spreadsheets/d/1iiw_z3f-RekF3_eYe-svbvan2F4bOO4X9mYS1dtSBmU/edit?usp=sharing
*/

export const jobPaths: JobList = {
	retail: {
		companies: [
			"Doormart",
			"Goal",
			"Croaker",
			"SVC",
			"Teeter Faris",
			"Worstbuy",
		],
		tiers: [
			{
				title: "Bagger",
				basePay: 1000,
				maxPay: 2000,
				requirements: {
					technicalSkills: 0,
					creativity: 0,
					customerService: 0,
					organization: 0,
					leadership: 0,
					timeManagement: 0,
					teamwork: 0,
					workEthic: 0,
					criminality: 0,
					reputation: 0,
				},
				xpGrants: {
					technicalSkills: 1,
					creativity: 0,
					customerService: 1,
					organization: 0,
					leadership: 1,
					timeManagement: 1,
					teamwork: 1,
					workEthic: 1,
					criminality: 0,
					reputation: 1,
				},
			},
			{
				title: "Cashier",
				basePay: 2000,
				maxPay: 3500,
				requirements: {
					technicalSkills: 10,
					creativity: 0,
					customerService: 0,
					organization: 0,
					leadership: 0,
					timeManagement: 10,
					teamwork: 10,
					workEthic: 0,
					criminality: 0,
					reputation: 10,
				},
				xpGrants: {
					technicalSkills: 1,
					creativity: 1,
					customerService: 1,
					organization: 0,
					leadership: 1,
					timeManagement: 1,
					teamwork: 1,
					workEthic: 1,
					criminality: 0,
					reputation: 1,
				},
			},
			{
				title: "Stock Clerk",
				basePay: 3500,
				maxPay: 5000,
				requirements: {
					technicalSkills: 10,
					creativity: 25,
					customerService: 10,
					organization: 0,
					leadership: 10,
					timeManagement: 25,
					teamwork: 25,
					workEthic: 10,
					criminality: 0,
					reputation: 25,
				},
				xpGrants: {
					technicalSkills: 1,
					creativity: 1,
					customerService: 1,
					organization: 1,
					leadership: 1,
					timeManagement: 1,
					teamwork: 1,
					workEthic: 1,
					criminality: 0,
					reputation: 1,
				},
			},
			{
				title: "Assistant Store Manager",
				basePay: 5000,
				maxPay: 7500,
				requirements: {
					technicalSkills: 10,
					creativity: 50,
					customerService: 25,
					organization: 50,
					leadership: 25,
					timeManagement: 50,
					teamwork: 50,
					workEthic: 25,
					criminality: 0,
					reputation: 50,
				},
				xpGrants: {
					technicalSkills: 1,
					creativity: 1,
					customerService: 1,
					organization: 1,
					leadership: 1,
					timeManagement: 1,
					teamwork: 1,
					workEthic: 1,
					criminality: 0,
					reputation: 1,
				},
			},
			{
				title: "Store Manager",
				basePay: 7500,
				maxPay: 10000,
				requirements: {
					technicalSkills: 50,
					creativity: 100,
					customerService: 50,
					organization: 100,
					leadership: 50,
					timeManagement: 100,
					teamwork: 100,
					workEthic: 50,
					criminality: 0,
					reputation: 100,
				},
				xpGrants: {
					technicalSkills: 1,
					creativity: 0,
					customerService: 1,
					organization: 1,
					leadership: 1,
					timeManagement: 1,
					teamwork: 1,
					workEthic: 1,
					criminality: 0,
					reputation: 1,
				},
			},
			{
				title: "Regional Manager",
				basePay: 10000,
				maxPay: 15000,
				requirements: {
					technicalSkills: 100,
					creativity: 150,
					customerService: 100,
					organization: 250,
					leadership: 100,
					timeManagement: 250,
					teamwork: 250,
					workEthic: 100,
					criminality: 0,
					reputation: 250,
				},
				xpGrants: {
					technicalSkills: 1,
					creativity: 1,
					customerService: 1,
					organization: 2,
					leadership: 1,
					timeManagement: 1,
					teamwork: 1,
					workEthic: 1,
					criminality: 0,
					reputation: 1,
				},
			},
		],
	},
	restaurant: {
		companies: [
			"Blue Crab",
			"Onion Garden",
			"Shorthorn Steakhouse",
			"Ender's Bar and Grill",
			"Sharky Warky's",
		],
		tiers: [
			{
				title: "Busser",
				basePay: 1000,
				maxPay: 1500,
				requirements: {
					technicalSkills: 0,
					creativity: 0,
					customerService: 0,
					organization: 0,
					leadership: 0,
					timeManagement: 0,
					teamwork: 0,
					workEthic: 0,
					criminality: 0,
					reputation: 0,
				},
				xpGrants: {
					technicalSkills: 0,
					creativity: 0,
					customerService: 1,
					organization: 0,
					leadership: 1,
					timeManagement: 1,
					teamwork: 1,
					workEthic: 1,
					criminality: 0,
					reputation: 1,
				},
			},
			{
				title: "Food Runner",
				basePay: 1500,
				maxPay: 2500,
				requirements: {
					technicalSkills: 0,
					creativity: 0,
					customerService: 10,
					organization: 0,
					leadership: 10,
					timeManagement: 0,
					teamwork: 0,
					workEthic: 0,
					criminality: 0,
					reputation: 10,
				},
				xpGrants: {
					technicalSkills: 1,
					creativity: 0,
					customerService: 1,
					organization: 0,
					leadership: 1,
					timeManagement: 1,
					teamwork: 1,
					workEthic: 1,
					criminality: 0,
					reputation: 1,
				},
			},
			{
				title: "Host",
				basePay: 2500,
				maxPay: 4000,
				requirements: {
					technicalSkills: 10,
					creativity: 0,
					customerService: 25,
					organization: 0,
					leadership: 25,
					timeManagement: 10,
					teamwork: 10,
					workEthic: 10,
					criminality: 0,
					reputation: 25,
				},
				xpGrants: {
					technicalSkills: 1,
					creativity: 1,
					customerService: 1,
					organization: 0,
					leadership: 1,
					timeManagement: 1,
					teamwork: 1,
					workEthic: 1,
					criminality: 0,
					reputation: 1,
				},
			},
			{
				title: "Sommelier",
				basePay: 4000,
				maxPay: 6000,
				requirements: {
					technicalSkills: 25,
					creativity: 25,
					customerService: 25,
					organization: 0,
					leadership: 50,
					timeManagement: 25,
					teamwork: 25,
					workEthic: 25,
					criminality: 0,
					reputation: 50,
				},
				xpGrants: {
					technicalSkills: 1,
					creativity: 1,
					customerService: 1,
					organization: 0,
					leadership: 1,
					timeManagement: 1,
					teamwork: 1,
					workEthic: 1,
					criminality: 0,
					reputation: 1,
				},
			},
			{
				title: "Server",
				basePay: 6000,
				maxPay: 10000,
				requirements: {
					technicalSkills: 50,
					creativity: 100,
					customerService: 125,
					organization: 0,
					leadership: 100,
					timeManagement: 50,
					teamwork: 50,
					workEthic: 50,
					criminality: 0,
					reputation: 100,
				},
				xpGrants: {
					technicalSkills: 1,
					creativity: 2,
					customerService: 1,
					organization: 1,
					leadership: 1,
					timeManagement: 1,
					teamwork: 1,
					workEthic: 1,
					criminality: 0,
					reputation: 1,
				},
			},
			{
				title: "Floor Manager",
				basePay: 10000,
				maxPay: 15000,
				requirements: {
					technicalSkills: 100,
					creativity: 100,
					customerService: 250,
					organization: 50,
					leadership: 250,
					timeManagement: 100,
					teamwork: 100,
					workEthic: 100,
					criminality: 0,
					reputation: 250,
				},
				xpGrants: {
					technicalSkills: 1,
					creativity: 2,
					customerService: 1,
					organization: 2,
					leadership: 1,
					timeManagement: 1,
					teamwork: 1,
					workEthic: 1,
					criminality: 0,
					reputation: 1,
				},
			},
			{
				title: "General Manager",
				basePay: 15000,
				maxPay: 20000,
				requirements: {
					technicalSkills: 250,
					creativity: 100,
					customerService: 500,
					organization: 100,
					leadership: 500,
					timeManagement: 250,
					teamwork: 250,
					workEthic: 250,
					criminality: 0,
					reputation: 500,
				},
				xpGrants: {
					technicalSkills: 1,
					creativity: 2,
					customerService: 2,
					organization: 2,
					leadership: 1,
					timeManagement: 1,
					teamwork: 1,
					workEthic: 1,
					criminality: 0,
					reputation: 1,
				},
			},
		],
	},
	construction: {
		companies: ["CF5 Group", "RAE", "Dragon"],
		tiers: [
			{
				title: "General Laborer",
				basePay: 1000,
				maxPay: 2000,
				requirements: {
					technicalSkills: 0,
					creativity: 0,
					customerService: 0,
					organization: 0,
					leadership: 0,
					timeManagement: 0,
					teamwork: 0,
					workEthic: 0,
					criminality: 0,
					reputation: 0,
				},
				xpGrants: {
					technicalSkills: 1,
					creativity: 0,
					customerService: 1,
					organization: 0,
					leadership: 1,
					timeManagement: 1,
					teamwork: 1,
					workEthic: 1,
					criminality: 0,
					reputation: 1,
				},
			},
			{
				title: "Apprentice",
				basePay: 2000,
				maxPay: 3500,
				requirements: {
					technicalSkills: 0,
					creativity: 0,
					customerService: 15,
					organization: 0,
					leadership: 15,
					timeManagement: 10,
					teamwork: 10,
					workEthic: 10,
					criminality: 0,
					reputation: 10,
				},
				xpGrants: {
					technicalSkills: 1,
					creativity: 0,
					customerService: 1,
					organization: 1,
					leadership: 1,
					timeManagement: 1,
					teamwork: 1,
					workEthic: 1,
					criminality: 0,
					reputation: 1,
				},
			},
			{
				title: "Skilled Tradesperson",
				basePay: 3500,
				maxPay: 5000,
				requirements: {
					technicalSkills: 0,
					creativity: 0,
					customerService: 30,
					organization: 10,
					leadership: 35,
					timeManagement: 25,
					teamwork: 25,
					workEthic: 25,
					criminality: 0,
					reputation: 25,
				},
				xpGrants: {
					technicalSkills: 1,
					creativity: 0,
					customerService: 1,
					organization: 1,
					leadership: 1,
					timeManagement: 1,
					teamwork: 1,
					workEthic: 1,
					criminality: 0,
					reputation: 1,
				},
			},
			{
				title: "Foreman",
				basePay: 5000,
				maxPay: 7500,
				requirements: {
					technicalSkills: 75,
					creativity: 0,
					customerService: 55,
					organization: 75,
					leadership: 65,
					timeManagement: 50,
					teamwork: 50,
					workEthic: 50,
					criminality: 0,
					reputation: 50,
				},
				xpGrants: {
					technicalSkills: 1,
					creativity: 0,
					customerService: 1,
					organization: 1,
					leadership: 1,
					timeManagement: 1,
					teamwork: 1,
					workEthic: 1,
					criminality: 0,
					reputation: 1,
				},
			},
			{
				title: "Construction Supervisor",
				basePay: 7500,
				maxPay: 10000,
				requirements: {
					technicalSkills: 100,
					creativity: 0,
					customerService: 125,
					organization: 100,
					leadership: 125,
					timeManagement: 100,
					teamwork: 100,
					workEthic: 100,
					criminality: 0,
					reputation: 100,
				},
				xpGrants: {
					technicalSkills: 1,
					creativity: 0,
					customerService: 1,
					organization: 1,
					leadership: 1,
					timeManagement: 1,
					teamwork: 1,
					workEthic: 1,
					criminality: 0,
					reputation: 1,
				},
			},
			{
				title: "Project Manager",
				basePay: 10000,
				maxPay: 15000,
				requirements: {
					technicalSkills: 100,
					creativity: 0,
					customerService: 275,
					organization: 100,
					leadership: 275,
					timeManagement: 250,
					teamwork: 250,
					workEthic: 250,
					criminality: 0,
					reputation: 250,
				},
				xpGrants: {
					technicalSkills: 1,
					creativity: 0,
					customerService: 1,
					organization: 1,
					leadership: 1,
					timeManagement: 1,
					teamwork: 1,
					workEthic: 1,
					criminality: 0,
					reputation: 1,
				},
			},
			{
				title: "Site Manager",
				basePay: 15000,
				maxPay: 20000,
				requirements: {
					technicalSkills: 100,
					creativity: 0,
					customerService: 550,
					organization: 100,
					leadership: 550,
					timeManagement: 500,
					teamwork: 500,
					workEthic: 500,
					criminality: 0,
					reputation: 500,
				},
				xpGrants: {
					technicalSkills: 1,
					creativity: 0,
					customerService: 2,
					organization: 1,
					leadership: 1,
					timeManagement: 1,
					teamwork: 1,
					workEthic: 1,
					criminality: 0,
					reputation: 1,
				},
			},
			{
				title: "Regional Operations Manager",
				basePay: 20000,
				maxPay: 30000,
				requirements: {
					technicalSkills: 100,
					creativity: 0,
					customerService: 1100,
					organization: 100,
					leadership: 1100,
					timeManagement: 1000,
					teamwork: 1000,
					workEthic: 1000,
					criminality: 0,
					reputation: 1000,
				},
				xpGrants: {
					technicalSkills: 2,
					creativity: 0,
					customerService: 2,
					organization: 1,
					leadership: 1,
					timeManagement: 1,
					teamwork: 1,
					workEthic: 1,
					criminality: 0,
					reputation: 1,
				},
			},
		],
	},
	hospitality: {
		companies: ["Marry Gyat", "Hiltop", "Motel 12", "Rizz Carlton", "Westout"],
		tiers: [
			{
				title: "Housekeeper",
				basePay: 250,
				maxPay: 1000,
				requirements: {
					technicalSkills: 0,
					creativity: 0,
					customerService: 0,
					organization: 0,
					leadership: 0,
					timeManagement: 0,
					teamwork: 0,
					workEthic: 0,
					criminality: 0,
					reputation: 0,
				},
				xpGrants: {
					technicalSkills: 1,
					creativity: 1,
					customerService: 1,
					organization: 0,
					leadership: 1,
					timeManagement: 0,
					teamwork: 0,
					workEthic: 1,
					criminality: 0,
					reputation: 1,
				},
			},
			{
				title: "Bellhop",
				basePay: 1000,
				maxPay: 2500,
				requirements: {
					technicalSkills: 0,
					creativity: 15,
					customerService: 10,
					organization: 0,
					leadership: 15,
					timeManagement: 0,
					teamwork: 0,
					workEthic: 10,
					criminality: 0,
					reputation: 10,
				},
				xpGrants: {
					technicalSkills: 1,
					creativity: 1,
					customerService: 1,
					organization: 0,
					leadership: 1,
					timeManagement: 1,
					teamwork: 1,
					workEthic: 1,
					criminality: 0,
					reputation: 1,
				},
			},
			{
				title: "Receoptionist",
				basePay: 2500,
				maxPay: 5000,
				requirements: {
					technicalSkills: 25,
					creativity: 35,
					customerService: 25,
					organization: 0,
					leadership: 35,
					timeManagement: 5,
					teamwork: 5,
					workEthic: 25,
					criminality: 0,
					reputation: 25,
				},
				xpGrants: {
					technicalSkills: 1,
					creativity: 1,
					customerService: 1,
					organization: 1,
					leadership: 1,
					timeManagement: 1,
					teamwork: 1,
					workEthic: 1,
					criminality: 0,
					reputation: 1,
				},
			},
			{
				title: "Concierge",
				basePay: 5000,
				maxPay: 7500,
				requirements: {
					technicalSkills: 50,
					creativity: 65,
					customerService: 50,
					organization: 0,
					leadership: 65,
					timeManagement: 10,
					teamwork: 10,
					workEthic: 50,
					criminality: 0,
					reputation: 50,
				},
				xpGrants: {
					technicalSkills: 1,
					creativity: 1,
					customerService: 1,
					organization: 1,
					leadership: 1,
					timeManagement: 1,
					teamwork: 1,
					workEthic: 1,
					criminality: 0,
					reputation: 1,
				},
			},
			{
				title: "Events Coordinator",
				basePay: 7500,
				maxPay: 15000,
				requirements: {
					technicalSkills: 100,
					creativity: 125,
					customerService: 100,
					organization: 75,
					leadership: 125,
					timeManagement: 15,
					teamwork: 15,
					workEthic: 100,
					criminality: 0,
					reputation: 100,
				},
				xpGrants: {
					technicalSkills: 1,
					creativity: 1,
					customerService: 1,
					organization: 1,
					leadership: 1,
					timeManagement: 1,
					teamwork: 1,
					workEthic: 1,
					criminality: 0,
					reputation: 1,
				},
			},
			{
				title: "Guest Services Manager",
				basePay: 15000,
				maxPay: 22500,
				requirements: {
					technicalSkills: 250,
					creativity: 275,
					customerService: 100,
					organization: 150,
					leadership: 275,
					timeManagement: 20,
					teamwork: 20,
					workEthic: 250,
					criminality: 0,
					reputation: 250,
				},
				xpGrants: {
					technicalSkills: 1,
					creativity: 1,
					customerService: 1,
					organization: 1,
					leadership: 1,
					timeManagement: 1,
					teamwork: 1,
					workEthic: 1,
					criminality: 0,
					reputation: 1,
				},
			},
			{
				title: "Hotel Manager",
				basePay: 22500,
				maxPay: 27500,
				requirements: {
					technicalSkills: 500,
					creativity: 550,
					customerService: 100,
					organization: 500,
					leadership: 550,
					timeManagement: 25,
					teamwork: 25,
					workEthic: 500,
					criminality: 0,
					reputation: 500,
				},
				xpGrants: {
					technicalSkills: 1,
					creativity: 1,
					customerService: 1,
					organization: 1,
					leadership: 1,
					timeManagement: 1,
					teamwork: 1,
					workEthic: 1,
					criminality: 0,
					reputation: 1,
				},
			},
			{
				title: "Regional Hotel Manager",
				basePay: 27500,
				maxPay: 30000,
				requirements: {
					technicalSkills: 1000,
					creativity: 1100,
					customerService: 100,
					organization: 1000,
					leadership: 1100,
					timeManagement: 30,
					teamwork: 30,
					workEthic: 1000,
					criminality: 0,
					reputation: 1000,
				},
				xpGrants: {
					technicalSkills: 1,
					creativity: 1,
					customerService: 1,
					organization: 2,
					leadership: 1,
					timeManagement: 1,
					teamwork: 1,
					workEthic: 1,
					criminality: 0,
					reputation: 1,
				},
			},
		],
	},
	cooking: {
		companies: [
			"Blue Crab",
			"Onion Garden",
			"Shorthorn Steakhouse",
			"Ender's Bar and Grill",
			"Sharky Warky's",
		],
		tiers: [
			{
				title: "Diswasher",
				basePay: 500,
				maxPay: 1000,
				requirements: {
					technicalSkills: 0,
					creativity: 0,
					customerService: 0,
					organization: 0,
					leadership: 0,
					timeManagement: 0,
					teamwork: 0,
					workEthic: 0,
					criminality: 0,
					reputation: 0,
				},
				xpGrants: {
					technicalSkills: 0,
					creativity: 0,
					customerService: 1,
					organization: 0,
					leadership: 1,
					timeManagement: 0,
					teamwork: 0,
					workEthic: 1,
					criminality: 0,
					reputation: 1,
				},
			},
			{
				title: "Prep Cook",
				basePay: 1000,
				maxPay: 2500,
				requirements: {
					technicalSkills: 0,
					creativity: 0,
					customerService: 10,
					organization: 0,
					leadership: 10,
					timeManagement: 10,
					teamwork: 10,
					workEthic: 10,
					criminality: 0,
					reputation: 10,
				},
				xpGrants: {
					technicalSkills: 0,
					creativity: 0,
					customerService: 1,
					organization: 0,
					leadership: 1,
					timeManagement: 1,
					teamwork: 1,
					workEthic: 1,
					criminality: 0,
					reputation: 1,
				},
			},
			{
				title: "Line Cook",
				basePay: 2500,
				maxPay: 5000,
				requirements: {
					technicalSkills: 0,
					creativity: 0,
					customerService: 25,
					organization: 0,
					leadership: 25,
					timeManagement: 25,
					teamwork: 25,
					workEthic: 10,
					criminality: 0,
					reputation: 25,
				},
				xpGrants: {
					technicalSkills: 0,
					creativity: 0,
					customerService: 1,
					organization: 0,
					leadership: 1,
					timeManagement: 1,
					teamwork: 1,
					workEthic: 1,
					criminality: 0,
					reputation: 1,
				},
			},
			{
				title: "Sous Chef",
				basePay: 5000,
				maxPay: 10000,
				requirements: {
					technicalSkills: 0,
					creativity: 0,
					customerService: 50,
					organization: 100,
					leadership: 50,
					timeManagement: 50,
					teamwork: 50,
					workEthic: 10,
					criminality: 0,
					reputation: 50,
				},
				xpGrants: {
					technicalSkills: 0,
					creativity: 0,
					customerService: 1,
					organization: 1,
					leadership: 1,
					timeManagement: 1,
					teamwork: 1,
					workEthic: 1,
					criminality: 0,
					reputation: 1,
				},
			},
			{
				title: "Executive Chef",
				basePay: 10000,
				maxPay: 20000,
				requirements: {
					technicalSkills: 0,
					creativity: 0,
					customerService: 100,
					organization: 250,
					leadership: 100,
					timeManagement: 100,
					teamwork: 100,
					workEthic: 10,
					criminality: 0,
					reputation: 100,
				},
				xpGrants: {
					technicalSkills: 0,
					creativity: 0,
					customerService: 1,
					organization: 1,
					leadership: 1,
					timeManagement: 1,
					teamwork: 1,
					workEthic: 1,
					criminality: 0,
					reputation: 1,
				},
			},
			{
				title: "R&D Chef",
				basePay: 20000,
				maxPay: 30000,
				requirements: {
					technicalSkills: 0,
					creativity: 0,
					customerService: 250,
					organization: 500,
					leadership: 250,
					timeManagement: 250,
					teamwork: 250,
					workEthic: 10,
					criminality: 0,
					reputation: 250,
				},
				xpGrants: {
					technicalSkills: 0,
					creativity: 0,
					customerService: 1,
					organization: 1,
					leadership: 1,
					timeManagement: 1,
					teamwork: 1,
					workEthic: 1,
					criminality: 0,
					reputation: 1,
				},
			},
		],
	},
	software: {
		companies: ["Facenovel", "Orange", "Sahara", "WebFlix", "Goggle"],
		tiers: [
			{
				title: "Software Developer Intern",
				basePay: 2500,
				maxPay: 3500,
				requirements: {
					technicalSkills: 10,
					creativity: 0,
					customerService: 0,
					organization: 0,
					leadership: 10,
					timeManagement: 0,
					teamwork: 0,
					workEthic: 10,
					criminality: 0,
					reputation: 0,
				},
				xpGrants: {
					technicalSkills: 1,
					creativity: 0,
					customerService: 1,
					organization: 0,
					leadership: 1,
					timeManagement: 1,
					teamwork: 1,
					workEthic: 1,
					criminality: 0,
					reputation: 1,
				},
			},
			{
				title: "Jr. Software Developer",
				basePay: 3500,
				maxPay: 5000,
				requirements: {
					technicalSkills: 25,
					creativity: 0,
					customerService: 10,
					organization: 0,
					leadership: 25,
					timeManagement: 10,
					teamwork: 10,
					workEthic: 25,
					criminality: 0,
					reputation: 10,
				},
				xpGrants: {
					technicalSkills: 1,
					creativity: 0,
					customerService: 1,
					organization: 0,
					leadership: 1,
					timeManagement: 1,
					teamwork: 1,
					workEthic: 1,
					criminality: 0,
					reputation: 1,
				},
			},
			{
				title: "Software Developer",
				basePay: 5000,
				maxPay: 10000,
				requirements: {
					technicalSkills: 50,
					creativity: 0,
					customerService: 25,
					organization: 0,
					leadership: 50,
					timeManagement: 25,
					teamwork: 25,
					workEthic: 50,
					criminality: 0,
					reputation: 25,
				},
				xpGrants: {
					technicalSkills: 2,
					creativity: 0,
					customerService: 1,
					organization: 1,
					leadership: 1,
					timeManagement: 1,
					teamwork: 1,
					workEthic: 1,
					criminality: 0,
					reputation: 1,
				},
			},
			{
				title: "Sr. Software Developer",
				basePay: 10000,
				maxPay: 15000,
				requirements: {
					technicalSkills: 100,
					creativity: 0,
					customerService: 50,
					organization: 100,
					leadership: 100,
					timeManagement: 50,
					teamwork: 50,
					workEthic: 100,
					criminality: 0,
					reputation: 50,
				},
				xpGrants: {
					technicalSkills: 2,
					creativity: 0,
					customerService: 1,
					organization: 1,
					leadership: 1,
					timeManagement: 1,
					teamwork: 1,
					workEthic: 1,
					criminality: 0,
					reputation: 1,
				},
			},
			{
				title: "Software Team Lead",
				basePay: 15000,
				maxPay: 25000,
				requirements: {
					technicalSkills: 250,
					creativity: 0,
					customerService: 100,
					organization: 250,
					leadership: 250,
					timeManagement: 100,
					teamwork: 100,
					workEthic: 250,
					criminality: 0,
					reputation: 100,
				},
				xpGrants: {
					technicalSkills: 3,
					creativity: 0,
					customerService: 1,
					organization: 2,
					leadership: 1,
					timeManagement: 1,
					teamwork: 1,
					workEthic: 1,
					criminality: 0,
					reputation: 1,
				},
			},
			{
				title: "CTO",
				basePay: 25000,
				maxPay: 35000,
				requirements: {
					technicalSkills: 500,
					creativity: 0,
					customerService: 250,
					organization: 2500,
					leadership: 500,
					timeManagement: 250,
					teamwork: 250,
					workEthic: 500,
					criminality: 0,
					reputation: 250,
				},
				xpGrants: {
					technicalSkills: 3,
					creativity: 0,
					customerService: 1,
					organization: 3,
					leadership: 1,
					timeManagement: 1,
					teamwork: 1,
					workEthic: 1,
					criminality: 0,
					reputation: 1,
				},
			},
		],
	},
	criminals: {
		companies: [
			"Lifebot Mob",
			"Drug Inc.",
			"Bad Boys LLC",
			"Thieven",
			"Wild's Crime Ring",
		],
		tiers: [
			{
				title: "Lookout",
				basePay: 250,
				maxPay: 1000,
				requirements: {
					technicalSkills: 0,
					creativity: 0,
					customerService: 0,
					organization: 0,
					leadership: 0,
					timeManagement: 0,
					teamwork: 0,
					workEthic: 0,
					criminality: 10,
					reputation: 0,
				},
				xpGrants: {
					technicalSkills: 0,
					creativity: 1,
					customerService: 1,
					organization: 1,
					leadership: 1,
					timeManagement: 1,
					teamwork: 1,
					workEthic: 1,
					criminality: 1,
					reputation: 1,
				},
			},
			{
				title: "Runner",
				basePay: 1000,
				maxPay: 2500,
				requirements: {
					technicalSkills: 0,
					creativity: 20,
					customerService: 0,
					organization: 0,
					leadership: 0,
					timeManagement: 10,
					teamwork: 10,
					workEthic: 10,
					criminality: 25,
					reputation: 10,
				},
				xpGrants: {
					technicalSkills: 0,
					creativity: 2,
					customerService: 1,
					organization: 1,
					leadership: 1,
					timeManagement: 1,
					teamwork: 1,
					workEthic: 1,
					criminality: 1,
					reputation: 1,
				},
			},
			{
				title: "Captain",
				basePay: 2500,
				maxPay: 5000,
				requirements: {
					technicalSkills: 0,
					creativity: 50,
					customerService: 100,
					organization: 10,
					leadership: 10,
					timeManagement: 25,
					teamwork: 25,
					workEthic: 25,
					criminality: 50,
					reputation: 25,
				},
				xpGrants: {
					technicalSkills: 0,
					creativity: 1,
					customerService: 1,
					organization: 1,
					leadership: 1,
					timeManagement: 1,
					teamwork: 1,
					workEthic: 1,
					criminality: 2,
					reputation: 1,
				},
			},
			{
				title: "Lieutenant",
				basePay: 5000,
				maxPay: 7500,
				requirements: {
					technicalSkills: 0,
					creativity: 100,
					customerService: 250,
					organization: 50,
					leadership: 25,
					timeManagement: 50,
					teamwork: 50,
					workEthic: 50,
					criminality: 100,
					reputation: 50,
				},
				xpGrants: {
					technicalSkills: 0,
					creativity: 1,
					customerService: 1,
					organization: 1,
					leadership: 1,
					timeManagement: 1,
					teamwork: 1,
					workEthic: 1,
					criminality: 2,
					reputation: 1,
				},
			},
			{
				title: "Underboss",
				basePay: 7500,
				maxPay: 15000,
				requirements: {
					technicalSkills: 0,
					creativity: 200,
					customerService: 500,
					organization: 100,
					leadership: 50,
					timeManagement: 100,
					teamwork: 100,
					workEthic: 100,
					criminality: 250,
					reputation: 100,
				},
				xpGrants: {
					technicalSkills: 0,
					creativity: 1,
					customerService: 1,
					organization: 1,
					leadership: 1,
					timeManagement: 1,
					teamwork: 1,
					workEthic: 1,
					criminality: 2,
					reputation: 1,
				},
			},
			{
				title: "Kingpin",
				basePay: 15000,
				maxPay: 25000,
				requirements: {
					technicalSkills: 0,
					creativity: 500,
					customerService: 500,
					organization: 250,
					leadership: 100,
					timeManagement: 250,
					teamwork: 250,
					workEthic: 250,
					criminality: 500,
					reputation: 250,
				},
				xpGrants: {
					technicalSkills: 0,
					creativity: 1,
					customerService: 1,
					organization: 1,
					leadership: 1,
					timeManagement: 1,
					teamwork: 1,
					workEthic: 1,
					criminality: 2,
					reputation: 1,
				},
			},
			{
				title: "Mastermind",
				basePay: 25000,
				maxPay: 50000,
				requirements: {
					technicalSkills: 0,
					creativity: 1000,
					customerService: 500,
					organization: 500,
					leadership: 250,
					timeManagement: 500,
					teamwork: 500,
					workEthic: 500,
					criminality: 1000,
					reputation: 500,
				},
				xpGrants: {
					technicalSkills: 0,
					creativity: 1,
					customerService: 1,
					organization: 1,
					leadership: 1,
					timeManagement: 1,
					teamwork: 1,
					workEthic: 1,
					criminality: 3,
					reputation: 1,
				},
			},
		],
	},
};
