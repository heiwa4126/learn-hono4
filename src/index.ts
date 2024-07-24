import { OpenAPIHono } from "@hono/zod-openapi";
import users from "./users";

const app = new OpenAPIHono();
app.route("/users", users);

// The OpenAPI documentation will be available at /doc
app.doc("/doc", {
	openapi: "3.0.0",
	info: {
		version: "1.0.0",
		title: "My API",
	},
});

export default app;
