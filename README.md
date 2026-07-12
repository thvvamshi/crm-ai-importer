# CRM AI Importer

A full-stack CRM lead import application that enables users to upload CSV files, process them asynchronously, and manage imported leads through a clean and responsive dashboard.

The project demonstrates scalable backend architecture using asynchronous job processing with BullMQ and Redis while providing a modern frontend built with Next.js.

---

# Features

## CSV Import

- Upload CSV files
- CSV preview before upload
- Duplicate file detection
- CSV validation
- Background import processing

## Import Processing

- Asynchronous processing using BullMQ
- Redis-backed job queue
- Real-time progress tracking
- Import status updates
- Error handling

## Lead Management

- View imported leads
- Server-side pagination
- CRM status tracking
- Latest import restoration after refresh
- Responsive table layout

## User Experience

- Modern dashboard
- Toast notifications
- Drag & Drop upload
- Loading states
- Empty states
- Responsive UI

---

# Tech Stack

## Frontend

- Next.js 16
- React
- TypeScript
- Tailwind CSS
- Axios
- Sonner

## Backend

- Node.js
- Express.js
- TypeScript

## Database

- MongoDB Atlas
- Mongoose

## Queue

- Redis
- BullMQ

## Other

- Docker
- Multer
- CSV Parser

---

# Project Structure

```
crm-ai-importer/
│
├── client/
│   ├── app/
│   ├── components/
│   │   ├── home/
│   │   ├── layout/
│   │   ├── leads/
│   │   └── upload/
│   ├── lib/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── queues/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── workers/
│   │   └── app.ts
│   │
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml
└── README.md
```

---

# System Architecture

```
                  ┌──────────────┐
                  │   Next.js UI │
                  └──────┬───────┘
                         │
                         ▼
                Express REST API
                         │
          ┌──────────────┼──────────────┐
          │              │              │
          ▼              ▼              ▼
     MongoDB Atlas     BullMQ         Redis
          │              │
          └──────────────┘
                 Worker
                  │
             Parse CSV
                  │
          Create Lead Records
```

---

# Prerequisites

Install the following software before running the project.

- Node.js (v20+ recommended)
- npm
- Docker Desktop
- MongoDB Atlas account
- Git

---

# Installation

## 1. Clone Repository

```bash
git clone https://github.com/<your-username>/crm-ai-importer.git

cd crm-ai-importer
```

---

## 2. Backend Setup

```bash
cd server

npm install
```

Create a `.env` file.

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

REDIS_HOST=localhost
REDIS_PORT=6379

CLIENT_URL=http://localhost:3000
```

Start the backend.

```bash
npm run dev
```

---

## 3. Frontend Setup

Open another terminal.

```bash
cd client

npm install
```

Create `.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

Start Next.js.

```bash
npm run dev
```

---

## 4. Start Redis

From the project root:

```bash
docker compose up -d
```

Verify Redis is running.

```bash
docker ps
```

You should see the Redis container running.

---

## Running the Application

Frontend

```
http://localhost:3000
```

Backend

```
http://localhost:5000
```

API Base URL

```
http://localhost:5000/api/v1
```
# API Documentation

Base URL

```
http://localhost:5000/api/v1
```

---

# 1. Upload CSV

Uploads a CSV file and creates a new import record.

### Endpoint

```http
POST /imports
```

### Request

Content-Type

```
multipart/form-data
```

Body

| Field | Type | Required |
|--------|------|----------|
| file | CSV File | Yes |

Example

```bash
curl --location --request POST \
'http://localhost:5000/api/v1/imports' \
--form 'file=@leads.csv'
```

### Success Response

```json
{
  "success": true,
  "data": {
    "importId": "6a53f9524523d9f902201440",
    "status": "UPLOADED"
  }
}
```

---

# 2. Process Import

Queues the uploaded CSV for background processing.

### Endpoint

```http
POST /imports/:id/process
```

