import { committees } from './committees';
import { conferenceConfig } from './conference';

export type ResourceStatus = 'available' | 'coming_soon';

export interface ResourceItem {
  id: string;
  title: string;
  description: string;
  category: 'conference-doc' | 'background-guide' | 'general-link';
  committeeKey?: string;
  fileType?: string;
  link?: string;
  status: ResourceStatus;
}

export const participantResources: ResourceItem[] = [
  {
    id: 'debate-format',
    title: 'Debate Format & Structure (waefw.pdf)',
    description: 'Overview of policy-development-first flow followed by WSDC-inspired debate spars.',
    category: 'conference-doc',
    fileType: 'PDF',
    link: '/resources/waefw.pdf',
    status: 'coming_soon',
  },
  {
    id: 'pitch-deck',
    title: 'MWEF Sponsorship Pitch Deck',
    description: 'Sponsorship and partnership deck with visibility, branding, and engagement opportunities.',
    category: 'conference-doc',
    fileType: 'PPTX',
    link: conferenceConfig.partnerships.pitchDeckUrl,
    status: conferenceConfig.partnerships.pitchDeckUrl ? 'available' : 'coming_soon',
  },
  {
    id: 'conference-rules',
    title: 'Conference Rules (Placeholder)',
    description: 'Rules and procedures for participants. Upload file to activate this download.',
    category: 'conference-doc',
    fileType: 'PDF',
    link: '/resources/conference-rules.pdf',
    status: 'coming_soon',
  },
  {
    id: 'code-of-conduct',
    title: 'Code of Conduct (Placeholder)',
    description: 'Expected standards for participant conduct, inclusion, and professionalism.',
    category: 'conference-doc',
    fileType: 'PDF',
    link: '/resources/code-of-conduct.pdf',
    status: 'coming_soon',
  },
];

const availableGuides: Record<string, string> = {};

export const committeeBackgroundGuides: ResourceItem[] = committees.map((committee) => ({
  id: `guide-${committee.id}`,
  title: `${committee.abbreviation} Background Guide`,
  description: `Background guide for ${committee.name}.`,
  category: 'background-guide',
  committeeKey: committee.id,
  fileType: 'PDF',
  link: availableGuides[committee.id] || '',
  status: availableGuides[committee.id] ? 'available' : 'coming_soon',
}));
