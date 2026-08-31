import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

export interface TableColumn<T> {
  key: keyof T | string;
  label: string;
  render?: (value: any, row: T) => React.ReactNode;
  width?: string;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
}

interface DataTableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
  hoverable?: boolean;
  striped?: boolean;
  loading?: boolean;
  emptyMessage?: string;
}

export const DataTable = React.forwardRef<HTMLTableElement, DataTableProps<any>>(
  (
    {
      columns,
      data,
      onRowClick,
      hoverable = true,
      striped = true,
      loading = false,
      emptyMessage = 'No data available',
    },
    ref
  ) => {
    const [sortKey, setSortKey] = React.useState<string | null>(null);
    const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('asc');

    const handleSort = (key: string) => {
      if (sortKey === key) {
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
      } else {
        setSortKey(key);
        setSortDirection('asc');
      }
    };

    if (loading) {
      return (
        <div className="w-full h-64 flex items-center justify-center">
          <div className="text-slate-500">Loading...</div>
        </div>
      );
    }

    if (data.length === 0) {
      return (
        <div className="w-full h-64 flex items-center justify-center border border-slate-200/60 rounded-2xl bg-slate-50/40">
          <div className="text-slate-500">{emptyMessage}</div>
        </div>
      );
    }

    return (
      <div className="overflow-x-auto rounded-2xl border border-slate-200/60 bg-white shadow-sm">
        <table ref={ref} className="w-full">
          <thead className="bg-slate-50/80 border-b border-slate-200/60">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wide ${
                    col.width ? `w-${col.width}` : ''
                  } ${col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : ''}`}
                  onClick={() => col.sortable && handleSort(col.key as string)}
                  style={{ cursor: col.sortable ? 'pointer' : 'default' }}
                >
                  <div className="flex items-center gap-2">
                    {col.label}
                    {col.sortable && sortKey === col.key && (
                      <span className="text-teal-600">
                        {sortDirection === 'asc' ? (
                          <ChevronUp size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr
                key={idx}
                className={`border-b border-slate-200/40 transition-colors ${
                  striped && idx % 2 === 0 ? 'bg-slate-50/30' : ''
                } ${hoverable ? 'hover:bg-teal-50/50 cursor-pointer' : ''}`}
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`px-6 py-4 text-sm text-slate-600 ${
                      col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : ''
                    }`}
                  >
                    {col.render
                      ? col.render((row[col.key as keyof typeof row] as any), row)
                      : (row[col.key as keyof typeof row] as any)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
);

DataTable.displayName = 'DataTable';
