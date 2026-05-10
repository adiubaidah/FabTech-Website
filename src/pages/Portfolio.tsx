import { motion } from 'motion/react';
import { ExternalLink, Search, Clock, Cpu } from 'lucide-react';
import { useState } from 'react';
import { portfolioData } from '../data/portfolio';

const categories = ['All', 'Desain 3D', 'Fabrikasi'];

export function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All' 
    ? portfolioData 
    : portfolioData.filter(p => p.category === activeCategory);

  return (
    <div className="py-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <h1 className="text-6xl font-bold tracking-tighter uppercase mb-8 text-[#1a2b56]">Portfolio Kami</h1>
            <p className="text-xl text-slate-500 leading-relaxed">
              Menampilkan proyek-proyek engineering dan fabrikasi terbaik kami untuk berbagai sektor industri.
            </p>
          </div>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap gap-4 mb-16 border-b border-slate-200 pb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-sm font-bold uppercase tracking-widest px-6 py-2 rounded-full transition-all ${
                activeCategory === cat 
                ? 'bg-brand-blue text-white shadow-lg shadow-blue-500/20' 
                : 'bg-white text-slate-400 hover:text-[#1a2b56] hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12">
          {filteredProjects.map((project, i) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative aspect-square lg:aspect-auto overflow-hidden bg-slate-100">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#1a2b56]">
                    {project.category}
                  </div>
                </div>
                
                <div className="p-8 lg:p-10 flex flex-col">
                  <div className="flex items-center gap-2 text-brand-blue mb-4">
                    <Clock size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">{project.duration}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-[#1a2b56] mb-4 leading-tight">{project.title}</h3>
                  <p className="text-brand-blue font-bold text-sm mb-4">{project.price}</p>
                  
                  <p className="text-slate-500 text-sm leading-relaxed mb-8 line-clamp-3">
                    {project.description}
                  </p>
                  
                  <div className="mt-auto space-y-6">
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Software</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.software.map(s => (
                          <span key={s} className="px-3 py-1 bg-slate-50 text-[#1a2b56] text-[10px] font-bold rounded-full border border-slate-100">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <button className="w-full py-4 bg-[#1a2b56] text-white rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-brand-blue transition-colors flex items-center justify-center gap-2 group/btn">
                      Lihat Detail Proyek
                      <ExternalLink size={16} className="transition-transform group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="py-32 text-center">
            <Search size={48} className="mx-auto text-black/10 mb-6" />
            <h3 className="text-2xl font-bold uppercase text-black/20">No projects found in this category</h3>
          </div>
        )}
      </div>
    </div>
  );
}
