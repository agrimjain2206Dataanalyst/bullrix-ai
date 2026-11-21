import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileSearch, UploadCloud, BookOpen, CheckCircle2, Search, ArrowRight, ShieldCheck, FileText } from 'lucide-react';
import { DocumentIntelligenceService } from '../services/documentIntelligence';

const DocumentIntelligence = () => {
  const documents = DocumentIntelligenceService.getDocuments();
  const [query, setQuery] = useState('capital expenditure and generative AI');
  const [selectedTicker, setSelectedTicker] = useState('ALL');
  const [searchResults, setSearchResults] = useState(() => DocumentIntelligenceService.queryDocuments(query));
  const [uploadProgress, setUploadProgress] = useState(null);

  const handleSearch = () => {
    const res = DocumentIntelligenceService.queryDocuments(query, selectedTicker);
    setSearchResults(res);
  };

  const handleSimulatedUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadProgress({ filename: file.name, step: 'Extracting PDF Text (PyPDF Loader)...', progress: 30 });
    setTimeout(() => {
      setUploadProgress((prev) => ({ ...prev, step: 'Generating 1800-token chunks with 250 overlap...', progress: 65 }));
      setTimeout(() => {
        setUploadProgress((prev) => ({ ...prev, step: 'Vectorizing via BGE-small-en-v1.5 & ChromaDB Indexing...', progress: 100 }));
        setTimeout(() => {
          setUploadProgress(null);
          alert(`Document "${file.name}" indexed successfully into BullRix RAG Vector Store!`);
        }, 1200);
      }, 1200);
    }, 1200);
  };

  return (
    <div className="pt-28 pb-16 px-4 lg:px-8 max-w-[1600px] mx-auto flex flex-col gap-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#54D6B0]/15 text-[#54D6B0] text-xs font-bold mb-2">
          <FileSearch size={14} />
          EquityLens & FinSignal-RAG Compatible Architecture
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Financial Document Intelligence & RAG
        </h1>
        <p className="text-xs sm:text-sm text-[#8E9CAE] max-w-2xl mt-1">
          Perform semantic retrieval over indexed corporate annual reports, auditor statements, and 10-K filings with zero-hallucination page citations.
        </p>
      </div>

      {/* Upload Zone & Indexed Document Repository */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* PDF Ingestion Area (1 Col) */}
        <div className="glass-card bg-[#162338]/85 p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
              <UploadCloud size={18} className="text-[#54D6B0]" />
              Ingest Annual Report / 10-K (PDF)
            </h3>
            <p className="text-xs text-[#8E9CAE] mb-4">
              Supported formats: Searchable text PDF reports up to 50MB.
            </p>

            <label className="border-2 border-dashed border-white/10 hover:border-[#54D6B0]/50 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all bg-[#101B2B]">
              <UploadCloud size={32} className="text-[#54D6B0] mb-2" />
              <span className="text-xs font-bold text-white">Click to Select Financial Report</span>
              <span className="text-[10px] text-[#8E9CAE] mt-1">Chunked via FinancialDocumentChunker</span>
              <input type="file" accept=".pdf" className="hidden" onChange={handleSimulatedUpload} />
            </label>

            {uploadProgress && (
              <div className="mt-4 p-3 rounded-xl bg-[#101B2B] border border-[#54D6B0]/30 text-xs">
                <span className="font-bold text-white block mb-1">{uploadProgress.filename}</span>
                <span className="text-[11px] text-[#54D6B0] block mb-2">{uploadProgress.step}</span>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-[#54D6B0] transition-all duration-300" style={{ width: `${uploadProgress.progress}%` }} />
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-white/5 text-[10px] text-[#8E9CAE]">
            <ShieldCheck size={14} className="text-[#54D6B0] inline mr-1" />
            Runs client-safe vector indexing with BGE-small embeddings.
          </div>
        </div>

        {/* Currently Indexed Filings (2 Cols) */}
        <div className="lg:col-span-2 glass-card bg-[#162338]/85 p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-white mb-3">Indexed Corporate Reports in Vector DB</h3>
            <div className="space-y-3">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="p-4 rounded-2xl bg-[#101B2B] border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#54D6B0]">
                      <FileText size={20} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">{doc.title}</h4>
                      <span className="text-[10px] text-[#8E9CAE] font-mono">
                        {doc.ticker} • {doc.pages} pages • {doc.chunksCount} chunks • {doc.size}
                      </span>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-[#54D6B0]/15 text-[#54D6B0] border border-[#54D6B0]/30">
                    {doc.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Semantic RAG Search Engine */}
      <div className="glass-card bg-[#162338]/90 p-6 sm:p-8 flex flex-col gap-6">
        <div>
          <h3 className="text-base font-bold text-white mb-1">RAG Contextual Passage Retriever</h3>
          <p className="text-xs text-[#8E9CAE]">
            Ask queries against indexed filings to verify disclosures with exact page numbers and relevance scores.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Search annual report disclosures (e.g. 5G rollout, retail EBITDA, GNPA ratios)..."
            className="flex-1 bg-[#101B2B] border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#54D6B0]/50"
          />
          <button onClick={handleSearch} className="btn-primary !px-6 !py-3 text-xs font-bold cursor-pointer">
            Retrieve Cited Passages
          </button>
        </div>

        {/* Cited Retrieval Passages */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#8E9CAE]">
            Ranked Semantic Passages (Cosine Similarity via ChromaDB)
          </h4>

          {searchResults.map((res, i) => (
            <div
              key={i}
              className="p-4 sm:p-5 rounded-2xl bg-[#101B2B] border border-[#54D6B0]/20 flex flex-col gap-2"
            >
              <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-[#8E9CAE] pb-2 border-b border-white/5">
                <span className="font-bold text-white">{res.docTitle}</span>
                <span className="text-[#54D6B0] font-bold">
                  Page #{res.pageNumber} • Match Relevance: {Math.round(res.relevanceScore * 100)}%
                </span>
              </div>
              <span className="text-[10px] text-[#54D6B0] uppercase font-semibold font-mono">
                Section: {res.section}
              </span>
              <p className="text-xs sm:text-sm text-[#F3F5F7] leading-relaxed italic">
                "{res.snippet}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DocumentIntelligence;
