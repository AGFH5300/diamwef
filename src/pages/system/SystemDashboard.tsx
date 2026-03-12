import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { committees } from '@/data/committees';
import { conferenceConfig } from '@/data/conference';
import { LogOut, RefreshCcw, Search, MapPin, ExternalLink } from 'lucide-react';

interface ParticipantRegistration {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  preferred_country: string | null;
  preferred_institution: string | null;
  assigned_country: string | null;
  assigned_institution: string | null;
  assigned_committee: string | null;
  status: string;
  notes: string | null;
  created_at: string;
}

const SystemDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [participants, setParticipants] = useState<ParticipantRegistration[]>([]);
  const [query, setQuery] = useState('');
  const [committeeFilter, setCommitteeFilter] = useState('all');
  const [stakeholderFilter, setStakeholderFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [assignedFilter, setAssignedFilter] = useState('all');
  const [schoolFilter, setSchoolFilter] = useState('all');

  const schools = useMemo(() => {
    const values = participants
      .map((p) => (p.notes?.split('\n').find((line) => line.startsWith('School:')) || '').replace('School:', '').trim())
      .filter(Boolean);
    return Array.from(new Set(values));
  }, [participants]);

  const stakeholders = useMemo(() => {
    const values = participants
      .map((p) => p.preferred_institution || p.preferred_country)
      .filter(Boolean) as string[];
    return Array.from(new Set(values));
  }, [participants]);

  const filteredParticipants = useMemo(() => {
    return participants.filter((participant) => {
      const fullName = `${participant.first_name} ${participant.last_name}`.toLowerCase();
      const school = (participant.notes?.split('\n').find((line) => line.startsWith('School:')) || '').replace('School:', '').trim();
      const stakeholder = participant.preferred_institution || participant.preferred_country || '';
      const assigned = participant.assigned_committee || participant.assigned_country || participant.assigned_institution;

      return (
        (!query || participant.email.toLowerCase().includes(query.toLowerCase()) || fullName.includes(query.toLowerCase())) &&
        (committeeFilter === 'all' || participant.assigned_committee === committeeFilter) &&
        (stakeholderFilter === 'all' || stakeholder === stakeholderFilter) &&
        (statusFilter === 'all' || participant.status === statusFilter) &&
        (assignedFilter === 'all' || (assignedFilter === 'assigned' ? Boolean(assigned) : !assigned)) &&
        (schoolFilter === 'all' || school === schoolFilter)
      );
    });
  }, [participants, query, committeeFilter, stakeholderFilter, statusFilter, assignedFilter, schoolFilter]);

  const fetchData = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('participant_registrations').select('*').order('created_at', { ascending: false });
    if (error) toast.error('Failed to load participant registrations');
    setParticipants((data ?? []) as ParticipantRegistration[]);
    setLoading(false);
  };

  useEffect(() => {
    const run = async () => {
      const { data: userData } = await supabase.auth.getUser();
      const email = userData.user?.email?.toLowerCase();
      if (!email) return navigate('/system/login', { replace: true });
      const { data } = await supabase.from('system_admins').select('email').eq('email', email).maybeSingle();
      if (!data) return navigate('/system/login', { replace: true });
      setAuthorized(true);
      await fetchData();
    };
    void run();
    const channel = supabase
      .channel('system-participants')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'participant_registrations' }, () => void fetchData())
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [navigate]);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate('/system/login', { replace: true });
  };

  if (loading && !authorized) return <div className="min-h-screen grid place-items-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent" /></div>;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="w-full px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">System Console</h1>
          <div className="flex gap-3">
            <button onClick={fetchData} className="flex items-center gap-2 text-sm px-3 py-2 rounded-md border border-border"><RefreshCcw size={16} />Refresh</button>
            <button onClick={signOut} className="flex items-center gap-2 text-sm px-3 py-2 rounded-md border border-destructive text-destructive"><LogOut size={16} />Sign Out</button>
          </div>
        </div>
      </header>

      <main className="p-6 space-y-6">
        <section className="bg-card border border-border rounded-xl p-5 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div><p className="text-xs text-muted-foreground">Date</p><p className="font-medium">{conferenceConfig.eventDateLabel}</p></div>
          <div><p className="text-xs text-muted-foreground">Location</p><p className="font-medium">{conferenceConfig.locationAddress}</p></div>
          <div><p className="text-xs text-muted-foreground">Time</p><p className="font-medium">{conferenceConfig.eventTimeLabel}</p></div>
          <div className="md:col-span-2 lg:col-span-3"><p className="text-xs text-muted-foreground">Information</p><p className="text-sm">Food available for purchase, not provided for free.</p><a href={conferenceConfig.locationMapUrl} className="inline-flex gap-1 mt-2 text-accent text-sm" target="_blank" rel="noreferrer"><MapPin size={16} />Google Maps <ExternalLink size={14} /></a></div>
        </section>

        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          <div className="relative"><Search className="absolute left-3 top-3.5 text-muted-foreground" size={16} /><input className="form-input pl-9" placeholder="Search name/email" value={query} onChange={(e) => setQuery(e.target.value)} /></div>
          <select className="form-input" value={committeeFilter} onChange={(e) => setCommitteeFilter(e.target.value)}><option value="all">All committees</option>{committees.map((c) => <option key={c.id} value={c.abbreviation}>{c.abbreviation}</option>)}</select>
          <select className="form-input" value={stakeholderFilter} onChange={(e) => setStakeholderFilter(e.target.value)}><option value="all">All stakeholders</option>{stakeholders.map((s) => <option key={s} value={s}>{s}</option>)}</select>
          <select className="form-input" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}><option value="all">Registration status</option><option value="pending">Pending</option><option value="approved">Approved</option><option value="waitlist">Waitlist</option><option value="rejected">Rejected</option></select>
          <select className="form-input" value={assignedFilter} onChange={(e) => setAssignedFilter(e.target.value)}><option value="all">Assigned</option><option value="assigned">Assigned only</option><option value="unassigned">Unassigned only</option></select>
          <select className="form-input" value={schoolFilter} onChange={(e) => setSchoolFilter(e.target.value)}><option value="all">All schools</option>{schools.map((s) => <option key={s} value={s}>{s}</option>)}</select>
        </section>

        <section className="bg-card border border-border rounded-xl overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary"><tr><th className="p-3 text-left">Participant</th><th className="p-3 text-left">Stakeholder</th><th className="p-3 text-left">Registration Status</th><th className="p-3 text-left">Assigned</th><th className="p-3 text-left">Date</th></tr></thead>
            <tbody>
              {filteredParticipants.map((p) => {
                const assigned = [p.assigned_committee, p.assigned_country || p.assigned_institution].filter(Boolean).join(' • ');
                return <tr key={p.id} className="border-t border-border"><td className="p-3"><p className="font-medium">{p.first_name} {p.last_name}</p><p className="text-muted-foreground">{p.email}</p></td><td className="p-3">{p.preferred_institution || p.preferred_country || '-'}</td><td className="p-3 capitalize">{p.status}</td><td className="p-3">{assigned || 'Pending'}</td><td className="p-3">{new Date(p.created_at).toLocaleDateString()}</td></tr>;
              })}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default SystemDashboard;