Example

```http
POST /imports/6a53f9524523d9f902201440/process
```

### Success Response

```json
{
  "success": true,
  "message": "Import queued successfully."
}
```

---

# 3. Get Import Status

Returns the processing status of a specific import.

### Endpoint

```http
GET /imports/:id
```

Example

```http
GET /imports/6a53f9524523d9f902201440
```

### Success Response

```json
{
  "success": true,
  "data": {
    "id": "6a53f9524523d9f902201440",
    "status": "COMPLETED",
    "progress": 100,
    "totalRows": 20,
    "processedRows": 20
  }
}
```

Possible Status Values

- UPLOADED
- PROCESSING
- COMPLETED
- FAILED

---

# 4. List Imports

Returns all uploaded imports with pagination.

### Endpoint

```http
GET /imports
```

### Query Parameters

| Parameter | Default |
|-----------|----------|
| page | 1 |
| limit | 10 |

Example

```http
GET /imports?page=1&limit=10
```

### Success Response

```json
{
  "success": true,
  "data": {
    "imports": [
      {
        "id": "6a53f9524523d9f902201440",
        "status": "COMPLETED",
        "createdAt": "2026-07-12T18:10:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 5,
      "totalPages": 1
    }
  }
}
```

---

# 5. Get Imported Leads

Returns paginated leads for a specific import.

### Endpoint

```http
GET /imports/:id/leads
```

### Query Parameters

| Parameter | Default |
|-----------|----------|
| page | 1 |
| limit | 10 |

Example

```http
GET /imports/6a53f9524523d9f902201440/leads?page=2&limit=10
```

### Success Response

```json
{
  "success": true,
  "data": {
    "leads": [
      {
        "id": "6872b0...",
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "9876543210",
        "company": "ABC Ltd",
        "city": "Hyderabad",
        "state": "Telangana",
        "country": "India",
        "leadOwner": "Admin",
        "crmStatus": "SUCCESS",
        "crmNote": "Imported Successfully"
      }
    ],
    "pagination": {
      "page": 2,
      "limit": 10,
      "total": 20,
      "totalPages": 2
    }
  }
}
```

---

# Error Responses

## Bad Request

```json
{
  "success": false,
  "message": "Invalid CSV file."
}
```

---

## Duplicate Upload

```json
{
  "success": false,
  "message": "This CSV has already been imported."
}
```

---

## Import Not Found

```json
{
  "success": false,
  "message": "Import not found."
}
```

---

## Internal Server Error

```json
{
  "success": false,
  "message": "Internal Server Error"
}
```

---

# CSV Format

The uploaded CSV should contain the following columns.

| Column |
|----------|
| Name |
| Email |
| Phone |
| Company |
| City |
| State |
| Country |
| Lead Owner |

Example

```csv
Name,Email,Phone,Company,City,State,Country,Lead Owner
John Doe,john@example.com,9876543210,ABC Ltd,Hyderabad,Telangana,India,Admin
Jane Smith,jane@example.com,9988776655,XYZ Pvt Ltd,Bangalore,Karnataka,India,Admin
```

The application validates the CSV before processing and rejects malformed files.

# Application Workflow

The application follows an asynchronous processing workflow to ensure scalability and responsiveness.

```
                 Upload CSV
                      │
                      ▼
             POST /imports
                      │
                      ▼
          Create Import Record
                      │
                      ▼
      POST /imports/:id/process
                      │
                      ▼
             BullMQ Job Queue
                      │
                      ▼
               Redis Queue
                      │
                      ▼
            Background Worker
                      │
         Parse & Validate CSV
                      │
                      ▼
          Create Lead Records
                      │
                      ▼
        Update Import Progress
                      │
                      ▼
      GET /imports/:id (Polling)
                      │
                      ▼
     GET /imports/:id/leads
                      │
                      ▼
       Display Imported Leads
```

---

# Frontend Architecture

