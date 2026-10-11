import {
  ArrowUpRight,
  Github,
  Globe2,
  Instagram,
  Linkedin,
  Send,
} from "lucide-react";
import profile from "@/data/profile.json";
const icons = {
  website: Globe2,
  linkedin: Linkedin,
  github: Github,
  instagram: Instagram,
  telegram: Send,
};
export function SocialLinks() {
  return (
    <section aria-labelledby="connect-heading" className="section-block">
      <div className="section-heading">
        <h2 id="connect-heading">Find me online</h2>
        <span>LET’S CONNECT</span>
      </div>
      <div className="social-grid">
        {profile.socials.map((link) => {
          const Icon = icons[link.id as keyof typeof icons];
          return (
            <a
              className={
                "social-link " + (link.id === "website" ? "website-link" : "")
              }
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="link-icon">
                <Icon size={19} strokeWidth={1.7} />
              </span>
              <span className="link-text">
                <strong>{link.label}</strong>
                <small>{link.detail}</small>
              </span>
              <ArrowUpRight className="link-arrow" size={16} />
            </a>
          );
        })}
      </div>
    </section>
  );
}
