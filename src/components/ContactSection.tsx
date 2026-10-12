import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Send, CheckCircle2, Sparkles, Clock, Mail, ExternalLink, Compass, Navigation } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { ContactFormData } from '../types';
import { StyledLocationsMap } from './StyledLocationsMap';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    businessInterest: 'General Inquiry',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        businessInterest: 'General Inquiry',
        message: ''
      });
    }, 1200);
  };

  return (
    <section id="contact" className="relative py-24 bg-[#080808] overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute bottom-0 left-1/3 w-[600px] h-[400px] bg-[#D4AF37]/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-[#D4AF37]/30 mb-3"
          >
            <Sparkles className="w-4 h-4 text-[#FFD700]" />
            <span className="text-xs uppercase tracking-widest text-[#FFD700] font-semibold">
              Get In Touch
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4"
          >
            Contact <span className="gold-text-gradient">K GROUP</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 text-base sm:text-lg font-light"
          >
            Whether you require wholesale nursery orders, fresh poultry supply, or business partnerships, our team is at your service.
          </motion.p>
        </div>

        {/* Two Columns Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Contact Details & Google Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex flex-col justify-between space-y-6"
          >
            <div className="glass-card rounded-3xl p-8 border border-[#D4AF37]/30 bg-[#141414]/90 space-y-6">
              <h3 className="font-heading text-2xl font-bold text-white mb-6 gold-text-gradient">
                Corporate Headquarters
              </h3>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#1F6B3A]/30 border border-[#D4AF37]/30 flex items-center justify-center shrink-0 text-[#FFD700]">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-1">
                    Location & Registered Office
                  </h4>
                  <p className="text-sm font-medium text-white leading-relaxed">
                    Kanchan Patil Farm's, Shindawane Road, Kaleshivar Mala, Uruli Kanchan, Tal - Haveli, Dist - Pune, Maharashtra 412202.
                  </p>
                  <a
                    href="https://www.google.com/maps/place/Kanchan+Patil+Farm's/@18.4731016,74.1312257,17z/data=!4m14!1m7!3m6!1s0x3bc2e10034f448b3:0x1ed5b4c6303039e2!2sKanchan+Patil+Farm's!8m2!3d18.4730965!4d74.1338006!16s%2Fg%2F11z61wsxvr!3m5!1s0x3bc2e10034f448b3:0x1ed5b4c6303039e2!8m2!3d18.4730965!4d74.1338006!16s%2Fg%2F11z61wsxvr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FFD700] hover:underline mt-2 bg-[#FFD700]/10 px-3 py-1.5 rounded-lg border border-[#D4AF37]/30 transition-all hover:bg-[#FFD700]/20"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Open in Google Maps Directly
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center shrink-0 text-[#25D366]">
                  <WhatsAppIcon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-1">
                    Direct Contact & WhatsApp
                  </h4>
                  <a
                    href="https://wa.me/917517004343"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-base font-bold text-[#FFD700] hover:underline"
                  >
                    +91 7517004343
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#1F6B3A]/30 border border-[#D4AF37]/30 flex items-center justify-center shrink-0 text-[#FFD700]">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-1">
                    Email Address
                  </h4>
                  <a
                    href="mailto:anujjjmitsoc@gmail.com"
                    className="inline-block text-base font-bold text-[#FFD700] hover:underline break-all"
                  >
                    anujjjmitsoc@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#1F6B3A]/30 border border-[#D4AF37]/30 flex items-center justify-center shrink-0 text-[#FFD700]">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-1">
                    Working Hours
                  </h4>
                  <p className="text-sm font-medium text-white">
                    Mon - Sat: 8:00 AM - 7:00 PM (IST)
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Access Campus Overview Card */}
            <div className="glass-card rounded-3xl p-6 border border-[#D4AF37]/30 bg-[#141414]/90 space-y-4 shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
              <div className="flex items-center justify-between">
                <h4 className="font-heading text-base font-bold text-white flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#FFD700]" />
                  Estate Facilities
                </h4>
                <span className="text-[10px] font-bold text-[#FFD700] bg-[#FFD700]/10 px-2 py-0.5 rounded-full border border-[#D4AF37]/30">
                  Uruli Kanchan, Pune
                </span>
              </div>

              <div className="space-y-2.5">
                <div className="p-2.5 rounded-xl bg-[#080808] border border-[#D4AF37]/20 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#FFD700] block">Unit 1</span>
                    <span className="text-xs font-semibold text-white">Gavran Poultry Farms</span>
                  </div>
                  <span className="text-[10px] text-gray-400">Poultry Unit</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#080808] border border-[#25D366]/20 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#25D366] block">Unit 2</span>
                    <span className="text-xs font-semibold text-white">K Group of Nursery</span>
                  </div>
                  <span className="text-[10px] text-gray-400">Nursery Unit</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <a
                  href="#estate-map"
                  className="bg-[#080808] hover:bg-[#FFD700]/10 text-white hover:text-[#FFD700] border border-[#D4AF37]/30 text-xs font-semibold py-2.5 px-3 rounded-xl text-center transition-all flex items-center justify-center gap-1.5"
                >
                  <Compass className="w-3.5 h-3.5 text-[#FFD700]" />
                  Interactive Map
                </a>
                <a
                  href="https://www.google.com/maps/place/Kanchan+Patil+Farm's/@18.4731016,74.1312257,17z/data=!4m14!1m7!3m6!1s0x3bc2e10034f448b3:0x1ed5b4c6303039e2!2sKanchan+Patil+Farm's!8m2!3d18.4730965!4d74.1338006!16s%2Fg%2F11z61wsxvr!3m5!1s0x3bc2e10034f448b3:0x1ed5b4c6303039e2!8m2!3d18.4730965!4d74.1338006!16s%2Fg%2F11z61wsxvr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#FFD700] hover:bg-[#D4AF37] text-black text-xs font-bold py-2.5 px-3 rounded-xl text-center transition-all flex items-center justify-center gap-1.5 shadow-md"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  Google Maps
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <div className="glass-card rounded-3xl p-8 sm:p-12 border border-[#D4AF37]/30 bg-[#141414]/90 shadow-[0_20px_60px_rgba(0,0,0,0.8)] gold-border-glow">
              {submitted ? (
                <div className="py-12 text-center flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-[#1F6B3A]/30 border-2 border-[#FFD700] flex items-center justify-center text-[#FFD700] mb-4 shadow-[0_0_30px_rgba(255,215,0,0.4)]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-white mb-2">
                    Inquiry Received Successfully
                  </h3>
                  <p className="text-gray-300 text-sm max-w-md mb-6">
                    Thank you for reaching out to K Group. Our executive team will review your message and contact you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="font-btn px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-black bg-[#FFD700]"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="font-heading text-2xl font-bold text-white mb-2">
                    Send Us A Direct Message
                  </h3>
                  <p className="text-xs text-gray-400 mb-6">
                    Please fill out the form below. All fields marked with * are required.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-medium text-gray-300 uppercase tracking-wider mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Anuj Kanchan"
                        className="w-full px-4 py-3 rounded-xl glass-panel border border-[#D4AF37]/30 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#FFD700] transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-medium text-gray-300 uppercase tracking-wider mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="anujjjmitsoc@gmail.com"
                        className="w-full px-4 py-3 rounded-xl glass-panel border border-[#D4AF37]/30 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#FFD700] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-medium text-gray-300 uppercase tracking-wider mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 7517004343"
                        className="w-full px-4 py-3 rounded-xl glass-panel border border-[#D4AF37]/30 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#FFD700] transition-colors"
                      />
                    </div>

                    {/* Business Interest */}
                    <div>
                      <label className="block text-xs font-medium text-gray-300 uppercase tracking-wider mb-2">
                        Business Interest *
                      </label>
                      <select
                        value={formData.businessInterest}
                        onChange={(e) => setFormData({ ...formData, businessInterest: e.target.value as any })}
                        className="w-full px-4 py-3 rounded-xl glass-panel border border-[#D4AF37]/30 text-white text-sm focus:outline-none focus:border-[#FFD700] transition-colors bg-[#080808]"
                      >
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Gavran Poultry Farms">Gavran Poultry Farms</option>
                        <option value="K Group of Nursery">K Group of Nursery</option>
                        <option value="Investment / Partnership">Investment / Partnership</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-medium text-gray-300 uppercase tracking-wider mb-2">
                      Message / Requirements *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Specify your wholesale requirements, plant species, or poultry orders..."
                      className="w-full px-4 py-3 rounded-xl glass-panel border border-[#D4AF37]/30 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#FFD700] transition-colors"
                    />
                  </div>

                  {/* Golden Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full font-btn py-4 rounded-xl font-bold text-xs uppercase tracking-wider text-black bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#D4AF37] hover:shadow-[0_0_35px_rgba(212,175,55,0.7)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {loading ? (
                      <span className="animate-pulse">Processing...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-black" />
                        Send Golden Inquiry
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>

        {/* Interactive Styled Locations Map Showcase */}
        <motion.div
          id="estate-map"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 sm:mt-20"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-[#D4AF37]/30 mb-2">
                <Compass className="w-3.5 h-3.5 text-[#FFD700]" />
                <span className="text-[10px] uppercase tracking-widest text-[#FFD700] font-semibold">
                  Campus Navigation & Visitor Access
                </span>
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
                Find <span className="gold-text-gradient">Gavran Poultry Farms & K Group Nursery</span>
              </h3>
            </div>
            <p className="text-xs text-gray-400 max-w-md sm:text-right">
              Explore marked locations on our estate in Uruli Kanchan, Pune. Click any pin to view details and live directions.
            </p>
          </div>

          <StyledLocationsMap />
        </motion.div>
      </div>
    </section>
  );
};
