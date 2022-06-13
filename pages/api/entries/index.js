import { listEventEntries, createEventEntry } from "@/lib/fauna";

export default async function handler(req, res) {
	const handlers = {
		GET: async () => {
			const entries = await listEventEntries();
			res.json(entries);
		},

		POST: async () => {
			const {
				body: { name, message },
			} = req;
			const created = await createEventEntry({
				name,
				message,
				createdAt: new Date(),
			});

			res.json(created);
		},
	};

	if (!handlers[req.method]) {
		return res.status(405).end();
	}

	await handlers[req.method]();
}
