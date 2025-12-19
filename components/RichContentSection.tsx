
import React from 'react';
import { BookData } from '../types';

interface Props {
  book: BookData;
}

const RichContentSection: React.FC<Props> = ({ book }) => {
  return (
    <section className="py-40 px-6 md:px-20 bg-white">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
          
          {/* Main Article Side */}
          <div className="lg:col-span-7 space-y-20">
             <div className="space-y-6">
               <span className="text-[10px] font-bold tracking-[0.6em] uppercase text-slate-400">Deep Interpretation</span>
               <h3 className="text-6xl font-serif-elegant leading-tight max-w-lg">叙事、欲望与时间的重构</h3>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                <div className="md:col-span-1 border-l border-slate-100 hidden md:block" />
                <div className="md:col-span-11 space-y-10">
                   <p className="text-3xl font-serif-elegant leading-tight text-slate-800 italic">
                     "每一处细节的留白，都是对读者心灵边界的某种温柔侵略。"
                   </p>
                   <div className="space-y-8 text-xl font-literary leading-relaxed text-slate-600">
                      {book.extendedSummary.split('\n').map((para, i) => (
                        <p key={i}>{para}</p>
                      ))}
                   </div>
                </div>
             </div>

             {/* Themes as Design Elements */}
             <div className="flex flex-wrap gap-x-12 gap-y-6 pt-12 border-t border-slate-100">
                {book.themes.map((theme, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: book.primaryColor }} />
                    <span className="text-xs font-bold tracking-[0.2em] uppercase text-slate-400">{theme}</span>
                  </div>
                ))}
             </div>
          </div>

          {/* Aesthetic Sidebar - Pure Abstract Design now */}
          <div className="lg:col-span-5 space-y-16">
             <div className="p-12 border border-slate-100 space-y-12 bg-[#F9F9F9] relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-200/20 rounded-full blur-3xl group-hover:bg-slate-300/30 transition-colors" />
                
                <div className="space-y-2 relative">
                  <span className="text-[10px] font-bold tracking-widest text-slate-300">CURATED AESTHETIC</span>
                  <h4 className="text-3xl font-serif-elegant">视觉意向</h4>
                </div>

                <div className="space-y-10 relative">
                  <div className="flex flex-col gap-6">
                    {/* Abstract Color Block instead of Image */}
                    <div className="w-full h-48 bg-slate-100 relative overflow-hidden flex items-center justify-center">
                        <div className="absolute inset-0 opacity-50" style={{ backgroundColor: book.secondaryColor }}></div>
                        <div className="w-24 h-24 rounded-full mix-blend-multiply opacity-80 blur-xl" style={{ backgroundColor: book.primaryColor }}></div>
                        <span className="relative z-10 font-serif-elegant italic text-2xl text-slate-900/50">Abstract</span>
                    </div>
                    
                    <p className="text-sm font-literary leading-relaxed text-slate-500">
                      该设计捕捉了《{book.title}》中的核心情绪。通过<b>{book.aestheticMood}</b>的视觉语言，呈现出一种既克制又充满张力的美感。
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                       <div className="flex justify-between text-[10px] font-bold tracking-widest uppercase mb-1">
                         <span>Primary Palette</span>
                         <span>{book.primaryColor}</span>
                       </div>
                       <div className="h-1.5 w-full bg-slate-200">
                          <div className="h-full transition-all duration-1000" style={{ width: '100%', backgroundColor: book.primaryColor }} />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <div className="flex justify-between text-[10px] font-bold tracking-widest uppercase mb-1">
                         <span>Secondary</span>
                         <span>{book.secondaryColor}</span>
                       </div>
                       <div className="h-1.5 w-full bg-slate-200">
                          <div className="h-full transition-all duration-1000" style={{ width: '100%', backgroundColor: book.secondaryColor }} />
                       </div>
                    </div>
                  </div>
                </div>
             </div>

             <div className="p-12 bg-black text-white space-y-8 shadow-2xl">
                <span className="text-[10px] tracking-[0.5em] opacity-40 font-bold uppercase">Reading Direction</span>
                <p className="text-2xl font-literary italic leading-snug">
                   "这不是一次简单的阅读，而是一次关于自我的视觉考古。"
                </p>
                <div className="h-px w-12 bg-white/20" />
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default RichContentSection;
