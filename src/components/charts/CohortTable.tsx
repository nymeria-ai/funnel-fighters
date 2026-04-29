'use client';
import { CohortRow } from '@/data/mock';

interface CohortTableProps extends Record<string, unknown> {
  data: CohortRow[];
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function formatCurrency(n: number): string {
  return '$' + n.toLocaleString();
}

function formatNumber(n: number): string {
  return n.toLocaleString();
}

function getTrendColor(current: number, previous: number | null): string {
  if (previous === null) return '';
  if (current > previous) return 'text-score-green';
  if (current < previous) return 'text-score-red';
  return 'text-text-muted';
}

export default function CohortTable({ data }: CohortTableProps) {
  return (
    <div className="bg-bg-card border border-bg-border rounded-xl overflow-hidden">
      <div className="px-4 lg:px-5 py-3 border-b border-bg-border flex items-center justify-between">
        <h3 className="text-sm font-semibold text-text-primary">Weekly Cohort Table</h3>
        <span className="text-xs text-text-muted px-2 py-1 bg-bg-hover rounded">MOCK</span>
      </div>
      <div className="overflow-x-auto -webkit-overflow-scrolling-touch">
        <table className="w-full text-sm min-w-[700px]">
          <thead>
            <tr className="text-text-muted text-xs border-b border-bg-border">
              <th className="text-left px-4 py-3 font-medium">Week</th>
              <th className="text-right px-4 py-3 font-medium">Spend</th>
              <th className="text-right px-4 py-3 font-medium">Visits</th>
              <th className="text-right px-4 py-3 font-medium">$/Visit</th>
              <th className="text-right px-4 py-3 font-medium">Signups</th>
              <th className="text-right px-4 py-3 font-medium">% Signup</th>
              <th className="text-right px-4 py-3 font-medium">Active</th>
              <th className="text-right px-4 py-3 font-medium">% Active</th>
              <th className="text-right px-4 py-3 font-medium">Paying</th>
              <th className="text-right px-4 py-3 font-medium">% Paying</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => {
              const prev = i > 0 ? data[i - 1] : null;
              return (
                <tr key={row.weekStart} className="border-b border-bg-border/50 hover:bg-bg-hover transition-colors">
                  <td className="px-4 py-3 text-text-primary font-medium">{formatDate(row.weekStart)}</td>
                  <td className="px-4 py-3 text-right text-text-secondary">{formatCurrency(row.spend)}</td>
                  <td className="px-4 py-3 text-right text-text-secondary">{formatNumber(row.visits)}</td>
                  <td className={`px-4 py-3 text-right ${getTrendColor(row.costPerVisit, prev?.costPerVisit ?? null)}`}>
                    ${row.costPerVisit.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-right text-text-secondary">{formatNumber(row.signups)}</td>
                  <td className={`px-4 py-3 text-right font-medium ${getTrendColor(row.signupRate, prev?.signupRate ?? null)}`}>
                    {row.signupRate.toFixed(1)}%
                  </td>
                  <td className="px-4 py-3 text-right text-text-secondary">{formatNumber(row.active)}</td>
                  <td className={`px-4 py-3 text-right font-medium ${getTrendColor(row.activeRate, prev?.activeRate ?? null)}`}>
                    {row.activeRate.toFixed(1)}%
                  </td>
                  <td className="px-4 py-3 text-right text-text-primary font-medium">{row.paying}</td>
                  <td className={`px-4 py-3 text-right font-bold ${getTrendColor(row.payingRate, prev?.payingRate ?? null)}`}>
                    {row.payingRate.toFixed(1)}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
