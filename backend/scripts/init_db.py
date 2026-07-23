import sqlite3
import os
import csv
import random
from datetime import datetime, timedelta

DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data")
CSV_DIR = os.path.join(DATA_DIR, "csv")
DB_PATH = os.path.join(DATA_DIR, "ecommerce.db")

os.makedirs(CSV_DIR, exist_ok=True)

# Sample Data Generators
CATEGORIES = ["Enterprise Software", "Cloud Storage & API", "AI Microservices", "Security & Compliance", "Data Pipeline Tools"]
PRODUCTS_DATA = [
    ("Aether Analytics Pro", "Enterprise Software", 299.00, 45.00),
    ("Aether Data Agent Enterprise", "AI Microservices", 499.00, 80.00),
    ("Cloud Storage Node 1TB", "Cloud Storage & API", 49.00, 10.00),
    ("API Rate Limit Buster", "Cloud Storage & API", 129.00, 20.00),
    ("CyberGuard Shield", "Security & Compliance", 199.00, 30.00),
    ("Data Pipeline Sync Pro", "Data Pipeline Tools", 349.00, 50.00),
    ("Vector Index Accelerator", "AI Microservices", 249.00, 40.00),
    ("SQL Query Optimizer", "Enterprise Software", 149.00, 25.00),
]

COUNTRIES = ["United States", "United Kingdom", "Germany", "Canada", "Japan", "Australia", "France", "India"]
SUBSCRIPTION_TIERS = ["Free", "Starter", "Professional", "Enterprise"]


def init_database():
    print(f"Creating database at: {DB_PATH}")
    if os.path.exists(DB_PATH):
        os.remove(DB_PATH)

    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    # 1. Create Tables
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS categories (
        category_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL
    );
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS products (
        product_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        category_id INTEGER,
        price REAL NOT NULL,
        cost REAL NOT NULL,
        FOREIGN KEY (category_id) REFERENCES categories(category_id)
    );
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS customers (
        customer_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        country TEXT NOT NULL,
        tier TEXT NOT NULL,
        signup_date DATE NOT NULL
    );
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS orders (
        order_id INTEGER PRIMARY KEY AUTOINCREMENT,
        customer_id INTEGER NOT NULL,
        order_date DATETIME NOT NULL,
        total_amount REAL NOT NULL,
        status TEXT NOT NULL,
        payment_method TEXT NOT NULL,
        FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
    );
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS order_items (
        item_id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL,
        quantity INTEGER NOT NULL,
        unit_price REAL NOT NULL,
        FOREIGN KEY (order_id) REFERENCES orders(order_id),
        FOREIGN KEY (product_id) REFERENCES products(product_id)
    );
    """)

    # 2. Populate Categories & Products
    category_map = {}
    for cat in CATEGORIES:
        cursor.execute("INSERT INTO categories (name) VALUES (?)", (cat,))
        category_map[cat] = cursor.lastrowid

    products_list = []
    for name, cat_name, price, cost in PRODUCTS_DATA:
        cat_id = category_map[cat_name]
        cursor.execute("INSERT INTO products (name, category_id, price, cost) VALUES (?, ?, ?, ?)",
                       (name, cat_id, price, cost))
        products_list.append((cursor.lastrowid, name, cat_id, price, cost))

    # 3. Populate Customers
    first_names = ["Alex", "Jordan", "Taylor", "Morgan", "Sam", "Chris", "Pat", "Riley", "Casey", "Dakota", "Reese", "Quinn"]
    last_names = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez"]
    
    customers_list = []
    start_date = datetime(2025, 1, 1)
    for i in range(1, 61):
        fname = random.choice(first_names)
        lname = random.choice(last_names)
        name = f"{fname} {lname}"
        email = f"{fname.lower()}.{lname.lower()}{i}@example.com"
        country = random.choice(COUNTRIES)
        tier = random.choice(SUBSCRIPTION_TIERS)
        signup_dt = start_date + timedelta(days=random.randint(0, 500))
        signup_date_str = signup_dt.strftime("%Y-%m-%d")
        
        cursor.execute("INSERT INTO customers (name, email, country, tier, signup_date) VALUES (?, ?, ?, ?, ?)",
                       (name, email, country, tier, signup_date_str))
        customers_list.append((cursor.lastrowid, name, email, country, tier, signup_date_str))

    # 4. Populate Orders & Order Items
    order_id_counter = 1
    item_id_counter = 1
    orders_list = []
    order_items_list = []

    order_start = datetime(2026, 1, 1)
    statuses = ["Completed", "Completed", "Completed", "Completed", "Processing", "Refunded"]
    payment_methods = ["Credit Card", "Stripe", "PayPal", "Bank Wire"]

    for _ in range(180):
        customer = random.choice(customers_list)
        cust_id = customer[0]
        order_dt = order_start + timedelta(days=random.randint(0, 200), hours=random.randint(0, 23))
        order_date_str = order_dt.strftime("%Y-%m-%d %H:%M:%S")
        status = random.choice(statuses)
        pay_method = random.choice(payment_methods)

        # Generate items
        num_items = random.randint(1, 4)
        selected_prods = random.sample(products_list, num_items)
        
        total_order_amount = 0
        current_items = []

        for prod in selected_prods:
            p_id, p_name, cat_id, p_price, p_cost = prod
            qty = random.randint(1, 3)
            subtotal = p_price * qty
            total_order_amount += subtotal
            current_items.append((p_id, qty, p_price))

        cursor.execute(
            "INSERT INTO orders (customer_id, order_date, total_amount, status, payment_method) VALUES (?, ?, ?, ?, ?)",
            (cust_id, order_date_str, round(total_order_amount, 2), status, pay_method)
        )
        current_order_id = cursor.lastrowid
        orders_list.append((current_order_id, cust_id, order_date_str, round(total_order_amount, 2), status, pay_method))

        for p_id, qty, unit_price in current_items:
            cursor.execute(
                "INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES (?, ?, ?, ?)",
                (current_order_id, p_id, qty, unit_price)
            )
            order_items_list.append((item_id_counter, current_order_id, p_id, qty, unit_price))
            item_id_counter += 1

    conn.commit()

    # 5. Export to CSV files for reference and upload features
    def export_csv(filename, headers, rows):
        path = os.path.join(CSV_DIR, filename)
        with open(path, "w", newline="", encoding="utf-8") as f:
            writer = csv.writer(f)
            writer.writerow(headers)
            writer.writerows(rows)
        print(f"Exported CSV: {path}")

    export_csv("products.csv", ["product_id", "name", "category_id", "price", "cost"], products_list)
    export_csv("customers.csv", ["customer_id", "name", "email", "country", "tier", "signup_date"], customers_list)
    export_csv("orders.csv", ["order_id", "customer_id", "order_date", "total_amount", "status", "payment_method"], orders_list)
    export_csv("order_items.csv", ["item_id", "order_id", "product_id", "quantity", "unit_price"], order_items_list)

    conn.close()
    print("Database initialization complete successfully!")


if __name__ == "__main__":
    init_database()
