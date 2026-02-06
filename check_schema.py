import sqlite3

conn = sqlite3.connect('backend/price_comparison.db')
cursor = conn.cursor()

# Check the schema of prices table
cursor.execute("PRAGMA table_info(prices)")
columns = cursor.fetchall()

print("Current prices table schema:")
print("-" * 80)
for col in columns:
    print(f"  {col[1]}: {col[2]}")

conn.close()
