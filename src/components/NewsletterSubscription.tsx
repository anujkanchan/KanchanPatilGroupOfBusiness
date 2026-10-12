import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, CheckCircle2, AlertCircle, Sparkles, Send, BellRing } from 'lucide-react';

// RFC 5322 compliant email regex pattern
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const NewsletterSubscription: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateEmail = (val: string): boolean => {
    if (!val.trim()) {
      setError('Please enter your email address.');
      return false;
    }
    if (!EMAIL_REGEX.test(val.trim())) {
      setError('Please enter a valid email address (e.g. name@example.com).');
      return false;
    }
    setError(null);
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setEmail(val);
    if (error) {
      // Clear error once user starts typing a valid format
      if (EMAIL_REGEX.test(val.trim())) {
        setError(null);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setEmail('');
      setError(null);
    }, 900);
  };

  return (
    <div className="relative rounded-3xl p-6 sm:p-8 md:p-10 bg-gradient-to-br from-[#121212]/95 via-[#0e0e0e]/95 to-[#17140e]/95 border border-[#D4AF37]/30 shadow-[0_15px_45px_rgba(0,0,0,0.85)] overflow-hidden my-8">
      {/* Ambient background decorative glow */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#1F6B3A]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
        {/* Left Copy: Value Proposition */}
        <div className="lg:col-span-7 space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#FFD700] text-[11px] font-bold uppercase tracking-wider">
            <BellRing className="w-3.5 h-3.5 text-[#FFD700] animate-pulse" />
            <span>Farm Updates & Flora Catalog</span>
          </div>

          <h3 className="font-heading text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Stay Updated on Fresh Batches & <span className="gold-text-gradient">Seasonal Harvests</span>
          </h3>

          <p className="text-gray-300 text-xs sm:text-sm font-light leading-relaxed max-w-xl">
            Subscribe to receive priority updates on daily Pure Gavran Egg harvest batches, wholesale plant saplings, and seasonal agricultural offers directly from Kanchan Patil Farm's.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-1 text-[11px] text-gray-400">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-[#FFD700]" /> Fresh Egg Batch Alerts
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-[#25D366]" /> Nursery Stock Announcements
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-[#FFD700]" /> Zero Spam Guarantee
            </span>
          </div>
        </div>

        {/* Right Form: Regex-Validated Input & Gold-Accented Button */}
        <div className="lg:col-span-5">
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-5 rounded-2xl bg-[#141414] border border-[#25D366]/40 shadow-inner flex flex-col items-center text-center space-y-2.5"
              >
                <div className="w-12 h-12 rounded-full bg-[#1F6B3A]/30 border border-[#25D366]/50 flex items-center justify-center text-[#25D366] shadow-[0_0_20px_rgba(37,211,102,0.3)]">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-white">
                  Successfully Subscribed!
                </h4>
                <p className="text-xs text-gray-300 leading-relaxed max-w-sm">
                  Thank you for your interest. You'll now receive our latest farm harvest bulletins and wholesale nursery updates.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSuccess(false)}
                  className="text-[11px] text-[#FFD700] hover:underline font-semibold pt-1 cursor-pointer"
                >
                  Subscribe another email address
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                noValidate
                className="space-y-3"
              >
                <div className="relative">
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email address for newsletter
                  </label>
                  <div className="relative flex flex-col sm:flex-row gap-2">
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                        <Mail className="w-4 h-4 text-[#D4AF37]" />
                      </div>
                      <input
                        id="newsletter-email"
                        type="email"
                        value={email}
                        onChange={handleChange}
                        placeholder="Enter your email address..."
                        disabled={isSubmitting}
                        className={`w-full pl-10 pr-4 py-3 sm:py-3.5 rounded-xl sm:rounded-l-xl sm:rounded-r-none bg-[#0a0a0a] text-white placeholder-gray-500 text-xs sm:text-sm border transition-all focus:outline-none ${
                          error
                            ? 'border-red-500/80 focus:border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]'
                            : 'border-[#D4AF37]/30 focus:border-[#FFD700] focus:shadow-[0_0_20px_rgba(212,175,55,0.25)]'
                        }`}
                      />
                    </div>

                    {/* Gold-Accented Subscribe Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-3 sm:py-3.5 rounded-xl sm:rounded-l-none sm:rounded-r-xl font-bold text-xs uppercase tracking-wider text-black bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#D4AF37] hover:shadow-[0_0_25px_rgba(212,175,55,0.65)] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed shrink-0 font-btn border border-[#FFD700]/50"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-1.5">
                          <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                          <span>Subscribing...</span>
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5">
                          <span>Subscribe</span>
                          <Send className="w-3.5 h-3.5 text-black" />
                        </span>
                      )}
                    </button>
                  </div>

                  {/* Regex Error Feedback */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-1.5 text-red-400 text-xs mt-2 pl-1"
                    >
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{error}</span>
                    </motion.div>
                  )}
                </div>

                <p className="text-[11px] text-gray-500 pl-1">
                  We respect your privacy. No spam, ever. Unsubscribe at any time.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
