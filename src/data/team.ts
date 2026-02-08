export interface TeamMember {
  name: string;
  role: string;
  image?: string;
}

export const leadershipTeam: TeamMember[] = [
  { name: 'Yuvraj Bharadia', role: 'President', image: '/placeholder.svg' },
  { name: 'Jash Jain', role: 'President', image: '/placeholder.svg' },
  { name: 'Tara Vishwakarthik', role: 'Vice President', image: '/placeholder.svg' },
];

export const executiveTeam: TeamMember[] = [
  { name: 'Ananya Makin', role: 'Head of Events', image: '/placeholder.svg' },
  { name: 'Yuvraj Dewan', role: 'Deputy Head of Events', image: '/placeholder.svg' },
  { name: 'Mahi Bhatia', role: 'Deputy Head of Events', image: '/placeholder.svg' },
  { name: 'Sanaya Mithaiwala', role: 'Head of Media', image: '/placeholder.svg' },
  { name: 'Yingxuan Cha', role: 'Deputy Head of Media', image: '/placeholder.svg' },
  { name: 'Khyati Anandita', role: 'Deputy Head of Media', image: '/placeholder.svg' },
  { name: 'Marina Sapyrgina', role: 'Deputy Head of Media', image: '/placeholder.svg' },
  { name: 'Shivank Mishra', role: 'Head of Teaching', image: '/placeholder.svg' },
  { name: 'Pranav Verma', role: 'Deputy Head of Teaching', image: '/placeholder.svg' },
  { name: 'Alman Bazaz', role: 'Deputy Head of Teaching', image: '/placeholder.svg' },
  { name: 'Swasti Rai', role: 'Deputy Head of Teaching', image: '/placeholder.svg' },
  { name: 'Ansh Gupta', role: 'Head of Technology', image: '/placeholder.svg' },
];

// Combined list for carousel display
export const allSecretariat: TeamMember[] = [
  ...leadershipTeam,
  ...executiveTeam,
];
