import { Link } from "react-router-dom";
import { Mail, Shield } from "lucide-react";
import { CalmyraLogo } from "@/components/brand/CalmyraLogo";

export const Footer = () => {
  return (
    <footer className="bg-cream border-t border-border">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <CalmyraLogo className="text-primary-foreground" size={22} />
              </div>
              <span className="font-display text-xl font-semibold">Calmyra</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Mental wellness, made approachable. Your safe space for emotional support and self-care.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/chat" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  AI Wellness Chat
                </Link>
              </li>
              <li>
                <Link to="/wellness" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Wellness Tools
                </Link>
              </li>
              <li>
                <Link to="/mood" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Mood Check-in
                </Link>
              </li>
              <li>
                <Link to="/therapists" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Find Therapists
                </Link>
              </li>
            </ul>
          </div>

          {/* Trust & Safety */}
          <div>
            <h4 className="font-display font-semibold mb-4">Trust & Safety</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/trust" className="text-muted-foreground hover:text-primary text-sm transition-colors flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/trust" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/crisis" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Crisis Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold mb-4">Get in Touch</h4>
            <ul className="space-y-2">
              <li>
                <a href="mailto:support@calmyra.com" className="text-muted-foreground hover:text-primary text-sm transition-colors flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  support@calmyra.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="bg-lavender-light rounded-xl p-4 mb-6">
            <p className="text-sm text-center text-muted-foreground">
              <strong className="text-foreground">Important:</strong> Calmyra provides general wellness support and is not a substitute for professional therapy, medical advice, or crisis intervention. If you're experiencing a mental health emergency, please contact emergency services or a crisis helpline immediately.
            </p>
          </div>
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Calmyra. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
