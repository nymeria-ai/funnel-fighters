'use client';
import { useState, useCallback } from 'react';

// Settings grouped by category
const SETTING_CATEGORIES: Record<string, { keys: string[]; label: string; icon: string }> = {
  General: {
    icon: '⚙️',
    label: 'General',
    keys: ['mcc_id', 'target_accounts', 'gsc_site_url', 'rank_weights', 'sp_ttl_days', 'rank_ttl_days'],
  },
  Pipeline: {
    icon: '🔄',
    label: 'Pipeline',
    keys: ['llm_model', 'cron_time_utc'],
  },
  'Data Retention': {
    icon: '🗄️',
    label: 'Data Retention',
    keys: ['retention_days_raw'],
  },
  Alerts: {
    icon: '🔔',
    label: 'Alerts',
    keys: ['alert_channels'],
  },
};

const SETTING_LABELS: Record<string, string> = {
  mcc_id: 'MCC ID',
  target_accounts: 'Target Accounts',
  gsc_site_url: 'GSC Site URL',
  rank_weights: 'Rank Weights',
  sp_ttl_days: 'Selling Point TTL (days)',
  rank_ttl_days: 'Rank Cache TTL (days)',
  llm_model: 'LLM Model',
  cron_time_utc: 'Cron Time (UTC)',
  retention_days_raw: 'Raw Metrics Retention (days)',
  alert_channels: 'Alert Channels',
};

const SETTING_DESCRIPTIONS: Record<string, string> = {
  mcc_id: 'Google Ads Manager Account ID',
  target_accounts: 'List of account names to include in syncs',
  gsc_site_url: 'Google Search Console property URL',
  rank_weights: 'Weights for GSC vs Ahrefs in composite rank score',
  sp_ttl_days: 'Days before selling point recomputation is forced',
  rank_ttl_days: 'Days before rank data is considered stale',
  llm_model: 'Claude model used for LLM-powered analysis (e.g. claude-opus-4-6)',
  cron_time_utc: 'Daily pipeline trigger time in UTC (HH:MM)',
  retention_days_raw: 'Number of days to keep raw daily ad metrics (then deleted by cleanup cron)',
  alert_channels: 'Where to send pipeline failure alerts',
};

type SettingsMap = Record<string, unknown>;

function formatValue(val: unknown): string {
  if (typeof val === 'string') return val;
  return JSON.stringify(val, null, 2);
}

function parseValue(raw: string): unknown {
  const trimmed = raw.trim();
  try {
    return JSON.parse(trimmed);
  } catch {
    return trimmed;
  }
}

interface SettingCardProps {
  settingKey: string;
  value: unknown;
  onSave: (key: string, value: unknown) => Promise<void>;
}

