import os
import subprocess
from google import genai

# 1. 프로젝트 폴더 구조 추출 (디렉토리 트리)
try:
    tree_output = subprocess.check_output(['tree', '-L', '3', '-I', 'venv|node_modules|.git|.github']).decode('utf-8')
except Exception as e:
    print(f"폴더 구조를 읽는 중 에러 발생: {e}")
    tree_output = "폴더 구조를 불러올 수 없습니다."

# 2. API 키 확인 (GitHub Secrets)
api_key = os.environ.get("AI_API_KEY")
if not api_key:
    raise ValueError("AI_API_KEY 환경 변수가 설정되지 않았습니다. GitHub Secrets를 확인해주세요.")

# 3. 신규 GenAI 클라이언트 초기화
client = genai.Client(api_key=api_key)

# 4. AI 프롬프트 구성
prompt = f"""
당신은 마이크로서비스 아키텍트입니다. 다음 프로젝트 폴더 구조를 분석하여, 시스템 아키텍처를 시각화하는 D2(Declarative Diagramming) 스크립트를 작성하세요.

[프로젝트 폴더 트리]
{tree_output}

[제약 사항]
1. 응답은 반드시 D2 문법 코드만 출력하세요. (마크다운 코드 블록 제외).
2. 시스템 흐름 방향은 `direction: right`를 최상단에 명시하세요.
3. 폴더 구조를 보고 사용되었을 것으로 추정되는 서비스(예: 백엔드, 프론트엔드, DB 등)를 노드로 구성하고 연결해주세요.
"""

# 5. Gemini API 호출
print("Gemini API를 호출하여 아키텍처를 분석 중입니다...")

# 가장 최신이며 안정적으로 접근 가능한 모델로 변경
target_model = 'gemini-2.0-flash' 

try:
    response = client.models.generate_content(
        model=target_model,
        contents=prompt
    )
except Exception as e:
    print(f"\n❌ [{target_model}] 모델 호출 실패. 사용 가능한 모델 목록을 확인합니다...")
    try:
        # 에러 발생 시 현재 API 키로 사용 가능한 모델 목록을 터미널에 출력합니다.
        for m in client.models.list():
            if 'generateContent' in m.supported_actions:
                print(f"사용 가능 모델: {m.name}")
    except Exception as list_e:
        print("모델 목록을 불러오는데도 실패했습니다.")
    raise e # 원래의 에러를 발생시켜 워크플로우를 중단시킵니다.

d2_script = response.text.strip()

# 6. AI 응답 정제 (마크다운 코드 블록이 포함된 경우 제거)
if d2_script.startswith('```'):
    lines = d2_script.split('\n')
    if len(lines) > 2:
        d2_script = '\n'.join(lines[1:-1])

# 7. D2 스크립트 파일 저장
with open('architecture.d2', 'w', encoding='utf-8') as f:
    f.write(d2_script)

print("✅ architecture.d2 파일이 성공적으로 생성되었습니다!")
