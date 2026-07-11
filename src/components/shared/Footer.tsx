import Link from "next/link";
import { FaInstagram, FaLinkedin, FaXTwitter, FaFacebook } from "react-icons/fa6";
import Container from "./Container";

const columns = [
  {
    heading: "Discover",
    links: [
      { href: "/events", label: "Explore Events" },
      { href: "/events?view=categories", label: "Categories" },
      { href: "/#how-it-works", label: "How It Works" },
    ],
  },
  {
    heading: "For Organizers",
    links: [
      { href: "/items/add", label: "Create Event" },
      { href: "/help", label: "Organizer Resources" },
      { href: "/help#pricing", label: "Pricing" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/contact", label: "Contact" },
      { href: "/blog", label: "Blog" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { href: "/terms", label: "Terms of Service" },
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/refund-policy", label: "Refund Policy" },
    ],
  },
];

const socialLinks = [
  { href: "https://instagram.com", label: "Instagram", icon: FaInstagram },
  { href: "https://linkedin.com", label: "LinkedIn", icon: FaLinkedin },
  { href: "https://x.com", label: "X (Twitter)", icon: FaXTwitter },
  { href: "https://facebook.com", label: "Facebook", icon: FaFacebook },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <Container className="py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-6">
          {/* Brand + contact */}
          <div className="col-span-2">
            <Link href="/" className="text-xl font-bold text-foreground">
              Venuo
            </Link>
            <p className="mt-3 max-w-xs text-sm text-muted">
              Connecting people to experiences that matter — discover and book unforgettable
              events near you.
            </p>

            <div className="mt-5 flex flex-col gap-2 text-sm text-muted">
              <a href="mailto:support@venuo.app" className="hover:text-foreground">
                support@venuo.app
              </a>
              <a href="tel:+8801XXXXXXXXX" className="hover:text-foreground">
                +880 1305-330393
              </a>
              <span>Dhaka, Bangladesh</span>
            </div>

            <div className="mt-5 flex gap-3">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-primary hover:text-primary"
                >
                  <Icon className="text-base" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {columns.map((column) => (
            <div key={column.heading}>
              <h3 className="mb-3 text-sm font-semibold text-foreground">{column.heading}</h3>
              <ul className="flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-muted hover:text-foreground">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted md:flex-row">
          <span>&copy; {new Date().getFullYear()} Venuo. All rights reserved.</span>
          <span>Built with Next.js &amp; TypeScript</span>
        </div>
      </Container>
    </footer>
  );
}