function SettingCard({ settingKey, value, onSave }: SettingCardProps) {
  const [editing, setEditing] = useState(formatValue(value));
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const isMultiline = typeof value === 'object' && value !== null;

  async function handleSave() {
    setSaving(true);
    setError('');
    try {
      const parsed = parseValue(editing);
      await onSave(settingKey, parsed);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="bg-bg-card border border-bg-border rounded-xl p-5">
      <div className="flex items-start justify-between mb-1">
        <div>
          <span className="text-sm font-semibold text-text-primary">
            {SETTING_LABELS[settingKey] ?? settingKey}
          </span>
          <span className="ml-2 text-[10px] font-mono text-text-muted bg-bg-hover px-1.5 py-0.5 rounded">
            {settingKey}
          </span>
        </div>
      </div>
      {SETTING_DESCRIPTIONS[settingKey] && (
        <p className="text-xs text-text-muted mb-3">{SETTING_DESCRIPTIONS[settingKey]}</p>
      )}

      {isMultiline ? (
        <textarea
          value={editing}
          onChange={(e) => setEditing(e.target.value)}
          rows={Math.min(8, editing.split('\n').length + 1)}
          className="w-full bg-bg-hover border border-bg-border rounded-lg px-3 py-2 text-xs font-mono text-text-primary outline-none focus:border-accent-blue resize-y"
          spellCheck={false}
        />
      ) : (
        <input
          value={editing}
          onChange={(e) => setEditing(e.target.value)}
          className="w-full bg-bg-hover border border-bg-border rounded-lg px-3 py-2 text-sm text-text-primary outline-none focus:border-accent-blue"
        />
      )}

      {error && (
        <p className="text-xs text-red-400 mt-1.5">{error}</p>
      )}

      <div className="flex justify-end mt-3">
        <button
          onClick={handleSave}
          disabled={saving}
          className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
            saved
              ? 'bg-score-green/20 text-score-green border border-score-green/30'
              : 'bg-accent-blue text-white hover:bg-accent-blue/80 disabled:opacity-40'
          }`}
        >
          {saving ? 'Saving…' : saved ? '✓ Saved' : 'Save'}
        </button>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<SettingsMap | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [secret, setSecret] = useState('');
  const [secretInput, setSecretInput] = useState('');

  const fetchSettings = useCallback(async (s: string) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/settings', {
        headers: { Authorization: `Bearer ${s}` },
      });
      if (res.status === 401) throw new Error('Invalid secret. Check ADMIN_SYNC_SECRET.');
      if (!res.ok) throw new Error('Failed to load settings.');
      const data = await res.json();
      setSettings(data.settings ?? {});
      setSecret(s);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  async function handleSave(key: string, value: unknown) {
    const res = await fetch('/api/admin/settings', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${secret}`,
      },
      body: JSON.stringify({ key, value }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error ?? 'Save failed');
    }
    // Update local state
    setSettings((prev) => prev ? { ...prev, [key]: value } : { [key]: value });
  }

  function handleSubmitSecret(e: React.FormEvent) {
    e.preventDefault();
    if (secretInput.trim()) fetchSettings(secretInput.trim());
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary">Settings</h1>
        <p className="text-sm text-text-muted mt-1">
          Configure pipeline parameters, data retention, LLM models, and alert channels.
        </p>
      </div>

      {!settings && (
        <div className="bg-bg-card border border-bg-border rounded-xl p-6 max-w-md">
          <h2 className="text-sm font-semibold text-text-primary mb-1">Authenticate</h2>
          <p className="text-xs text-text-muted mb-4">
            Enter your <code className="text-accent-blue">ADMIN_SYNC_SECRET</code> to view and edit settings.
          </p>
          <form onSubmit={handleSubmitSecret} className="flex gap-2">
            <input
              type="password"
              value={secretInput}
              onChange={(e) => setSecretInput(e.target.value)}
              placeholder="ADMIN_SYNC_SECRET"
              className="flex-1 bg-bg-hover border border-bg-border rounded-lg px-3 py-2 text-sm text-text-primary outline-none focus:border-accent-blue"
              autoFocus
            />
            <button
              type="submit"
              disabled={loading || !secretInput.trim()}
              className="px-4 py-2 bg-accent-blue text-white text-sm rounded-lg hover:bg-accent-blue/80 disabled:opacity-40 transition-colors"
            >
              {loading ? '…' : 'Load'}
            </button>
          </form>
          {error && <p className="text-xs text-red-400 mt-2">{error}</p>}
        </div>
      )}

      {settings && (
        <div className="space-y-10">
          {Object.entries(SETTING_CATEGORIES).map(([category, config]) => {
            const categoryKeys = config.keys.filter((k) => k in settings);
            const uncategorized = category === 'General'
              ? Object.keys(settings).filter(
                  (k) => !Object.values(SETTING_CATEGORIES).flatMap((c) => c.keys).includes(k)
                )
              : [];
            const allKeys = [...categoryKeys, ...uncategorized];
            if (allKeys.length === 0) return null;

            return (
              <section key={category}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-base">{config.icon}</span>
                  <h2 className="text-sm font-semibold text-text-primary uppercase tracking-wider">
                    {config.label}
                  </h2>
                  <div className="flex-1 h-px bg-bg-border" />
                </div>
                <div className="grid gap-4">
                  {allKeys.map((k) => (
                    <SettingCard
                      key={k}
                      settingKey={k}
                      value={settings[k]}
                      onSave={handleSave}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
