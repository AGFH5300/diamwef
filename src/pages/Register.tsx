import { Layout } from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui/PageHeader';
import { conferenceConfig } from '@/data/conference';
import { ExternalLink } from 'lucide-react';

const Register = () => {
  const hasEmbed = !conferenceConfig.registration.googleFormEmbedUrl.includes('https://forms.gle/EZ3eH9MqnGaXAYZi8');

  return (
    <Layout>
      <PageHeader title="Register for MWEF" subtitle="Complete the registration Google Form below. Your system account is provisioned automatically after submission." />

      <section className="py-20 bg-background">
        <div className="section-container grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 bg-card border border-border rounded-lg p-4 md:p-6" style={{ boxShadow: 'var(--shadow-card)' }}>
            <h2 className="text-2xl font-bold text-foreground mb-4">Participant Registration Form</h2>
            {hasEmbed ? (
              <iframe
                title="MWEF Registration Google Form"
                src="https://docs.google.com/forms/d/e/1FAIpQLSfuX7G0jBLOY7y55mCI0763STLRizXMrg4WqBhPrIHJA4vlXQ/viewform?hl=en"
                className="w-full min-h-[1200px] rounded-md border border-border"
              />
            ) : (
              <div className="rounded-md border border-dashed border-border p-8 text-center text-muted-foreground">
                <p className="mb-3">Google Form embed URL is not configured yet.</p>
                <p className="text-sm">Update to go live.</p>
              </div>
            )}
          </div>

          <aside className="space-y-6">
            <div className="bg-card border border-border rounded-lg p-6" style={{ boxShadow: 'var(--shadow-card)' }}>
              <h3 className="text-lg font-semibold text-foreground mb-3">What happens after you submit?</h3>
              <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-4">
                <li>Your registration is synced to the system dashboard.</li>
                <li>An account setup email is sent to your registered email address.</li>
                <li>Status and assignments are shared through your dashboard.</li>
              </ul>
            </div>

            <div className="bg-primary text-primary-foreground rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Event Snapshot</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex justify-between"><span className="text-white/70">Date</span><span className="font-medium">{conferenceConfig.eventDateLabel}</span></li>
                <li className="flex justify-between"><span className="text-white/70">Location</span><span className="font-medium">{conferenceConfig.locationName}</span></li>
                <li className="flex justify-between"><span className="text-white/70">Time</span><span className="font-medium">{conferenceConfig.eventTimeLabel}</span></li>
              </ul>
              <a href={conferenceConfig.locationMapUrl} target="_blank" rel="noreferrer" className="inline-flex mt-4 text-sm items-center gap-1 underline underline-offset-4">
                Open map <ExternalLink size={14} />
              </a>
            </div>
          </aside>
        </div>
      </section>
    </Layout>
  );
};

export default Register;
