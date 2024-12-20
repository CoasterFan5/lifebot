import { eq } from "drizzle-orm";
import Fastify, { fastify } from "fastify";
import {
	type ZodTypeProvider,
	serializerCompiler,
	validatorCompiler,
} from "fastify-type-provider-zod";
import { z } from "zod";
import { db } from "../db";
import { usersTable } from "../db/schema";

const api_key = process.env.API_KEY;
const app = Fastify({
	logger: true,
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.withTypeProvider<ZodTypeProvider>().route({
	method: "GET",
	url: "/api/v1/:key/user/:userId/balance",
	// Define your schema
	schema: {
		params: z.object({
			key: z.string(),
			userId: z.string(),
		}),
	},
	preHandler: async (req, res) => {
		if (req.params.key !== api_key) {
			res.code(401).send({ message: "Invalid Key" });
		}
	},
	handler: async (req, res) => {
		const { userId } = req.params;
		const user = await db
			.select()
			.from(usersTable)
			.where(eq(usersTable.userId, userId));

		if (user.length < 1) {
			return res.code(401).send(0);
		}

		res.send(user[0].balance);
	},
});

app.withTypeProvider<ZodTypeProvider>().route({
	method: "GET",
	url: "/api/v1/:key/user/:userId/balance/rm/:amount",
	// Define your schema
	schema: {
		params: z.object({
			key: z.string(),
			userId: z.string(),
			amount: z.coerce.number(),
		}),
	},
	preHandler: async (req, res) => {
		if (req.params.key !== api_key) {
			res.code(401).send({ message: "Invalid Key" });
		}
	},
	handler: async (req, res) => {
		const { userId } = req.params;
		const user = await db
			.select()
			.from(usersTable)
			.where(eq(usersTable.userId, userId));

		if (user.length < 1) {
			return res.code(200).send("Invalid");
		}

		const newBal = (user[0].balance || 0) - req.params.amount;
		if (newBal < 0) {
			return res.code(200).send("Invalid");
		}

		await db
			.update(usersTable)
			.set({
				balance: newBal,
			})
			.where(eq(usersTable.userId, userId));

		res.send(newBal);
	},
});

app.listen(
	{
		host: "::",
		port: Number.parseInt(process.env.PORT || "3000"),
	},
	(err, address) => {
		if (err) {
			console.error(err);
		}
	},
);
