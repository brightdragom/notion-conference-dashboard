import os
import subprocess
import openai # 또는 google.generativeai, anthropic

# 1. 프로젝트 폴더 구조 추출 (디렉토리 트리)
tree_output = subprocess.check_output(['tree', '-L', '3', '-I', 'venv|node_modules|.git']).decode('utf-8')

# 2. Dapr 또는 주요 설정 파일 내용 읽기
dapr_components = ""
if os.path.exists('./components'):
    # components 폴더 내의 yaml 파일들을 읽어 합침
    pass 

# 3. AI 프롬프트 구성
prompt = f"""
당신은 마이크로서비스 아키텍트입니다. 다음 프로젝트 폴더 구조와 설정 파일을 분석하여, 시스템 아키텍처를 시각화하는 D2(Declarative Diagramming) 스크립트를 작성하세요.

[프로젝트 폴더 트리]
{tree_output}

[제약 사항]
1. 응답은 반드시 D2 문법 스크립트만 출력할 것 (마크다운 코드 블록 제외).
2. 노드 간의 방향성(->)을 명확히 하고, Dapr 사이드카 패턴이 있다면 표현할 것.
3. 방향은 `direction: right`를 사용할 것.
"""

# 4. LLM API 호출 및 .d2 파일 저장
# (API 호출 로직 생략 - Claude 3.5 Sonnet 또는 Gemini 1.5 Pro 권장)
d2_script = llm_response.text 

with open('architecture.d2', 'w') as f:
    f.write(d2_script)
