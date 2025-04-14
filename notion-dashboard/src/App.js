import React, { useEffect, useState } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { SearchBar } from "./components/SearchBar";
import { ConferenceCard } from "./components/ConferenceCard";
import { AddConferenceForm } from "./components/AddConferenceForm";
import { EditConferenceModal } from "./components/EditConferenceModal";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export default function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [editTarget, setEditTarget] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const backendIP = "10.0.2.190";
  const backendPort = "30401";

  const fetchData = async () => {
    try {
      const res = await fetch(`http://${backendIP}:${backendPort}/notion-query`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
        credentials: "include"
      });

      const json = await res.json();
      if (!Array.isArray(json.results)) return;

      const items = json.results.map((item) => {
        const deadline = item.properties["모집마감일"]?.date?.start;
        const dday = deadline ? dayjs(deadline).diff(dayjs(), "day") : null;

        const scheduleRaw = item.properties["학회 일정"];
        const scheduleStartRaw = scheduleRaw?.date?.start;
        const scheduleEndRaw = scheduleRaw?.date?.end;
        const scheduleFormatted =
          scheduleStartRaw && scheduleEndRaw
            ? `${dayjs(scheduleStartRaw).format("YYYY년 M월 D일")} → ${dayjs(scheduleEndRaw).format("M월 D일")}`
            : scheduleRaw?.rich_text?.[0]?.plain_text || "-";

        const status = item.properties["진행 정보"]?.select?.name || "-";

        return {
          id: item.id,
          name: item.properties["학회명"]?.title?.[0]?.plain_text || "",
          schedule: scheduleFormatted,
          scheduleStart: scheduleStartRaw || "",
          scheduleEnd: scheduleEndRaw || "",
          location: item.properties["장소"]?.rich_text?.[0]?.plain_text || "",
          deadline,
          dday,
          status,
          url: item.properties["관련URL"]?.url || ""
        };
      });

      const upcoming = items
        .filter((conf) => conf.dday === null || conf.dday >= 0)
        .sort((a, b) => (a.dday ?? 9999) - (b.dday ?? 9999));

      setData(upcoming);
    } catch (err) {
      console.error("데이터 로드 오류:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://${backendIP}:${backendPort}/delete-conference`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
        credentials: "include"
      });
      const json = await res.json();
      if (json.success) {
        fetchData();
      } else {
        console.error("삭제 실패:", json);
      }
    } catch (err) {
      console.error("삭제 오류:", err);
    }
  };

  const handleEditClick = (item) => {
    setEditTarget(item);
    setShowEditModal(true);
  };

  const handleSaveEdit = async (formData) => {
    const res = await fetch(`http://${backendIP}:${backendPort}/update-conference`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
      credentials: "include"
    });

    const json = await res.json();
    if (json.success) {
      fetchData();
    } else {
      alert("수정 실패: " + json.error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filtered = data.filter((conf) =>
    conf.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <Header />
        <div className="flex justify-between items-center mt-6 mb-4 flex-wrap gap-4">
          <SearchBar value={search} onChange={setSearch} />
          <AddConferenceForm onAdded={fetchData} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4 mb-20">
          {filtered.length > 0 ? (
            filtered.map((conf, idx) => (
              <ConferenceCard
                key={conf.id || idx}
                {...conf}
                onDelete={handleDelete}
                onEdit={handleEditClick}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">학회 정보를 찾을 수 없습니다.</p>
          )}
        </div>
      </div>

      <EditConferenceModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSave={handleSaveEdit}
        initialData={editTarget}
      />
    </div>
  );
}
