import type { RegisterForm } from "./types.server";
import { prisma } from "./prisma.server"
import { json } from "@remix-run/node"

// register function
export async function register(user: RegisterForm) {
	/* Query the database with the email provided.
	The `count` function returns a numeric value.
	If there are no records matching the query,
	it will return 0, which evaluates to `false`.
	Otherwise, it will return a value greater than 0,
	which evaluates to `true`. */
	const exists = await prisma.user.count({ where: { email: user.email } })
	// If a user is found, the function will return
	// a json response with a `400` status code
	if (exists) {
		return json({ error: `User already exists with that email` }, { status: 400 })
	}
}
