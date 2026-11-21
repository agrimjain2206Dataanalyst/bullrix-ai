import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, ShieldCheck, Bell, Database, ExternalLink, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { DigiLockerService } from '../services/digilockerService';

const Settings = () => {
  const { user, updatePreferences } = useAuth();
  const [defaultMarket, setDefaultMarket] = useState(user.preferences?.defaultMarket || 'India');
  const [autoRefresh, setAutoRefresh] = useState(user.preferences?.autoRefreshSec || 30);
  const digiLockerConfig = DigiLockerService.getConfig();

  const handleSave = () => {
    updatePreferences({ defaultMarket, autoRefreshSec: Number(autoRefresh) });
    alert('Settings saved successfully!');
  };

  const handleDigiLockerConnect = () => {
    const res = DigiLockerService.initiateConsentFlow();
    if (!res.success && res.requiresCredentials) {
      alert(`DigiLocker Integration Status:\n\n${res.message}\n\nTo onboard in production, visit: ${res.instructionsUrl}`);
    } else if (res.authUrl) {
      window.open(res.authUrl, '_blank');
    }
  };

  return (
    <div className="pt-28 pb-16 px-4 lg:px-8 max-w-4xl mx-auto flex flex-col gap-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          System Preferences & Integrations
        </h1>
        <p className="text-xs sm:text-sm text-[#8E9CAE] mt-1">
          Customize market defaults, API keys, and enterprise identity verifications.
        </p>
      </div>

      {/* Market Preferences */}
      <div className="glass-card bg-[#162338]/85 p-6 rounded-3xl flex flex-col gap-5">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <SettingsIcon size={18} className="text-[#54D6B0]" />
          Market Data Preferences
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="text-[#8E9CAE] block mb-1.5 font-semibold">Primary Default Market</label>
            <select
              value={defaultMarket}
              onChange={(e) => setDefaultMarket(e.target.value)}
              className="w-full bg-[#101B2B] border border-white/10 rounded-xl p-3 text-white outline-none focus:border-[#54D6B0]/50"
            >
              <option value="India">India (NSE / BSE)</option>
              <option value="US">United States (NASDAQ / NYSE)</option>
              <option value="Global">Global Overview</option>
            </select>
          </div>

          <div>
            <label className="text-[#8E9CAE] block mb-1.5 font-semibold">Auto-Refresh Interval (Seconds)</label>
            <select
              value={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.value)}
              className="w-full bg-[#101B2B] border border-white/10 rounded-xl p-3 text-white outline-none focus:border-[#54D6B0]/50"
            >
              <option value={15}>15 Seconds</option>
              <option value={30}>30 Seconds (Recommended)</option>
              <option value={60}>60 Seconds</option>
            </select>
          </div>
        </div>

        <button onClick={handleSave} className="btn-primary !py-2.5 !px-6 text-xs font-bold w-fit cursor-pointer">
          Save Preferences
        </button>
      </div>

      {/* DigiLocker Official Integration Gateway (Phase 5) */}
      <div className="glass-card bg-[#162338]/85 p-6 rounded-3xl flex flex-col gap-4 border border-[#54D6B0]/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck size={22} className="text-[#54D6B0]" />
            <h3 className="text-base font-bold text-white">DigiLocker Requester Integration</h3>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#8E9CAE]">
            {digiLockerConfig.environment}
          </span>
        </div>

        <p className="text-xs text-[#8E9CAE] leading-relaxed">
          Official consent-based credential verification via Digital India DigiLocker Requester gateway.
          In production, this facilitates accredited institutional KYC and document authenticity validation.
        </p>

        <div className="p-4 rounded-2xl bg-[#101B2B] border border-white/5 space-y-2 text-xs">
          <div className="flex justify-between py-1 border-b border-white/5">
            <span className="text-[#8E9CAE]">Client ID Status</span>
            <span className="font-mono text-white font-bold">{digiLockerConfig.clientId}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-white/5">
            <span className="text-[#8E9CAE]">Onboarding State</span>
            <span className="font-mono text-[#FFB03A] font-bold">{digiLockerConfig.status}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-[#8E9CAE]">Required Verification</span>
            <span className="font-mono text-white">National e-Governance Division (NeGD) Partner API</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <button
            onClick={handleDigiLockerConnect}
            className="btn-primary !py-2.5 !px-5 text-xs font-bold cursor-pointer"
          >
            Initiate DigiLocker Authorization
          </button>
          <a
            href="https://partners.digitallocker.gov.in/"
            target="_blank"
            rel="noreferrer"
            className="text-xs font-semibold text-[#54D6B0] hover:underline flex items-center gap-1"
          >
            <span>Partners Documentation</span> <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Settings;
