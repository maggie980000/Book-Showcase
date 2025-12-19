
import React from 'react';
import { BookData } from '../types';
import { ArrowDown } from 'lucide-react';

interface Props {
  book: BookData;
}

const BookHero: React.FC<Props> = ({ book }) => {
  return (
    <section className="relative min-h-screen flex items-center px-6 md:px-20 py-32 overflow-hidden bg-[#F4F1EA]">
      {/* Background Subtle Color Blot */}
      <div 
        className="absolute top-0 right-0 w-2/3 h-full opacity-5 pointer-events-none transition-colors duration-1000"
        style={{ backgroundColor: book.primaryColor }}
      />
      
      <div className="max-w-screen-2xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 items-center relative z-10">
        
        {/* Typographic Art Area (Replaces Image) */}
        <div className="lg:col-span-6 xl:col-span-5 order-1 lg:order-2">
           <div className="relative aspect-[3/4] w-full max-w-[500px] mx-auto border-2 border-slate-900/5 p-8 flex flex-col justify-between bg-white shadow-xl">
              <div className="space-y-2">
                <div className="text-[10px] font-bold tracking-[0.4em] uppercase text-slate-400">Ex Libris</div>
                <div className="w-10 h-[1px] bg-slate-900" />
              </div>
              
              <div className="text-center space-y-4 py-12">
                <h2 className="text-5xl md:text-6xl font-serif-elegant leading-none text-slate-900 break-words">
                  {book.title}
                </h2>
                <div className="w-4 h-4 rounded-full mx-auto mt-8" style={{ backgroundColor: book.primaryColor }} />
              </div>

              <div className="flex justify-between items-end">
                 <div className="text-[9px] font-bold tracking-widest uppercase vertical-text text-slate-400">
                    {book.genre}
                 </div>
                 <div className="text-right space-y-1">
                    <div className="text-[10px] uppercase tracking-widest text-slate-400">Author</div>
                    <div className="font-serif-elegant italic text-xl">{book.author}</div>
                 </div>
              </div>

              {/* Texture overlay */}
              <div className="absolute inset-0 opacity-20 paper-texture pointer-events-none mix-blend-multiply" />
           </div>
        </div>

        {/* Text Content Area - High Impact Typography */}
        <div className="lg:col-span-6 xl:col-span-7 flex flex-col justify-center order-2 lg:order-1 lg:pr-12">
          <div className="space-y-12">
            <div className="space-y-4">
              <div className="flex items-center gap-6">
                <span className="text-[10px] font-bold tracking-[0.5em] uppercase opacity-40">
                  Authoritative Selection
                </span>
                <div className="h-[1px] flex-1 bg-black/10" />
              </div>
              
              <h1 className="text-7xl md:text-[100px] xl:text-[120px] font-serif-elegant leading-[0.85] tracking-tighter text-[#1a1a1a] flex flex-col">
                <span className="block">{book.title.slice(0, Math.min(4, book.title.length))}</span>
                <span className="block ml-auto lg:ml-20" style={{ color: book.primaryColor }}>
                    {book.title.slice(Math.min(4, book.title.length))}
                </span>
              </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-6">
                 <p className="text-3xl font-literary italic text-slate-500 border-l-2 pl-6" style={{ borderColor: book.primaryColor }}>
                   {book.author}
                 </p>
                 <p className="text-lg font-literary leading-relaxed text-slate-600 max-w-sm">
                   {book.description}
                 </p>
              </div>
              <div className="flex flex-col justify-end items-start md:items-end space-y-8">
                 <button className="px-12 py-5 bg-[#1a1a1a] text-white text-[11px] font-bold tracking-[0.4em] uppercase hover:bg-black transition-all hover:-translate-y-1 shadow-xl">
                    开始阅读 / Begin
                 </button>
                 <div className="flex gap-12 text-[9px] font-bold tracking-widest opacity-40">
                   <div className="flex flex-col">
                     <span>GENRE</span>
                     <span className="text-black">{book.genre}</span>
                   </div>
                   <div className="flex flex-col">
                     <span>EST. TIME</span>
                     <span className="text-black">{book.readingTime}</span>
                   </div>
                 </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce opacity-20 hidden lg:block">
        <ArrowDown className="w-5 h-5" />
      </div>

      <style>{`
        .vertical-text {
          writing-mode: vertical-rl;
          transform: rotate(180deg);
        }
      `}</style>
    </section>
  );
};

export default BookHero;
