# Stage 1: Build the React frontend
FROM node:alpine AS frontend-builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build

# Stage 2: Build and run the .NET backend
FROM mcr.microsoft.com/dotnet/sdk:8.0.204 AS backend-builder
WORKDIR /app
COPY API/*.csproj ./API/
RUN dotnet restore API/*.csproj
COPY API/ ./API/
WORKDIR /app/API
RUN dotnet publish -c Release -o out

# Stage 3: Combine frontend and backend
FROM mcr.microsoft.com/dotnet/aspnet:8.0.4
WORKDIR /app
COPY --from=backend-builder /app/API/out .
ENV ASPNETCORE_URLS=http://+:10000
ENTRYPOINT ["dotnet", "API/bin/API.dll"]