```
app/
│
└── page.tsx
      │
      ├── DashboardLayout
      │
      ├── PageHeader
      │
      ├── UploadCard
      │
      ├── UploadModal
      │
      ├── EmptyLeads
      │
      └── LeadsTable
```

---

# Backend Architecture

```
Express API
      │
      ├── Controllers
      │
      ├── Services
      │
      ├── MongoDB Models
      │
      ├── BullMQ Queue
      │
      ├── Redis
      │
      └── Worker
```

---

# Design Decisions

### Background Processing

CSV imports are processed asynchronously using BullMQ instead of synchronous HTTP requests. This prevents request timeouts and improves scalability for large datasets.

---

### Server-side Pagination

Lead records are retrieved using server-side pagination to reduce payload size and improve performance.

Example

```
GET /imports/:id/leads?page=2&limit=10
```

---

### Automatic Import Restoration

When the application reloads:

1. Fetch the latest import.
2. Retrieve its associated leads.
3. Display the latest imported data automatically.

This removes the need for localStorage while ensuring a consistent user experience.

---

### Modular Component Structure

The frontend is divided into reusable components:

- Dashboard Layout
- Upload Modal
- Upload Card
- Leads Table
- Empty State
- Status Badge

This improves maintainability and reusability.

---

### RESTful API Design

The backend follows REST principles with separate endpoints for:

- Uploading files
- Processing imports
- Tracking status
- Listing imports
- Retrieving paginated leads

---

# Error Handling

The application gracefully handles:

- Invalid CSV files
- Missing required columns
- Duplicate uploads
- Failed background jobs
- Network failures
- Backend errors
- Invalid import IDs

User-friendly toast notifications provide immediate feedback.

---

# Testing Checklist

The following scenarios were manually verified.

## Upload

- CSV upload
- CSV preview
- Invalid CSV validation
- Duplicate CSV detection

## Processing

- Import queued successfully
- Background processing
- Progress polling
- Import completion
- Import failure handling

## Lead Management

- Fetch imported leads
- Automatic latest import loading
- Refresh persistence
- Server-side pagination
- Previous/Next navigation
- Page number navigation

## UI

- Responsive layout
- Empty state
- Loading state
- Toast notifications
- Upload modal
- Table rendering

---

# Performance Considerations

- Background job processing avoids blocking HTTP requests.
- Pagination minimizes API payload size.
- React state is scoped to necessary components.
- Polling stops automatically after completion or failure.
- Only one polling request is active at any time.

---

# Future Improvements

Potential enhancements include:

- Authentication & Authorization
- Role-Based Access Control (RBAC)
- Global Lead Management
- Search & Filtering
- Lead Editing
- Bulk Operations
- CSV Export
- Import History Dashboard
- Analytics Dashboard
- WebSocket-based real-time updates
- Audit Logs
- File Storage using AWS S3
- Unit & Integration Tests
- CI/CD Pipeline
- Docker Compose for full stack deployment
- Kubernetes deployment support

---

# Screenshots

Add screenshots here after deployment.

```
docs/

├── dashboard.png

├── upload-modal.png

├── import-progress.png

├── imported-leads.png
```

Example

```md
## Dashboard

![Dashboard](docs/dashboard.png)

## Upload CSV

![Upload](docs/upload-modal.png)

## Imported Leads

![Leads](docs/imported-leads.png)
```

---

# Assumptions

- CSV contains valid lead data.
- Redis is available before processing imports.
- MongoDB Atlas is accessible.
- Duplicate imports are identified by backend validation.
- The latest import is displayed after refreshing the application.

---

# License

This project was developed as part of a Full Stack Engineering Assignment for evaluation purposes.

---

# Author

**Boda Vamshi Kumar**

# Acknowledgements

Built using:

- Next.js
- React
- TypeScript
- Express.js
- MongoDB Atlas
- Redis
- BullMQ
- Tailwind CSS
- Sonner