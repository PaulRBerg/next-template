import {
  HttpApi,
  HttpApiBuilder,
  HttpApiEndpoint,
  HttpApiGroup,
  HttpServer,
} from "@effect/platform";
import { DateTime, Effect, Layer, Schema } from "effect";

// Define API schema
class HealthApi extends HttpApiGroup.make("health").add(
  HttpApiEndpoint.get("check", "/").addSuccess(
    Schema.Struct({
      status: Schema.Literal("healthy"),
      timestamp: Schema.String,
      version: Schema.String,
    })
  )
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

const ApiLive = HttpApiBuilder.api(Api).pipe(Layer.provide(HealthLive));

// Export Next.js handler
const { handler } = Layer.empty.pipe(
  Layer.provideMerge(ApiLive),
  Layer.merge(HttpServer.layerContext),
  HttpApiBuilder.toWebHandler
);

type Handler = (req: Request) => Promise<Response>;
export const GET: Handler = handler;
