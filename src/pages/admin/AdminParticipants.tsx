import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Search, Edit, Check, X, Users } from 'lucide-react';
import { committees } from '@/data/committees';

interface Participant {
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
}

const AdminParticipants = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ assigned_committee: '', assigned_country: '', assigned_institution: '', status: 'pending' });

  const fetchParticipants = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('participant_registrations').select('*').order('created_at', { ascending: false });
    if (error) toast.error('Failed to fetch participants'); else setParticipants((data || []) as Participant[]);
    setLoading(false);
  };

  useEffect(() => { void fetchParticipants(); }, []);

  const handleSave = async (id: string) => {
    const { error } = await supabase.from('participant_registrations').update({ assigned_country: editForm.assigned_country || null, assigned_institution: editForm.assigned_institution || null, assigned_committee: editForm.assigned_committee || null, status: editForm.status }).eq('id', id);
    if (error) toast.error('Failed to update participant'); else { toast.success('Participant updated'); setEditingId(null); void fetchParticipants(); }
  };

  const filtered = participants.filter((p) => {
    const q = searchTerm.toLowerCase();
    return (!q || `${p.first_name} ${p.last_name}`.toLowerCase().includes(q) || p.email.toLowerCase().includes(q)) && (statusFilter === 'all' || p.status === statusFilter);
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between"><div><h2 className="text-2xl font-bold">Participant Registrations</h2><p className="text-muted-foreground">Manage participant status and assignments.</p></div><div className="flex items-center gap-2 text-sm text-muted-foreground"><Users size={18} />{participants.length} total</div></div>
      <div className="flex gap-4"><div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} /><input className="form-input pl-10" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search" /></div><select className="form-input" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}><option value="all">All status</option><option value="pending">Pending</option><option value="approved">Approved</option><option value="rejected">Rejected</option><option value="waitlist">Waitlist</option></select></div>
      <div className="bg-card border border-border rounded-lg overflow-hidden" style={{ boxShadow: 'var(--shadow-card)' }}>
        {loading ? <div className="p-8 text-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto" /></div> : <div className="overflow-x-auto"><table className="w-full"><thead className="bg-secondary"><tr><th className="px-4 py-3 text-left">Participant</th><th className="px-4 py-3 text-left">Stakeholder</th><th className="px-4 py-3 text-left">Assignment</th><th className="px-4 py-3 text-left">Status</th><th className="px-4 py-3 text-left">Actions</th></tr></thead><tbody className="divide-y divide-border">{filtered.map((p) => <motion.tr key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}><td className="px-4 py-4"><p>{p.first_name} {p.last_name}</p><p className="text-sm text-muted-foreground">{p.email}</p></td><td className="px-4 py-4">{p.preferred_institution || p.preferred_country || '-'}</td><td className="px-4 py-4">{editingId===p.id ? <div className="space-y-2"><select className="form-input text-sm py-1" value={editForm.assigned_committee} onChange={(e)=>setEditForm({...editForm,assigned_committee:e.target.value})}><option value="">Committee</option>{committees.map((c)=><option key={c.id} value={c.abbreviation}>{c.abbreviation}</option>)}</select><input className="form-input text-sm py-1" placeholder="Assigned Stakeholder" value={editForm.assigned_institution || editForm.assigned_country} onChange={(e)=>setEditForm({...editForm,assigned_institution:e.target.value,assigned_country:e.target.value})} /></div> : `${p.assigned_committee || '-'} ${p.assigned_institution || p.assigned_country ? `• ${p.assigned_institution || p.assigned_country}` : ''}`}</td><td className="px-4 py-4">{editingId===p.id ? <select className="form-input text-sm py-1" value={editForm.status} onChange={(e)=>setEditForm({...editForm,status:e.target.value})}><option value="pending">Pending</option><option value="approved">Approved</option><option value="waitlist">Waitlist</option><option value="rejected">Rejected</option></select> : <span className="capitalize">{p.status}</span>}</td><td className="px-4 py-4">{editingId===p.id ? <div className="flex gap-2"><button onClick={()=>handleSave(p.id)} className="p-1 text-accent"><Check size={18}/></button><button onClick={()=>setEditingId(null)} className="p-1 text-destructive"><X size={18}/></button></div> : <button onClick={()=>{setEditingId(p.id);setEditForm({assigned_committee:p.assigned_committee||'',assigned_country:p.assigned_country||'',assigned_institution:p.assigned_institution||'',status:p.status||'pending'})}} className="p-1 text-accent"><Edit size={18}/></button>}</td></motion.tr>)}</tbody></table></div>}
      </div>
    </div>
  );
};

export default AdminParticipants;
