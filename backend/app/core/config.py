from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "QCU Student Information Portal"
    API_V1_STR: str = "/api/v1"
    
    # PostgreSQL Configuration
    # Format: postgresql://<username>:<password>@<host>:<port>/<database_name>
    DATABASE_URL: str = "postgresql://postgres:heavenlyforged@localhost:5432/qcu_portal_db"
    
    # Security Configuration
    SECRET_KEY: str = "CHANGE_THIS_TO_A_SECURE_RANDOM_SECRET_KEY_LATER"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 8  # 8 hours

    class Config:
        case_sensitive = True

settings = Settings()