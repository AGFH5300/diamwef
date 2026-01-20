import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Search, UserCheck, Clock, CheckCircle, XCircle } from 'lucide-react';

interface Volunteer {
  id: string;
  full_name: string;
  school: string;
  email: string;
  experience: string | null;
  preferred_role: string;
  status: string;
  admin_notes: string | null;
  created_at: string;
}

const AdminVolunteers = () => {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVolunteer, setSelectedVolunteer] = useState<Volunteer | null>(null);

  const fetchVolunteers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('volunteer_signups')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching volunteers:', error);
      toast.error('Failed to fetch volunteers');
    } else {
      setVolunteers(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const updateStatus = async (id: string, newStatus: 'pending' | 'under_review' | 'approved' | 'rejected') => {
    const { error } = await supabase
      .from('volunteer_signups')
      .update({ status: newStatus })
      .eq('id', id);

    if (error) {
      toast.error('Failed to update status');
    } else {
      toast.success(`Volunteer ${status}`);
      fetchVolunteers();
      setSelectedVolunteer(null);
    }
  };

  const filteredVolunteers = volunteers.filter(v => 
    v.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.school.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'under_review': return 'bg-blue-100 text-blue-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'chair': return 'Committee Chair';
      case 'admin': return 'Administrative';
      case 'media': return 'Media Team';
      case 'coordinator': return 'Event Coordinator';
      default: return role;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Volunteer Applications</h2>
          <p className="text-muted-foreground">Review and manage volunteer sign-ups.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <UserCheck size={18} />
          <span>{volunteers.length} applications</span>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
        <input
          type="text"
          placeholder="Search volunteers..."
          className="form-input pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden" style={{ boxShadow: 'var(--shadow-card)' }}>
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto"></div>
          </div>
        ) : filteredVolunteers.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            No volunteer applications found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary">
                <tr>
                  <th className="text-left px-4 py-3 text-sm font-medium text-foreground">Name</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-foreground">School</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-foreground">Role</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-foreground">Status</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-foreground">Date</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredVolunteers.map((volunteer) => (
                  <motion.tr
                    key={volunteer.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-secondary/50 cursor-pointer"
                    onClick={() => setSelectedVolunteer(volunteer)}
                  >
                    <td className="px-4 py-4">
                      <div>
                        <p className="font-medium text-foreground">{volunteer.full_name}</p>
                        <p className="text-sm text-muted-foreground">{volunteer.email}</p>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-muted-foreground">
                      {volunteer.school}
                    </td>
                    <td className="px-4 py-4 text-sm text-foreground">
                      {getRoleLabel(volunteer.preferred_role)}
                    </td>
                    <td className="px-4 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(volunteer.status)}`}>
                        {volunteer.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-muted-foreground">
                      {new Date(volunteer.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => updateStatus(volunteer.id, 'approved')}
                          className="p-1 text-green-600 hover:bg-green-100 rounded"
                          title="Approve"
                        >
                          <CheckCircle size={18} />
                        </button>
                        <button
                          onClick={() => updateStatus(volunteer.id, 'rejected')}
                          className="p-1 text-red-600 hover:bg-red-100 rounded"
                          title="Reject"
                        >
                          <XCircle size={18} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedVolunteer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-border rounded-lg p-6 max-w-lg w-full max-h-[80vh] overflow-auto"
            style={{ boxShadow: 'var(--shadow-elevated)' }}
          >
            <div className="flex items-start justify-between mb-6">
              <h3 className="text-xl font-semibold text-foreground">{selectedVolunteer.full_name}</h3>
              <button
                onClick={() => setSelectedVolunteer(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium text-foreground">{selectedVolunteer.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">School</p>
                <p className="font-medium text-foreground">{selectedVolunteer.school}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Preferred Role</p>
                <p className="font-medium text-foreground">{getRoleLabel(selectedVolunteer.preferred_role)}</p>
              </div>
              {selectedVolunteer.experience && (
                <div>
                  <p className="text-sm text-muted-foreground">Experience</p>
                  <p className="text-foreground whitespace-pre-wrap">{selectedVolunteer.experience}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-muted-foreground">Submitted</p>
                <p className="text-foreground">{new Date(selectedVolunteer.created_at).toLocaleString()}</p>
              </div>
            </div>

            <div className="flex gap-3 mt-6 pt-6 border-t border-border">
              <button
                onClick={() => updateStatus(selectedVolunteer.id, 'approved')}
                className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
              >
                <CheckCircle size={18} />
                Approve
              </button>
              <button
                onClick={() => updateStatus(selectedVolunteer.id, 'under_review')}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                <Clock size={18} />
                Review
              </button>
              <button
                onClick={() => updateStatus(selectedVolunteer.id, 'rejected')}
                className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
              >
                <XCircle size={18} />
                Reject
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminVolunteers;
