import { Facebook, Instagram, Twitter } from 'lucide-react';
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6 px-12">
      <div className=" mx-auto flex flex-col md:flex-row place-items-center justify-between max-w-4xl">
        <div className="flex flex-col  md:flex-col space-y-2 md:space-y-0 md:space-x-4 text-center text-sm">
          <a href="/about" className="hover:underline">About</a>
          <a href="/terms" className="hover:underline">Terms and Conditions</a>
          <a href="/privacy" className="hover:underline">Privacy Policy</a>
          <a href="/contact" className="hover:underline">Contact: support@traverse.com</a>
        </div>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="/login/facebook" className="hover:underline">
          <Facebook size={20} />
          </a>
          <a href="/login/google" className="hover:underline">
          <Instagram size={20} />
          </a>
          <a href="/login/twitter" className="hover:underline">
          <Twitter size={20}/>
          </a>
        </div>
        <div className="flex flex-col space-x-4 mt-4 md:mt-0 text-center text-sm">
          <p>Office Address</p> 
          <p>Quartey Street La South, Zooba Close Accra</p>  
          <p>Tel: +233268888916  | +233500007132</p>                                  

        </div>
      </div>
      <div className="text-center mt-4 text-sm border-t border-white pt-4">
        <p>&copy; {new Date().getFullYear()} TraverseApps. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;