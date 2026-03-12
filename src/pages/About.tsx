import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui/PageHeader';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { conferenceConfig, instagramPosts, missionVisionValues } from '@/data/conference';

const About = () => {
  const [activeIndex, setActiveIndex] = useState(1);

  const visible = useMemo(() => {
    const total = instagramPosts.length;
    const prev = (activeIndex - 1 + total) % total;
    const next = (activeIndex + 1) % total;
    return [instagramPosts[prev], instagramPosts[activeIndex], instagramPosts[next]];
  }, [activeIndex]);

  const shift = (direction: 'left' | 'right') => {
    setActiveIndex((current) => {
      if (direction === 'left') {
        return (current - 1 + instagramPosts.length) % instagramPosts.length;
      }
      return (current + 1) % instagramPosts.length;
    });
  };

  return (
    <Layout>
      <PageHeader title="About MWEF" subtitle="Welcome to the Model World Economic Forum — Dubai's premier economics simulation conference." />

      <section className="py-20 md:py-28 bg-background">
        <div className="section-container">
          <div className="max-w-5xl">
            <SectionHeader title="About Us" />
            <div className="space-y-6 text-muted-foreground leading-relaxed text-lg">
              {conferenceConfig.aboutCopy.split('\n\n').map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary overflow-hidden">
        <div className="section-container">
          <div className="flex items-center justify-between gap-4 mb-8">
            <SectionHeader
              title="Live Updates on Instagram"
              subtitle="Follow our feed for countdown updates, announcements, and conference prep posts."
            />
            <div className="hidden md:flex items-center gap-2">
              <button aria-label="Previous Instagram post" onClick={() => shift('left')} className="h-10 w-10 rounded-full border border-border bg-card hover:bg-accent/10 flex items-center justify-center">
                <ChevronLeft size={18} />
              </button>
              <button aria-label="Next Instagram post" onClick={() => shift('right')} className="h-10 w-10 rounded-full border border-border bg-card hover:bg-accent/10 flex items-center justify-center">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 items-center">
            {visible.map((post, idx) => (
              <motion.a
                key={post.id}
                href={post.link}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0.8, y: 12 }}
                animate={{ opacity: idx === 1 ? 1 : 0.75, y: 0, scale: idx === 1 ? 1 : 0.93 }}
                className={`rounded-xl overflow-hidden border ${idx === 1 ? 'border-accent/40 shadow-xl' : 'border-border'} bg-card block`}
              >
                <img src={post.image} alt={post.caption} className="w-full h-60 object-cover" />
                <div className="p-4">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">{new Date(post.date).toLocaleDateString()}</p>
                  <p className="text-sm text-foreground mb-3 line-clamp-3">{post.caption}</p>
                  <span className="inline-flex items-center gap-1 text-accent text-sm font-medium">
                    Open post <ExternalLink size={14} />
                  </span>
                </div>
              </motion.a>
            ))}
          </div>

          <div className="flex md:hidden justify-center gap-2 mt-6">
            <button aria-label="Previous Instagram post" onClick={() => shift('left')} className="h-10 w-10 rounded-full border border-border bg-card hover:bg-accent/10 flex items-center justify-center">
              <ChevronLeft size={18} />
            </button>
            <button aria-label="Next Instagram post" onClick={() => shift('right')} className="h-10 w-10 rounded-full border border-border bg-card hover:bg-accent/10 flex items-center justify-center">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary pt-0">
        <div className="section-container">
          <div className="grid lg:grid-cols-3 gap-8">
            {missionVisionValues.map((item, index) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="bg-card border border-border rounded-lg p-8" style={{ boxShadow: 'var(--shadow-card)' }}>
                <div className="w-12 h-1 bg-accent mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-4">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
