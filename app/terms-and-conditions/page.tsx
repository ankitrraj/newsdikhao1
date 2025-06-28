import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | NewsDigKhao",
  description: "Our Terms & Conditions outline the rules and guidelines for using our website.",
};

export default function TermsAndConditions() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Terms and Conditions</h1>
      
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <p className="mt-2">
            Welcome to NewsDigKhao. These terms and conditions outline the rules and regulations for the use of our website.
          </p>
          <p className="mt-2">
            By accessing this website, we assume you accept these terms and conditions. Do not continue to use NewsDigKhao if you do not agree to take all of the terms and conditions stated on this page.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Definitions</h2>
          <p>For the purposes of these Terms and Conditions:</p>
          <ul className="list-disc pl-6 mt-2">
            <li><strong>"Website"</strong> refers to NewsDigKhao.</li>
            <li><strong>"Service"</strong> refers to the services provided by NewsDigKhao.</li>
            <li><strong>"You"</strong> refers to the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</li>
            <li><strong>"Content"</strong> refers to articles, text, images, graphics, videos, and all other forms of data or communication.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
          <p>
            The Service and its original content (excluding Content provided by users), features, and functionality are and will remain the exclusive property of NewsDigKhao and its licensors.
            The Service is protected by copyright, trademark, and other laws of both the country and foreign countries.
          </p>
          <p className="mt-2">
            Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of NewsDigKhao.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">User Accounts</h2>
          <p>
            When you create an account with us, you must provide us with information that is accurate, complete, and current at all times. 
            Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
          </p>
          <p className="mt-2">
            You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.
            You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">User-Generated Content</h2>
          <p>
            Our Service may allow you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material. 
            You are responsible for the Content that you post on or through the Service, including its legality, reliability, and appropriateness.
          </p>
          <p className="mt-2">
            By posting Content on or through the Service, You represent and warrant that:
          </p>
          <ul className="list-disc pl-6 mt-2">
            <li>The Content is yours (you own it) or you have the right to use it and grant us the rights and license as provided in these Terms.</li>
            <li>The posting of your Content on or through the Service does not violate the privacy rights, publicity rights, copyrights, contract rights or any other rights of any person.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Advertising</h2>
          <p>
            This website displays advertisements, including those from Google AdSense. By using our website, you agree to the following:
          </p>
          <ul className="list-disc pl-6 mt-2">
            <li>Advertisements displayed on this website are selected by Google and other advertising partners.</li>
            <li>We do not endorse products or services advertised on our website.</li>
            <li>The advertisements may use cookies to collect data for targeted advertising.</li>
            <li>We are not responsible for the content of these advertisements or for any products or services they offer.</li>
          </ul>
          <p className="mt-2">
            We reserve the right to change the advertising networks we use at any time without notice.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Links To Other Websites</h2>
          <p>
            Our Service may contain links to third-party websites or services that are not owned or controlled by NewsDigKhao.
          </p>
          <p className="mt-2">
            NewsDigKhao has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party websites or services. 
            You further acknowledge and agree that NewsDigKhao shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods, or services available on or through any such websites or services.
          </p>
          <p className="mt-2">
            We strongly advise you to read the terms and conditions and privacy policies of any third-party websites or services that you visit.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Termination</h2>
          <p>
            We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
          </p>
          <p className="mt-2">
            Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Limitation Of Liability</h2>
          <p>
            In no event shall NewsDigKhao, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
          </p>
          <ul className="list-disc pl-6 mt-2">
            <li>Your access to or use of or inability to access or use the Service.</li>
            <li>Any conduct or content of any third party on the Service.</li>
            <li>Any content obtained from the Service.</li>
            <li>Unauthorized access, use, or alteration of your transmissions or content.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Disclaimer</h2>
          <p>
            Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement, or course of performance.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with the laws of [Your Country], without regard to its conflict of law provisions.
          </p>
          <p className="mt-2">
            Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Changes to Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
          </p>
          <p className="mt-2">
            By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at:
          </p>
          <ul className="mt-2">
            <li>Email: [Your Contact Email]</li>
            <li>Address: [Your Physical Address]</li>
          </ul>
        </section>
      </div>
    </div>
  );
} 