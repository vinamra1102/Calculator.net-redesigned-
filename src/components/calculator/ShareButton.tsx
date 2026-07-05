"use client";

import { useState } from "react";
import { Link2, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function ShareButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for environments without clipboard API
      const input = document.createElement("input");
      input.value = window.location.href;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Button variant="ghost" size="sm" onClick={handleCopy} aria-label="Copy share link">
      {copied ? (
        <>
          <Check className="mr-1.5 h-4 w-4" />
          Copied
        </>
      ) : (
        <>
          <Link2 className="mr-1.5 h-4 w-4" />
          Copy link
        </>
      )}
    </Button>
  );
}
