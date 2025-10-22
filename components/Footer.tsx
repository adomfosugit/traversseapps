import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-primary">Traverse</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Revolutionizing remote property development across Africa. Build your dreams from anywhere in the world.
              </p>
              <div className="flex space-x-4 pt-2">
                <a 
                  href="https://facebook.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label="Facebook"
                >
                  <Facebook size={18} />
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label="Instagram"
                >
                  <Instagram size={18} />
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label="Twitter"
                >
                  <Twitter size={18} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-primary transition-colors duration-300 flex items-center group">
                    <span className="group-hover:translate-x-1 transition-transform duration-300">About Us</span>
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-gray-400 hover:text-primary transition-colors duration-300 flex items-center group">
                    <span className="group-hover:translate-x-1 transition-transform duration-300">Services</span>
                  </Link>
                </li>
                <li>
                  <Link href="/projects" className="text-gray-400 hover:text-primary transition-colors duration-300 flex items-center group">
                    <span className="group-hover:translate-x-1 transition-transform duration-300">Projects</span>
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-primary transition-colors duration-300 flex items-center group">
                    <span className="group-hover:translate-x-1 transition-transform duration-300">Contact</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/terms" className="text-gray-400 hover:text-primary transition-colors duration-300 flex items-center group">
                    <span className="group-hover:translate-x-1 transition-transform duration-300">Terms & Conditions</span>
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-gray-400 hover:text-primary transition-colors duration-300 flex items-center group">
                    <span className="group-hover:translate-x-1 transition-transform duration-300">Privacy Policy</span>
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="text-gray-400 hover:text-primary transition-colors duration-300 flex items-center group">
                    <span className="group-hover:translate-x-1 transition-transform duration-300">Cookie Policy</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3 text-gray-400">
                  <MapPin size={20} className="text-primary flex-shrink-0 mt-1" />
                  <span className="text-sm">
                    Quartey Street La South,<br />
                    Zooba Close, Accra
                  </span>
                </li>
                <li className="flex items-center space-x-3 text-gray-400">
                  <Phone size={20} className="text-primary flex-shrink-0" />
                  <div className="text-sm">
                    <a href="tel:+233268888916" className="hover:text-primary transition-colors block">
                      +233 268 888 916
                    </a>
                    <a href="tel:+233500007132" className="hover:text-primary transition-colors block">
                      +233 500 007 132
                    </a>
                  </div>
                </li>
                <li className="flex items-center space-x-3 text-gray-400">
                  <Mail size={20} className="text-primary flex-shrink-0" />
                  <a href="mailto:support@traverse.com" className="text-sm hover:text-primary transition-colors">
                    support@traverse.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Traverse. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm">
              Built with ❤️ for Africa
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;