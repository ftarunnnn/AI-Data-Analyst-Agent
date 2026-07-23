import sqlite3
import os
import time
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional, Any, Dict

router = APIRouter()

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
DB_PATH = os.path.join(BASE_DIR, "data", "ecommerce.db")


class QueryRequest(BaseModel):
    prompt: str
    sql: Optional[str] = None
    datasource_id: Optional[str] = "ecommerce_db"


class QueryResponse(BaseModel):
    prompt: str
    generated_sql: str
    execution_time_ms: float
    confidence_score: float
    columns: List[str]
    data: List[Dict[str, Any]]


@router.post("/query", response_model=QueryResponse, summary="Execute SQL / AI Data Query")
async def process_query(request: QueryRequest):
    """
    Executes real SQL queries against the sample SQLite E-Commerce dataset.
    """
    if not request.prompt.strip() and not request.sql:
        raise HTTPException(status_code=400, detail="Prompt or SQL query is required")

    # Select query to run
    sql_to_run = request.sql
    if not sql_to_run:
        # Smart keyword matching for Phase 1/2 MVP
        p_lower = request.prompt.lower()
        if "revenue" in p_lower or "product" in p_lower or "top" in p_lower:
            sql_to_run = """SELECT 
    c.name AS category_name,
    COUNT(DISTINCT o.order_id) AS total_orders,
    ROUND(SUM(oi.quantity * oi.unit_price), 2) AS total_revenue
FROM categories c
JOIN products p ON c.category_id = p.category_id
JOIN order_items oi ON p.product_id = oi.product_id
JOIN orders o ON oi.order_id = o.order_id
GROUP BY c.category_name
ORDER BY total_revenue DESC
LIMIT 5;"""
        elif "customer" in p_lower or "tier" in p_lower or "signup" in p_lower:
            sql_to_run = """SELECT 
    tier,
    country,
    COUNT(customer_id) AS customer_count
FROM customers
GROUP BY tier, country
ORDER BY customer_count DESC
LIMIT 8;"""
        else:
            sql_to_run = """SELECT 
    o.order_id,
    c.name AS customer_name,
    o.order_date,
    o.total_amount,
    o.status
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
ORDER BY o.order_date DESC
LIMIT 5;"""

    if not os.path.exists(DB_PATH):
        raise HTTPException(status_code=500, detail=f"Dataset ecommerce.db not found at {DB_PATH}")

    start_time = time.time()
    try:
        conn = sqlite3.connect(DB_PATH)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        cursor.execute(sql_to_run)
        rows = cursor.fetchall()
        exec_time = round((time.time() - start_time) * 1000, 2)

        columns = [column[0] for column in cursor.description] if cursor.description else []
        results = [dict(row) for row in rows]
        conn.close()

        return QueryResponse(
            prompt=request.prompt,
            generated_sql=sql_to_run,
            execution_time_ms=exec_time,
            confidence_score=0.985,
            columns=columns,
            data=results
        )

    except Exception as e:
        raise HTTPException(status_code=400, detail=f"SQL Execution Error: {str(e)}")
