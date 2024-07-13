import json
import mysql.connector

# Подключение к базе данных MySQL
db_connection = mysql.connector.connect(
    host='5.23.51.25',
    name='cj05405_gettrip',
    user='cj05405_gettrip',
    password='Qwert12345',
    database='cj05405_gettrip'
)

cursor = db_connection.cursor()

# Чтение данных из JSON-файла
with open('hotels_details.json', 'r', encoding='utf-8') as f:
    hotel_data = json.load(f)

# Загрузка данных в базу данных
for hotel in hotel_data:
    name = hotel['name']
    address = hotel['address']
    phone_number = hotel['phone_number']

    # SQL-запрос для вставки данных
    sql = "INSERT INTO hotels (name, address, phone_number) VALUES (%s, %s, %s)"
    val = (name, address, phone_number)
    cursor.execute(sql, val)

# Применение изменений
db_connection.commit()

# Закрытие соединения с базой данных
cursor.close()
db_connection.close()

print(f"Данные из JSON-файла успешно загружены в базу данных.")
