// src/components/SearchBar.jsx
import React from "react";
import { Search } from "lucide-react"; // 아이콘 사용

export function SearchBar({ value, onChange }) {
  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
      <input
        type="text"
        placeholder="🔍 학회명을 검색하세요 (예: SMA)"
        className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
