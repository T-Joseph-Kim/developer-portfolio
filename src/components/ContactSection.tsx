import React, { FormEvent, useState } from 'react';
import { Mail, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const initialFormState: FormState = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

function ContactSection(): React.JSX.Element {
  const { isDarkMode } = useTheme();
  const [form, setForm] = useState<FormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const onChange =
    (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');

    try {
      const response = await fetch('https://formsubmit.co/ajax/josephkim7104@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
          _captcha: 'false',
        }),
      });

      if (!response.ok) {
        throw new Error('Form submit failed');
      }

      setStatus('success');
      setForm(initialFormState);
    } catch {
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="w-full max-w-[950px] mx-auto px-4 sm:px-6 lg:px-8 py-14"
      style={{
        fontFamily:
          '"Red Hat Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      }}
    >
      <div className="mb-10 text-center">
        <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Contact
        </h2>
        <p className={`mt-3 text-base sm:text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Send me a message and I will get back to you soon.
        </p>
      </div>

      <motion.form
        onSubmit={onSubmit}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`rounded-3xl border p-5 sm:p-8 ${
          isDarkMode ? 'border-white/10 bg-white/[0.03]' : 'border-black/10 bg-black/[0.02]'
        }`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={`block mb-2 text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Name
            </label>
            <input
              required
              type="text"
              value={form.name}
              onChange={onChange('name')}
              className={`w-full rounded-xl border px-4 py-3 outline-none transition-colors ${
                isDarkMode
                  ? 'bg-white/[0.03] border-white/15 text-white focus:border-white/35'
                  : 'bg-white border-black/15 text-gray-900 focus:border-black/35'
              }`}
              placeholder="Your name"
            />
          </div>

          <div>
            <label className={`block mb-2 text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Email
            </label>
            <input
              required
              type="email"
              value={form.email}
              onChange={onChange('email')}
              className={`w-full rounded-xl border px-4 py-3 outline-none transition-colors ${
                isDarkMode
                  ? 'bg-white/[0.03] border-white/15 text-white focus:border-white/35'
                  : 'bg-white border-black/15 text-gray-900 focus:border-black/35'
              }`}
              placeholder="you@email.com"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className={`block mb-2 text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Subject
          </label>
          <input
            required
            type="text"
            value={form.subject}
            onChange={onChange('subject')}
            className={`w-full rounded-xl border px-4 py-3 outline-none transition-colors ${
              isDarkMode
                ? 'bg-white/[0.03] border-white/15 text-white focus:border-white/35'
                : 'bg-white border-black/15 text-gray-900 focus:border-black/35'
            }`}
            placeholder="What do you want to discuss?"
          />
        </div>

        <div className="mt-4">
          <label className={`block mb-2 text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Message
          </label>
          <textarea
            required
            value={form.message}
            onChange={onChange('message')}
            rows={6}
            className={`w-full rounded-xl border px-4 py-3 outline-none resize-y transition-colors ${
              isDarkMode
                ? 'bg-white/[0.03] border-white/15 text-white focus:border-white/35'
                : 'bg-white border-black/15 text-gray-900 focus:border-black/35'
            }`}
            placeholder="Write your message here..."
          />
        </div>

        <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className={`flex items-center gap-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            <Mail className="h-4 w-4" />
            <span>Direct to: josephkim7104@gmail.com</span>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold transition-all ${
              isDarkMode
                ? 'bg-white text-black hover:bg-gray-200 disabled:bg-gray-400'
                : 'bg-gray-900 text-white hover:bg-gray-700 disabled:bg-gray-400'
            }`}
          >
            <Send className="h-4 w-4" />
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </div>

        <div className="mt-4 min-h-6">
          {status === 'success' && (
            <p className="text-sm text-green-500">Message sent successfully.</p>
          )}
          {status === 'error' && (
            <p className="text-sm text-red-500">Could not send message. Please try again.</p>
          )}
        </div>
      </motion.form>
    </div>
  );
}

export default ContactSection;
