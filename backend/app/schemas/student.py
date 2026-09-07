# backend/app/schemas/student.py
from typing import Optional
from pydantic import BaseModel
from app.models.user import UserRole, ClearanceStatus

class StudentProfileResponse(BaseModel):
    account_number: str
    email: str
    role: UserRole
    first_name: str
    middle_name: Optional[str] = None
    last_name: str
    program: str
    year_level: int
    section: Optional[str] = None
    enrollment_status: str
    medical_status: ClearanceStatus
    documents_status: ClearanceStatus

    class Config:
        from_attributes = True