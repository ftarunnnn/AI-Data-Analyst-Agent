from datetime import datetime
from fastapi import APIRouter
from pydantic import BaseModel
from app.core.config import settings

router = APIRouter()


class HealthResponse(BaseModel):
    status: str
    app_name: str
    environment: str
    timestamp: str
    ai_engine_status: str


@router.get("/health", response_model=HealthResponse, summary="System Health Check")
async def health_check():
    """
    Returns system status, active environment, and timestamp.
    """
    return HealthResponse(
        status="healthy",
        app_name=settings.PROJECT_NAME,
        environment=settings.ENVIRONMENT,
        timestamp=datetime.utcnow().isoformat() + "Z",
        ai_engine_status="standby_ready"
    )
