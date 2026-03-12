import { Link } from 'react-router-dom';
import { Mail, MapPin, Globe } from 'lucide-react';
import mwefLogo from '@/assets/mwef-logo.png';
import { conferenceConfig } from '@/data/conference';

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <Link to="/" className="flex items-center gap-3 mb-4"><img src={mwefLogo} alt="MWEF Logo" className="h-12 w-auto" /><span className="font-bold text-xl">MWEF</span></Link>
            <p className="text-white/70 text-sm leading-relaxed">{conferenceConfig.homepageShortCopy}</p>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-4 text-accent">Quick Links</h4>
            <ul className="space-y-2">{[{ name: 'About MWEF', path: '/about' }, { name: 'Committees', path: '/committees' }, { name: 'Conference Structure', path: '/conference' }, { name: 'Register', path: '/register' }].map((link) => <li key={link.path}><Link to={link.path} className="text-white/70 hover:text-white transition-colors text-sm">{link.name}</Link></li>)}</ul>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-4 text-accent">Resources</h4>
            <ul className="space-y-2">{[{ name: 'Participant Resources', path: '/resources' }, { name: 'Partnerships', path: '/get-involved' }].map((link) => <li key={link.path}><Link to={link.path} className="text-white/70 hover:text-white transition-colors text-sm">{link.name}</Link></li>)}</ul>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-4 text-accent">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-white/70 text-sm"><Mail size={16} className="text-accent" /><a href={`mailto:${conferenceConfig.contactEmail}`}>{conferenceConfig.contactEmail}</a></li>
              <li className="flex items-center gap-3 text-white/70 text-sm"><MapPin size={16} className="text-accent" /><span>{conferenceConfig.locationName}</span></li>
              <li className="flex items-center gap-3 text-white/70 text-sm"><Globe size={16} className="text-accent" /><span>modelwef.org</span></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400 text-xs sm:text-sm">© {new Date().getFullYear()} Model World Economic Forum. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
