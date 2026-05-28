'use client';

import React, { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown, Search } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import clsx from 'clsx';

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  searchableColumns?: string[];
  pageSize?: number;
}

type SortOrder = 'asc' | 'desc' | null;

export const DataTable: React.FC<DataTableProps> = ({
  columns,
  data,
  searchableColumns = [],
  pageSize = 10,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    order: SortOrder;
  }>({ key: '', order: null });

  // Filter data
  const filteredData = useMemo(() => {
    return data.filter((row) => {
      if (!searchTerm) return true;
      return searchableColumns.some((col) =>
        String(row[col]).toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [data, searchTerm, searchableColumns]);

  // Sort data
  const sortedData = useMemo(() => {
    const sorted = [...filteredData];
    if (!sortConfig.order) return sorted;

    sorted.sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];

      if (aVal < bVal) return sortConfig.order === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.order === 'asc' ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [filteredData, sortConfig]);

  // Paginate data
  const paginatedData = useMemo(() => {
    const startIdx = (currentPage - 1) * pageSize;
    return sortedData.slice(startIdx, startIdx + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const totalPages = Math.ceil(sortedData.length / pageSize);

  const handleSort = (key: string) => {
    setSortConfig((prev) => {
      if (prev.key !== key) {
        return { key, order: 'asc' };
      }
      if (prev.order === 'asc') {
        return { key, order: 'desc' };
      }
      return { key: '', order: null };
    });
  };

  return (
    <div className="space-y-4">
      {searchableColumns.length > 0 && (
        <Input
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          icon={<Search className="w-4 h-4" />}
        />
      )}

      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead className="bg-surface border-b border-border">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  style={{ width: col.width }}
                  className={clsx(
                    'px-4 py-3 text-left font-semibold text-foreground',
                    col.sortable && 'cursor-pointer hover:bg-surface-hover'
                  )}
                  onClick={() => col.sortable && handleSort(col.key)}
                >
                  <div className="flex items-center gap-2">
                    {col.label}
                    {col.sortable && sortConfig.key === col.key && (
                      sortConfig.order === 'asc' ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {paginatedData.length > 0 ? (
              paginatedData.map((row, idx) => (
                <tr key={idx} className="hover:bg-surface-hover transition-colors">
                  {columns.map((col) => (
                    <td key={`${idx}-${col.key}`} className="px-4 py-3 text-foreground">
                      {col.render ? col.render(row[col.key], row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-center text-muted-light">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between text-sm">
          <p className="text-muted-light">
            Showing {Math.min(paginatedData.length, pageSize)} of {sortedData.length} results
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 rounded border border-border disabled:opacity-50 hover:bg-surface"
            >
              Previous
            </button>
            <span className="px-3 py-2">
              {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 rounded border border-border disabled:opacity-50 hover:bg-surface"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
