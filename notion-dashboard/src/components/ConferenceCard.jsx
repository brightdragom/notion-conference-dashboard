// src/components/ConferenceCard.jsx
import React from "react";

const getDdayColor = (d) => {
  if (d === null) return "bg-gray-300";
  if (d < 0) return "bg-gray-400";
  if (d <= 3) return "bg-red-500";
  if (d <= 7) return "bg-yellow-400 text-black";
  return "bg-green-500";
};

export function ConferenceCard({ id, name, schedule, location, deadline, dday, status, url, onDelete, onEdit}) {

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
	  <div className="flex space-x-2">
	    <button
	      onClick={() => onEdit({ id, name, schedule, location, deadline, dday, status, url })}
	      className="text-sm text-blue-600 hover:underline"
	    >
      ✏️ 수정
	</button>
          {onDelete && (
	    <button
	        onClick={() => onDelete(id)}
        	className="text-sm text-red-500 hover:underline"
            >
       	 	🗑️ 삭제
            </button>
          )}
        </div>
      </div>
   </div>
  );
}
