# backend/app/api/auth.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import verify_password, get_password_hash, create_access_token
from app.models.user import User, StudentProfile
from app.schemas.auth import LoginRequest, TokenResponse, UserCreate

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register", status_code=status.HTTP_201_CREATED)
def register_user(user_in: UserCreate, db: Session = Depends(get_db)):
    """Registers a new user account along with their profile profile."""
    # 1. Check if account number or email already exists
    existing_user = db.query(User).filter(
        (User.account_number == user_in.account_number) | (User.email == user_in.email)
    ).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Account number or email already registered in the system."
        )

    # 2. Hash password and persist user
    new_user = User(
        account_number=user_in.account_number,
        email=user_in.email,
        hashed_password=get_password_hash(user_in.password),
        role=user_in.role
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # 3. If the user is a student, attach their base profile
    if user_in.role == "STUDENT":
        profile = StudentProfile(
            user_id=new_user.id,
            first_name=user_in.first_name,
            last_name=user_in.last_name,
            program=user_in.program,
            section=user_in.section
        )
        db.add(profile)
        db.commit()

    return {"message": "User registered successfully", "account_number": new_user.account_number}


@router.post("/login", response_model=TokenResponse)
def login(credentials: LoginRequest, db: Session = Depends(get_db)):
    """Authenticates student or administrative credentials and returns a signed JWT."""
    # Query user by account_number
    user = db.query(User).filter(User.account_number == credentials.account_number).first()
    
    if not user or not verify_password(credentials.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect Student ID / Employee ID or password.",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    if not user.is_active:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Account is deactivated.")

    # Generate JWT
    token = create_access_token(subject=user.account_number, role=user.role.value)
    
    return {
        "access_token": token,
        "token_type": "bearer",
        "role": user.role,
        "account_number": user.account_number
    }