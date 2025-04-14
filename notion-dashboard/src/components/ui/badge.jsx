// src/components/ui/badge.jsx
import React from "react";
import clsx from "clsx";

export function Badge({ children, className = "" }) {
  return (
    <span
      className={clsx(
        "inline-block rounded-full text-white text-xs font-semibold px-3 py-1",
        className
      )}
    >
      {children}
    </span>
  );
}
