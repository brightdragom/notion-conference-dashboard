import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";

export function AddConferenceForm({ onAdded }) {
  const [form, setForm] = useState({
    name: "",
    // scheduleStart: "",
    //scheduleEnd: "",
    dateRange: [null, null],
    location: "",
    deadline: "",
    status: "",
    url: ""
  });
  const backendIp = "10.0.2.190";
  const backendPort = "30401";
  const [startDate, endDate] = form.dateRange;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

//    const formattedSchedule = form.scheduleStart && form.scheduleEnd
//      ? `${form.scheduleStart} → ${form.scheduleEnd}`
//      : "";
    const formattedSchedule =
      startDate && endDate
        ? `${startDate.toISOString().slice(0, 10)} → ${endDate.toISOString().slice(0, 10)}`
        : "";

    const payload = {
      name: form.name,
      schedule: formattedSchedule,
      location: form.location,
      deadline: form.deadline,
      status: form.status,
      url: form.url
    };

    const res = await fetch(`http://${backendIp}:${backendPort}/add-conference`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      credentials: "include"
    });

    if (res.ok) {
      alert("✅ 등록 성공!");
      setForm({
        name: "",
	dateRange: [null, null],
        location: "",
        deadline: "",
        status: "",
        url: ""
      });
      onAdded(); // reload trigger
    } else {
      alert("❌ 등록 실패");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md space-y-3 mb-6">
      <h2 className="text-xl font-bold text-indigo-600">📝 학회 추가</h2>
      <div className="grid grid-cols-2 gap-4">
        <input
          className="border p-2 rounded"
          name="name"
          placeholder="학회명"
          value={form.name}
          onChange={handleChange}
          required
        />
        <div className="flex gap-2">
	  <DatePicker
	    locale={ko}
	    dataFormat="yyyy. MM. dd."
	    selectsRange={true}
	    startDate={startDate}
	    endDate={endDate}
	    onChange={(update) => setForm({ ...form, dateRange: update})}
	    isClearable={true}
	    placeholderText="학회 일정"
	    className="border p-2 rounded w-full"
	  />
        </div>
        <input
          className="border p-2 rounded"
          name="location"
          placeholder="장소"
          value={form.location}
          onChange={handleChange}
        />
	<DatePicker
  	  locale={ko}
	  selected={form.deadline ? new Date(form.deadline) : null}
	  onChange={(date) =>
	    setForm({ ...form, deadline: date ? date.toISOString().slice(0, 10) : "" })
	  }	
	  dateFormat="yyyy-MM-dd"
	  placeholderText="논문 제출 마감일"
	  className="border p-2 rounded w-full"
	/>
	<select
          className="border p-2 rounded"
          name="status"
          value={form.status}
          onChange={handleChange}
          required
        >
          <option value="">진행 정보 선택</option>
          <option value="논문 접수 기간">논문 접수 기간</option>
          <option value="마감">마감</option>
          <option value="발표 완료">발표 완료</option>
        </select>
        <input
          className="border p-2 rounded"
          name="url"
          placeholder="관련 URL"
          value={form.url}
          onChange={handleChange}
        />
      </div>
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        등록하기
      </button>
    </form>
  );
}
