
import React from 'react';
import { BookData } from '../types';
import { Quote } from 'lucide-react';

interface Props {
  book: BookData;
}

const QuoteSection: React.FC<Props> = ({ book }) => {
  return (
    <section className="py-40 px-6 bg-slate-900 text-white relative overflow-hidden">
      {/* Decorative stars/dots */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className="absolute rounded-full bg-white"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3}px`,
              height: `${Math.random() * 3}px`,
              animation: `pulse ${2 + Math.random() * 4}s infinite`
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto space-y-32 relative z-10">
        <div className="text-center space-y-6">
          <h2 className="text-xs uppercase tracking-[0.5em] opacity-40 font-bold">文字碎影 / Fragments</h2>
          <div className="w-[1px] h-20 bg-white/20 mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {book.quotes.map((quote, idx) => (
            <div 
              key={idx} 
              className={`flex flex-col justify-between transition-all duration-700 hover:-translate-y-4 group ${idx === 1 ? 'lg:translate-y-20' : ''}`}
            >
              <Quote className="w-10 h-10 opacity-20 mb-8 transition-opacity group-hover:opacity-100" style={{ color: book.secondaryColor }} />
              <div className="space-y-10">
                <p className="text-3xl font-serif-elegant italic leading-snug drop-shadow-lg">
                  「{quote.text}」
                </p>
                <div className="pt-8 border-t border-white/10">
                  <p className="text-sm font-literary opacity-40 tracking-widest uppercase">
                    — {quote.context}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;
