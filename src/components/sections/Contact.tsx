import React, { useState, useEffect } from 'react';
import { Mail, Phone, Linkedin, Send, Loader2 } from 'lucide-react';
import { Section, SectionTitle } from '../layout/Section';
import { Button } from '../ui/Button';
import emailjs from '@emailjs/browser';

export const Contact: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const [formData, setFormData] = useState({
    from_name: '',
    email_id: '',
    subject: '',
    message: '',
    mobile: ''
  });

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init("0aBxNpoj3ROdAZb_b");
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus('idle');

    try {
      await emailjs.send(
        'service_xyvkklj',
        'template_zh1ly6y',
        {
          from_name: formData.from_name,
          email_id: formData.email_id,
          subject: formData.subject,
          message: formData.message,
          mobile: formData.mobile || 'Not provided'
        }
      );

      setStatus('success');
      setFormData({ from_name: '', email_id: '', subject: '', message: '', mobile: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Email send failed:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Section id="contact" dark className="pb-32">
      <SectionTitle dark>Get In Touch</SectionTitle>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Left Column - Contact Info */}
        <div className="space-y-8">
          <div className="prose prose-invert prose-slate">
            <p className="text-lg text-slate-300 leading-relaxed">
              Always interested in discussing backend architecture, database optimization,
              or the latest in PostgreSQL internals. Whether you want to talk about
              distributed systems or explore how we might work together, drop me a line.
            </p>
          </div>

          <div className="space-y-4">
            <ContactLink
              href="mailto:nikhilhegde989@gmail.com"
              icon={Mail}
              label="Email"
              value="nikhilhegde989@gmail.com"
            />

            <ContactLink
              href="tel:+917975438343"
              icon={Phone}
              label="Phone"
              value="+91 79754 38343"
            />

            <ContactLink
              href="https://www.linkedin.com/in/nikhilhegde989/"
              icon={Linkedin}
              label="LinkedIn"
              value="linkedin.com/in/nikhilhegde989"
              external
            />
          </div>
        </div>

        {/* Right Column - Contact Form */}
        <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-8 border border-slate-700 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-400">Name</label>
                <input
                  type="text"
                  name="from_name"
                  value={formData.from_name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-400">Email</label>
                <input
                  type="email"
                  name="email_id"
                  value={formData.email_id}
                  onChange={handleChange}
                  placeholder="you@company.com"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-400">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-400">Phone (Optional)</label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-400">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                placeholder="Tell me about your project, a technical challenge you're facing, or just say hello..."
                required
                className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none"
              />
            </div>

            {/* Status Messages */}
            {status === 'success' && (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 text-sm text-center">
                Message sent successfully! I'll get back to you soon.
              </div>
            )}

            {status === 'error' && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm text-center">
                Failed to send message. Please try emailing me directly.
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className={`w-full justify-center py-3.5 shadow-lg transition-all border-0 ${isLoading
                ? 'bg-slate-700 cursor-not-allowed'
                : 'bg-emerald-700 hover:bg-emerald-600 shadow-emerald-500/20 hover:shadow-emerald-500/30'
                } text-white`}
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={18} className="mr-2" />
                  Send Message
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </Section>
  );
};

const ContactLink: React.FC<{
  href: string;
  icon: any;
  label: string;
  value: string;
  external?: boolean;
}> = ({ href, icon: Icon, label, value, external }) => {
  return (
    <a
      href={href}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      className="group flex items-center gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-emerald-500/30 hover:bg-slate-800 transition-all duration-300"
    >
      <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center group-hover:bg-emerald-500/10 transition-colors border border-slate-700 group-hover:border-emerald-500/30">
        <Icon className="text-emerald-400" size={22} strokeWidth={1.5} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">
          {label}
        </div>
        <div className="text-slate-200 font-medium truncate group-hover:text-emerald-400 transition-colors">
          {value}
        </div>
      </div>
    </a>
  );
};