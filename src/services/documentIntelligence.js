/**
 * Document Intelligence & Financial RAG Engine
 * Reusable architecture adapted from EquityLens (PyPDF + ChromaDB) and FinSignal-RAG (SEC EDGAR).
 * Enables uploading annual reports, investor presentations, and 10-K filings,
 * with text chunking, semantic retrieval simulation, and page-level citation tracing.
 */

export const SAMPLE_DOCUMENTS = [
  {
    id: 'doc-rel-ar24',
    title: 'Reliance Industries Annual Report FY2024',
    ticker: 'RELIANCE',
    fileType: 'PDF',
    size: '18.4 MB',
    pages: 482,
    uploadDate: '2024-07-15',
    status: 'Indexed',
    chunksCount: 1420,
    sections: [
      'Management Discussion & Analysis (MDA)',
      'Retail & Telecom Strategic Outlook',
      'Consolidated Balance Sheet',
      'Auditor Disclosures & Risk Matrix'
    ]
  },
  {
    id: 'doc-tcs-q3',
    title: 'TCS Shareholder Letter & Operational Disclosures',
    ticker: 'TCS',
    fileType: 'PDF',
    size: '4.2 MB',
    pages: 86,
    uploadDate: '2024-10-12',
    status: 'Indexed',
    chunksCount: 260,
    sections: [
      'AI & Cloud Transformation Pipeline',
      'Geographical Segment Performance',
      'Attrition & Talent Utilization Metrics'
    ]
  },
  {
    id: 'doc-hdfc-merger',
    title: 'HDFC Bank Post-Merger Synergies Report',
    ticker: 'HDFCBANK',
    fileType: 'PDF',
    size: '8.1 MB',
    pages: 134,
    uploadDate: '2024-08-20',
    status: 'Indexed',
    chunksCount: 410,
    sections: [
      'Branch Expansion Metrics',
      'Liquidity Coverage & Asset Quality',
      'Capital Adequacy Basel-III'
    ]
  }
];

export const DocumentIntelligenceService = {
  getDocuments() {
    return SAMPLE_DOCUMENTS;
  },

  /**
   * Search through indexed document chunks and return cited passages
   */
  queryDocuments(query, selectedTicker = null) {
    const q = query.toLowerCase();
    const results = [
      {
        docTitle: 'Reliance Industries Annual Report FY2024',
        pageNumber: 42,
        section: 'Retail & Digital Services Trajectory',
        snippet: 'Consolidated consumer businesses contributed over 47% of consolidated segment EBITDA. Jio 5G True 5G network deployment reached nationwide coverage ahead of schedule.',
        relevanceScore: 0.94,
        ticker: 'RELIANCE'
      },
      {
        docTitle: 'TCS Operational Disclosures',
        pageNumber: 18,
        section: 'AI & Cloud Infrastructure',
        snippet: 'Investment in generative AI capabilities has scaled our talent base to over 350,000 employees trained on foundational LLMs and enterprise agent development.',
        relevanceScore: 0.89,
        ticker: 'TCS'
      },
      {
        docTitle: 'HDFC Bank Post-Merger Synergies Report',
        pageNumber: 27,
        section: 'Asset Quality & Balance Sheet Management',
        snippet: 'Gross Non-Performing Assets (GNPA) stood at 1.24% with Net NPA at 0.33%, reflecting resilient underwriting standards across retail and wholesale credit lines.',
        relevanceScore: 0.87,
        ticker: 'HDFCBANK'
      }
    ];

    if (selectedTicker && selectedTicker !== 'ALL') {
      return results.filter((r) => r.ticker === selectedTicker);
    }
    return results;
  }
};
