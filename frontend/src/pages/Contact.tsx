import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import API from '../services/api';

// Safe icon renderer
const Icon = ({ icon: IconComponent, className, size }: any) => (
  <IconComponent className={className} size={size} />
);

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await API.post('/contact', form);
      setSubmitted(true);
    } catch (err) {
      setError('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center px-6 transition-colors duration-300">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-3xl font-heading font-bold text-[#1A3C91] dark:text-white mb-2">
            Thank You!
          </h2>
          <p className="text-gray-600 dark:text-gray-300 font-body">
            Your message has been sent successfully. We'll get back to you soon.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-6 bg-[#2EAD32] hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-semibold transition"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
      <Helmet>
        <title>Contact Us | Mugher Cement</title>
        <meta
          name="description"
          content="Get in touch with Mugher Cement. Contact our team for inquiries, quotes, and support."
        />
      </Helmet>

      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-[#1A3C91] to-[#2EAD32] py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_50%,_#fff_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="container mx-auto px-6 text-center text-white relative z-10">
          <Icon icon={FaEnvelope} className="text-5xl md:text-6xl mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-heading font-extrabold tracking-wide">
            Get in Touch
          </h1>
          <p className="text-lg md:text-xl text-gray-200 font-body max-w-2xl mx-auto mt-4">
            Have a question, need a quote, or want to discuss your project? Our team is here to help.
          </p>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className="container mx-auto px-6 -mt-8 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition border border-slate-200 dark:border-gray-700 text-center">
            <Icon icon={FaPhone} className="text-3xl text-[#2EAD32] dark:text-[#4ADE80] mx-auto mb-3" />
            <h3 className="font-heading font-bold text-[#1A3C91] dark:text-white">Phone</h3>
            <p className="text-gray-600 dark:text-gray-300 font-body text-sm">+251 11 123 4567</p>
            <p className="text-gray-500 dark:text-gray-400 font-body text-sm">Mon–Fri, 8:00 AM – 5:00 PM</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition border border-slate-200 dark:border-gray-700 text-center">
            <Icon icon={FaEnvelope} className="text-3xl text-[#2EAD32] dark:text-[#4ADE80] mx-auto mb-3" />
            <h3 className="font-heading font-bold text-[#1A3C91] dark:text-white">Email</h3>
            <p className="text-gray-600 dark:text-gray-300 font-body text-sm">info@mughercement.com</p>
            <p className="text-gray-500 dark:text-gray-400 font-body text-sm">We reply within 24 hours</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition border border-slate-200 dark:border-gray-700 text-center">
            <Icon icon={FaMapMarkerAlt} className="text-3xl text-[#2EAD32] dark:text-[#4ADE80] mx-auto mb-3" />
            <h3 className="font-heading font-bold text-[#1A3C91] dark:text-white">Address</h3>
            <p className="text-gray-600 dark:text-gray-300 font-body text-sm">Mekoda, Oromia, Ethiopia</p>
            <p className="text-gray-500 dark:text-gray-400 font-body text-sm">90 km northwest of Addis</p>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Form */}
          <div className="lg:col-span-3">
            <h2 className="text-2xl font-heading font-bold text-[#1A3C91] dark:text-white mb-2">
              Send Us a Message
            </h2>
            <p className="text-gray-600 dark:text-gray-300 font-body mb-6">
              Fill in the form below and we'll get back to you as soon as possible.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="w-full border border-slate-200 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#2EAD32] focus:border-transparent transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                  className="w-full border border-slate-200 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#2EAD32] focus:border-transparent transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+251 911 234 567"
                  className="w-full border border-slate-200 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#2EAD32] focus:border-transparent transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Inquiry about cement products"
                  required
                  className="w-full border border-slate-200 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#2EAD32] focus:border-transparent transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project or inquiry..."
                  rows={5}
                  required
                  className="w-full border border-slate-200 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#2EAD32] focus:border-transparent transition resize-none"
                />
              </div>

              {error && (
                <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-3 text-red-600 dark:text-red-400 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#2EAD32] hover:bg-emerald-700 dark:bg-[#2EAD32] dark:hover:bg-[#4ADE80] text-white dark:text-gray-900 px-6 py-3 rounded-lg font-semibold transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  'Sending...'
                ) : (
                  <>
                    <Icon icon={FaPaperPlane} size={18} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Sidebar info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-50 dark:bg-gray-800 p-6 rounded-2xl border border-slate-200 dark:border-gray-700">
              <h3 className="font-heading font-bold text-[#1A3C91] dark:text-white mb-3">Office Hours</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300 font-body text-sm">
                <li className="flex justify-between">
                  <span>Monday – Friday</span>
                  <span className="font-medium">8:00 AM – 5:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Saturday</span>
                  <span className="font-medium">9:00 AM – 1:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Sunday</span>
                  <span className="text-gray-400">Closed</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-50 dark:bg-gray-800 p-6 rounded-2xl border border-slate-200 dark:border-gray-700">
              <h3 className="font-heading font-bold text-[#1A3C91] dark:text-white mb-3">Emergency Support</h3>
              <p className="text-gray-600 dark:text-gray-300 font-body text-sm">
                For urgent inquiries, please call our emergency hotline:
              </p>
              <p className="text-[#2EAD32] dark:text-[#4ADE80] font-bold text-lg mt-2">+251 911 123 456</p>
            </div>

            <div className="bg-gradient-to-r from-[#1A3C91]/5 to-[#2EAD32]/5 dark:from-[#4A7DB4]/10 dark:to-[#4ADE80]/10 p-6 rounded-2xl border border-slate-200 dark:border-gray-700">
              <h3 className="font-heading font-bold text-[#1A3C91] dark:text-white mb-3">Visit Us</h3>
              <p className="text-gray-600 dark:text-gray-300 font-body text-sm">
                Mugher Cement Enterprise<br />
                Mekoda, Ada'a Barga District<br />
                West Shewa Zone, Oromia<br />
                Ethiopia
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}