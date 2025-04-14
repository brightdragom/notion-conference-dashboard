import React from "react";

/**
 * 카드 전체 레이아웃 컴포넌트
 */
export function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-2xl shadow-md border border-gray-200 bg-white overflow-hidden transition ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * 카드 내부 콘텐츠 영역
 */
export function CardContent({ children, className = "" }) {
  return <div className={`p-5 ${className}`}>{children}</div>;
}
