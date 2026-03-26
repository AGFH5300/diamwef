export interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio?: string;
}

export const leadershipTeam: TeamMember[] = [
  { name: 'Jash Jain', role: 'President', image: '/Jash_Jain.jpeg' },
  { name: 'Tara Vishwakarthik', role: 'President', image: '/Tara_Vishwakarthik.jpeg' },
  { name: 'Adit', role: 'President', image: '/placeholder.svg' },
];

export const executiveChairs: TeamMember[] = [
  { name: 'Ronak Karlapudi', role: 'Executive Chair — GES', image: '/placeholder.svg' },
  { name: 'Dhruv Mulchandani', role: 'Executive Co-Chair — GES', image: '/placeholder.svg' },
  { name: 'Aarav Mamtani', role: 'Executive Chair — IFLEC', image: '/placeholder.svg' },
  { name: 'Ekansh Punjabi', role: 'Executive Co-Chair — IFLEC', image: '/placeholder.svg' },
  { name: 'Fares Basil', role: 'Executive Chair — Agricultural Committee', image: '/placeholder.svg' },
  { name: 'Reihan Safeer', role: 'Executive Co-Chair — Agricultural Committee', image: '/placeholder.svg' },
  { name: 'Parth Menon', role: 'Executive Chair — ICA', image: '/placeholder.svg' },
  { name: 'Akhil Mittal', role: 'Executive Co-Chair — ICA', image: '/placeholder.svg' },
  { name: 'Wasiq Nabeel', role: 'Executive Chair — IE', image: '/placeholder.svg' },
  { name: 'Laila Mohamad', role: 'Executive Co-Chair — IE', image: '/placeholder.svg' },
  { name: 'Tasnia Binte Atique', role: 'Executive Chair — ES', image: '/placeholder.svg' },
  { name: 'Afia Noor', role: 'Executive Co-Chair — ES', image: '/placeholder.svg' },
  { name: 'Ashlyn Sandra Crasta', role: 'Executive Chair — Transport Committee', image: '/placeholder.svg' },
  { name: 'Angelina Sara Sajan', role: 'Executive Co-Chair — Transport Committee', image: '/placeholder.svg' },
  { name: 'Abhinav Vijay Kayarat', role: 'Executive Chair — SDF', image: '/placeholder.svg' },
  { name: 'Gurkamal Singh', role: 'Executive Co-Chair — SDF', image: '/placeholder.svg' },
  { name: 'Adnan Faisal', role: 'Executive Chair — FSMP', image: '/placeholder.svg' },
  { name: 'Mariyam Hafiza', role: 'Executive Co-Chair — FSMP', image: '/placeholder.svg' },
  { name: 'Frank Toh', role: 'Executive Chair — CER', image: '/placeholder.svg' },
  { name: 'Ashaz Ali Bahadur', role: 'Executive Co-Chair — CER', image: '/placeholder.svg' },
  { name: 'Innovation & Digital Economy Board Chairs (TBC)', role: 'Executive Chairs — IDE', image: '/placeholder.svg' },
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
  { name: 'Vishakh Muralikrishnan', role: 'Media Team', image: '/placeholder.svg' },
  { name: 'Shivank Mishra', role: 'Head of Teaching', image: '/Shivank_Mishra.jpeg' },
  { name: 'Pranav Verma', role: 'Deputy Head of Teaching', image: '/Pranav_Verma.jpeg' },
  { name: 'Alman Bazaz', role: 'Deputy Head of Teaching', image: '/Alman_Bazaz.jpeg' },
  { name: 'Swasti Rai', role: 'Deputy Head of Teaching', image: '/Swasti_Rai.jpg' },
];

export const allSecretariat: TeamMember[] = [...leadershipTeam, ...executiveChairs, ...coreTeam];
