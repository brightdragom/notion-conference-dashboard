// src/components/Header.jsx
import React from "react";

export function Header() {
  return (
    <header className="text-center mb-10">
      <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-800">
        📅 예정 학회 대시보드
      </h1>
      <p className="text-indigo-400 mt-2 text-sm">
        Notion에 등록된 학회 정보를 한눈에 확인하세요
      </p>
    </header>
  );
}
