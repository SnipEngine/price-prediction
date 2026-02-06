import sqlite3

conn = sqlite3.connect('backend/price_comparison.db')
cursor = conn.cursor()

cursor.execute('SELECT website, website_link FROM prices LIMIT 5')
rows = cursor.fetchall()

print("Links stored in database:")
print("-" * 80)
for website, link in rows:
    print(f"{website}: {link}")
    if link and link.startswith('localhost'):
        print("  ⚠️  WARNING: Link has localhost prefix!")

conn.close()
