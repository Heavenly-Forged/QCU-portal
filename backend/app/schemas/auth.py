# backend/app/schemas/auth.py
from typing import Optional
from pydantic import BaseModel, EmailStr
from app.models.user import UserRole

# Shape of incoming JSON from the login form
class LoginRequest(BaseModel):
    account_number: str
    password: str

# Shape of JSON returned back to JavaScript after success
class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    role: UserRole
    account_number: str

# Schema for creating initial users/seeders
class UserCreate(BaseModel):
    account_number: str
    email: EmailStr
    password: str
    role: UserRole = UserRole.STUDENT
    first_name: str
    last_name: str
    program: Optional[str] = "Bachelor of Science in Information Technology"
    section: Optional[str] = None