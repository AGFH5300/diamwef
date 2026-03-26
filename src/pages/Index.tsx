import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Calendar, MapPin, Trophy, BookOpen, Globe } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { CountdownTimer } from '@/components/ui/CountdownTimer';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { CommitteeCard } from '@/components/cards/CommitteeCard';
import { StatsSection } from '@/components/ui/StatsSection';
import { committees } from '@/data/committees';
import { conferenceConfig } from '@/data/conference';
import heroBg from '@/assets/hero-bg.jpg';

const conferenceDate = new Date(conferenceConfig.eventDateIso);

const features = [
  {
    icon: BookOpen,
    title: 'Rigorous Economics',
    description: 'Engage with complex global economic problems through evidence-based analysis and debate.',
  },
  {
    icon: Users,
    title: 'Years 7–12',
    description: 'Open to all schools with Junior & Senior categories and stakeholder delegations.',
  },
  {
    icon: Trophy,
    title: 'Competitive Excellence',
    description: 'Awards for Best Participant, Best Speaker, and Committee Winners across all forums.',
  },
  {
    icon: Globe,
    title: 'Global Perspective',
    description: 'Debate pressing economic issues through policymaker and stakeholder roles.',
  },
];

const Index = () => {
  return (
    <Layout>
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ backgroundImage: `url(${heroBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-primary/80" />
        <div className="absolute inset-0 bg-hero-pattern" />

        <div className="section-container relative z-10 text-center py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="w-20 h-1 bg-accent mx-auto mb-8" />
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">Model World Economic Forum</h1>
            <p className="text-lg md:text-xl text-white/85 max-w-4xl mx-auto mb-8 leading-relaxed">
              {conferenceConfig.homepageShortCopy}
            </p>

            <div className="mb-10">
              <p className="text-white/70 text-sm uppercase tracking-widest mb-4">Conference begins in</p>
              <div className="flex justify-center">
                <CountdownTimer targetDate={conferenceDate} />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground font-semibold px-8 py-4 rounded-md text-lg transition-all duration-200 hover:opacity-90">
                Register Now
                <ArrowRight size={20} />
              </Link>
              <Link to="/resources/committees" className="inline-flex items-center justify-center gap-2 border-2 border-white/80 text-white font-semibold px-8 py-4 rounded-md text-lg transition-all duration-200 hover:bg-white hover:text-primary">
                Explore Committees
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <StatsSection />

      <section className="py-20 md:py-28 bg-background">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="accent-bar mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">What is MWEF?</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  The Model World Economic Forum (MWEF) is a platform where economic theory meets real-world policy-making. Participants are challenged to confront complex issues, evaluate trade-offs, and design practical policy solutions.
                </p>
                <p>
                  MWEF brings together participants from across {conferenceConfig.schoolCountLabel} schools through structured debate, strategic collaboration, and evidence-based policy formulation.
                </p>
              </div>
              <Link to="/about" className="inline-flex items-center gap-2 text-accent font-medium mt-6 hover:gap-3 transition-all">
                Learn more about MWEF
                <ArrowRight size={18} />
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="bg-card border border-border rounded-lg p-5 hover:border-accent/30 transition-all duration-300" style={{ boxShadow: 'var(--shadow-card)' }}>
                  <feature.icon className="text-accent mb-3" size={28} />
                  <h4 className="font-semibold text-foreground mb-2">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-primary py-8">
        <div className="section-container">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-white">
            <div className="flex items-center gap-3">
              <Calendar className="text-accent" size={24} />
              <div>
                <p className="text-sm text-white/70">Date</p>
                <p className="font-semibold">{conferenceConfig.eventDateLabel}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="text-accent" size={24} />
              <div>
                <p className="text-sm text-white/70">Location</p>
                <p className="font-semibold">{conferenceConfig.locationName}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="text-accent" size={24} />
              <div>
                <p className="text-sm text-white/70">Committees</p>
                <p className="font-semibold">{conferenceConfig.committeeCountLabel} Committees</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-secondary">
        <div className="section-container">
          <SectionHeader title="Our Committees" subtitle="Explore our specialized economic forums, each addressing critical global challenges through rigorous analysis and debate." center />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {committees.slice(0, 6).map((committee, index) => (
              <CommitteeCard key={committee.id} id={committee.id} name={committee.name} abbreviation={committee.abbreviation} category={committee.categoryShort} description={committee.overview} index={index} />
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mt-10">
            <Link to="/resources/committees" className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-md transition-all duration-200 hover:opacity-90">
              View All Committees
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="bg-primary py-20">
        <div className="section-container text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Shape the Future of Economics?</h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
              Join Dubai's premier economics conference and develop real-world policy-making skills.
            </p>
            <div className="flex justify-center">
              <Link to="/register" className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground font-semibold px-8 py-4 rounded-md transition-all duration-200 hover:opacity-90">
                Register Now
                <ArrowRight size={20} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
