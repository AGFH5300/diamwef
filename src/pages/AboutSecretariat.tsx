import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui/PageHeader';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { TeamMemberCard } from '@/components/cards/TeamMemberCard';
import { leadershipTeam, executiveTeam } from '@/data/team';

const AboutSecretariat = () => {
  return (
    <Layout>
      <PageHeader title="Secretariat Team" subtitle="Meet the leadership team behind the Model World Economic Forum." />

      <section className="py-20 md:py-28 bg-background">
        <div className="section-container">
          <div className="mb-16">
            <SectionHeader title="Leadership" subtitle="The founding team driving MWEF's vision and mission." center />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {leadershipTeam.map((member, index) => (
                <TeamMemberCard key={index} name={member.name} role={member.role} image={member.image} index={index} />
              ))}
            </div>
          </div>

          <div>
            <SectionHeader title="Executive Team" subtitle="The dedicated team members executing MWEF's operations." center />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {executiveTeam.map((member, index) => (
                <TeamMemberCard key={index} name={member.name} role={member.role} image={member.image} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutSecretariat;
