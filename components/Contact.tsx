import React, { useState } from 'react';
import { PERSONAL_INFO } from '../constants';
import { Copy, Check, Send, ArrowRight } from 'lucide-react';
import { Reveal } from './Reveal';
import MagneticButton from './MagneticButton';

const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <footer id="contact" className="relative bg-[#020617] text-white pt-24 md:pt-32 pb-12 overflow-hidden scroll-mt-20">
      {/* Background with subtle noise texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-soft-light"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent"></div>

      <div className="container mx-auto px-6 relative z-10">
        <Reveal width="100%">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start mb-24">
            
            <div className="space-y-12">
              <h2 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.85] text-white">
                LET'S <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-600">WORK.</span>
              </h2>
              
              <div className="space-y-2">
                 <p className="text-sm font-mono text-gray-500 uppercase tracking-widest">Contact Directly</p>
                 <button onClick={handleCopyEmail} className="flex flex-wrap items-center gap-4 text-xl md:text-4xl font-bold hover:text-indigo-400 transition-colors text-left group break-all">
                      {PERSONAL_INFO.email}
                      <span className={`p-2 rounded-full bg-white/10 transition-all flex-shrink-0 ${copied ? 'bg-green-500/20 text-green-500' : 'opacity-0 group-hover:opacity-100'}`}>
                          {copied ? <Check size={20} /> : <Copy size={20} />}
                      </span>
                  </button>
              </div>

              <div className="flex flex-wrap gap-6 md:gap-8 pt-4 md:pt-8">
                <a href={`https://${PERSONAL_INFO.github}`} target="_blank" className="text-base md:text-lg font-bold hover:text-indigo-400 transition-colors relative group">
                  GITHUB
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-400 transition-all group-hover:w-full"></span>
                </a>
                <a href={`https://${PERSONAL_INFO.linkedin}`} target="_blank" className="text-base md:text-lg font-bold hover:text-indigo-400 transition-colors relative group">
                  LINKEDIN
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-400 transition-all group-hover:w-full"></span>
                </a>
                <a href="/resume.pdf" target="_blank" className="text-base md:text-lg font-bold hover:text-indigo-400 transition-colors relative group">
                  RESUME
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-400 transition-all group-hover:w-full"></span>
                </a>
              </div>
            </div>

            <div className="bg-white/5 p-6 md:p-12 rounded-[2rem] border border-white/10 backdrop-blur-sm shadow-2xl">
               <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="space-y-6">
                     <div className="group relative">
                        <input 
                           type="text" 
                           required
                           value={formState.name}
                           onChange={e => setFormState({...formState, name: e.target.value})}
                           className="w-full bg-transparent border-b border-white/20 py-4 text-lg md:text-xl text-white focus:outline-none focus:border-indigo-500 transition-all placeholder-transparent peer"
                           placeholder="Name"
                           id="name"
                        />
                        <label htmlFor="name" className="absolute left-0 top-4 text-gray-500 text-lg md:text-xl transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-indigo-500 peer-placeholder-shown:top-4 peer-placeholder-shown:text-xl peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs cursor-text">Name</label>
                     </div>

                     <div className="group relative">
                        <input 
                           type="email" 
                           required
                           value={formState.email}
                           onChange={e => setFormState({...formState, email: e.target.value})}
                           className="w-full bg-transparent border-b border-white/20 py-4 text-lg md:text-xl text-white focus:outline-none focus:border-indigo-500 transition-all placeholder-transparent peer"
                           placeholder="Email"
                           id="email"
                        />
                        <label htmlFor="email" className="absolute left-0 top-4 text-gray-500 text-lg md:text-xl transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-indigo-500 peer-placeholder-shown:top-4 peer-placeholder-shown:text-xl peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs cursor-text">Email</label>
                     </div>

                     <div className="group relative">
                        <textarea 
                           required
                           rows={3}
                           value={formState.message}
                           onChange={e => setFormState({...formState, message: e.target.value})}
                           className="w-full bg-transparent border-b border-white/20 py-4 text-lg md:text-xl text-white focus:outline-none focus:border-indigo-500 transition-all placeholder-transparent peer resize-none"
                           placeholder="Message"
                           id="message"
                        ></textarea>
                        <label htmlFor="message" className="absolute left-0 top-4 text-gray-500 text-lg md:text-xl transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-indigo-500 peer-placeholder-shown:top-4 peer-placeholder-shown:text-xl peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs cursor-text">Message</label>
                     </div>
                  </div>

                  <MagneticButton className="w-full">
                    <button 
                       type="submit" 
                       disabled={isSubmitting || submitStatus === 'success'}
                       className="w-full py-5 bg-white text-black font-bold text-lg rounded-full hover:bg-indigo-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group/btn shadow-lg shadow-white/5"
                    >
                       {isSubmitting ? (
                          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                       ) : submitStatus === 'success' ? (
                          <>Sent Successfully <Check size={20} /></>
                       ) : (
                          <>Send Message <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" /></>
                       )}
                    </button>
                  </MagneticButton>
               </form>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs font-mono text-gray-500 uppercase tracking-widest gap-4 md:gap-0">
             <p>© {new Date().getFullYear()} Baseer Ahmed Tahir.</p>
             <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <p>Systems Normal</p>
             </div>
             <p>Engineered with React & Gemini</p>
          </div>
        </Reveal>
      </div>
    </footer>
  );
};

export default Contact;