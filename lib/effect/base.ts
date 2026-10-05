import "server-only";

import { Next } from "@prb/effect-next/handlers";
import { Layer, References } from "effect";

// Stateless base layer - no runtime management needed
const AppLive = Layer.succeed(References.MinimumLogLevel, "Info");

// Base handlers for different contexts
export const BasePage = Next.make("BasePage", AppLive);
export const BaseAction = Next.make("BaseAction", AppLive);
export const BaseApi = Next.make("BaseApi", AppLive);
