export interface TeamMember {
  name: string;
  role: string;
  image: string;
}

export const leadershipTeam: TeamMember[] = [
  { name: 'Jash Jain', role: 'President', image: '/Jash_Jain.jpeg' },
  { name: 'Tara Vishwakarthik', role: 'President', image: '/Tara_Vishwakarthik.jpeg' },
  { name: 'Adit (TBC)', role: 'President', image: '/placeholder.svg' },
];

export const executiveChairs: TeamMember[] = [
  { name: 'Executive Chair Placeholder 1', role: 'Executive Chair', image: '/placeholder.svg' },
  { name: 'Executive Chair Placeholder 2', role: 'Executive Chair', image: '/placeholder.svg' },
  { name: 'Executive Chair Placeholder 3', role: 'Executive Chair', image: '/placeholder.svg' },
];

export const coreTeam: TeamMember[] = [
  { name: 'Ansh Gupta', role: 'Head of Technology', image: '/Ansh_Gupta.jpg' },
  { name: 'Ananya Makin', role: 'Head of Events', image: '/Ananya_Makin.jpeg' },
  { name: 'Yuvraj Dewan', role: 'Deputy Head of Events', image: '/Yuvraj_Dewan.jpeg' },
  { name: 'Mahi Bhatia', role: 'Deputy Head of Events', image: '/Mahi_Bhatia.jpeg' },
  { name: 'Sanaya Mithaiwala', role: 'Head of Media', image: '/Sanaya_Mithaiwala.jpg' },
  { name: 'Yingxuan Cha', role: 'Deputy Head of Media', image: '/Yingxuan_Cha.jpeg' },
  { name: 'Khyati Anandita', role: 'Deputy Head of Media', image: '/Khyati_Anandita.jpeg' },
  { name: 'Marina Sapyrgina', role: 'Deputy Head of Media', image: '/Marina_Sapyrgina.jpeg' },
  { name: 'Shivank Mishra', role: 'Head of Teaching', image: '/Shivank_Mishra.jpeg' },
  { name: 'Pranav Verma', role: 'Deputy Head of Teaching', image: '/Pranav_Verma.jpeg' },
  { name: 'Alman Bazaz', role: 'Deputy Head of Teaching', image: '/Alman_Bazaz.jpeg' },
  { name: 'Swasti Rai', role: 'Deputy Head of Teaching', image: '/Swasti_Rai.jpg' },
];

export const allSecretariat: TeamMember[] = [...leadershipTeam, ...executiveChairs, ...coreTeam];
