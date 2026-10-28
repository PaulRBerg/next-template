"use server";

import { Effect, Schema, SchemaIssue } from "effect";
import { BaseAction } from "./base";
import { EmailSchema } from "./schemas";

const formatIssues = SchemaIssue.makeFormatterStandardSchemaV1();

type FormState = { success: boolean; error?: string; email?: string } | null;

// Subscribe action effect - useActionState compatible
// Note: _prevState is required by useActionState signature but unused here
// (each submission is independent; use prevState for retry tracking or progressive validation)
const subscribeEffect = (_prevState: FormState, formData: FormData) =>
  Effect.gen(function* () {
    const email = formData.get("email") as string;

    // Decode with Effect Schema
    const input = yield* Schema.decodeUnknownEffect(EmailSchema)({ email });

    // Simulate API call (Effect.sleep replaces setTimeout)
    yield* Effect.sleep("1 second");

    return { email: input.email, success: true as const };
  }).pipe(
    Effect.catchTag("SchemaError", (error) => {
      // Surface the first Schema message without its path suffix
      const [issue] = formatIssues(error.issue).issues;
      const message = issue?.message ?? "Please enter a valid email address";
      return Effect.succeed({ error: message, success: false as const });
    })
  );

export const subscribe = BaseAction.build(subscribeEffect);
