import { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui/PageHeader';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Building2, CheckCircle, Mail } from 'lucide-react';
import { conferenceConfig } from '@/data/conference';

const GetInvolved = () => {
  const [partnershipForm, setPartnershipForm] = useState({ organization: '', contact: '', email: '', partnershipType: '', message: '' });
  const [submittingPartnership, setSubmittingPartnership] = useState(false);

  const handlePartnershipSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingPartnership(true);

    const { error } = await supabase.from('partnership_applications').insert({
      organization_name: partnershipForm.organization,
      contact_person: partnershipForm.contact,
      email: partnershipForm.email,
      partnership_type: partnershipForm.partnershipType,
      message: partnershipForm.message || null,
      status: 'pending',
    });

    if (error) {
      toast.error('Failed to submit partnership inquiry. Please try again.');
      setSubmittingPartnership(false);
      return;
    }

    toast.success('Partnership inquiry submitted! We will contact you soon.');
    setPartnershipForm({ organization: '', contact: '', email: '', partnershipType: '', message: '' });
    setSubmittingPartnership(false);
  };

  const hasPitchDeck = Boolean(conferenceConfig.partnerships.pitchDeckUrl);

  return (
    <Layout>
      <PageHeader title="Partnership Opportunities" subtitle="Partner with MWEF to support student-led economic leadership." />

      <section className="py-20 md:py-28 bg-background">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <SectionHeader title="Partner with MWEF" subtitle="Interested in sponsoring or collaborating with MWEF? We'd love to hear from you." />
              <div className="space-y-4 text-muted-foreground">
                <p>MWEF offers multiple partnership opportunities for organizations engaging with future policy and business leaders.</p>
                <ul className="space-y-2">
                  {['Brand visibility at a premier student conference', 'Access to motivated student delegates', 'Support economics education in the region'].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle className="text-accent" size={18} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="pt-2 flex items-center gap-2">
                  <Mail size={16} className="text-accent" /> or contact us at{' '}
                  <a href={`mailto:${conferenceConfig.contactEmail}`} className="text-accent hover:underline font-medium">
                    {conferenceConfig.contactEmail}
                  </a>
                </p>
                {hasPitchDeck ? (
                  <a href={conferenceConfig.partnerships.pitchDeckUrl} target="_blank" rel="noreferrer" className="btn-primary inline-flex">
                    Download Pitch Deck
                  </a>
                ) : (
                  <span className="inline-flex px-4 py-2 border border-dashed border-border rounded-md text-sm text-muted-foreground">Pitch deck coming soon</span>
                )}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <form onSubmit={handlePartnershipSubmit} className="bg-card border border-border rounded-lg p-6 md:p-8" style={{ boxShadow: 'var(--shadow-card)' }}>
                <div className="flex items-center gap-3 mb-6">
                  <Building2 className="text-accent" size={24} />
                  <h3 className="text-xl font-semibold text-foreground">Partnership Inquiry</h3>
                </div>
                <div className="space-y-4">
                  <input type="text" className="form-input" value={partnershipForm.organization} onChange={(e) => setPartnershipForm({ ...partnershipForm, organization: e.target.value })} required placeholder="Organization Name" />
                  <input type="text" className="form-input" value={partnershipForm.contact} onChange={(e) => setPartnershipForm({ ...partnershipForm, contact: e.target.value })} required placeholder="Contact Person" />
                  <input type="email" className="form-input" value={partnershipForm.email} onChange={(e) => setPartnershipForm({ ...partnershipForm, email: e.target.value })} required placeholder="Email" />
                  <select className="form-input" value={partnershipForm.partnershipType} onChange={(e) => setPartnershipForm({ ...partnershipForm, partnershipType: e.target.value })} required>
                    <option value="">Select partnership type</option>
                    <option value="sponsor">Sponsorship</option>
                    <option value="media">Media Partner</option>
                    <option value="institutional">Institutional Partner</option>
                  </select>
                  <textarea className="form-input min-h-[100px]" placeholder="How would you like to collaborate?" value={partnershipForm.message} onChange={(e) => setPartnershipForm({ ...partnershipForm, message: e.target.value })} />
                  <button type="submit" className="w-full btn-primary" disabled={submittingPartnership}>
                    {submittingPartnership ? 'Submitting...' : 'Submit Inquiry'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default GetInvolved;
