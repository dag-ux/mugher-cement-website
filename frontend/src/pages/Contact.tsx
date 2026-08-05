import { useState } from 'react';
import { Helmet } from 'react-helmet';
import API from '../services/api';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await API.post('/contact', form);
      setSubmitted(true);
    } catch (err) {
      alert('Failed to send message. Try again.');
    }
  };

  if (submitted) {
    return (
      <div className="container mx-auto px-6 py-12 text-center">
        <h2 className="text-2xl font-bold text-brand">Thank You!</h2>
        <p className="text-gray-600">We'll get back to you soon.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12 max-w-2xl">
      <Helmet><title>Contact Us | Mugher Cement</title></Helmet>
      <h1 className="text-4xl font-bold text-brand mb-6">Contact Us</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full Name"
          required
          className="w-full border p-3 rounded"
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email Address"
          required
          className="w-full border p-3 rounded"
        />
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full border p-3 rounded"
        />
        <input
          type="text"
          name="subject"
          value={form.subject}
          onChange={handleChange}
          placeholder="Subject"
          required
          className="w-full border p-3 rounded"
        />
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Your Message"
          rows={5}
          required
          className="w-full border p-3 rounded"
        />
        <button
          type="submit"
          className="bg-secondary text-white px-8 py-3 rounded font-semibold hover:bg-green-700 transition"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}