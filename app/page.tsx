import { existsSync } from "node:fs";
import { join } from "node:path";
import { Code2, MapPin, Phone, ArrowUpRight } from "lucide-react";
import profile from "@/data/profile.json";
import { ProfileAvatar } from "@/components/ProfileAvatar";
import { ContactActions } from "@/components/ContactActions";
import { ShareButton } from "@/components/ShareButton";
import { SocialLinks } from "@/components/SocialLinks";
import { Projects } from "@/components/Projects";
import { QRSection } from "@/components/QRSection";
export default function Home() {
  return (
    <div className="page-shell">
      <div className="ambient-glow" aria-hidden="true" />
      <header className="top-brand">
        <a
          href={profile.website}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Bluecode Technology Solution website"
        >
          <span className="brand-mark">
            <Code2 size={23} strokeWidth={2} />
          </span>
          <span className="brand-text">
            bluecode<span>TECHNOLOGY SOLUTION</span>
          </span>
        </a>
        <span className="digital-label">DIGITAL BUSINESS CARD</span>
      </header>
      <main id="main" className="business-card">
        <div className="card-topline" aria-hidden="true" />
        <section className="intro" aria-labelledby="profile-name">
          <div className="intro-top">
            <span className="eyebrow">
              <span />
              HELLO, I’M YEABSRA
            </span>
            <ShareButton />
          </div>
          <div className="identity">
            <ProfileAvatar
              hasPhoto={existsSync(
                join(process.cwd(), "public", "yeabsra.jpg"),
              )}
            />
            <div className="identity-text">
              <h1 id="profile-name">
                {profile.name}
                <span className="name-dot">.</span>
              </h1>
              <p className="job-title">{profile.title}</p>
              <p className="company">
                Founder <span>at</span>{" "}
                <a
                  href={profile.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {profile.company}
                </a>
              </p>
            </div>
          </div>
          <p className="bio">{profile.bio}</p>
          <ContactActions />
          <p className="contact-note">
            Good conversations start with a simple hello.
          </p>
        </section>
        <div className="card-body">
          <SocialLinks />
          <Projects />
          <section className="details-section" aria-label="Contact details">
            <a
              href={profile.maps}
              target="_blank"
              rel="noopener noreferrer"
              className="detail-link"
            >
              <span className="detail-icon">
                <MapPin size={19} />
              </span>
              <span>
                <small>BASED IN</small>
                <strong>{profile.location}</strong>
              </span>
              <ArrowUpRight size={16} />
            </a>
            <a
              className="detail-link secondary-phone"
              href={"tel:" + profile.phones[1]}
            >
              <span className="detail-icon">
                <Phone size={18} />
              </span>
              <span>
                <small>ALTERNATIVE PHONE</small>
                <strong>
                  {profile.phones[1].replace(
                    /^(\+251)(\d{3})(\d{3})(\d{3})$/,
                    "$1 $2 $3 $4",
                  )}
                </strong>
              </span>
              <ArrowUpRight size={16} />
            </a>
          </section>
          <QRSection />
        </div>
        <footer className="card-footer">
          <span className="footer-monogram">
            YA<span> / </span>
          </span>
          <span>Built with purpose. Let’s build something together.</span>
          <Code2 size={17} aria-hidden="true" />
        </footer>
      </main>
      <footer className="page-footer">
        <span>© {new Date().getFullYear()} Yeabsra Abera</span>
        <span className="footer-dot">·</span>
        <a href={profile.website} target="_blank" rel="noopener noreferrer">
          Made by Bluecode <ArrowUpRight size={12} />
        </a>
      </footer>
    </div>
  );
}
