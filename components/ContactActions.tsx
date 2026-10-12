import { ArrowDownToLine, Mail, MessageCircle, Phone } from "lucide-react";
import profile from "@/data/profile.json";
export function ContactActions() {
  return (
    <div className="contact-actions">
      <a
        className="save-contact"
        href="/yeabsra-abera.vcf"
        download="yeabsra-abera.vcf"
      >
        <ArrowDownToLine size={19} strokeWidth={1.8} />
        <span>Save Contact</span>
        <span className="save-hint">ADD TO CONTACTS</span>
      </a>
      <div className="quick-actions">
        <a href={"tel:" + profile.phones[0]}>
          <Phone size={19} />
          <span>Call</span>
        </a>
        <a
          href={"https://wa.me/" + profile.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
        >
          <MessageCircle size={20} />
          <span>WhatsApp</span>
        </a>
        <a href={"mailto:" + profile.email}>
          <Mail size={20} />
          <span>Email</span>
        </a>
      </div>
    </div>
  );
}
