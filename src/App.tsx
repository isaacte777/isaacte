import { motion } from 'motion/react';
import { ArrowRight, Instagram, Linkedin, Twitter } from 'lucide-react';
import Navbar from './components/Navbar';
import ProjectCard from './components/ProjectCard';

const projects = [
  {
    title: "The Obsidian House",
    category: "Residential / Iceland",
    image: "https://picsum.photos/seed/arch1/1200/1500"
  },
  {
    title: "Ethereal Pavilion",
    category: "Cultural / Kyoto",
    image: "https://picsum.photos/seed/arch2/1200/1500"
  },
  {
    title: "Monolith Library",
    category: "Public / Berlin",
    image: "https://picsum.photos/seed/arch3/1200/1500"
  },
  {
    title: "Solstice Retreat",
    category: "Hospitality / Greece",
    image: "https://picsum.photos/seed/arch4/1200/1500"
  }
];

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden px-6">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/hero/1920/1080" 
            alt="Hero Architecture" 
            className="w-full h-full object-cover opacity-80"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#f5f2ed]/40 to-[#f5f2ed]" />
        </div>

        <div className="relative z-10 text-center max-w-4xl">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs uppercase tracking-[0.4em] mb-8 font-medium"
          >
            Est. 2012 — Madrid / Tokyo
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="text-6xl md:text-9xl font-serif font-light leading-tight mb-12"
          >
            Architecture <br /> 
            <span className="italic">of Silence.</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex justify-center"
          >
            <a href="#projects" className="group flex items-center space-x-4 text-xs uppercase tracking-[0.2em] font-semibold">
              <span>Explore Works</span>
              <div className="w-12 h-[1px] bg-black group-hover:w-20 transition-all duration-500" />
            </a>
          </motion.div>
        </div>

        <div className="absolute bottom-12 left-12 hidden lg:block">
          <div className="vertical-text text-[10px] uppercase tracking-[0.3em] text-black/40">
            Scroll to discover
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section id="philosophy" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <img 
              src="https://picsum.photos/seed/phil/800/1000" 
              alt="Philosophy" 
              className="oval-mask w-full max-w-md mx-auto lg:mx-0"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <div className="space-y-12">
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-[0.3em] text-black/40">Our Philosophy</span>
              <h2 className="text-4xl md:text-6xl font-serif leading-tight">
                We believe in the power of <span className="italic">essentialism</span>.
              </h2>
            </div>
            <p className="text-lg text-black/60 leading-relaxed max-w-xl">
              AETERNA is a multidisciplinary studio focused on creating spaces that transcend time. 
              Our approach is rooted in the dialogue between light, shadow, and materiality. 
              We strip away the unnecessary to reveal the soul of the structure.
            </p>
            <button className="px-8 py-4 border border-black/10 rounded-full text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-colors duration-500">
              Read more about us
            </button>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section id="projects" className="py-32 bg-white/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-[0.3em] text-black/40">Portfolio</span>
              <h2 className="text-5xl md:text-7xl font-serif">Selected Works</h2>
            </div>
            <p className="text-black/50 max-w-sm text-sm leading-relaxed">
              A curated selection of our most recent architectural interventions across the globe.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
            {projects.map((project, index) => (
              <ProjectCard 
                key={project.title} 
                title={project.title}
                category={project.category}
                image={project.image}
                index={index} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Studio Stats / Info */}
      <section id="studio" className="py-32 px-6 border-t border-black/5">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { label: 'Awards', value: '24' },
            { label: 'Projects', value: '150+' },
            { label: 'Countries', value: '12' },
            { label: 'Years', value: '10' },
          ].map((stat, i) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="space-y-2"
            >
              <div className="text-4xl md:text-6xl font-serif italic">{stat.value}</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-black/40">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-[#1a1a1a] text-[#f5f2ed]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            <div className="space-y-12">
              <h2 className="text-5xl md:text-8xl font-serif leading-none">
                Let's build <br /> <span className="italic">together.</span>
              </h2>
              <div className="space-y-6">
                <p className="text-xl text-[#f5f2ed]/60">
                  Calle de Serrano 45, <br />
                  28001 Madrid, Spain
                </p>
                <p className="text-xl text-[#f5f2ed]/60">
                  hello@aeterna.studio <br />
                  +34 912 345 678
                </p>
              </div>
              <div className="flex space-x-6">
                <Instagram className="cursor-pointer hover:opacity-50 transition-opacity" size={20} />
                <Twitter className="cursor-pointer hover:opacity-50 transition-opacity" size={20} />
                <Linkedin className="cursor-pointer hover:opacity-50 transition-opacity" size={20} />
              </div>
            </div>
            
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest opacity-40">Name</label>
                  <input type="text" className="w-full bg-transparent border-b border-[#f5f2ed]/20 py-4 focus:outline-none focus:border-[#f5f2ed] transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest opacity-40">Email</label>
                  <input type="email" className="w-full bg-transparent border-b border-[#f5f2ed]/20 py-4 focus:outline-none focus:border-[#f5f2ed] transition-colors" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest opacity-40">Message</label>
                <textarea rows={4} className="w-full bg-transparent border-b border-[#f5f2ed]/20 py-4 focus:outline-none focus:border-[#f5f2ed] transition-colors resize-none" />
              </div>
              <button className="group flex items-center space-x-4 text-xs uppercase tracking-[0.2em] font-semibold pt-4">
                <span>Send Inquiry</span>
                <ArrowRight className="group-hover:translate-x-2 transition-transform" size={16} />
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-black/5 text-center text-[10px] uppercase tracking-[0.2em] text-black/30">
        © 2024 AETERNA Architecture Studio. All rights reserved.
      </footer>
    </div>
  );
}
