import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | NewsDigKhao",
  description: "Get in touch with our team for inquiries, feedback, or assistance.",
};

export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Contact Us</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
            <p className="mb-4">
              We'd love to hear from you! Whether you have a question about our services, have feedback, 
              or want to report an issue, we're here to help.
            </p>
            <p>
              Please fill out the form or use one of the alternative contact methods listed on this page.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <div className="space-y-3">
              <div>
                <p className="font-medium">Email:</p>
                <p className="text-blue-600">[Your Contact Email]</p>
              </div>
              
              <div>
                <p className="font-medium">Phone:</p>
                <p>[Your Phone Number]</p>
              </div>
              
              <div>
                <p className="font-medium">Address:</p>
                <p>[Your Physical Address]</p>
              </div>
              
              <div>
                <p className="font-medium">Business Hours:</p>
                <p>Monday to Friday: 9:00 AM - 5:00 PM</p>
                <p>Saturday and Sunday: Closed</p>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Follow Us</h2>
            <p className="mb-2">Connect with us on social media:</p>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-600 hover:text-blue-800">Twitter</a>
              <a href="#" className="text-blue-600 hover:text-blue-800">Facebook</a>
              <a href="#" className="text-blue-600 hover:text-blue-800">Instagram</a>
              <a href="#" className="text-blue-600 hover:text-blue-800">LinkedIn</a>
            </div>
          </section>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Send Us a Message</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-1">
                Subject <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>
            
            <div>
              <p className="text-sm text-gray-600 mb-4">
                By submitting this form, you agree to our <a href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</a> and
                <a href="/terms-and-conditions" className="text-blue-600 hover:underline"> Terms & Conditions</a>.
              </p>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">How quickly will I receive a response?</h3>
            <p className="text-gray-600">
              We typically respond to all inquiries within 24-48 business hours. For urgent matters, please call our phone number.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium">I'm having technical issues with the website. What should I do?</h3>
            <p className="text-gray-600">
              Please provide details about the issue you're experiencing, including your device, browser, and steps to reproduce the problem.
              Our technical team will assist you as soon as possible.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium">How do I advertise on your platform?</h3>
            <p className="text-gray-600">
              For advertising inquiries, please email us at [Your Advertising Email] with the subject line "Advertising Inquiry".
              Our media team will contact you with our media kit and pricing information.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium">I want to report incorrect information in an article</h3>
            <p className="text-gray-600">
              We strive for accuracy in our reporting. If you've found an error, please let us know using the contact form with the subject "Correction Request".
              Please include the article URL and the specific information that needs correction.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
} 