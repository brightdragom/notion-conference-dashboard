// src/components/ConferenceCard.jsx
import React from "react";

const getDdayColor = (d) => {
  if (d === null) return "bg-gray-300";
  if (d < 0) return "bg-gray-400";
  if (d <= 3) return "bg-red-500";
  if (d <= 7) return "bg-yellow-400 text-black";
  return "bg-green-500";
};

export function ConferenceCard({ id, name, schedule, location, deadline, dday, status, url, onDelete }) {
  /*const handleDelete = async () => {
    const confirmDelete = window.confirm("정말 이 학회를 삭제하시겠습니까?");
    if (!confirmDelete) return;

    try {
      const res = await fetch("http://localhost:3020/delete-conference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ page_id: id })
      });

      if (res.ok) {
        alert("삭제가 완료되었습니다.");
        window.location.reload();
      } else {
        alert("삭제에 실패했습니다.");
      }
    } catch (err) {
      alert("오류 발생: " + err.message);
    }
  };*/

  return (
    <div className="rounded-xl bg-white shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-all flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-indigo-700 leading-snug">{name}</h2>
          {dday !== null && (
            <span className={`text-sm font-bold text-white px-4 py-1 rounded-full ${getDdayColor(dday)}`}>
              {dday < 0 ? "마감" : `D-${dday}`}
            </span>
          )}
        </div>
        <ul className="text-sm text-gray-700 space-y-1">
          <li><span className="font-medium text-indigo-400">📍 장소:</span> {location}</li>
          <li><span className="font-medium text-indigo-400">📅 일정:</span> {schedule}</li>
          <li><span className="font-medium text-indigo-400">⏳ 마감일:</span> {deadline || "-"}</li>
          <li><span className="font-medium text-indigo-400">🚦 상태:</span> {status}</li>
        </ul>
      </div>

      <div className="mt-4 flex justify-between items-center">
        {url && (
          <a
            href={`${url}`.replace(/^(https?:\/\/)?/, "https://")}
            className="text-indigo-500 hover:underline text-sm"
            target="_blank"
            rel="noreferrer"
          >
	  🔗 관련 링크 열기
          </a>
        )}
	{/* 🔥 삭제 버튼: 이 부분이 꼭 있어야 삭제가 동작함 */}
     		  						
	{onDelete && (
        <button
          onClick={() => onDelete(id)}
          className="mt-4 text-sm text-red-500 hover:underline self-end"
          >
            🗑️ 삭제
          </button>
        )}
        </div>
    </div>
  );
}
