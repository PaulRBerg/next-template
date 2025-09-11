"use client";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useEffect, useState } from "react";

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

interface TimestampProps {
  date?: string | Date;
  label?: string;
}

export function Timestamp({ date = dayjs().toDate(), label = "Last updated" }: TimestampProps) {
  const [showRelative, setShowRelative] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const timestamp = dayjs(date);
  const relativeTime = timestamp.fromNow();
  const absoluteTime = timestamp.format("YYYY-MM-DD [at] HH:mm A");

  // Prevent hydration mismatch
  if (!mounted) {
    return <div className="text-xs text-gray-500 dark:text-gray-400">{label}: Loading...</div>;
  }

  return (
    <button
      type="button"
      onClick={() => setShowRelative(!showRelative)}
      className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors cursor-pointer"
      title="Click to toggle between relative and absolute time"
    >
      {label}: {showRelative ? relativeTime : absoluteTime}
    </button>
  );
}
