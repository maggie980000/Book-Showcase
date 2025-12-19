
import React, { useState } from 'react';
import { BookData, AppStatus, FileData } from './types';
import { fetchBookContent } from './services/geminiService';
import BookHero from './components/BookHero';
import AuthorBio from './components/AuthorBio';
import QuoteSection from './components/QuoteSection';
import RichContentSection from './components/RichContentSection';
import SearchBar from './components/SearchBar';
import { Sparkles, Library } from 'lucide-react';

const DEFAULT_BOOK: BookData = {
  title: "简单的激情",
  author: "安妮·埃尔诺",
  genre: "自传体小说 / 文学",
  description: "一段毫无保留、近乎解剖般的激情记录。它不关乎道德，只关乎存在本身最原始的震颤。",
  extendedSummary: "《简单的激情》（Passion simple）是2022年诺贝尔文学奖得主安妮·埃尔诺的代表作。全书以冷峻、简洁的‘白色写作’风格，记录了叙述者与一名已婚外国外交官之间长达一年的地下恋情。这并非传统意义上的爱情故事，而是一场关于‘等待’的社会学实验，将个体私密的欲望转化为一种可感知的、超越道德审判的文学实体。埃尔诺通过对细节的极度关注，捕捉到了那些在日常生活中难以察觉的情感颗粒。",
  aestheticMood: "Minimalist abstract organic shapes in dark forest green on a cream-white paper background, grainy film texture, inspired by modernist French book covers.",
  primaryColor: "#1A3C34",
  secondaryColor: "#F4F1EA",
  quotes: [
    { text: "写作也应该以此为目标，就像性行为带来的感觉，这样的一种恐惧，惊愕，将道德评判暂时搁置。", context: "关于写作目标的深刻剖析" },
    { text: "我唯一未来的未来，就是在下一次电话里确定见面的时间。", context: "描述等待状态的极致虚无" },
    { text: "我用另一种方式丈量时间，用我的身体。", context: "身体与时间的终极联结" }
  ],
  authorBio: "安妮·埃尔诺（Annie Ernaux），出生于法国利勒博纳，当代法国文坛最具影响力的女作家之一。2022年荣获诺贝尔文学奖。她的作品常被称为‘社会学自传’，致力于剥离虚饰，还原真实的生存境遇。",
  themes: ["欲望的纯粹性", "等待的社会学", "身体记忆", "自传体写作"],
  readingTime: "约 2 小时 30 分钟"
};

const App: React.FC = () => {
  const [book, setBook] = useState<BookData>(DEFAULT_BOOK);
  const [status, setStatus] = useState<AppStatus>('success');
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query: string, files?: FileData[]) => {
    setStatus('loading');
    setError(null);
    try {
      const data = await fetchBookContent(query, files);
      setBook(data);
      setStatus('success');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      console.error(err);
      setError("内容解析失败。请确保上传的文件清晰或文本可读。");
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen selection:bg-black selection:text-white transition-colors duration-1000 bg-[#F4F1EA]">
      <SearchBar onSearch={handleSearch} isLoading={status === 'loading'} />

      {status === 'loading' ? (
        <div className="fixed inset-0 z-[150] bg-[#F4F1EA]/98 backdrop-blur-3xl flex flex-col items-center justify-center space-y-12">
          <div className="relative">
            <Library className="w-24 h-24 text-black animate-pulse" />
            <Sparkles className="w-12 h-12 text-amber-600 absolute -top-6 -right-6 animate-bounce" />
          </div>
          <div className="text-center space-y-6">
            <h3 className="text-5xl font-serif-elegant tracking-tighter text-black">READING THE TEXT</h3>
            <p className="text-slate-500 font-literary italic text-xl animate-pulse">正在深度阅读文档，提取叙事结构与美学灵魂...</p>
          </div>
          <div className="w-96 h-[1.5px] bg-slate-200 relative overflow-hidden rounded-full">
             <div className="absolute inset-0 bg-black animate-progress origin-left" />
          </div>
        </div>
      ) : null}

      <main className={`${status === 'loading' ? 'opacity-0 scale-95' : 'opacity-100 scale-100'} transition-all duration-1000`}>
        <BookHero book={book} />
        
        <RichContentSection book={book} />
        
        <QuoteSection book={book} />
        
        <AuthorBio book={book} />

        <footer className="py-40 px-6 border-t border-slate-100 bg-white relative overflow-hidden">
          <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-center gap-16 relative z-10">
            <div className="space-y-4 text-center md:text-left">
              <h2 className="text-4xl font-serif-elegant italic tracking-widest text-slate-900">Literary Loom</h2>
              <p className="text-sm font-literary opacity-40 tracking-[0.3em] uppercase">
                PURE TEXTUAL EXPERIENCE &copy; 2024
              </p>
            </div>
            <div className="flex gap-20 text-[10px] uppercase tracking-[0.5em] font-bold opacity-60">
              <a href="#" className="hover:opacity-100 transition-opacity py-1">Chronicle</a>
              <a href="#" className="hover:opacity-100 transition-opacity py-1">Archives</a>
              <a href="#" className="hover:opacity-100 transition-opacity py-1">Essays</a>
            </div>
          </div>
        </footer>
      </main>

      {status === 'error' && (
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[110] bg-red-950 text-white px-10 py-5 rounded-full text-xs font-bold shadow-2xl tracking-[0.2em] uppercase">
          {error}
        </div>
      )}

      <style>{`
        @keyframes progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-progress {
          animation: progress 2s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default App;
