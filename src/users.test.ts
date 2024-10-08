import { describe, expect, test } from "bun:test";
import { testClient } from "hono/testing";
import type { ZodIssue } from "zod";
import app, { type AppType } from "./users";

// これちょっとヤダ。どうにかする
type ZodErrorResponse = {
	success: false;
	error: {
		// see https://zod.dev/ERROR_HANDLING?id=zoderror
		issues: ZodIssue[];
		name: "ZodError";
	};
};

const client = testClient<AppType>(app);

describe("users app", () => {
	test("GET /333", async () => {
		const res = await client[":id"].$get({ param: { id: "333" } });
		expect(res.status).toEqual(200);
		expect(await res.json()).toEqual({ id: "333", age: 20, name: "Ultra-man" });
	});
	test("GET /aaa", async () => {
		const res = await client[":id"].$get({ param: { id: "aaa" } });
		expect(res.status).toEqual(200);
		expect(await res.json()).toEqual({ id: "aaa", age: 20, name: "Ultra-man" });
	});
	test("GET /12 (too short)", async () => {
		const res = await client[":id"].$get({ param: { id: "12" } });
		expect(res.ok).toBeFalse();
		expect(
			((await res.json()) as unknown as ZodErrorResponse).error.issues[0].code,
		).toEqual("too_small");
	});
});
