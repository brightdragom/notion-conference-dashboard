import os
import subprocess
import google.generativeai as genai

# 1. 프로젝트 폴더 구조 추출 (디렉토리 트리)
try:
    # GitHub Actions 환경에서 tree 명령어를 실행합니다.
    tree_output = subprocess.check_output(['tree', '-L', '3', '-I', 'venv|node_modules|.git|.github']).decode('utf-8')
except Exception as e:
    print(f"폴더 구조를 읽는 중 에러 발생: {e}")
    tree_output = "폴더 구조를 불러올 수 없습니다."

# 2. Gemini API 설정 (GitHub 환경 변수에서 토큰을 가져옵니다)
api_key = os.environ.get("AI_API_KEY")
if not api_key:
    raise ValueError("AI_API_KEY 환경 변수가 설정되지 않았습니다. GitHub Secrets를 확인해주세요.")

genai.configure(api_key=api_key)

# 3. AI 프롬프트 구성
prompt = f"""
당신은 마이크로서비스 아키텍트입니다. 다음 프로젝트 폴더 구조를 분석하여, 시스템 아키텍처를 시각화하는 D2(Declarative Diagramming) 스크립트를 작성하세요.

[프로젝트 폴더 트리]
{tree_output}

[제약 사항]
1. 응답은 반드시 D2 문법 코드만 출력하세요. (마크다운 코드 블록 제외).
2. 시스템 흐름 방향은 `direction: right`를 최상단에 명시하세요.
3. 폴더 구조를 보고 사용되었을 것으로 추정되는 서비스(예: 백엔드, 프론트엔드, DB 등)를 노드로 구성하고 연결해주세요.
"""

# 4. Gemini API 호출
print("Gemini API를 호출하여 아키텍처를 분석 중입니다...")
# 에러 수정됨: 모델 이름을 'gemini-1.5-pro-latest'로 변경
model = genai.GenerativeModel('gemini-1.5-pro-latest') 
response = model.generate_content(prompt)

d2_script = response.text.strip()

# 5. AI 응답 정제 (마크다운 코드 블록이 포함된 경우 제거)
if d2_script.startswith('```'):
    lines = d2_script.split('\n')
    # 첫 줄과 마지막 줄을 제외하고 다시 합침
    if len(lines) > 2:
        d2_script = '\n'.join(lines[1:-1])

# 6. D2 스크립트 파일 저장
with open('architecture.d2', 'w', encoding='utf-8') as f:
    f.write(d2_script)

print("✅ architecture.d2 파일이 성공적으로 생성되었습니다!")
