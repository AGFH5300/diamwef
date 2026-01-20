import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui/PageHeader';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { User, FileText, Globe, Calendar, Clock, Shield, LogOut, Edit } from 'lucide-react';
import { toast } from 'sonner';

interface Registration {
  id: string;
  delegation_type: string;
  preferred_country: string | null;
  preferred_institution: string | null;
  committee_preference: string | null;
  assigned_country: string | null;
  assigned_institution: string | null;
  assigned_committee: string | null;
  status: string;
  payment_status: string;
  created_at: string;
}

const Dashboard = () => {
  const { user, profile, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [registration, setRegistration] = useState<Registration | null>(null);
  const [loadingReg, setLoadingReg] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    const fetchRegistration = async () => {
      if (!user) return;
      
      const { data, error } = await supabase
        .from('delegate_registrations')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching registration:', error);
      } else {
        setRegistration(data);
      }
      setLoadingReg(false);
    };

    if (user) {
      fetchRegistration();
    }
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    toast.success('Signed out successfully');
    navigate('/');
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
        </div>
      </Layout>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <Layout>
      <PageHeader
        title="Delegate Dashboard"
        subtitle={`Welcome back, ${profile?.full_name || 'Delegate'}!`}
      />

      <section className="py-20 bg-background">
        <div className="section-container">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Profile Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card border border-border rounded-lg p-6"
                style={{ boxShadow: 'var(--shadow-card)' }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                    <User className="text-accent" size={20} />
                    Profile Information
                  </h2>
                  <button className="text-accent hover:underline text-sm flex items-center gap-1">
                    <Edit size={14} />
                    Edit
                  </button>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Full Name</p>
                    <p className="font-medium text-foreground">{profile?.full_name || 'Not set'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium text-foreground">{profile?.email || user?.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">School</p>
                    <p className="font-medium text-foreground">{profile?.school || 'Not set'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Grade</p>
                    <p className="font-medium text-foreground">{profile?.grade || 'Not set'}</p>
                  </div>
                </div>
              </motion.div>

              {/* Registration Status */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-card border border-border rounded-lg p-6"
                style={{ boxShadow: 'var(--shadow-card)' }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                    <FileText className="text-accent" size={20} />
                    Registration Status
                  </h2>
                </div>

                {loadingReg ? (
                  <div className="animate-pulse space-y-4">
                    <div className="h-4 bg-muted rounded w-1/3"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                  </div>
                ) : registration ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-muted-foreground">Status:</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(registration.status)}`}>
                        {registration.status.charAt(0).toUpperCase() + registration.status.slice(1)}
                      </span>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-border">
                      <div>
                        <p className="text-sm text-muted-foreground">Delegation Type</p>
                        <p className="font-medium text-foreground capitalize">{registration.delegation_type}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Preferred {registration.delegation_type === 'country' ? 'Country' : 'Institution'}</p>
                        <p className="font-medium text-foreground">
                          {registration.delegation_type === 'country' 
                            ? registration.preferred_country 
                            : registration.preferred_institution || 'Not specified'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Committee Preference</p>
                        <p className="font-medium text-foreground">{registration.committee_preference || 'Any'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Payment Status</p>
                        <p className="font-medium text-foreground capitalize">{registration.payment_status}</p>
                      </div>
                    </div>

                    {registration.assigned_country || registration.assigned_committee ? (
                      <div className="mt-6 p-4 bg-accent/10 border border-accent/20 rounded-lg">
                        <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <Globe className="text-accent" size={18} />
                          Your Assignment
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Assigned {registration.delegation_type === 'country' ? 'Country' : 'Institution'}</p>
                            <p className="font-bold text-primary">
                              {registration.delegation_type === 'country' 
                                ? registration.assigned_country 
                                : registration.assigned_institution || 'Pending'}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Assigned Committee</p>
                            <p className="font-bold text-primary">{registration.assigned_committee || 'Pending'}</p>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FileText className="mx-auto text-muted-foreground mb-4" size={48} />
                    <p className="text-muted-foreground mb-4">You haven't registered yet.</p>
                    <Link to="/register" className="btn-primary inline-block">
                      Register Now
                    </Link>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card border border-border rounded-lg p-6"
                style={{ boxShadow: 'var(--shadow-card)' }}
              >
                <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <Link
                    to="/resources"
                    className="block w-full text-left px-4 py-3 rounded-md bg-secondary hover:bg-secondary/80 text-foreground transition-colors"
                  >
                    📚 View Resources
                  </Link>
                  <Link
                    to="/committees"
                    className="block w-full text-left px-4 py-3 rounded-md bg-secondary hover:bg-secondary/80 text-foreground transition-colors"
                  >
                    🏛️ Explore Committees
                  </Link>
                  <Link
                    to="/conference"
                    className="block w-full text-left px-4 py-3 rounded-md bg-secondary hover:bg-secondary/80 text-foreground transition-colors"
                  >
                    📋 Conference Structure
                  </Link>
                </div>
              </motion.div>

              {/* Important Dates */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-primary text-primary-foreground rounded-lg p-6"
              >
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Calendar size={18} />
                  Important Dates
                </h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex justify-between">
                    <span className="text-white/70">Conference</span>
                    <span className="font-medium">21 Feb 2026</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-white/70">Reg. Deadline</span>
                    <span className="font-medium">TBA</span>
                  </li>
                </ul>
              </motion.div>

              {/* Admin Access */}
              {isAdmin && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-accent/10 border border-accent/20 rounded-lg p-6"
                >
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Shield className="text-accent" size={18} />
                    Admin Access
                  </h3>
                  <Link
                    to="/admin"
                    className="block w-full text-center btn-primary"
                  >
                    Go to Admin Dashboard
                  </Link>
                </motion.div>
              )}

              {/* Sign Out */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-md border border-destructive text-destructive hover:bg-destructive/10 transition-colors"
                >
                  <LogOut size={18} />
                  Sign Out
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Dashboard;
