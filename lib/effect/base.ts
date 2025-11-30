import { Next } from "@mcrovero/effect-nextjs";
import { Layer, Logger, LogLevel } from "effect";

// Stateless base layer - no runtime management needed
const AppLive = Layer.empty.pipe(Layer.provide(Logger.minimumLogLevel(LogLevel.Info)));

// Base handlers for different contexts
export const BasePage = Next.make("BasePage", AppLive);
export const BaseAction = Next.make("BaseAction", AppLive);
export const BaseApi = Next.make("BaseApi", AppLive);
