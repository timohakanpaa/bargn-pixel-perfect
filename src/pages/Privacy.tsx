import { useLanguage } from "@/contexts/LanguageContext";
import { useBreadcrumbSchema } from "@/hooks/use-breadcrumb-schema";

const Privacy = () => {
  const { t } = useLanguage();
  useBreadcrumbSchema();

  return (
    <div className="min-h-screen bg-background pt-32 pb-16 px-4">
      <div className="max-w-[800px] mx-auto">
        {/* Funny Intro */}
        <div className="mb-12 text-center">
          <p className="text-muted-foreground text-lg italic">
            {t("privacy.intro")}
          </p>
        </div>

        {/* Main Content */}
        <h1 className="text-4xl font-bold text-foreground mb-8">
          {t("privacy.title")}
        </h1>

        <div className="space-y-8 text-foreground/80">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">1. Information We Collect</h2>
            <p className="mb-4">
              We collect information that you provide directly to us, including when you create an account, 
              make a purchase, participate in surveys, or communicate with us. This may include your name, 
              email address, phone number, payment information, and other details you choose to provide.
            </p>
            <p>
              We also automatically collect certain information about your device when you use our services, 
              including your IP address, browser type, operating system, and usage data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">2. How We Use Your Information</h2>
            <p className="mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send you technical notices, updates, and support messages</li>
              <li>Respond to your comments and questions</li>
              <li>Analyze usage patterns and trends</li>
              <li>Detect, prevent, and address fraud and security issues</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">3. Information Sharing</h2>
            <p className="mb-4">
              We do not sell your personal information. We may share your information in the following circumstances:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>With service providers who perform services on our behalf</li>
              <li>When required by law or to protect our rights</li>
              <li>In connection with a business transaction (merger, sale, etc.)</li>
              <li>With your consent or at your direction</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">4. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information 
              against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission 
              over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">5. Your Rights</h2>
            <p className="mb-4">
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Access to your personal information</li>
              <li>Correction of inaccurate information</li>
              <li>Deletion of your information</li>
              <li>Restriction of processing</li>
              <li>Data portability</li>
              <li>Objection to processing</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">6. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:{" "}
              <a href="mailto:privacy@bargn.app" className="text-primary hover:underline">
                privacy@bargn.app
              </a>
            </p>
          </section>

          <section>
            <p className="text-sm text-muted-foreground">
              Last updated: December 2024
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
