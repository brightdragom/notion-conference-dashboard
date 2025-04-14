import React, { useState, useEffect } from "react";

export function EditConferenceModal({ show, onClose, onSave, initialData }) {
  const [form, setForm] = useState({
    id: "",
    name: "",
    location: "",
    deadline: "",
    scheduleStart: "",
    scheduleEnd: "",
    status: "",
    url: ""
  });

  useEffect(() => {
    if (initialData) {
      setForm((prev) => ({
        ...prev,
        ...initialData
      }));
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const scheduleFormatted = form.scheduleStart && form.scheduleEnd
      ? `${form.scheduleStart} → ${form.scheduleEnd}`
      : "";

    await onSave({
      ...form,
      schedule: scheduleFormatted
    });

    onClose();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-[500px]">
        <h2 className="text-lg font-bold mb-4 text-indigo-700">✏️ 학회 정보 수정</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input className="w-full border p-2 rounded" name="name" value={form.name} onChange={handleChange} placeholder="학회명" />
          <input className="w-full border p-2 rounded" name="location" value={form.location} onChange={handleChange} placeholder="장소" />
          <input className="w-full border p-2 rounded" name="scheduleStart" type="date" value={form.scheduleStart} onChange={handleChange} placeholder="시작일" />
          <input className="w-full border p-2 rounded" name="scheduleEnd" type="date" value={form.scheduleEnd} onChange={handleChange} placeholder="종료일" />
          <input className="w-full border p-2 rounded" name="deadline" type="date" value={form.deadline} onChange={handleChange} placeholder="마감일" />
          <input className="w-full border p-2 rounded" name="status" value={form.status} onChange={handleChange} placeholder="진행 정보" />
          <input className="w-full border p-2 rounded" name="url" value={form.url} onChange={handleChange} placeholder="관련 링크 URL" />
          <div className="flex justify-end gap-2">
            <button type="button" className="text-gray-500" onClick={onClose}>취소</button>
            <button type="submit" className="bg-indigo-500 text-white px-4 py-1 rounded">저장</button>
          </div>
        </form>
      </div>
    </div>
  );
}
