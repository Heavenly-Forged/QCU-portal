import enum
from datetime import datetime
from sqlalchemy import Column, Integer, String, Boolean, DateTime, Enum, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base

class UserRole(str, enum.Enum):
    STUDENT = "STUDENT"
    FACULTY = "FACULTY"
    ORG_OFFICER = "ORG_OFFICER"
    SUPER_ADMIN = "SUPER_ADMIN"       # MIS / IT Center
    REGISTRAR_ADMIN = "REGISTRAR_ADMIN"
    CLINIC_ADMIN = "CLINIC_ADMIN"
    OSA_ADMIN = "OSA_ADMIN"

class ClearanceStatus(str, enum.Enum):
    PENDING = "PENDING"
    COMPLIANT = "COMPLIANT"
    NON_COMPLIANT = "NON_COMPLIANT"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    account_number = Column(String(50), unique=True, index=True, nullable=False)  # e.g., "23-2365" or staff ID
    email = Column(String(100), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    role = Column(Enum(UserRole), default=UserRole.STUDENT, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    student_profile = relationship("StudentProfile", back_populates="user", uselist=False)

class StudentProfile(Base):
    __tablename__ = "student_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True, nullable=False)
    first_name = Column(String(50), nullable=False)
    middle_name = Column(String(50), nullable=True)
    last_name = Column(String(50), nullable=False)
    program = Column(String(100), default="Bachelor of Science in Information Technology")
    year_level = Column(Integer, default=1)
    section = Column(String(20), nullable=True)
    enrollment_status = Column(String(50), default="Regular - Enrolled")

    # Clearance Tracking
    medical_status = Column(Enum(ClearanceStatus), default=ClearanceStatus.PENDING)
    documents_status = Column(Enum(ClearanceStatus), default=ClearanceStatus.PENDING)

    user = relationship("User", back_populates="student_profile")