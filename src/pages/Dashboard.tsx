import { useEffect, useMemo, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui/PageHeader';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { User, FileText, Globe, Calendar, LogOut, BookOpen, Landmark, ListChecks, Megaphone } from 'lucide-react';
import { toast } from 'sonner';
import { conferenceConfig } from '@/data/conference';

interface Registration {
  id: string; email: string; first_name: string; last_name: string; preferred_country: string | null; preferred_institution: string | null; assigned_country: string | null; assigned_institution: string | null; assigned_committee: string | null; status: string; created_at: string; notes: string | null;
}

interface Announcement { id: string; title: string; body: string; cta_link: string | null; pinned: boolean; published_at: string; created_at: string }

const Dashboard = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [registration, setRegistration] = useState<Registration | null>(null);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loadingReg, setLoadingReg] = useState(true);

  const { schoolName, gradeLevel } = useMemo(() => {
    const lines = registration?.notes?.split('\n') ?? [];
    return { schoolName: lines.find((line) => line.startsWith('School:'))?.replace('School:', '').trim() || 'Not set', gradeLevel: lines.find((line) => line.startsWith('Grade:'))?.replace('Grade:', '').trim() || 'Not set' };
  }, [registration]);

  useEffect(() => { if (!loading && !user) navigate('/login'); }, [user, loading, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.email) return;
      const { data: regData } = await supabase.rpc('get_participant_registration', { _email: user.email });
      setRegistration((regData?.[0] as Registration) ?? null);
      const { data: announcementData } = await supabase.from('announcements').select('*').eq('is_active', true).order('pinned', { ascending: false }).order('published_at', { ascending: false });
      setAnnouncements((announcementData ?? []) as Announcement[]);
      setLoadingReg(false);
    };
    void fetchData();
  }, [user]);

  const handleSignOut = async () => { await signOut(); toast.success('Signed out successfully'); navigate('/'); };

  if (loading) return <Layout><div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent" /></div></Layout>;

  return (
    <Layout>
      <PageHeader title="Participant Dashboard" subtitle={`Welcome back, ${user ? `${user.first_name} ${user.last_name}`.trim() : 'Participant'}!`} />
      <section className="py-20 bg-background">
        <div className="section-container grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-border rounded-lg p-6" style={{ boxShadow: 'var(--shadow-card)' }}>
              <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2"><User className="text-accent" size={20} />Profile Information</h2>
              <div className="grid md:grid-cols-2 gap-4"><div><p className="text-sm text-muted-foreground">Full Name</p><p className="font-medium">{user ? `${user.first_name} ${user.last_name}`.trim() : 'Not set'}</p></div><div><p className="text-sm text-muted-foreground">Email</p><p className="font-medium">{user?.email}</p></div><div><p className="text-sm text-muted-foreground">School</p><p className="font-medium">{schoolName}</p></div><div><p className="text-sm text-muted-foreground">Grade</p><p className="font-medium">{gradeLevel}</p></div></div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-border rounded-lg p-6" style={{ boxShadow: 'var(--shadow-card)' }}>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><FileText className="text-accent" size={20} />Registration Status</h2>
              {loadingReg ? <p className="text-muted-foreground">Loading...</p> : registration ? <div className="space-y-4"><p><span className="text-muted-foreground">Status:</span> <span className="capitalize font-medium">{registration.status}</span></p><div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-border"><div><p className="text-sm text-muted-foreground">Stakeholder</p><p className="font-medium">{registration.preferred_institution || registration.preferred_country || 'Not specified'}</p></div><div><p className="text-sm text-muted-foreground">Assigned Committee</p><p className="font-medium">{registration.assigned_committee || 'Pending'}</p></div></div></div> : <div className="text-center py-8"><FileText className="mx-auto text-muted-foreground mb-4" size={48} /><p className="text-muted-foreground mb-4">You haven't registered yet.</p><Link to="/register" className="btn-primary inline-block">Register Now</Link></div>}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-border rounded-lg p-6" style={{ boxShadow: 'var(--shadow-card)' }}>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><Megaphone className="text-accent" size={20} />Announcements</h2>
              {announcements.length === 0 ? <div className="text-sm text-muted-foreground rounded-md bg-secondary p-4">No announcements yet. Check back soon.</div> : <div className="space-y-4">{announcements.map((a) => <div key={a.id} className="border border-border rounded-md p-4"><div className="flex items-center justify-between gap-2"><h3 className="font-semibold">{a.title}</h3>{a.pinned && <span className="text-xs px-2 py-1 rounded-full bg-accent/20 text-accent">Pinned</span>}</div><p className="text-sm text-muted-foreground mt-2 whitespace-pre-line">{a.body}</p><div className="mt-3 flex justify-between text-xs text-muted-foreground"><span>{new Date(a.published_at || a.created_at).toLocaleDateString()}</span>{a.cta_link && <a href={a.cta_link} target="_blank" rel="noreferrer" className="text-accent hover:underline">Learn more</a>}</div></div>)}</div>}
            </motion.div>
          </div>

          <div className="space-y-6">
            <div className="bg-card border border-border rounded-lg p-6" style={{ boxShadow: 'var(--shadow-card)' }}><h3 className="font-semibold mb-4 flex items-center gap-2"><Globe size={18} className="text-accent" />Event Info</h3><div className="space-y-2 text-sm"><p><span className="text-muted-foreground">Date:</span> {conferenceConfig.eventDateLabel}</p><p><span className="text-muted-foreground">Location:</span> {conferenceConfig.locationName}</p><p><span className="text-muted-foreground">Time:</span> {conferenceConfig.eventTimeLabel}</p></div></div>
            <div className="bg-card border border-border rounded-lg p-6" style={{ boxShadow: 'var(--shadow-card)' }}><h3 className="font-semibold text-foreground mb-4">Quick Actions</h3><div className="space-y-2"><Link to="/resources" className="flex items-center gap-2 px-4 py-3 rounded-md bg-secondary"><BookOpen size={18} className="text-accent" />View Resources</Link><Link to="/resources/committees" className="flex items-center gap-2 px-4 py-3 rounded-md bg-secondary"><Landmark size={18} className="text-accent" />Explore Committees</Link><Link to="/about/conference" className="flex items-center gap-2 px-4 py-3 rounded-md bg-secondary"><ListChecks size={18} className="text-accent" />Conference Structure</Link></div></div>
            <div className="bg-primary text-primary-foreground rounded-lg p-6"><h3 className="font-semibold mb-4 flex items-center gap-2"><Calendar size={18} />Important Dates</h3><ul className="space-y-3 text-sm"><li className="flex justify-between"><span className="text-white/70">Conference</span><span className="font-medium">{conferenceConfig.eventDateLabel}</span></li><li className="flex justify-between"><span className="text-white/70">Reg. Deadline</span><span className="font-medium">TBA</span></li></ul></div>
            <button onClick={handleSignOut} className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-md border border-destructive text-destructive hover:bg-destructive/10"><LogOut size={18} />Sign Out</button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Dashboard;
