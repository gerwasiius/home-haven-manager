import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export function PublicFooter() {
  return (
    <footer className="bg-background border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-heading text-lg font-semibold text-heading mb-4">
              Majstorić Apartments
            </h3>
          </div>

          {/* Navigation */}
          <div>
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Početna
              </Link>
              <Link to="/apartments" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Apartmani
              </Link>
              <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                O nama
              </Link>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Kontakt
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <p className="text-sm text-foreground mb-1">123 Coastal Road, Medulin, Croatia</p>
            <a href="tel:+385123456789" className="text-sm text-primary hover:underline block mb-1">
              +385 12 345 6789
            </a>
            <a href="mailto:info@majstoricapartments.com" className="text-sm text-primary hover:underline">
              info@majstoricapartments.com
            </a>
          </div>

          {/* Social */}
          <div className="flex space-x-4">
            <a
              href="#"
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Majstorić Apartments. Sva prava pridržana.
          </p>
        </div>
      </div>
    </footer>
  );
}
