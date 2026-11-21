import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  TrendingUp, 
  ShieldAlert, 
  Target, 
  Activity, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  ChevronRight 
} from 'lucide-react';
import { MARKET_UNIVERSE } from '../services/marketData';
import { PredictionEngine } from '../services/predictionEngine';

const AIPredictionCenter = () => {
  const [selectedStockId, setSelectedStockId] = useState(MARKET_UNIVERSE[0].id);

  const selectedStock = useMemo(() => {
    return MARKET_UNIVERSE.find((s) => s.id === selectedStockId) || MARKET_UNIVERSE[0];
  }, [selectedStockId]);

  const forecast = useMemo(() => {
    return PredictionEngine.generateForecast(selectedStock);
  }, [selectedStock]);

  const isBullish = forecast?.direction === 'Bullish';

  return (
    <div className="pt-28 pb-16 px-4 lg:px-8 max-w-[1600px] mx-auto flex flex-col gap-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#54D6B0]/15 text-[#54D6B0] text-xs font-bold mb-2">
          <Sparkles size={14} />
          Hybrid Statistical & Generative Forecasting
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          AI Prediction Center
        </h1>
        <p className="text-xs sm:text-sm text-[#8E9CAE] max-w-2xl mt-1">
          Multivariate algorithmic outlook combining price volatility, technical trend indicators, 14-day news sentiment weighting, and walk-forward backtest calibration.
        </p>
      </div>

      {/* Stock Selector Pill Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {MARKET_UNIVERSE.map((stock) => (
          <button
            key={stock.id}
            onClick={() => setSelectedStockId(stock.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
              selectedStockId === stock.id
                ? 'bg-[#54D6B0] text-[#0B131E] shadow-md shadow-[#54D6B0]/20'
                : 'bg-[#162338] text-[#8E9CAE] hover:text-white border border-white/5'
            }`}
          >
            <span>{stock.symbol}</span>
            <span className="text-[10px] opacity-75 font-mono">
              {stock.market === 'US' ? '$' : '₹'}{stock.price}
            </span>
          </button>
        ))}
      </div>

      {/* Main Forecast Card */}
      {forecast && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Verdict & Targets (2 Cols) */}
          <div className="lg:col-span-2 glass-card bg-[#162338]/90 border border-[#54D6B0]/20 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-white">{forecast.companyName}</span>
                    <span className="text-xs font-mono font-bold text-[#54D6B0] bg-[#54D6B0]/15 px-2 py-0.5 rounded">
                      {forecast.symbol}
                    </span>
                  </div>
                  <span className="text-xs text-[#8E9CAE] mt-0.5 block">
                    Current Reference Price: {forecast.currency === 'INR' ? '₹' : '$'}{forecast.currentPrice.toLocaleString()} (15m delayed)
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8E9CAE] block">
                    Directional Verdict
                  </span>
                  <span className={`text-2xl font-black uppercase font-mono ${
                    isBullish ? 'text-[#54D6B0]' : forecast.direction === 'Bearish' ? 'text-[#FF5C75]' : 'text-white'
                  }`}>
                    {forecast.direction}
                  </span>
                </div>
              </div>

              {/* Price Targets & Confidence Intervals */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
                <div className="p-4 rounded-2xl bg-[#101B2B] border border-white/5">
                  <span className="text-[10px] text-[#8E9CAE] uppercase font-mono block">Estimated Support Bound</span>
                  <span className="text-lg font-black font-mono text-[#FF5C75] block mt-1">
                    {forecast.currency === 'INR' ? '₹' : '$'}{forecast.priceTargetRange.low}
                  </span>
                  <span className="text-[10px] text-[#8E9CAE]">Downside Volatility Boundary</span>
                </div>

                <div className="p-4 rounded-2xl bg-[#101B2B] border border-[#54D6B0]/30 shadow-sm">
                  <span className="text-[10px] text-[#54D6B0] uppercase font-mono block font-bold">5-Day Expected Target</span>
                  <span className="text-lg font-black font-mono text-white block mt-1">
                    {forecast.currency === 'INR' ? '₹' : '$'}{forecast.priceTargetRange.high}
                  </span>
                  <span className="text-[10px] text-[#54D6B0] font-semibold">{forecast.fiveDayOutlook}</span>
                </div>

                <div className="p-4 rounded-2xl bg-[#101B2B] border border-white/5">
                  <span className="text-[10px] text-[#8E9CAE] uppercase font-mono block">Statistical Confidence</span>
                  <span className="text-lg font-black font-mono text-[#54D6B0] block mt-1">
                    {forecast.confidenceScore}%
                  </span>
                  <span className="text-[10px] text-[#8E9CAE]">{forecast.confidenceInterval}</span>
                </div>
              </div>

              {/* Supporting Factors & Downside Invalidation */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-2 flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-[#54D6B0]" /> Supporting Quantitative Catalysts
                  </h4>
                  <ul className="space-y-1.5 text-xs text-[#8E9CAE]">
                    {forecast.supportingFactors.map((factor, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#54D6B0] font-bold">•</span>
                        <span>{factor}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-white/5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-2 flex items-center gap-1.5">
                    <ShieldAlert size={14} className="text-[#FF5C75]" /> Downside Vulnerabilities & Limitations
                  </h4>
                  <ul className="space-y-1.5 text-xs text-[#8E9CAE]">
                    {forecast.downsideRisks.map((risk, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#FF5C75] font-bold">•</span>
                        <span>{risk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 text-[10px] text-[#8E9CAE] leading-relaxed">
              <strong>Institutional Disclaimer:</strong> {forecast.disclaimer}
            </div>
          </div>

          {/* Validation Metrics & Technical Readings (1 Col) */}
          <div className="space-y-6">
            <div className="glass-card bg-[#162338]/80 p-6 flex flex-col gap-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Activity size={16} className="text-[#54D6B0]" />
                Walk-Forward Backtest Calibration
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-[#8E9CAE]">Model Architecture</span>
                  <span className="font-bold text-white font-mono text-[11px]">{forecast.validationMetrics.modelType}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-[#8E9CAE]">Directional Accuracy</span>
                  <span className="font-bold text-[#54D6B0] font-mono">{forecast.validationMetrics.historicalDirectionalAccuracy}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-[#8E9CAE]">Mean Absolute Error (MAE)</span>
                  <span className="font-bold text-white font-mono">{forecast.validationMetrics.meanAbsoluteErrorPct}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-[#8E9CAE]">Calibration Window</span>
                  <span className="font-bold text-white font-mono">{forecast.validationMetrics.evaluationPeriod}</span>
                </div>
              </div>
            </div>

            <div className="glass-card bg-[#162338]/80 p-6 flex flex-col gap-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Target size={16} className="text-[#54D6B0]" />
                Multi-Factor Technical Summary
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-[#8E9CAE]">Relative Strength Index (RSI)</span>
                  <span className="font-bold font-mono text-white">{forecast.indicators.rsi}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-[#8E9CAE]">Volatility Classification</span>
                  <span className="font-bold text-white font-mono">{forecast.indicators.volatilityClassification}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-[#8E9CAE]">14-Day News Sentiment</span>
                  <span className="font-bold text-[#54D6B0] font-mono">{forecast.sentimentAnalysis.label}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIPredictionCenter;
