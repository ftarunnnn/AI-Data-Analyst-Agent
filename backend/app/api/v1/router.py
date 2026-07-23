from fastapi import APIRouter
from app.api.v1.endpoints import health, analytics, datasources

api_router = APIRouter()

api_router.include_router(health.router, tags=["Health"])
api_router.include_router(analytics.router, prefix="/analytics", tags=["Analytics & AI"])
api_router.include_router(datasources.router, prefix="/datasources", tags=["Data Sources"])
