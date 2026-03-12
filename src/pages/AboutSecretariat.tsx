import { Layout } from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui/PageHeader';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { TeamMemberCard } from '@/components/cards/TeamMemberCard';
import { leadershipTeam, executiveChairs, coreTeam } from '@/data/team';

const AboutSecretariat = () => {
  return (
    <Layout>
      <PageHeader title="Secretariat Team" subtitle="Meet the leadership team behind the Model World Economic Forum." />

      <section className="py-20 md:py-28 bg-background">
        <div className="section-container space-y-16">
          <div>
            <SectionHeader title="Leadership" subtitle="The presidents and leadership team guiding MWEF's direction." center />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {leadershipTeam.map((member, index) => (
                <TeamMemberCard key={index} name={member.name} role={member.role} image={member.image} index={index} />
              ))}
            </div>
          </div>

          <div>
            <SectionHeader title="Executive Chairs" subtitle="Committee chairs and executive chairs (placeholder entries until final list from Jash)." center />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {executiveChairs.map((member, index) => (
                <TeamMemberCard key={index} name={member.name} role={member.role} image={member.image} index={index} />
              ))}
            </div>
          </div>

          <div>
            <SectionHeader title="Core Team" subtitle="The dedicated team members executing MWEF operations." center />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {coreTeam.map((member, index) => (
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
