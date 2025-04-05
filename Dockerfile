# Node.js 이미지를 기반으로 함
FROM node:18.17.0-alpine

# 작업 디렉토리 설정
WORKDIR /app

# 개발 의존성 설치
COPY package*.json ./
RUN npm install

# 개발 서버 포트 설정
EXPOSE 3000

# 개발 서버 실행
CMD ["npm", "run", "dev"]
