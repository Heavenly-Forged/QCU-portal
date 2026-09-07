# backend/app/api/students.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.api.deps import get_current_user, require_role
from app.models.user import User, UserRole, StudentProfile
from app.schemas.student import StudentProfileResponse

router = APIRouter(prefix="/students", tags=["Students"])

@router.get("/me", response_model=StudentProfileResponse)
def get_my_student_profile(
    current_user: User = Depends(require_role([UserRole.STUDENT, UserRole.SUPER_ADMIN])),
    db: Session = Depends(get_db)
):
    """Fetches full profile information for the currently authenticated student."""
    profile = db.query(StudentProfile).filter(StudentProfile.user_id == current_user.id).first()
    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Student profile details not found."
        )

    return {
        "account_number": current_user.account_number,
        "email": current_user.email,
        "role": current_user.role,
        "first_name": profile.first_name,
        "middle_name": profile.middle_name,
        "last_name": profile.last_name,
        "program": profile.program,
        "year_level": profile.year_level,
        "section": profile.section,
        "enrollment_status": profile.enrollment_status,
        "medical_status": profile.medical_status,
        "documents_status": profile.documents_status
    }