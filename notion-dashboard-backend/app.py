# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import requests
import os

load_dotenv()
app = Flask(__name__)
CORS(app, origins="*", allow_headers="*", methods=["GET", "POST", "DELETE", "OPTIONS"], supports_credentials=True)

NOTION_TOKEN = os.getenv("NOTION_TOKEN")
NOTION_DATABASE_ID = os.getenv("NOTION_DATABASE_ID")
HEADERS = {
        "Authorization": f"Bearer {NOTION_TOKEN}",
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json"
    }
@app.route("/notion-query", methods=["POST"])
def notion_query():
    
    body = request.get_json() or {}
    res = requests.post(f"https://api.notion.com/v1/databases/{NOTION_DATABASE_ID}/query", headers=HEADERS, json=body)
    return jsonify(res.json()), res.status_code

@app.route("/add-conference", methods=["POST"])
def add_conference():
    print("NotionTokens: ", NOTION_TOKEN)
    try:
        data = request.json
        print("data!!: ", data)
        name = data.get("name", "")
        location = data.get("location", "")
        deadline = data.get("deadline", "")
        url = data.get("url", "")
        status = data.get("status", "")
        schedule = data.get("schedule", "")

        if not name or not status:
            return jsonify({"success": False, "error": "학회 명 및 상태 누락"}), 400
        start_date, end_date = None, None
        if "→" in schedule:
            parts = schedule.split("→")
            if len(parts) == 2:
                start_date = parts[0].strip()
                end_date = parts[1].strip()

        payload = {
            "parent": {"database_id": NOTION_DATABASE_ID},
            "properties": {
                "학회명": {
                    "title": [{"text": {"content": name}}]
                },
                "장소": {
                    "rich_text": [{"text": {"content": location}}]
                },
                "모집마감일": {
                    "date": {"start": deadline} if deadline else None
                },
                "관련URL": {
                    "url": url
                },
                "진행 정보": {
                    "select": {"name": status}
                }
            }
        }
        
        print("payload: ", payload)
        if start_date and end_date:
            payload["properties"]["학회 일정"] = {
                "date": {
                    "start": start_date,
                    "end": end_date
                }
            }

        res = requests.post("https://api.notion.com/v1/pages", headers=HEADERS, json=payload)
        print("Response: ", res.status_code, res.text)
        if res.status_code != 200:
            return jsonify({"success": False, "error": res.text}), res.status_code

        return jsonify({"success": True, "data": res.json()})

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route("/delete-conference", methods=["DELETE", "OPTIONS"])
def delete_conference():
    if request.method == "OPTIONS":
        return jsonify({"message": "CORS Preflight OK"}), 200

    data = request.get_json()
    page_id = data.get("id")
    if not page_id:
        return jsonify({"error": "Missing id"}), 400

    res = requests.patch(
        f"https://api.notion.com/v1/pages/{page_id}",
        headers=HEADERS,
        json={"archived": True}
    )

    if res.status_code == 200:
        return jsonify({"success": True})
    else:
        return jsonify({"error": res.text}), res.status_code

@app.route("/update-conference", methods=["POST"])
def update_conference():
    data = request.json
    page_id = data.get("id")
    if not page_id:
        return jsonify({"success": False, "error": "Page ID 누락"}), 400

    name = data.get("name", "")
    location = data.get("location", "")
    deadline = data.get("deadline", "")
    url = data.get("url", "")
    status = data.get("status", "")
    schedule_start = data.get("scheduleStart")
    schedule_end = data.get("scheduleEnd")

    if not name or not status:
        return jsonify({"success": False, "error": "학회 명 및 상태 누락"}), 400

    properties = {
        "학회명": {"title": [{"text": {"content": name}}]},
        "장소": {"rich_text": [{"text": {"content": location}}]},
        "모집마감일": {"date": {"start": deadline}} if deadline else {"date": None},
        "관련URL": {"url": url},
        "진행 정보": {"select": {"name": status}},
    }

    if schedule_start and schedule_end:
        properties["학회 일정"] = {
            "date": {"start": schedule_start, "end": schedule_end}
        }

    payload = {"properties": properties}
    res = requests.patch(f"https://api.notion.com/v1/pages/{page_id}", headers=HEADERS, json=payload)

    return jsonify({"success": res.ok, "notion_response": res.json()}), res.status_code

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)

