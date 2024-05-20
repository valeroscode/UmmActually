# Build the react frontend

FROM node:18.15.0 AS frontend
WORKDIR /app/dist
COPY package*.json ./
RUN npm install
RUN npm run build
COPY ./dist /app/dist/


FROM mcr.microsoft.com/dotnet/framework/sdk:4.8 AS backend
WORKDIR /app/api
COPY ./API /app/api/
RUN dotnet restore
RUN dotnet build -c Release

# Stage 3: Combine the frontend and backend
FROM mcr.microsoft.com/dotnet/framework/aspnet:4.8.1 AS final
WORKDIR /app
COPY --from=frontend /app/dist /app/dist
COPY --from=backend /app/api /app/api
EXPOSE 10000
CMD ["dotnet", "run"]

