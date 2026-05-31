---
# Referral Registration App

A modern referral-based user onboarding and registration web application built with Next.js, TypeScript, and Tailwind CSS.

This application enables users to join through a referral link or code, complete a registration form, and proceed to OTP verification for account confirmation.
---

## Features

- Referral-based user registration
- Referral code detection from URL query parameters
- User onboarding form with validation
- Country code selector for phone registration
- Date of birth picker
- Gender selection
- Password show/hide toggle
- OTP verification flow after signup
- Success and error toast notifications
- Responsive mobile-first UI
- API integration for user registration

---

## Registration Flow

```text
Referral Link
   ↓
User Registration Form
   ↓
Form Validation
   ↓
Submit to API
   ↓
Registration Success
   ↓
OTP Verification
   ↓
Account Activation
```

---

## Tech Stack

- Next.js
- React 19
- TypeScript
- Tailwind CSS
- React Hook Form
- Zod
- Axios
- Radix UI
- Framer Motion
- React Toastify
- Date-fns

---

## Screens

### Registration Form

Users can register by providing:

- First Name
- Last Name
- Email Address
- Phone Number
- Country Code
- Date of Birth
- Gender
- Password / PIN
- Referral Code

---

### OTP Verification

After successful registration:

- user email is stored locally
- user phone number is stored locally
- user is redirected to the OTP verification page for account confirmation

---

## Project Structure

```bash
referral-registration-app/
│
├── app/                    # Next.js app router pages
├── components/             # Reusable UI components
├── hooks/                  # Custom hooks
├── lib/                    # Utilities, schemas, API config
├── public/                 # Static assets
└── ...
```

---

## Getting Started

### Clone repository

```bash
git clone https://github.com/shem4soul/Referral-Registration-App-React.git
```

### Move into project

```bash
cd Referral-Registration-App-React
```

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

Open:

```bash
http://localhost:3000
```

---

## Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_API_URL=your_api_base_url
```

Example:

```env
NEXT_PUBLIC_API_URL=https://api.example.com
```

---

## API Endpoint

Example registration endpoint:

```http
POST /register/individual
```

Example request body:

```json
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@example.com",
  "phone_number": "08012345678",
  "country_code": "+234",
  "date_of_birth": "1998-01-01",
  "gender": "male",
  "pin": "******",
  "reffer_by": "ABC123"
}
```

---

## Future Improvements

- Resend OTP functionality
- Referral tracking dashboard
- User authentication/login
- Profile management
- Admin dashboard
- Referral analytics and reporting

---

## Author

**Emmy**

GitHub: [@shem4soul](https://github.com/shem4soul?utm_source=chatgpt.com)

---

## License

This project is open for learning, development, and portfolio showcase purposes.
