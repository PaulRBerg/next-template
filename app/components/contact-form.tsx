"use client";

import { useState } from "react";
import { z } from "zod";
import { Button } from "./ui/button";

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export function ContactForm() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    const result = emailSchema.safeParse({ email });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0] as string] = issue.message;
        }
      });
      setErrors(fieldErrors);
      setIsLoading(false);
      return;
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitted(true);
    setIsLoading(false);
    setEmail("");
  };

  if (isSubmitted) {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-center dark:border-green-800 dark:bg-green-950">
        <p className="text-sm text-green-800 dark:text-green-200">
          ✅ Thanks for subscribing! We'll keep you updated.
        </p>
        <Button variant="ghost" size="sm" onClick={() => setIsSubmitted(false)} className="mt-2">
          Subscribe another email
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="text-center">
        <h3 className="font-semibold">Stay Updated</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Get notified about new template updates
        </p>
      </div>

      <div className="space-y-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your.email@example.com"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800"
        />
        {errors.email && <p className="text-sm text-red-600 dark:text-red-400">{errors.email}</p>}
      </div>

      <Button type="submit" disabled={isLoading} className="w-full" size="sm">
        {isLoading ? "Subscribing..." : "Subscribe"}
      </Button>
    </form>
  );
}
