import sqlite3
import os
from fastapi import APIRouter
from pydantic import BaseModel
from typing import List

router = APIRouter()

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
DB_PATH = os.path.join(BASE_DIR, "data", "ecommerce.db")


class TableMeta(BaseModel):
    table_name: str
    row_count: int


class DataSourceDetail(BaseModel):
    id: str
    name: str
    type: str
    status: str
    tables_count: int
    tables: List[TableMeta]


@router.get("", response_model=List[DataSourceDetail], summary="List Active Data Sources")
async def list_datasources():
    """
    Returns list of connected database & CSV file data sources with dynamic row counts.
    """
    tables_meta = []
    if os.path.exists(DB_PATH):
        try:
            conn = sqlite3.connect(DB_PATH)
            cursor = conn.cursor()
            cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';")
            tables = cursor.fetchall()
            for t in tables:
                tname = t[0]
                cursor.execute(f"SELECT COUNT(*) FROM {tname};")
                count = cursor.fetchone()[0]
                tables_meta.append(TableMeta(table_name=tname, row_count=count))
            conn.close()
        except Exception as e:
            print(f"Error querying sqlite: {e}")

    return [
        DataSourceDetail(
            id="ds-ecommerce-sqlite",
            name="E-Commerce & SaaS Analytics DB (SQLite)",
            type="Database",
            status="Connected",
            tables_count=len(tables_meta),
            tables=tables_meta
        ),
        DataSourceDetail(
            id="ds-csv-customers",
            name="customers.csv",
            type="CSV Upload",
            status="Indexed",
            tables_count=1,
            tables=[TableMeta(table_name="customers", row_count=60)]
        ),
        DataSourceDetail(
            id="ds-csv-orders",
            name="orders.csv",
            type="CSV Upload",
            status="Indexed",
            tables_count=1,
            tables=[TableMeta(table_name="orders", row_count=180)]
        )
    ]
