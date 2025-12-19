
import React from 'react';
import { BookData } from '../types';

interface Props {
  book: BookData;
}

const AuthorBio: React.FC<Props> = ({ book }) => {
  return (
    <section className="py-40 px-6 bg-[#fcfaf7]">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
        <div className="relative order-2 md:order-1">
          <img 
            src={`https://picsum.photos/seed/${encodeURIComponent(book.author)}/800/1000?grayscale`} 
            alt={book.author}
            className="w-full rounded-sm shadow-2xl transition-all duration-1000 grayscale hover:grayscale-0"
          />
          <div 
            className="absolute -top-10 -left-10 w-40 h-40 border z-[-1] opacity-20"
            style={{ borderColor: book.primaryColor }}
          />
          <div className="absolute -bottom-4 -right-4 text-[80px] font-serif-elegant opacity-[0.03] select-none pointer-events-none whitespace-nowrap">
             {book.author}
          </div>
        </div>
        <div className="space-y-10 order-1 md:order-2">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-[0.4em] opacity-30 font-bold">关于作者 / The Creator</span>
            <h2 className="text-5xl font-serif-elegant">{book.author}</h2>
          </div>
          <div className="w-16 h-[2px]" style={{ backgroundColor: book.primaryColor }} />
          <p className="text-xl font-literary leading-relaxed text-slate-600 first-letter:text-4xl first-letter:font-serif-elegant first-letter:mr-2">
            {book.authorBio}
          </p>
          <div className="pt-6">
            <button className="text-xs uppercase tracking-[0.3em] font-bold hover:opacity-50 transition-opacity flex items-center gap-4 group">
              查看完整作品年表 <span className="group-hover:translate-x-2 transition-transform">&rarr;</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthorBio;
