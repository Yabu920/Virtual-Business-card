"use client";
import Image from "next/image";
import { useState } from "react";
import profile from "@/data/profile.json";
export function ProfileAvatar({ hasPhoto }: { hasPhoto: boolean }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="avatar-ring">
      <div className="avatar">
        <span
          role="img"
          aria-label={profile.name + " initials"}
          aria-hidden={hasPhoto && !failed}
        >
          {profile.initials}
        </span>
        {hasPhoto && !failed && (
          <Image
            src="/yeabsra.jpg"
            alt={profile.name}
            width={96}
            height={96}
            priority
            unoptimized
            onError={() => setFailed(true)}
          />
        )}
      </div>
      <span className="avatar-spark" aria-hidden="true">
        ✦
      </span>
    </div>
  );
}
