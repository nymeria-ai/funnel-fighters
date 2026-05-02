'use client';
import { useState, useCallback, useEffect } from 'react';

type QueryStatus = 'unverified' | 'verified' | 'disabled';
type QueryType = 'query' | 'prompt';

interface Query extends Record<string, unknown> {
  id: number;
  type: QueryType;
  name: string;
  content: string;
  description: string | null;
  version: number;
  status: QueryStatus;
  created_by: string | null;
  approved_by: string | null;
  approved_at: string | null;
  created_at: string;
}

const STATUS_COLORS: Record<QueryStatus, string> = {
  unverified: 'bg-score-gold/20 text-score-gold border-score-gold/30',
  verified: 'bg-score-green/20 text-score-green border-score-green/30',
  disabled: 'bg-score-gray/20 text-score-gray border-score-gray/30',
};

const TYPE_COLORS: Record<QueryType, string> = {
  query: 'bg-accent-blue/20 text-accent-blue border-accent-blue/30',
  prompt: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
};

function Badge({ children, className }: { children: React.ReactNode; className: string }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide border ${className}`}>
      {children}
    </span>
  );
}

interface QueryRowProps extends Record<string, unknown> {
  q: Query;
  secret: string;
  onUpdate: (updated: Query) => void;
}

function QueryRow({ q, secret, onUpdate }: QueryRowProps) {
  const [expanded, setExpanded] = useState(false);
  const [editContent, setEditContent] = useState(q.content);
  const [editDescription, setEditDescription] = useState(q.description ?? '');
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');

  async function patchQuery(patch: Partial<Pick<Query, 'content' | 'description' | 'status' | 'approved_by'>>) {
    setSaving(true);
    setSaveMsg('');
    try {
      const res = await fetch(`/api/admin/queries/${q.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${secret}`,
        },
        body: JSON.stringify(patch),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setSaveMsg('Error: ' + (data.error ?? 'Failed'));
        return;
      }
      const data = await res.json();
      onUpdate(data.query as Query);
      setSaveMsg('Saved');
      setTimeout(() => setSaveMsg(''), 2000);
    } finally {
      setSaving(false);
    }
  }

  function handleSaveContent() {
    patchQuery({ content: editContent, description: editDescription || undefined });
  }

  function handleVerify() {
    patchQuery({ status: 'verified', approved_by: 'admin' });
  }

  function handleDisable() {
    patchQuery({ status: 'disabled' });
  }

  function handleUnverify() {
    patchQuery({ status: 'unverified' });
  }

  return (
    <div className="border-b border-bg-border last:border-0">
      {/* Row */}
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-bg-hover/40 transition-colors text-left"
      >
        <span className="text-text-muted text-xs w-3 shrink-0">{expanded ? '▼' : '▶'}</span>
        <div className="min-w-0 flex-1 grid grid-cols-[1fr_auto_auto_auto_minmax(0,2fr)] gap-3 items-center">
          <span className="text-sm font-medium text-text-primary truncate">{q.name}</span>
          <Badge className={TYPE_COLORS[q.type]}>{q.type}</Badge>
          <Badge className={STATUS_COLORS[q.status]}>{q.status}</Badge>
          <span className="text-xs text-text-muted shrink-0">v{q.version}</span>
          <span className="text-xs text-text-muted truncate hidden sm:block">{q.description ?? '—'}</span>
        </div>
        <span className="text-[10px] text-text-muted shrink-0 hidden md:block">
          {new Date(q.created_at).toLocaleDateString()}
        </span>
      </button>

      {/* Expanded editor */}
      {expanded && (
        <div className="px-4 pb-5 pt-2 bg-bg-primary/60 space-y-3">
          {/* Description */}
          <div>
            <label className="text-[10px] text-text-muted uppercase tracking-wide block mb-1">Description</label>
            <input
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              placeholder="What does this query/prompt do?"
              className="w-full bg-bg-hover border border-bg-border rounded-lg px-3 py-2 text-sm text-text-primary outline-none focus:border-accent-blue"
            />
          </div>

          {/* Content */}
          <div>
            <label className="text-[10px] text-text-muted uppercase tracking-wide block mb-1">
              Content {q.type === 'query' ? '(SQL)' : '(Prompt)'}
            </label>
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              rows={Math.max(6, editContent.split('\n').length + 1)}
              spellCheck={false}
              className="w-full bg-bg-hover border border-bg-border rounded-lg px-3 py-2 text-xs font-mono text-text-primary outline-none focus:border-accent-blue resize-y"
            />
          </div>

          {/* Metadata */}
          <div className="flex flex-wrap gap-4 text-[10px] text-text-muted">
            {q.approved_by && <span>Approved by: <span className="text-text-secondary">{q.approved_by}</span></span>}
            {q.approved_at && <span>At: <span className="text-text-secondary">{new Date(q.approved_at).toLocaleString()}</span></span>}
            {q.created_by && <span>Created by: <span className="text-text-secondary">{q.created_by}</span></span>}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleSaveContent}
              disabled={saving}
              className="px-3 py-1.5 bg-accent-blue text-white text-xs rounded-lg hover:bg-accent-blue/80 disabled:opacity-40 transition-colors"
            >
              {saving ? 'Saving…' : 'Save Changes'}
            </button>

            {q.status !== 'verified' && q.status !== 'disabled' && (
              <button
                onClick={handleVerify}
                disabled={saving}
                className="px-3 py-1.5 bg-score-green/20 text-score-green border border-score-green/30 text-xs rounded-lg hover:bg-score-green/30 disabled:opacity-40 transition-colors"
              >
                ✓ Verify
              </button>
            )}
            {q.status === 'verified' && (
              <button
                onClick={handleUnverify}
                disabled={saving}
                className="px-3 py-1.5 bg-score-gold/20 text-score-gold border border-score-gold/30 text-xs rounded-lg hover:bg-score-gold/30 disabled:opacity-40 transition-colors"
              >
                ↩ Unverify
              </button>
            )}
            {q.status !== 'disabled' && (
              <button
                onClick={handleDisable}
                disabled={saving}
                className="px-3 py-1.5 bg-score-gray/20 text-score-gray border border-score-gray/30 text-xs rounded-lg hover:bg-score-gray/30 disabled:opacity-40 transition-colors"
              >
                Disable
              </button>
            )}
            {q.status === 'disabled' && (
              <button
                onClick={handleUnverify}
                disabled={saving}
                className="px-3 py-1.5 bg-bg-hover text-text-secondary border border-bg-border text-xs rounded-lg hover:bg-bg-card disabled:opacity-40 transition-colors"
              >
                Re-enable
              </button>
            )}

            {saveMsg && (
              <span className={`text-xs ${saveMsg.startsWith('Error') ? 'text-red-400' : 'text-score-green'}`}>
                {saveMsg}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function QueriesPage() {
  const [queries, setQueries] = useState<Query[]>([]);
  const [secret, setSecret] = useState('');
  const [secretInput, setSecretInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [typeFilter, setTypeFilter] = useState<'all' | QueryType>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | QueryStatus>('all');

  // Create form
  const [showCreate, setShowCreate] = useState(false);
  const [newType, setNewType] = useState<QueryType>('query');
  const [newName, setNewName] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [creating, setCreating] = useState(false);
  const [createMsg, setCreateMsg] = useState('');

  const fetchQueries = useCallback(async (s?: string) => {
    setLoading(true);
    setError('');
    try {
      const headers: Record<string, string> = {};
      if (s) headers.Authorization = `Bearer ${s}`;
      const res = await fetch('/api/admin/queries', { headers });
      if (res.status === 401) throw new Error('Invalid secret.');
      if (!res.ok) throw new Error('Failed to load.');
      const data = await res.json();
      setQueries(data.queries ?? []);
      if (s) setSecret(s);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load queries on mount (no auth needed for read)
  useEffect(() => {
    fetchQueries();
  }, [fetchQueries]);

  function handleSubmitSecret(e: React.FormEvent) {
    e.preventDefault();
    if (secretInput.trim()) {
      setSecret(secretInput.trim());
      fetchQueries(secretInput.trim());
    }
  }

  function handleUpdate(updated: Query) {
    setQueries((prev) => prev.map((q) => (q.id === updated.id ? updated : q)));
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!newName.trim() || !newContent.trim()) return;
    setCreating(true);
    setCreateMsg('');
    try {
      const res = await fetch('/api/admin/queries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${secret}`,
        },
        body: JSON.stringify({
          type: newType,
          name: newName.trim(),
          content: newContent.trim(),
          description: newDescription.trim() || undefined,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setCreateMsg('Error: ' + (data.error ?? 'Failed'));
        return;
      }
      const data = await res.json();
      setQueries((prev) => [data.query as Query, ...prev]);
      setNewName('');
      setNewContent('');
      setNewDescription('');
      setShowCreate(false);
      setCreateMsg('');
    } catch {
      setCreateMsg('Error: Request failed');
    } finally {
      setCreating(false);
    }
  }

  const filtered = queries.filter((q) => {
    if (typeFilter !== 'all' && q.type !== typeFilter) return false;
    if (statusFilter !== 'all' && q.status !== statusFilter) return false;
    return true;
  });

  const counts = {
    verified: queries.filter((q) => q.status === 'verified').length,
    unverified: queries.filter((q) => q.status === 'unverified').length,
    disabled: queries.filter((q) => q.status === 'disabled').length,
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="flex items-start justify-between mb-6 gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Queries & Prompts</h1>
          <p className="text-sm text-text-muted mt-1">
            Manage BigBrain SQL queries and LLM prompts. New entries start as unverified.
          </p>
        </div>
        {secret ? (
          <button
            onClick={() => setShowCreate((v) => !v)}
            className="px-4 py-2 bg-accent-blue text-white text-sm rounded-lg hover:bg-accent-blue/80 transition-colors"
          >
            {showCreate ? '✕ Cancel' : '+ New Query'}
          </button>
        ) : null}
      </div>

      {/* Auth prompt (only for edit mode — queries load without auth) */}
      {!secret && (
        <div className="bg-bg-card border border-bg-border rounded-xl p-4 max-w-md mb-6">
          <p className="text-xs text-text-muted mb-2">
            🔒 Enter <code className="text-accent-blue">ADMIN_SYNC_SECRET</code> to edit/approve queries.
          </p>
          <form onSubmit={handleSubmitSecret} className="flex gap-2">
            <input
              type="password"
              value={secretInput}
              onChange={(e) => setSecretInput(e.target.value)}
              placeholder="ADMIN_SYNC_SECRET"
              className="flex-1 bg-bg-hover border border-bg-border rounded-lg px-3 py-2 text-sm text-text-primary outline-none focus:border-accent-blue"
            />
            <button
              type="submit"
              disabled={loading || !secretInput.trim()}
              className="px-4 py-2 bg-accent-blue text-white text-sm rounded-lg hover:bg-accent-blue/80 disabled:opacity-40 transition-colors"
            >
              Unlock Edit
            </button>
          </form>
          {error && <p className="text-xs text-red-400 mt-2">{error}</p>}
        </div>
      )}

      {
        <>
          {/* Create form — only with auth */}
          {secret && showCreate && (
            <div className="bg-bg-card border border-accent-blue/30 rounded-xl p-5 mb-6">
              <h2 className="text-sm font-semibold text-text-primary mb-4">Create New Query / Prompt</h2>
              <form onSubmit={handleCreate} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-text-muted uppercase tracking-wide block mb-1">Type</label>
                    <select
                      value={newType}
                      onChange={(e) => setNewType(e.target.value as QueryType)}
                      className="w-full bg-bg-hover border border-bg-border rounded-lg px-3 py-2 text-sm text-text-primary outline-none focus:border-accent-blue"
                    >
                      <option value="query">query (SQL)</option>
                      <option value="prompt">prompt (LLM)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] text-text-muted uppercase tracking-wide block mb-1">Name *</label>
                    <input
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      required
                      placeholder="e.g. lp_funnel_30d"
                      className="w-full bg-bg-hover border border-bg-border rounded-lg px-3 py-2 text-sm text-text-primary outline-none focus:border-accent-blue"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] text-text-muted uppercase tracking-wide block mb-1">Description</label>
                  <input
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    placeholder="What does this do?"
                    className="w-full bg-bg-hover border border-bg-border rounded-lg px-3 py-2 text-sm text-text-primary outline-none focus:border-accent-blue"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-text-muted uppercase tracking-wide block mb-1">Content *</label>
                  <textarea
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    required
                    rows={6}
                    spellCheck={false}
                    placeholder={newType === 'query' ? 'SELECT ...' : 'You are a marketing analyst...'}
                    className="w-full bg-bg-hover border border-bg-border rounded-lg px-3 py-2 text-xs font-mono text-text-primary outline-none focus:border-accent-blue resize-y"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    disabled={creating || !newName.trim() || !newContent.trim()}
                    className="px-4 py-2 bg-accent-blue text-white text-sm rounded-lg hover:bg-accent-blue/80 disabled:opacity-40 transition-colors"
                  >
                    {creating ? 'Creating…' : 'Create (unverified)'}
                  </button>
                  {createMsg && (
                    <span className={`text-xs ${createMsg.startsWith('Error') ? 'text-red-400' : 'text-score-green'}`}>
                      {createMsg}
                    </span>
                  )}
                </div>
              </form>
            </div>
          )}

          {/* Stats row */}
          <div className="flex gap-3 mb-4 flex-wrap">
            <div className="bg-bg-card border border-bg-border rounded-lg px-3 py-2 text-xs">
              <span className="text-text-muted">Total </span>
              <span className="text-text-primary font-semibold">{queries.length}</span>
            </div>
            <div className="bg-score-green/10 border border-score-green/20 rounded-lg px-3 py-2 text-xs">
              <span className="text-score-green font-semibold">{counts.verified}</span>
              <span className="text-text-muted"> verified</span>
            </div>
            <div className="bg-score-gold/10 border border-score-gold/20 rounded-lg px-3 py-2 text-xs">
              <span className="text-score-gold font-semibold">{counts.unverified}</span>
              <span className="text-text-muted"> unverified</span>
            </div>
            <div className="bg-score-gray/10 border border-score-gray/20 rounded-lg px-3 py-2 text-xs">
              <span className="text-score-gray font-semibold">{counts.disabled}</span>
              <span className="text-text-muted"> disabled</span>
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-2 mb-4 flex-wrap">
            <div className="flex rounded-lg border border-bg-border overflow-hidden">
              {(['all', 'query', 'prompt'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTypeFilter(t)}
                  className={`px-3 py-1.5 text-xs transition-colors ${
                    typeFilter === t
                      ? 'bg-accent-blue text-white'
                      : 'bg-bg-card text-text-secondary hover:text-text-primary hover:bg-bg-hover'
                  }`}
                >
                  {t === 'all' ? 'All Types' : t}
                </button>
              ))}
            </div>
            <div className="flex rounded-lg border border-bg-border overflow-hidden">
              {(['all', 'unverified', 'verified', 'disabled'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-3 py-1.5 text-xs transition-colors ${
                    statusFilter === s
                      ? 'bg-accent-blue text-white'
                      : 'bg-bg-card text-text-secondary hover:text-text-primary hover:bg-bg-hover'
                  }`}
                >
                  {s === 'all' ? 'All Status' : s}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="bg-bg-card border border-bg-border rounded-xl overflow-hidden">
            {/* Header */}
            <div className="px-4 py-2 bg-bg-secondary border-b border-bg-border">
              <div className="flex items-center gap-3 text-[10px] text-text-muted uppercase tracking-wider">
                <span className="w-3" />
                <span className="flex-1">Name</span>
                <span className="w-16 text-center hidden sm:block">Type</span>
                <span className="w-20 text-center">Status</span>
                <span className="w-8 text-center">Ver</span>
                <span className="flex-1 hidden sm:block">Description</span>
                <span className="w-24 text-right hidden md:block">Created</span>
              </div>
            </div>

            {loading ? (
              <div className="p-8 space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-10 bg-bg-hover animate-pulse rounded-lg" />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="p-8 text-center text-text-muted text-sm">
                {queries.length === 0 ? 'No queries yet. Create one above.' : 'No queries match the current filters.'}
              </div>
            ) : (
              filtered.map((q) => (
                <QueryRow key={q.id} q={q} secret={secret} onUpdate={handleUpdate} />
              ))
            )}
          </div>
        </>
      }
    </div>
  );
}
