import { Layout } from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui/PageHeader';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ResourceCard } from '@/components/cards/ResourceCard';
import { committeeBackgroundGuides, participantResources } from '@/data/resources';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';

const Resources = () => {
  return (
    <Layout>
      <PageHeader title="Participant Resources" subtitle="Access official conference documents, committee guides, and preparation material." />

      <section className="py-20 md:py-28 bg-background">
        <div className="section-container space-y-12">
          <div>
            <SectionHeader title="Conference Documents" subtitle="Download official MWEF documents. Entries can be updated in src/data/resources.ts." />
            <div className="space-y-4 max-w-3xl">
              {participantResources.map((resource, index) => (
                <ResourceCard key={resource.id} title={resource.title} description={resource.description} index={index} url={resource.link} status={resource.status} />
              ))}
            </div>
          </div>

          <div>
            <SectionHeader title="Committee Background Guides" subtitle="A guide is listed for each committee. Missing files remain in a polished coming soon state." />
            <div className="space-y-4 max-w-4xl">
              {committeeBackgroundGuides.map((resource, index) => (
                <ResourceCard key={resource.id} title={resource.title} description={resource.description} index={index} url={resource.link} status={resource.status} />
              ))}
            </div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-accent/5 border border-accent/20 rounded-lg p-6 flex items-start gap-4 max-w-4xl">
            <Info className="text-accent flex-shrink-0 mt-1" size={20} />
            <div>
              <h4 className="font-semibold text-foreground mb-1">Document rollout in progress</h4>
              <p className="text-muted-foreground text-sm">
                Background guides and partner documents can be activated by replacing placeholder links and statuses in the resources data file.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Resources;
