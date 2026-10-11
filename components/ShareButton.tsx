"use client";
import { useState } from "react";
import { Check, Share2 } from "lucide-react";
import { siteUrl } from "@/lib/site-url";
export function ShareButton() {
  const [message, setMessage] = useState("");
  const [manualUrl, setManualUrl] = useState("");
  async function share() {
    const url = siteUrl || window.location.href;
    setMessage("");
    setManualUrl("");
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Yeabsra Abera | Software Developer",
          text: "Connect with Yeabsra Abera.",
          url,
        });
        return;
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") return;
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setMessage("Profile link copied");
    } catch {
      setManualUrl(url);
      setMessage("Copy the profile link below");
    }
  }
  return (
    <div className="share-control">
      <button
        className="share-button"
        onClick={share}
        aria-label="Share Profile"
      >
        {message === "Profile link copied" ? (
          <Check size={16} />
        ) : (
          <Share2 size={16} />
        )}
        <span>Share Profile</span>
      </button>
      <span className="share-message" role="status">
        {message}
      </span>
      {manualUrl && (
        <input
          className="manual-url"
          aria-label="Profile link to copy"
          value={manualUrl}
          readOnly
          onFocus={(e) => e.target.select()}
        />
      )}
    </div>
  );
}
