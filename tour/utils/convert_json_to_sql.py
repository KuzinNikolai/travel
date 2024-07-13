import json

# Путь к JSON-файлу с данными отелей
json_file = '/Users/nikolaykuzin/Travel/gettrip/tour/utils/hotels_details.json'

# Файл для записи SQL-скрипта
sql_file = '/Users/nikolaykuzin/Travel/gettrip/tour/utils/hotels_inserts.sql'

# Открываем JSON-файл и читаем данные
with open(json_file, 'r', encoding='utf-8') as f:
    hotel_data = json.load(f)

# Открываем SQL-файл для записи данных
with open(sql_file, 'w', encoding='utf-8') as sql:
    # Проходимся по данным отелей и создаем SQL-запросы INSERT
    for hotel in hotel_data:
        name = hotel.get('name', '').replace("'", "\\'")
        address = hotel.get('address', '').replace("'", "\\'")
        phone_number = hotel.get('phone_number', '').replace("'", "\\'")
        country_id = hotel.get('country_id', '')
        city_id = hotel.get('city_id', '')
        region_id = hotel.get('region_id', '')

        sql.write(f"INSERT INTO hotels (name, address, phone_number, country_id, city_id, region_id) "
                  f"VALUES ('{name}', '{address}', '{phone_number}', '{country_id}', '{city_id}', '{region_id}');\n")

print(f"SQL-скрипт успешно создан: {sql_file}")
