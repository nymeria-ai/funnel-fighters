import { query } from "@/lib/db";

// ── Types ─────────────────────────────────────────────────────────────────────

interface AuditRow {
  id: number;
  run_id: string;
  requester: string;
  skill_name: string | null;
  action: string;
  platform: string;
  status: string;
  started_at: string;
  completed_at: string | null;
  error_message: string | null;
  initiator_name: string | null;
  initiator_context: string | null;
  created_at: string;
  scope: Record<string, unknown> | null;
  trail: Record<string, unknown> | null;
}

interface StatsRow {
  total: string;
  success_count: string;
  error_count: string;
  platforms: string;
  requesters: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function statusBadge(status: string) {
  const colors: Record<string, { bg: string; text: string }> = {
    success: { bg: "#E1F5EE", text: "#085041" },
    error: { bg: "#fef2f2", text: "#991b1b" },
    pending: { bg: "#FAEEDA", text: "#633806" },
  };
  const c = colors[status] || { bg: "#F1EFE8", text: "#444441" };
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold"
      style={{ background: c.bg, color: c.text }}
    >
      {status}
    </span>
  );
}

function actionBadge(action: string) {
  const isWrite = ["create", "update", "delete", "pause", "enable", "set_budget", "set_bid"].some(
    (w) => action.toLowerCase().includes(w)
  );
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono ${
        isWrite
          ? "bg-red-900/30 text-red-300 border border-red-800/40"
          : "bg-zinc-800 text-zinc-400 border border-zinc-700/40"
      }`}
    >
      {isWrite ? "✏️" : "👁"} {action}
    </span>
  );
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleString("en-IL", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Jerusalem",
  });
}

// ── Page ──────────────────────────────────────────────────────────────────────

interface PageProps {
  searchParams: Promise<{
    platform?: string;
    requester?: string;
    action?: string;
    status?: string;
    search?: string;
    page?: string;
  }>;
}

export default async function AuditPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const platformFilter = params.platform ?? "all";
  const requesterFilter = params.requester ?? "all";
  const actionFilter = params.action ?? "all";
  const statusFilter = params.status ?? "all";
  const searchQuery = params.search ?? "";
  const page = Math.max(1, Number(params.page) || 1);
  const perPage = 50;
  const offset = (page - 1) * perPage;

  // Build WHERE
  const clauses: string[] = [];
  const qp: unknown[] = [];
  let pi = 1;
  if (platformFilter !== "all") { clauses.push(`platform = $${pi++}`); qp.push(platformFilter); }
  if (requesterFilter !== "all") { clauses.push(`requester = $${pi++}`); qp.push(requesterFilter); }
  if (actionFilter !== "all") { clauses.push(`action = $${pi++}`); qp.push(actionFilter); }
  if (statusFilter !== "all") { clauses.push(`status = $${pi++}`); qp.push(statusFilter); }
  if (searchQuery) {
    clauses.push(`(
      requester ILIKE $${pi} OR
      action ILIKE $${pi} OR
      platform ILIKE $${pi} OR
      initiator_name ILIKE $${pi} OR
      error_message ILIKE $${pi} OR
      scope::text ILIKE $${pi} OR
      trail::text ILIKE $${pi}
    )`);
    qp.push(`%${searchQuery}%`);
    pi++;
  }
  const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";

  let rows: AuditRow[] = [];
  let stats: StatsRow | null = null;
  let totalRows = 0;
  let allPlatforms: string[] = [];
  let allRequesters: string[] = [];
  let allActions: string[] = [];

  try {
    const [dataRows, countRows, statsRows, platformOpts, requesterOpts, actionOpts] = await Promise.all([
      query<AuditRow>(
        `SELECT id, run_id, requester, skill_name, action, platform, status,
                started_at, completed_at, error_message, initiator_name,
                initiator_context, created_at, scope, trail
         FROM execution_audit ${where}
         ORDER BY created_at DESC
         LIMIT ${perPage} OFFSET ${offset}`,
        qp
      ),
      query<{ cnt: string }>(`SELECT COUNT(*) as cnt FROM execution_audit ${where}`, qp),
      query<StatsRow>(
        `SELECT COUNT(*) as total,
                COUNT(*) FILTER (WHERE status='success') as success_count,
                COUNT(*) FILTER (WHERE status='error') as error_count,
                COUNT(DISTINCT platform) as platforms,
                COUNT(DISTINCT requester) as requesters
         FROM execution_audit`
      ),
      query<{ platform: string }>("SELECT DISTINCT platform FROM execution_audit ORDER BY platform"),
      query<{ requester: string }>("SELECT DISTINCT requester FROM execution_audit ORDER BY requester"),
      query<{ action: string }>("SELECT DISTINCT action FROM execution_audit ORDER BY action"),
    ]);

    rows = dataRows;
    totalRows = Number(countRows[0]?.cnt || 0);
    stats = statsRows[0] || null;
    allPlatforms = platformOpts.map((r) => r.platform);
    allRequesters = requesterOpts.map((r) => r.requester);
    allActions = actionOpts.map((r) => r.action);
  } catch {
    // table may not exist
  }

  const totalPages = Math.ceil(totalRows / perPage);

  return (
    <div className="p-6 max-w-[1400px] mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-zinc-100">Audit Trail</h1>
        <p className="text-xs text-zinc-500 mt-0.5">
          All Funnel Gate API actions · Read actions auto-purged after 7 days
        </p>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
            <span className="text-[10px] uppercase tracking-widest text-zinc-500">Total Actions</span>
            <div className="text-2xl font-bold text-zinc-100 mt-1">{Number(stats.total).toLocaleString()}</div>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
            <span className="text-[10px] uppercase tracking-widest text-zinc-500">Success</span>
            <div className="text-2xl font-bold text-emerald-400 mt-1">{Number(stats.success_count).toLocaleString()}</div>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
            <span className="text-[10px] uppercase tracking-widest text-zinc-500">Errors</span>
            <div className="text-2xl font-bold text-red-400 mt-1">{Number(stats.error_count).toLocaleString()}</div>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
            <span className="text-[10px] uppercase tracking-widest text-zinc-500">Platforms</span>
            <div className="text-2xl font-bold text-zinc-100 mt-1">{stats.platforms}</div>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
            <span className="text-[10px] uppercase tracking-widest text-zinc-500">Agents</span>
            <div className="text-2xl font-bold text-zinc-100 mt-1">{stats.requesters}</div>
          </div>
        </div>
      )}

      {/* Filters */}
      <form className="flex flex-wrap gap-3 items-end">
        <div>
          <label className="text-[10px] uppercase tracking-widest text-zinc-600 block mb-1">Search</label>
          <input
            type="text"
            name="search"
            defaultValue={searchQuery}
            placeholder="Search actions, errors, scope..."
            className="bg-zinc-900 border border-zinc-700 rounded px-3 py-1.5 text-sm text-zinc-200 w-64"
          />
        </div>
        <div>
          <label className="text-[10px] uppercase tracking-widest text-zinc-600 block mb-1">Platform</label>
          <select name="platform" defaultValue={platformFilter}
            className="bg-zinc-900 border border-zinc-700 rounded px-3 py-1.5 text-sm text-zinc-200">
            <option value="all">All Platforms</option>
            {allPlatforms.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <div>
          <label className="text-[10px] uppercase tracking-widest text-zinc-600 block mb-1">Agent</label>
          <select name="requester" defaultValue={requesterFilter}
            className="bg-zinc-900 border border-zinc-700 rounded px-3 py-1.5 text-sm text-zinc-200">
            <option value="all">All Agents</option>
            {allRequesters.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
        <div>
          <label className="text-[10px] uppercase tracking-widest text-zinc-600 block mb-1">Action</label>
          <select name="action" defaultValue={actionFilter}
            className="bg-zinc-900 border border-zinc-700 rounded px-3 py-1.5 text-sm text-zinc-200">
            <option value="all">All Actions</option>
            {allActions.map((a) => <option key={a} value={a}>{a}</option>)}
          </select>
        </div>
        <div>
          <label className="text-[10px] uppercase tracking-widest text-zinc-600 block mb-1">Status</label>
          <select name="status" defaultValue={statusFilter}
            className="bg-zinc-900 border border-zinc-700 rounded px-3 py-1.5 text-sm text-zinc-200">
            <option value="all">All</option>
            <option value="success">Success</option>
            <option value="error">Error</option>
          </select>
        </div>
        <button type="submit"
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-1.5 rounded text-sm font-medium">
          Filter
        </button>
      </form>

      {/* Results count + pagination info */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-zinc-500">
          {totalRows.toLocaleString()} result{totalRows !== 1 ? "s" : ""}
          {totalPages > 1 && ` · Page ${page} of ${totalPages}`}
        </span>
        {totalPages > 1 && (
          <div className="flex gap-2">
            {page > 1 && (
              <a
                href={`?${new URLSearchParams({ ...params, page: String(page - 1) }).toString()}`}
                className="text-xs text-indigo-400 hover:text-indigo-300"
              >
                ← Previous
              </a>
            )}
            {page < totalPages && (
              <a
                href={`?${new URLSearchParams({ ...params, page: String(page + 1) }).toString()}`}
                className="text-xs text-indigo-400 hover:text-indigo-300"
              >
                Next →
              </a>
            )}
          </div>
        )}
      </div>

      {/* Table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-900/60">
              <th className="px-4 py-2.5 text-left text-xs font-medium text-zinc-500 uppercase">Time</th>
              <th className="px-4 py-2.5 text-left text-xs font-medium text-zinc-500 uppercase">Agent</th>
              <th className="px-4 py-2.5 text-left text-xs font-medium text-zinc-500 uppercase">Platform</th>
              <th className="px-4 py-2.5 text-left text-xs font-medium text-zinc-500 uppercase">Action</th>
              <th className="px-4 py-2.5 text-left text-xs font-medium text-zinc-500 uppercase">Status</th>
              <th className="px-4 py-2.5 text-left text-xs font-medium text-zinc-500 uppercase">Initiator</th>
              <th className="px-4 py-2.5 text-left text-xs font-medium text-zinc-500 uppercase">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60">
            {rows.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-zinc-500">
                  No audit entries found
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="hover:bg-zinc-800/30 transition-colors group">
                  <td className="px-4 py-2.5 text-zinc-400 whitespace-nowrap">
                    <div className="text-xs">{formatDate(row.created_at)}</div>
                    <div className="text-[10px] text-zinc-600">{timeAgo(row.created_at)}</div>
                  </td>
                  <td className="px-4 py-2.5">
                    <span className="text-zinc-200 font-medium text-xs">{row.requester}</span>
                    {row.skill_name && (
                      <div className="text-[10px] text-zinc-600">skill: {row.skill_name}</div>
                    )}
                  </td>
                  <td className="px-4 py-2.5">
                    <span className="text-zinc-300 text-xs capitalize">{row.platform}</span>
                  </td>
                  <td className="px-4 py-2.5">{actionBadge(row.action)}</td>
                  <td className="px-4 py-2.5">{statusBadge(row.status)}</td>
                  <td className="px-4 py-2.5 text-xs text-zinc-400">
                    {row.initiator_name ? (
                      <div>
                        <span className="text-zinc-300">{row.initiator_name}</span>
                        {row.initiator_context && (
                          <div className="text-[10px] text-zinc-600">{row.initiator_context}</div>
                        )}
                      </div>
                    ) : (
                      <span className="text-zinc-600">—</span>
                    )}
                  </td>
                  <td className="px-4 py-2.5 text-xs max-w-[300px]">
                    {row.error_message ? (
                      <span className="text-red-400 truncate block">{row.error_message}</span>
                    ) : row.trail && (row.trail as Record<string, string>).reasoning ? (
                      <span className="text-zinc-500 truncate block">
                        {(row.trail as Record<string, string>).reasoning}
                      </span>
                    ) : (
                      <span className="text-zinc-600">—</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Bottom pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          {page > 1 && (
            <a
              href={`?${new URLSearchParams({ ...params, page: String(page - 1) }).toString()}`}
              className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-3 py-1.5 rounded text-xs"
            >
              ← Previous
            </a>
          )}
          <span className="text-xs text-zinc-500 px-3 py-1.5">
            Page {page} of {totalPages}
          </span>
          {page < totalPages && (
            <a
              href={`?${new URLSearchParams({ ...params, page: String(page + 1) }).toString()}`}
              className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-3 py-1.5 rounded text-xs"
            >
              Next →
            </a>
          )}
        </div>
      )}

      {/* Retention info */}
      <div className="text-center text-[10px] text-zinc-600 pb-4">
        Retention policy: read actions purged after 7 days · write actions kept forever
      </div>
    </div>
  );
}
