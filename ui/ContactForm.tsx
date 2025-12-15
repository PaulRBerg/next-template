"use client";

import { useActionState } from "react";
import { subscribe } from "@/lib/effect/actions";
import { Button } from "./Button";

type FormState = { success: boolean; error?: string; email?: string } | null;

export function ContactForm() {
  const [state, formAction, isPending] = useActionState<FormState, FormData>(subscribe, null);

  if (state?.success) {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-center dark:border-green-800 dark:bg-green-950">
        <p className="text-green-800 text-sm dark:text-green-200">
          ✅ Thanks for subscribing! We'll keep you updated.
        </p>
        <Button className="mt-2" onClick={() => window.location.reload()} size="sm" variant="ghost">
          Subscribe another email
        </Button>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-3">
      <div className="text-center">
        <h3 className="font-semibold">Stay Updated</h3>
        <p className="text-gray-600 text-sm dark:text-gray-400">
          Get notified about new template updates
        </p>
      </div>

      <div className="space-y-2">
        <input
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800"
          name="email"
          placeholder="your.email@example.com"
          type="email"
        />
        {state?.error !== undefined && (
          <p className="text-red-600 text-sm dark:text-red-400">{state.error}</p>
        )}
      </div>

      <Button className="w-full" disabled={isPending} size="sm" type="submit">
        {isPending ? "Subscribing..." : "Subscribe"}
      </Button>
    </form>
  );
}
