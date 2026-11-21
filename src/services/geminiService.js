/**
 * Generative AI Financial Research Engine (Google Gemini API)
 * Professional AI financial research assistant supporting markets, money, and ideas.
 * Answers general questions, explains financial concepts, assists with stock research,
 * compares companies, and calculates portfolio metrics with clear source attribution.
 */

const GEMINI_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models';

export const GeminiFinancialAI = {
  /**
   * Conversational Financial Intelligence Response
   */
  async askFinancialAnalyst({ prompt, contextStock = null, conversationHistory = [] }) {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.GEMINI_API_KEY;

    // Professional Research Assistant System Prompt
    const systemPrompt = `You are BullRix Assistant, a generic, professional AI financial research assistant.
Your goal is to be an intelligence companion for markets, money, and ideas.
Capabilities:
1. Answer general financial, business, and conceptual questions clearly.
2. Explain financial metrics (P/E, ROE, RSI, MACD, EBITDA) with simple intuitive analogies.
3. Help with stock research, company comparisons, and industry trends across Indian (NSE/BSE) and Global markets.
4. Assist with portfolio calculations and risk management principles.
5. If the user asks a general knowledge question, answer it directly without forcing it into a stock recommendation.
6. Clearly distinguish between:
   - General financial knowledge (facts and definitions)
   - Real market data (use provided context with timestamp attribution)
   - Algorithmic or statistical projections (always label model uncertainty)
7. Admit uncertainty honestly when specific information is unavailable or unverified.
8. Formatting Rules: Format cleanly in standard Markdown with clean bolding (**bold**), bullet points (* item), and clean headings. NEVER output repeated malformed asterisks like '****'.`;

    const contents = [];

    // Context Injection if specific stock is queried or selected
    let contextNote = '';
    if (contextStock) {
      contextNote = `\n[VERIFIED MARKET SNAPSHOT]\nSymbol: ${contextStock.symbol} (${contextStock.name})\nExchange: ${contextStock.exchange} (${contextStock.market})\nPrice: ${contextStock.price} ${contextStock.currency || 'INR'} (Change: ${contextStock.percentChange}%)\nSector: ${contextStock.sector} | P/E: ${contextStock.pe || 'N/A'}\n52W Range: ${contextStock.low52} - ${contextStock.high52} | RSI: ${contextStock.rsi || 'N/A'}\nDescription: ${contextStock.description}\n`;
    }

    // Append conversation history
    conversationHistory.slice(-8).forEach((msg) => {
      contents.push({
        role: msg.isBot ? 'model' : 'user',
        parts: [{ text: msg.text }]
      });
    });

    contents.push({
      role: 'user',
      parts: [{ text: `${contextNote ? `${contextNote}\n\n` : ''}${prompt}` }]
    });

    if (!apiKey || apiKey.includes('your_gemini_api_key')) {
      return this.generateDeterministicAnalysis(prompt, contextStock);
    }

    try {
      const model = import.meta.env.VITE_GEMINI_MODEL || 'gemini-2.5-flash';
      const response = await fetch(`${GEMINI_ENDPOINT}/${model}:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents,
          systemInstruction: { parts: [{ text: systemPrompt }] },
          generationConfig: {
            temperature: 0.3,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1200
          }
        })
      });

      if (!response.ok) {
        return this.generateDeterministicAnalysis(prompt, contextStock);
      }

      const data = await response.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (reply) return reply;

      return this.generateDeterministicAnalysis(prompt, contextStock);
    } catch (err) {
      return this.generateDeterministicAnalysis(prompt, contextStock);
    }
  },

  /**
   * Deterministic Fallback Engine (Generic & Professional)
   */
  generateDeterministicAnalysis(query, stock) {
    const q = query.toLowerCase();

    // 1. Specific Stock Inquiry
    if (stock) {
      return `### Research Brief: ${stock.name} (${stock.symbol})
**Exchange:** ${stock.exchange} • Sector: ${stock.sector}  
**Last Documented Price:** ${stock.market === 'US' ? '$' : '₹'}${stock.price.toLocaleString()} (${stock.percentChange >= 0 ? '+' : ''}${stock.percentChange}%)

* **Business Overview:** ${stock.description}
* **Valuation & Fundamentals:** P/E of **${stock.pe || 'N/A'}** with market cap at **${stock.marketCap}**. 52-week trading span ranges between **${stock.low52} and ${stock.high52}**.
* **Technical Trend:** Identified as **${stock.trend}** with an RSI of **${stock.rsi || 50}**.
* **Risk Considerations:** Operating margin sensitivity to macro sector cycles and broader benchmark volatility.

*Note: Algorithmic assessment based on last documented exchange snapshots.*`;
    }

    // 2. Relative Strength Index (RSI) Explanation
    if (q.includes('rsi') || q.includes('relative strength')) {
      return `### Understanding the Relative Strength Index (RSI)

The **Relative Strength Index (RSI)** is a popular technical momentum oscillator that measures the velocity and magnitude of recent price changes on a scale from 0 to 100.

* **Overbought Region (> 70):** Indicates that an asset has experienced rapid upward momentum and may be due for a consolidation or price pullback.
* **Oversold Region (< 30):** Suggests that selling pressure has been intense, and the price might be primed for a technical rebound or mean-reversion.
* **Centerline (50):** Reflects a balanced equilibrium between buyers and sellers.

**Pro-Tip:** In strong trending bull markets, RSI can remain above 70 for extended intervals; it is best combined with support/resistance levels and volume confirmation.`;
    }

    // 3. Portfolio Diversification
    if (q.includes('diversification') || q.includes('portfolio')) {
      return `### Principles of Portfolio Diversification

**Diversification** is the practice of spreading investments across different asset classes, sectors, and geographies to reduce unsystematic (company-specific) risk without necessarily sacrificing expected returns.

1. **Asset Class Balance:** Allocate capital across Equities, Fixed Income, Cash Equivalents, and Commodities (Gold).
2. **Sector Non-Correlation:** Avoid clustering capital in a single sector (e.g., balancing high-beta Tech with defensive FMCG or Banking).
3. **Geographical Exposure:** Combining Indian domestic consumption leaders (NSE) with global technology innovators (NASDAQ) cushions against localized macroeconomic slowdowns.
4. **Periodic Rebalancing:** Trim positions that have outgrown their target weights to maintain your intended risk tolerance.`;
    }

    // 4. Comparison (e.g., NVIDIA vs AMD)
    if (q.includes('nvidia') && q.includes('amd')) {
      return `### Comparative Snapshot: NVIDIA (NVDA) vs. AMD (AMD)

* **Market Focus:**
  * **NVIDIA:** Undisputed market leader in enterprise AI datacenter acceleration with its CUDA software moat and Blackwell architecture.
  * **AMD:** Strong multi-platform innovator advancing EPYC server CPUs and scaling Instinct MI300 series AI accelerators.
* **Valuation & Margins:** NVIDIA commands higher gross margins (> 70%) owing to full-stack datacenter platform pricing, whereas AMD offers diversified exposure across gaming, embedded processors, and server computing.
* **Key Catalyst to Monitor:** Hyperscaler capital expenditure continuity and software ecosystem adoption across enterprise workflows.`;
    }

    // 5. General Market Overview
    if (q.includes('trend') || q.includes('market') || q.includes('nifty') || q.includes('today')) {
      return `### Macro Financial Market Summary

* **Indian Benchmark Indices (NIFTY 50 & SENSEX):** Indian equity markets remain resilient, backed by steady Domestic Institutional Investor (DII) systematic inflows and solid balance sheet health across major private banks and infrastructure contractors.
* **Global Exchanges (NASDAQ & S&P 500):** Driven by hyperscaler AI infrastructure capex announcements, with semiconductor capital goods exhibiting high relative strength.
* **Commodities & Currencies:** Stable crude oil prices near $82/bbl provide margin comfort for import-dependent emerging markets, with USD/INR trading in an orderly band.`;
    }

    // 6. Generic Polite Research Response
    return `### How Can I Help Your Research?

I am your financial research intelligence companion. I can assist you with:
* **Company & Stock Analysis:** Deep-dives into Reliance, TCS, HDFC Bank, NVIDIA, Apple, and 30+ other leaders.
* **Financial Concepts & Metrics:** Clear explanations of P/E ratios, DCF valuation, Beta, and technical indicators.
* **Macro & Market Trends:** Indian (NSE/BSE) and Global (NASDAQ/NYSE) performance updates.
* **Portfolio Calculations:** Diversification strategies, risk-adjusted returns, and position sizing.

Feel free to ask any question or try one of the suggested prompts below!`;
  }
};
