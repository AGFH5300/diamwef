export interface Committee {
  id: string;
  name: string;
  abbreviation: string;
  category: string;
  categoryShort: string;
  overview: string;
  issueAtHand?: string;
  abstract?: string;
  task?: string;
  tips?: string[];
  round1Info: string;
  round2Info: string;
}

const round1Template =
  'Morning policy development session. Participants analyze one defined economic crisis, review the chair research report, and draft stakeholder-backed policy proposals.';
const round2Template =
  'WSDC-inspired debate spars follow policy drafting. Participants are split into Side 1/Side 2 and Group A/Group B with two structured 30-minute spars.';

export const committees: Committee[] = [
  {
    id: 'ges',
    name: 'Global Economic Strategy Forum',
    abbreviation: 'GES',
    category: 'Senior Category',
    categoryShort: 'Senior',
    overview: 'Focuses on long-term macroeconomic strategy, cross-border policy coordination, and growth resilience.',
    round1Info: round1Template,
    round2Info: round2Template,
  },
  {
    id: 'iflec',
    name: 'International Financial Literacy & Education Council',
    abbreviation: 'IFLEC',
    category: 'Junior Category',
    categoryShort: 'Junior',
    overview: 'Explores financial literacy policy, inclusive education, and youth economic capability-building.',
    round1Info: round1Template,
    round2Info: round2Template,
  },
  {
    id: 'agricultural',
    name: 'Agricultural Committee',
    abbreviation: 'AGRI',
    category: 'Junior Category',
    categoryShort: 'Junior',
    overview: 'Examines food security, agricultural productivity, and the economics of climate pressure on farming systems.',
    round1Info: round1Template,
    round2Info: round2Template,
  },
  {
    id: 'ica',
    name: 'International Conflict Association',
    abbreviation: 'ICA',
    category: 'Senior Category',
    categoryShort: 'Senior',
    overview: 'Analyzes the economic consequences of geopolitical conflict, instability, and post-conflict recovery.',
    round1Info: round1Template,
    round2Info: round2Template,
  },
  {
    id: 'ie',
    name: 'Inclusive Growth & Income Equality Board',
    abbreviation: 'IE',
    category: 'Senior Category',
    categoryShort: 'Senior',
    overview: 'Designs policy pathways for stronger inclusion, social mobility, and broad-based economic opportunity.',
    round1Info: round1Template,
    round2Info: round2Template,
  },
  {
    id: 'es',
    name: 'Economic Sanctions Committee',
    abbreviation: 'ES',
    category: 'Senior Category',
    categoryShort: 'Senior',
    overview: 'Studies trade restrictions, sanctions transmission channels, and resilience strategies for affected economies.',
    round1Info: round1Template,
    round2Info: round2Template,
  },
  {
    id: 'transport',
    name: 'Transport Committee',
    abbreviation: 'TRN',
    category: 'Junior Category',
    categoryShort: 'Junior',
    overview: 'Evaluates transport infrastructure, logistics costs, and mobility policy as economic growth enablers.',
    round1Info: round1Template,
    round2Info: round2Template,
  },
  {
    id: 'sdf',
    name: 'Sustainable Development Forum',
    abbreviation: 'SDF',
    category: 'Senior Category',
    categoryShort: 'Senior',
    overview: 'Focuses on balancing growth with sustainability through practical, measurable policy frameworks.',
    round1Info: round1Template,
    round2Info: round2Template,
  },
  {
    id: 'fsmp',
    name: 'Financial Stability & Monetary Policy Group',
    abbreviation: 'FSMP',
    category: 'Senior Category',
    categoryShort: 'Senior',
    overview: 'Assesses inflation risk, monetary policy responses, and financial system stability trade-offs.',
    round1Info: round1Template,
    round2Info: round2Template,
  },
  {
    id: 'cer',
    name: 'Corporate Ethics & Responsibility Panel',
    abbreviation: 'CER',
    category: 'Junior Category',
    categoryShort: 'Junior',
    overview: 'Addresses responsible corporate behavior, labor standards, and long-term value creation.',
    round1Info: round1Template,
    round2Info: round2Template,
  },
  {
    id: 'ide',
    name: 'Innovation & Digital Economy Board',
    abbreviation: 'IDE',
    category: 'Junior Category',
    categoryShort: 'Junior',
    overview: 'Examines AI, automation, and digital-market policy to align innovation with equitable growth.',
    round1Info: round1Template,
    round2Info: round2Template,
  },
];
