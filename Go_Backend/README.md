# Elan Backend Setup Guide

## Prerequisites
- Go 1.24.4 or higher
- PostgreSQL 12 or higher

## Installation Steps

### 1. Install Dependencies
```bash
cd Go_Backend
go get github.com/lib/pq
go mod tidy
```

### 2. Database Setup

#### Create Database
```sql
CREATE DATABASE elan_db;
```

#### Run Migration
Connect to your PostgreSQL database and run the migration script:
```bash
psql -U your_username -d elan_db -f migrations/001_create_fest_pass_form_entries.sql
```

### 3. Environment Configuration

Copy `.env.example` to `.env` and update with your actual values:
```bash
cp .env.example .env
```

Update the following in `.env`:
```
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_postgres_username
DB_PASSWORD=your_postgres_password
DB_NAME=elan_db
DB_SSLMODE=disable

# Gmail SMTP for sending confirmation emails
SMTP_EMAIL=elan.nvision.web@sa.iith.ac.in
SMTP_PASSWORD=your_gmail_app_password
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
```

**Note:** For Gmail SMTP setup, see [GMAIL_SETUP.md](./GMAIL_SETUP.md) for instructions on generating an app password.

### 4. Run the Server
```bash
go run cmd/server/main.go
```

The server will start on `http://localhost:5000`

## API Endpoints

### Health Check
- **GET** `/health`
- Returns server status

### Submit Fest Pass Form
- **POST** `/submitFestPassForm`
- **Description**: Submits a fest pass registration and sends a confirmation email to the user
- **Body:**
```json
{
  "fullName": "John Doe",
  "mobileNumber": "9876543210",
  "email": "john@example.com"
}
```
- **Success Response (200):**
```json
{
  "status": "success",
  "message": "Fest Pass form submitted successfully",
  "data": {
    "id": 1,
    "fullName": "John Doe",
    "mobileNumber": "9876543210",
    "email": "john@example.com",
    "createdAt": "2025-11-28T10:30:00Z"
  }
}
```
**Note:** A confirmation email is automatically sent to the registered email address. If email sending fails, the registration is still saved but an error is logged.

- **Error Response (400/500):**
```json
{
  "error": "Failed to submit form",
  "message": "mobile number must be 10 digits"
}
```

## Project Structure

```
Go_Backend/
├── cmd/
│   └── server/
│       └── main.go              # Entry point
├── internal/
│   ├── config/
│   │   ├── config.go           # Server config
│   │   └── db.go               # Database connection
│   ├── handlers/
│   │   ├── checkHealthHandler.go
│   │   └── submitFestPassFormHandler.go
│   ├── middleware/
│   │   └── CORSMiddleWare.go
│   ├── models/
│   │   └── FestPassFormEntry.go
│   ├── router/
│   │   └── router.go
│   ├── services/
│   │   └── submitFestPassFormService.go
│   └── storage/
│       └── addFestPassFormEntry.go
├── migrations/
│   └── 001_create_fest_pass_form_entries.sql
├── .env.example
├── go.mod
└── go.sum
```

## Validation Rules

- **Full Name**: Required, non-empty string
- **Mobile Number**: Required, exactly 10 digits
- **Email**: Required, valid email format

## CORS Configuration

The backend is configured to accept requests from any origin (`*`). Update `CORSMiddleWare.go` to restrict origins in production.
