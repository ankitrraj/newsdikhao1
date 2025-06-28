import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | NewsDigKhao",
  description: "Our Privacy Policy outlines how we collect, use, and protect your information.",
};

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <p className="mt-2">
            Welcome to NewsDigKhao. We respect your privacy and are committed to protecting your personal data. 
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
          <p>We may collect several types of information from and about users of our website, including:</p>
          <ul className="list-disc pl-6 mt-2">
            <li>Personal information (such as name, email address, and contact details) that you voluntarily provide to us when subscribing to our newsletter or submitting feedback.</li>
            <li>Information about your internet connection, the equipment you use to access our website, and usage details.</li>
            <li>Non-personal identification information may include browser name, device type, and technical information about your means of connection to our website.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
          <p>We may use the information we collect from you for the following purposes:</p>
          <ul className="list-disc pl-6 mt-2">
            <li>To provide and maintain our service.</li>
            <li>To notify you about changes to our website or services.</li>
            <li>To allow you to participate in interactive features on our website.</li>
            <li>To provide customer support.</li>
            <li>To gather analysis or valuable information so that we can improve our website.</li>
            <li>To monitor the usage of our website.</li>
            <li>To detect, prevent, and address technical issues.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to track activity on our website and hold certain information.
            Cookies are files with a small amount of data which may include an anonymous unique identifier.
          </p>
          <p className="mt-2">
            We use cookies for the following purposes:
          </p>
          <ul className="list-disc pl-6 mt-2">
            <li>To understand and save user preferences for future visits.</li>
            <li>To compile aggregate data about site traffic and site interactions.</li>
            <li>To enhance and personalize your browsing experience.</li>
          </ul>
          <p className="mt-2">
            You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            However, if you do not accept cookies, you may not be able to use some portions of our website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Google AdSense</h2>
          <p>
            We use Google AdSense to serve advertisements on our website. Google AdSense may use cookies and web beacons to serve ads based on your prior visits to our website or other websites.
          </p>
          <p className="mt-2">
            Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to our site and/or other sites on the Internet.
          </p>
          <p className="mt-2">
            You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" className="text-blue-600 hover:underline">Google Ads Settings</a>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Third-Party Disclosure</h2>
          <p>
            We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties without your consent except as described in this Privacy Policy.
            This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.
          </p>
          <p className="mt-2">
            We may also release your information when we believe release is appropriate to comply with the law, enforce our site policies, or protect ours or others' rights, property, or safety.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
            We encourage you to read the privacy policy of every website you visit.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Children's Privacy</h2>
          <p>
            Our website is not intended for use by children under the age of 13, and we do not knowingly collect personal information from children under 13.
            If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
            You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:
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