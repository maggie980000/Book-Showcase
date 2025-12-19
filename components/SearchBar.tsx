
import React, { useState, useRef } from 'react';
import { Search, Loader2, Feather, Paperclip, X } from 'lucide-react';
import { FileData } from '../types';

interface Props {
  onSearch: (query: string, files?: FileData[]) => void;
  isLoading: boolean;
}

const SearchBar: React.FC<Props> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');
  const [files, setFiles] = useState<{name: string, data: string, type: string}[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() || files.length > 0) {
      const fileData: FileData[] = files.map(f => ({
        inlineData: { data: f.data, mimeType: f.type }
      }));
      onSearch(query.trim(), fileData);
      setFiles([]);
      setQuery('');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Explicitly cast to File[] to ensure properties like 'name' and 'type' are accessible
    // and that the object is recognized as a 'Blob' for FileReader.
    const selectedFiles = Array.from(e.target.files || []) as File[];
    selectedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Data = (event.target?.result as string).split(',')[1];
        setFiles(prev => [...prev, { name: file.name, data: base64Data, type: file.type }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] w-[95%] max-w-2xl">
      <div className="flex flex-col gap-2">
        <form 
          onSubmit={handleSubmit}
          className="bg-white/70 backdrop-blur-3xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-white/40 px-6 py-3 flex items-center gap-4 transition-all focus-within:ring-4 focus-within:ring-slate-900/5 group"
        >
          <div className="relative">
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin text-slate-900" />
            ) : (
              <Feather className="w-5 h-5 text-slate-400 group-focus-within:text-slate-900 transition-colors" />
            )}
          </div>
          
          <input 
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="输入书名或上传书籍截图/PDF..."
            className="bg-transparent border-none outline-none flex-1 text-base font-medium text-slate-800 placeholder:text-slate-400 font-literary"
            disabled={isLoading}
          />

          <div className="flex items-center gap-2">
            <button 
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2 rounded-xl hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-900"
              title="上传书籍截图或PDF"
            >
              <Paperclip className="w-5 h-5" />
            </button>
            <input 
              type="file" 
              multiple 
              accept="image/*,application/pdf" 
              className="hidden" 
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            <button 
              type="submit"
              disabled={isLoading || (!query.trim() && files.length === 0)}
              className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-xs uppercase tracking-widest font-bold disabled:opacity-30 hover:bg-black transition-all active:scale-95 flex items-center gap-2 shadow-lg"
            >
              {isLoading ? '解析中...' : '生成视界'}
            </button>
          </div>
        </form>

        {files.length > 0 && (
          <div className="flex flex-wrap gap-2 px-4 py-2 bg-white/50 backdrop-blur-lg rounded-xl border border-white/20">
            {files.map((file, i) => (
              <div key={i} className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg shadow-sm border border-slate-100 text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                <span className="truncate max-w-[100px]">{file.name}</span>
                <button onClick={() => removeFile(i)} className="hover:text-red-500 transition-colors">
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
