import React from 'react'

export default function Pagination({ page, totalPages, setPage }) {
  if (totalPages <= 1) return null
  const pages = []
  const start = Math.max(1, page - 2)
  const end = Math.min(totalPages, page + 2)
  for (let i = start; i <= end; i++) pages.push(i)

  return (
    <div className="flex items-center justify-center gap-2 mt-12 pb-8">
      <button 
        onClick={() => setPage(p => Math.max(1, p - 1))} 
        disabled={page === 1} 
        className="px-4 py-2 border border-gray-300 rounded-lg bg-white dark:bg-slate-800 dark:border-slate-600 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
      >
        ← Prev
      </button>
      
      {start > 1 && <span className="px-3 py-2 text-gray-500">...</span>}
      
      {pages.map(pn => (
        <button 
          key={pn} 
          onClick={() => setPage(pn)} 
          className={`px-4 py-2 border rounded-lg transition-colors font-semibold ${
            pn === page 
              ? 'bg-blue-600 text-white border-blue-600' 
              : 'border-gray-300 bg-white dark:bg-slate-800 dark:border-slate-600 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-700'
          }`}
        >
          {pn}
        </button>
      ))}
      
      {end < totalPages && <span className="px-3 py-2 text-gray-500">...</span>}
      
      <button 
        onClick={() => setPage(p => Math.min(totalPages, p + 1))} 
        disabled={page === totalPages} 
        className="px-4 py-2 border border-gray-300 rounded-lg bg-white dark:bg-slate-800 dark:border-slate-600 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
      >
        Next →
      </button>
    </div>
  )
}
