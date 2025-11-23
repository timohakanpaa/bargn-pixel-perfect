import { useLanguage } from "@/contexts/LanguageContext";
import { useBreadcrumbSchema } from "@/hooks/use-breadcrumb-schema";

const Terms = () => {
  const { t } = useLanguage();
  useBreadcrumbSchema();

  return (
    <div className="min-h-screen bg-background pt-32 pb-16 px-4">
      <div className="max-w-[800px] mx-auto">
        {/* Funny Intro */}
        <div className="mb-12 text-center">
          <p className="text-muted-foreground text-lg italic">
            {t("terms.intro")}
          </p>
        </div>

        {/* Main Content */}
        <h1 className="text-4xl font-bold text-foreground mb-8">
          {t("terms.title")}
        </h1>

        <div className="space-y-8 text-foreground/80">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using Bargn services, you accept and agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">2. Description of Service</h2>
            <p className="mb-4">
              Bargn provides a discount membership platform that connects members with partner businesses offering 
              special rates and promotions. Our service includes:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Access to exclusive discounts at partner locations</li>
              <li>AI-powered recommendations based on your preferences</li>
              <li>Mobile and web-based membership management</li>
              <li>Customer support services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">3. User Accounts</h2>
            <p className="mb-4">
              To use our services, you must create an account. You agree to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Notify us immediately of any unauthorized access</li>
              <li>Be responsible for all activities under your account</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">4. Membership and Payments</h2>
            <p className="mb-4">
              Membership fees are charged on a monthly or annual basis as selected during signup. You agree that:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>All fees are non-refundable except as required by law</li>
              <li>Automatic renewal occurs unless cancelled before renewal date</li>
              <li>Price changes will be communicated 30 days in advance</li>
              <li>You authorize us to charge your payment method on file</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">5. Discount Usage</h2>
            <p className="mb-4">
              When using discounts at partner locations, you must:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Present valid membership verification when requested</li>
              <li>Follow partner-specific terms and conditions</li>
              <li>Not abuse or misuse the discount system</li>
              <li>Understand that discounts cannot be combined with other offers unless stated</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">6. Prohibited Conduct</h2>
            <p className="mb-4">
              You may not:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Share your account credentials with others</li>
              <li>Use the service for any illegal purposes</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Harass, abuse, or harm other users or partners</li>
              <li>Reverse engineer or copy our technology</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">7. Termination</h2>
            <p>
              We reserve the right to suspend or terminate your account at any time for violation of these terms. 
              You may cancel your membership at any time through your account settings. Upon cancellation, 
              you will retain access until the end of your current billing period.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">8. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, Bargn shall not be liable for any indirect, incidental, 
              special, consequential, or punitive damages resulting from your use of our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">9. Changes to Terms</h2>
            <p>
              We may update these Terms of Service from time to time. We will notify you of any material changes 
              by email or through our service. Continued use after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">10. Contact</h2>
            <p>
              For questions about these Terms, contact us at:{" "}
              <a href="mailto:legal@bargn.app" className="text-primary hover:underline">
                legal@bargn.app
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

export default Terms;
