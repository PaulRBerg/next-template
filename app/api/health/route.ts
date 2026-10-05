import { DateTime, Effect, Layer, Schema } from "effect";
import { HttpRouter, HttpServer } from "effect/http";
import { HttpApi, HttpApiBuilder, HttpApiEndpoint, HttpApiGroup } from "effect/http-api";

// Define API schema
class HealthApi extends HttpApiGroup.make("health").add(
  HttpApiEndpoint.get("check", "/", {
    success: Schema.Struct({
      status: Schema.Literal("healthy"),
      timestamp: Schema.String,
      version: Schema.String,
    }),
  })
) {}

class Api extends HttpApi.make("api").add(HealthApi).prefix("/api/health") {}

// Implement handler
const HealthLive = HttpApiBuilder.group(Api, "health", (handlers) =>
  handlers.handle("check", () =>
    Effect.gen(function* () {
      const now = yield* DateTime.now;

      return {
        status: "healthy" as const,
        timestamp: DateTime.formatIso(now),
        version: "1.0.0",
      };
    })
  )
);

const ApiLive = HttpApiBuilder.layer(Api).pipe(
  Layer.provide(HealthLive),
  Layer.provide(HttpServer.layerServices)
);

// Export Next.js handler
const { handler } = HttpRouter.toWebHandler(ApiLive);

type Handler = (req: Request) => Promise<Response>;
export const GET: Handler = handler;
