import { useLanguage } from "@/contexts/LanguageContext";

const Cookies = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background pt-32 pb-16 px-4">
      <div className="max-w-[800px] mx-auto">
        {/* Funny Intro */}
        <div className="mb-12 text-center">
          <p className="text-muted-foreground text-lg italic">
            {t("cookies.intro")}
          </p>
        </div>

        {/* Main Content */}
        <h1 className="text-4xl font-bold text-foreground mb-8">
          {t("cookies.title")}
        </h1>

        <div className="space-y-8 text-foreground/80">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">1. What Are Cookies?</h2>
            <p>
              Cookies are small text files that are placed on your device when you visit our website. 
              They help us provide you with a better experience by remembering your preferences, 
              analyzing how you use our site, and improving our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">2. Types of Cookies We Use</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Essential Cookies</h3>
                <p>
                  These cookies are necessary for the website to function properly. They enable basic functions 
                  like page navigation, secure login, and access to protected areas of the website.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Performance Cookies</h3>
                <p>
                  These cookies help us understand how visitors interact with our website by collecting and 
                  reporting information anonymously. This helps us improve the way our website works.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Functionality Cookies</h3>
                <p>
                  These cookies allow the website to remember choices you make (such as language preferences) 
                  and provide enhanced, more personal features.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Targeting/Advertising Cookies</h3>
                <p>
                  These cookies are used to deliver advertisements more relevant to you and your interests. 
                  They also help limit the number of times you see an advertisement and measure the effectiveness 
                  of advertising campaigns.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">3. Third-Party Cookies</h2>
            <p className="mb-4">
              We use services from third-party companies that may set cookies on your device. These include:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Analytics services (Google Analytics, etc.)</li>
              <li>Social media platforms (for sharing functionality)</li>
              <li>Payment processors</li>
              <li>Customer support tools</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">4. Managing Cookies</h2>
            <p className="mb-4">
              You have the right to decide whether to accept or reject cookies. You can:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Manage your cookie preferences through our cookie consent tool</li>
              <li>Set your browser to refuse all cookies or indicate when a cookie is being sent</li>
              <li>Delete cookies that have already been set</li>
            </ul>
            <p className="mt-4">
              Note that if you disable cookies, some features of our website may not function properly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">5. Cookie Duration</h2>
            <p className="mb-4">
              Cookies can be either session cookies or persistent cookies:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Session cookies:</strong> Temporary cookies that are deleted when you close your browser</li>
              <li><strong>Persistent cookies:</strong> Remain on your device for a set period or until you delete them</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">6. Updates to This Policy</h2>
            <p>
              We may update this Cookie Policy from time to time to reflect changes in technology, legislation, 
              or our business operations. Please check this page regularly for updates.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">7. Contact Us</h2>
            <p>
              If you have questions about our use of cookies, please contact us at:{" "}
              <a href="mailto:privacy@bargn.fi" className="text-primary hover:underline">
                privacy@bargn.fi
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

export default Cookies;
