import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import { ParamsSchema, UserSchema } from "./schemes";

const route = createRoute({
	method: "get",
	path: "/{id}",
	request: {
		params: ParamsSchema,
	},
	responses: {
		200: {
			content: {
				"application/json": {
					schema: UserSchema,
				},
			},
			description: "Retrieve the user",
		},
	},
});

const app = new OpenAPIHono();

const route2 = app.openapi(route, (c) => {
	const { id } = c.req.valid("param");
	return c.json({
		id,
		age: 20,
		name: "Ultra-man",
	});
});

export type AppType = typeof route2;
export default app;
