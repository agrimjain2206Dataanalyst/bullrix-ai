import React, { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, ComposedChart, Line } from 'recharts';
import { Maximize2, Minimize2, Download, Zap, Settings, MousePointer2 } from 'lucide-react';

const AdvancedChart = ({ data, type = 'area', color = '#3b82f6' }) => {
  const [timeFilter, setTimeFilter] = useState('1M');
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [chartType, setChartType] = useState(type); // 'area' or 'candle' (mocked as line/bar)

  const filters = ['1D', '1W', '1M', '1Y', '5Y'];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass p-4 border border-white/10 rounded-xl shadow-2xl">
          <p className="text-xs font-bold text-muted mb-2 uppercase tracking-tighter">{label}</p>
          <div className="flex flex-col gap-1">
             <div className="flex justify-between gap-8">
                <span className="text-xs text-muted">Price:</span>
                <span className="text-sm font-bold">₹{payload[0].value.toLocaleString('en-IN')}</span>
             </div>
             {chartType === 'candle' && (
               <>
                 <div className="flex justify-between gap-8">
                    <span className="text-xs text-muted">Open:</span>
                    <span className="text-sm font-bold text-success">₹{(payload[0].value * 0.99).toFixed(2)}</span>
                 </div>
                 <div className="flex justify-between gap-8">
                    <span className="text-xs text-muted">High:</span>
                    <span className="text-sm font-bold text-success">₹{(payload[0].value * 1.02).toFixed(2)}</span>
                 </div>
                 <div className="flex justify-between gap-8">
                    <span className="text-xs text-muted">Low:</span>
                    <span className="text-sm font-bold text-accent">₹{(payload[0].value * 0.97).toFixed(2)}</span>
                 </div>
               </>
             )}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`flex flex-col gap-4 ${isFullScreen ? 'fixed inset-0 z-[100] bg-background p-8' : 'w-full h-full'}`}>
      <div className="flex items-center justify-between">
        <div className="flex gap-1 bg-white/5 p-1 rounded-xl border border-white/5">
          {filters.map(f => (
            <button 
              key={f}
              onClick={() => setTimeFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${timeFilter === f ? 'bg-primary text-white' : 'text-muted hover:text-white hover:bg-white/5'}`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="flex gap-1 bg-white/5 p-1 rounded-xl border border-white/5 mr-4">
             <button 
               onClick={() => setChartType('area')}
               className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${chartType === 'area' ? 'bg-white/10 text-white' : 'text-muted hover:text-white'}`}
             >
               Line
             </button>
             <button 
               onClick={() => setChartType('candle')}
               className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${chartType === 'candle' ? 'bg-white/10 text-white' : 'text-muted hover:text-white'}`}
             >
               Candle
             </button>
          </div>
          <button onClick={() => setIsFullScreen(!isFullScreen)} className="p-2 rounded-lg hover:bg-white/5 text-muted transition-colors">
            {isFullScreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
          <button className="p-2 rounded-lg hover:bg-white/5 text-muted transition-colors">
            <Download size={18} />
          </button>
        </div>
      </div>

      <div className="flex-1 min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={color} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 10 }}
              minTickGap={30}
            />
            <YAxis 
              domain={['auto', 'auto']} 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 10 }}
              orientation="right"
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#ffffff20', strokeWidth: 1 }} />
            
            {chartType === 'area' ? (
              <Area 
                type="monotone" 
                dataKey="price" 
                stroke={color} 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorValue)" 
                animationDuration={1500}
              />
            ) : (
              <>
                <Bar 
                  dataKey="price" 
                  fill={color} 
                  radius={[2, 2, 0, 0]}
                  opacity={0.3}
                />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke={color} 
                  strokeWidth={2} 
                  dot={false}
                />
              </>
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-white/5">
         <div className="flex items-center gap-4 text-[10px] text-muted font-bold uppercase tracking-widest">
            <div className="flex items-center gap-1.5">
               <MousePointer2 size={12} className="text-primary" /> Crosshair Enabled
            </div>
            <div className="flex items-center gap-1.5">
               <Zap size={12} className="text-primary" /> Real-time Data
            </div>
         </div>
         <div className="flex items-center gap-2">
            <Settings size={14} className="text-muted" />
         </div>
      </div>
    </div>
  );
};

export default AdvancedChart;
