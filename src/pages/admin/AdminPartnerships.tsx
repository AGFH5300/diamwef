import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Search, Building2, Clock, CheckCircle, XCircle, Eye } from 'lucide-react';

interface Partnership {
  id: string;
  organization_name: string;
  contact_person: string;
  email: string;
  partnership_type: string;
  message: string | null;
  status: string;
  admin_notes: string | null;
  created_at: string;
}

const AdminPartnerships = () => {
  const [partnerships, setPartnerships] = useState<Partnership[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPartnership, setSelectedPartnership] = useState<Partnership | null>(null);

  const fetchPartnerships = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('partnership_applications')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching partnerships:', error);
      toast.error('Failed to fetch partnerships');
    } else {
      setPartnerships(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPartnerships();
  }, []);

  const updateStatus = async (id: string, newStatus: 'pending' | 'under_review' | 'approved' | 'rejected') => {
    const { error } = await supabase
      .from('partnership_applications')
      .update({ status: newStatus })
      .eq('id', id);

    if (error) {
      toast.error('Failed to update status');
    } else {
      toast.success(`Partnership ${status}`);
      fetchPartnerships();
      setSelectedPartnership(null);
    }
  };

  const filteredPartnerships = partnerships.filter(p => 
    p.organization_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.contact_person.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.email.toLowerCase().includes(searchTerm.toLowerCase())
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Partnership Applications</h2>
          <p className="text-muted-foreground">Review and manage partnership inquiries.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Building2 size={18} />
          <span>{partnerships.length} applications</span>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
        <input
          type="text"
          placeholder="Search organizations..."
          className="form-input pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          [...Array(6)].map((_, i) => (
            <div key={i} className="bg-card border border-border rounded-lg p-6 animate-pulse">
              <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-muted rounded w-1/2"></div>
            </div>
          ))
        ) : filteredPartnerships.length === 0 ? (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            No partnership applications found.
          </div>
        ) : (
          filteredPartnerships.map((partnership, index) => (
            <motion.div
              key={partnership.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-card border border-border rounded-lg p-6 hover:border-accent/30 transition-colors cursor-pointer"
              style={{ boxShadow: 'var(--shadow-card)' }}
              onClick={() => setSelectedPartnership(partnership)}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-foreground">{partnership.organization_name}</h3>
                  <p className="text-sm text-muted-foreground">{partnership.contact_person}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(partnership.status)}`}>
                  {partnership.status.replace('_', ' ')}
                </span>
              </div>
              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground">{partnership.email}</p>
                <p className="text-foreground capitalize">Type: {partnership.partnership_type}</p>
                <p className="text-muted-foreground text-xs">
                  {new Date(partnership.created_at).toLocaleDateString()}
                </p>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Detail Modal */}
      {selectedPartnership && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-border rounded-lg p-6 max-w-lg w-full max-h-[80vh] overflow-auto"
            style={{ boxShadow: 'var(--shadow-elevated)' }}
          >
            <div className="flex items-start justify-between mb-6">
              <h3 className="text-xl font-semibold text-foreground">{selectedPartnership.organization_name}</h3>
              <button
                onClick={() => setSelectedPartnership(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Contact Person</p>
                <p className="font-medium text-foreground">{selectedPartnership.contact_person}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium text-foreground">{selectedPartnership.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Partnership Type</p>
                <p className="font-medium text-foreground capitalize">{selectedPartnership.partnership_type}</p>
              </div>
              {selectedPartnership.message && (
                <div>
                  <p className="text-sm text-muted-foreground">Message</p>
                  <p className="text-foreground whitespace-pre-wrap">{selectedPartnership.message}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-muted-foreground">Submitted</p>
                <p className="text-foreground">{new Date(selectedPartnership.created_at).toLocaleString()}</p>
              </div>
            </div>

            <div className="flex gap-3 mt-6 pt-6 border-t border-border">
              <button
                onClick={() => updateStatus(selectedPartnership.id, 'approved')}
                className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
              >
                <CheckCircle size={18} />
                Approve
              </button>
              <button
                onClick={() => updateStatus(selectedPartnership.id, 'under_review')}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                <Clock size={18} />
                Review
              </button>
              <button
                onClick={() => updateStatus(selectedPartnership.id, 'rejected')}
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

export default AdminPartnerships;
