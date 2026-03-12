import type { LucideIcon } from 'lucide-react';
import { Building, Calendar, Users } from 'lucide-react';

export interface ConferenceStat {
  icon: LucideIcon;
  value: string;
  label: string;
}

export interface InstagramPost {
  id: string;
  image: string;
  caption: string;
  link: string;
  date: string;
}

export const conferenceConfig = {
  name: 'Model World Economic Forum',
  shortName: 'MWEF',
  eventYear: 2026,
  eventDateIso: '2026-04-11T08:00:00+04:00',
  eventDateLabel: '11 April 2026',
  eventTimeLabel: '8:00 AM till 3:00 PM or 4:00 PM',
  locationName: 'DIAEH',
  locationAddress: 'Dubai International Academy Emirates Hills, Dubai, UAE',
  locationMapUrl: 'https://maps.google.com/?q=Dubai+International+Academy+Emirates+Hills',
  participantYears: 'Years 7–12',
  schoolCountLabel: '40+',
  committeeCountLabel: '11',
  delegateCountLabel: '250+',
  homepageShortCopy:
    'MWEF is Dubai’s premier student-led economics conference, hosted at DIAEH, bringing together ambitious students from Years 7–12 across 40+ schools to debate real-world economic issues, design policy solutions, and collaborate as future leaders.',
  aboutCopy:
    'The Model World Economic Forum (MWEF) is Dubai’s premiere student-led economics conference, hosted at Dubai International Academy. Expected to bring together over 250 delegates from Years 7–12 across schools, MWEF provides a platform for students to engage with real-world economic challenges through debate, collaboration, and policy design. Inspired by global economic institutions, the conference allows participants to step into the roles of policymakers, economists, business leaders, and international stakeholders to explore how economic decisions shape the world around us.\n\nWhat makes MWEF especially meaningful is that the strongest policy proposals may be shared with ministries in Asia and Europe, giving you the chance to have your work actually looked at and implemented with your stamp on it. It is designed for ambitious middle and high school students who are curious, thoughtful, and excited by economics.',
  contactEmail: 'modelwef@gmail.com',
  registration: {
    googleFormEmbedUrl:
      'https://docs.google.com/forms/d/e/REPLACE_WITH_FINAL_FORM_ID/viewform?embedded=true',
    webhookPath: '/functions/v1/google-form-registration-webhook',
  },
  partnerships: {
    pitchDeckUrl: '',
  },
  stats: [
    { icon: Users, value: '250+', label: 'Expected Delegates' },
    { icon: Calendar, value: '11 Apr', label: 'Conference Date' },
    { icon: Building, value: 'DIAEH', label: 'Location' },
    { icon: Users, value: '40+', label: 'Schools' },
  ] as ConferenceStat[],
};

export const missionVisionValues = [
  {
    title: 'Our Mission',
    content:
      'To cultivate the next generation of economic leaders by providing a platform for rigorous debate, policy analysis, and strategic thinking on global economic challenges.',
  },
  {
    title: 'Our Vision',
    content:
      'To become the leading economics simulation conference in the region, recognized for academic excellence, professional standards, and meaningful participant experiences.',
  },
  {
    title: 'Our Values',
    content:
      'Academic rigor, evidence-based reasoning, inclusive participation, global perspective, and commitment to understanding complex economic trade-offs.',
  },
];

export const instagramPosts: InstagramPost[] = [
  {
    id: 'ig-1',
    image: '/placeholder.svg',
    caption: 'Registrations are open — secure your spot for MWEF 2026.',
    link: 'https://instagram.com',
    date: '2026-01-20',
  },
  {
    id: 'ig-2',
    image: '/placeholder.svg',
    caption: 'Committee themes announced. Background guides releasing soon.',
    link: 'https://instagram.com',
    date: '2026-02-01',
  },
  {
    id: 'ig-3',
    image: '/placeholder.svg',
    caption: 'Meet our team and follow countdown updates to April 11.',
    link: 'https://instagram.com',
    date: '2026-02-15',
  },
  {
    id: 'ig-4',
    image: '/placeholder.svg',
    caption: 'Delegation prep tips posted this week on Instagram.',
    link: 'https://instagram.com',
    date: '2026-03-03',
  },
];
