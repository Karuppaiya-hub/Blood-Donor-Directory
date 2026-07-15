# Blood Donor Directory

A full-stack web app to manage blood donors.

## Tech Stack
- **Frontend**: React (Vite) + Tailwind CSS
- **Backend**: Django + Django REST Framework
- **Database**: SQLite

## Setup

### Backend
```bash
cd backend
pip install django djangorestframework django-cors-headers
python manage.py migrate
python manage.py runserver
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Usage
- Open http://localhost:5173
- Add donors using the form
- Filter by blood group using the dropdown
- Edit or delete donors from their cards
