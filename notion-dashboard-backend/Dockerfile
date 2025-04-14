# 베이스 이미지
FROM python:3.11-slim

# 작업 디렉토리
WORKDIR /app

# 의존성 설치
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install python-dotenv
# 애플리케이션 복사
COPY app.py .

# 환경변수 지정은 docker run 또는 --env-file에서
EXPOSE 5000

# 앱 실행
CMD ["python", "app.py"]
