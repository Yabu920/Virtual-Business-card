"use client";
import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { ChevronDown, QrCode } from "lucide-react";
import { siteUrl } from "@/lib/site-url";
export function QRSection() {
  const [url, setUrl] = useState(siteUrl || "");
  return (
    <details
      className="qr-section"
      onToggle={(e) => {
        if (e.currentTarget.open && !url) setUrl(window.location.href);
      }}
    >
      <summary>
        <span className="qr-label">
          <QrCode size={19} />
          <span>
            Connect with a scan<small>Show my profile QR code</small>
          </span>
        </span>
        <ChevronDown size={17} className="qr-chevron" />
      </summary>
      <div className="qr-content">
        {url && (
          <div className="qr-code">
            <QRCodeSVG
              value={url}
              size={164}
              level="M"
              marginSize={4}
              title="Scan to open Yeabsra Abera’s digital business card"
            />
          </div>
        )}
        <p>
          Scan with your camera to open this card.
          <br />A small connection. A new possibility.
        </p>
      </div>
    </details>
  );
}
