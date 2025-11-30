import { Schema } from "effect";

// Email validation schema (replaces Zod)
export const EmailSchema = Schema.Struct({
  email: Schema.String.pipe(
    Schema.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
      message: () => "Please enter a valid email address",
    }),
  ),
});

export type EmailInput = typeof EmailSchema.Type;

// API response schemas
export const HealthCheckSchema = Schema.Struct({
  status: Schema.Literal("healthy"),
  timestamp: Schema.String,
  version: Schema.String,
});
