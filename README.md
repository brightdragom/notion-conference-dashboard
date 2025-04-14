# Notion 기반 학회 대시보드 프로젝트

이 프로젝트는 **Notion Database**를 활용하여 학회 정보를 시각화 및 관리할 수 있는 **대시보드 시스템**입니다.  
Frontend는 React 기반, Backend는 Flask 기반으로 구성되어 있으며, Docker Compose 및 Argo CD를 통한 배포도 지원합니다.

---

## 📁 디렉터리 구조
├── argo-manifest/               # Argo CD 기반 배포를 위한 Kubernetes manifest<br/>
├── docker-compose.yaml          # Frontend/Backend를 위한 Docker Compose 파일<br/>
├── notion-dashboard/            # React 기반 Frontend<br/>
└── notion-dashboard-backend/    # Flask 기반 Backend (Notion API 연동)<br/>

---

## 🛠️ 구성 요소

### 📦 1. `notion-dashboard`
- **설명**: 사용자 인터페이스(UI)를 제공하는 **React 기반의 Frontend** 애플리케이션입니다.
- **기능**: 학회 일정 등록/조회/수정/삭제, D-day 계산, Notion API와 연동된 카드 기반 UI 제공

### ⚙️ 2. `notion-dashboard-backend`
- **설명**: **Flask 프레임워크**로 구현된 Backend
- **기능**:
  - Notion API 요청 처리
  - 학회 정보의 CRUD 기능 지원
  - CORS 처리 및 데이터 전처리 로직 포함

### 🐳 3. `docker-compose.yaml`
- **설명**: Frontend와 Backend를 동시에 실행할 수 있도록 하는 Docker Compose 설정 파일
- **명령어 예시**:
  ```bash
  docker-compose up --build

🚀 4. argo-manifest
	•	설명: Kubernetes 환경에서 Argo CD를 통해 앱을 배포할 수 있도록 구성된 manifest 파일들
	•	기능: CI/CD 자동화, GitOps 기반 운영 지원

⸻


## 📝 주요 기술 스택

| 영역        | 기술                                      |
|-------------|-------------------------------------------|
| Frontend    | React, Tailwind CSS, React Datepicker     |
| Backend     | Flask, Notion API, Python dotenv          |
| DevOps      | Docker, Docker Compose, Argo CD, Git      |
| Infra       | Kubernetes, Notion Database (외부 API)    |

---

## ✅ 사용 방법

### 1. 환경 변수 설정

`.env` 파일을 `notion-dashboard-backend/` 경로에 생성하여 아래와 같이 설정합니다:

```env
NOTION_TOKEN=your_notion_integration_token
NOTION_DATABASE_ID=your_database_id



⸻

2. Docker Compose로 실행 (로컬 테스트용)

docker-compose up --build

	•	React 프론트엔드: localhost:3000
	•	Flask 백엔드: localhost:3020

⸻

3. Argo CD를 이용한 Kubernetes 배포

argo-manifest/ 디렉토리에 있는 YAML들을 활용해 배포합니다.

kubectl apply -f argo-manifest/

Argo CD를 통해 GitOps 방식으로 지속적 배포가 가능합니다.

⸻

📌 주요 기능
	•	📄 Notion DB 연동: 학회 정보를 Notion Database로부터 직접 불러오고 수정 가능
	•	📆 일정 시각화: D-Day 뱃지, 날짜 Range 선택 등 시각적 인터페이스 제공
	•	✅ 등록 및 수정 기능: 학회 카드 추가 및 수정 지원
	•	🔗 URL 바로가기: 학회 관련 사이트 링크 클릭 시 새 탭에서 열기
	•	🚀 Kubernetes 배포 최적화: ArgoCD 기반 CI/CD 파이프라인 가능

⸻

💬 예시 스크린샷

학회 카드 목록	학회 정보 추가	학회 수정 모달
		

	(📸 이미지는 /screenshots 폴더에 위치해야 합니다)

⸻

📂 디렉토리 구성 요약

.
├── argo-manifest/               # Argo CD를 위한 Kubernetes manifest
├── docker-compose.yaml          # 로컬 개발용 docker-compose 설정
├── notion-dashboard/            # React 기반 프론트엔드
├── notion-dashboard-backend/    # Flask 기반 백엔드
└── README.md                    # 현재 문서



⸻

👨‍💻 개발자 가이드

Frontend

cd notion-dashboard
npm install
npm start

Backend

cd notion-dashboard-backend
pip install -r requirements.txt
python app.py

