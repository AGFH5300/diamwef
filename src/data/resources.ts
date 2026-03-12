import { committees } from './committees';

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

const resourceBaseUrl = 'https://modelwef.org/resources/pdfs';

export const participantResources: ResourceItem[] = [
  {
    id: 'rules',
    title: 'Conference Rules',
    description: 'Complete rules and procedures for MWEF conference participation.',
    category: 'conference-doc',
    fileType: 'PDF',
    link: `${resourceBaseUrl}/conference-rules.pdf`,
    status: 'coming_soon',
  },
  {
    id: 'policy-handbook',
    title: 'Solution & Policy Handbook',
    description: 'Framework for developing and presenting policy proposals.',
    category: 'conference-doc',
    fileType: 'PDF',
    link: `${resourceBaseUrl}/solution-policy-handbook.pdf`,
    status: 'coming_soon',
  },
];

export const committeeBackgroundGuides: ResourceItem[] = committees.map((committee) => ({
  id: `guide-${committee.id}`,
  title: `${committee.abbreviation} Background Guide`,
  description: `Background guide for ${committee.name}.`,
  category: 'background-guide',
  committeeKey: committee.id,
  fileType: 'PDF',
  link: '',
  status: 'coming_soon',
}));
