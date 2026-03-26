import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui/PageHeader';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { CheckCircle, Mail, Download, ExternalLink } from 'lucide-react';
import { conferenceConfig } from '@/data/conference';

const GetInvolved = () => {
  const hasPitchDeck = Boolean(conferenceConfig.partnerships.pitchDeckUrl);

  return (
    <Layout>
      <PageHeader title="Partnerships & Sponsorships" subtitle="Partner with MWEF to support student-led economic leadership in Dubai." />

      <section className="py-20 md:py-28 bg-background">
        <div className="section-container max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <SectionHeader title="Why Partner with MWEF" subtitle="A focused sponsorship path with clear brand and education impact outcomes." />
            <div className="bg-card border border-border rounded-lg p-6 md:p-8 space-y-5" style={{ boxShadow: 'var(--shadow-card)' }}>
              <p className="text-muted-foreground">
                MWEF partnerships are designed for organizations that want meaningful engagement with ambitious middle and high school participants exploring economics, policy, and leadership.
              </p>

              <ul className="space-y-2">
                {conferenceConfig.partnerships.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                    <CheckCircle className="text-accent mt-0.5" size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <p className="pt-2 flex items-center gap-2 text-sm">
                <Mail size={16} className="text-accent" />
                or contact us at{' '}
                <a href={`mailto:${conferenceConfig.contactEmail}`} className="text-accent hover:underline font-medium">
                  {conferenceConfig.contactEmail}
                </a>
              </p>

              {hasPitchDeck ? (
                <a href={conferenceConfig.partnerships.pitchDeckUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 btn-primary">
                  <Download size={16} />
                  Download Pitch Deck
                  <ExternalLink size={14} />
                </a>
              ) : (
                <span className="inline-flex px-4 py-2 border border-dashed border-border rounded-md text-sm text-muted-foreground">Pitch deck link placeholder configured. Upload file to activate.</span>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default GetInvolved;
