import requests
import json
import time

api_key = 'AIzaSyAFl5Nhpe4ATZGPc7JhN8v0Were-XqnXog'

location = '42.2864, 18.8400'  # Kamala, Пхукет
radius = '5000'
type = 'lodging'
country_id = '2'  # Пример хардкодинга идентификатора страны
city_id = '2'     # Пример хардкодинга идентификатора города
region_id = '6'   # Пример хардкодинга идентификатора района

url = f'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={location}&radius={radius}&type={type}&key={api_key}'

hotel_data = []

def fetch_all_results(initial_url):
    next_page_token = True

    while next_page_token:
        response = requests.get(initial_url)
        hotels = response.json()
        
        for hotel in hotels.get('results', []):
            place_id = hotel.get('place_id')
            
            details_url = f'https://maps.googleapis.com/maps/api/place/details/json?place_id={place_id}&key={api_key}'
            details_response = requests.get(details_url)
            details = details_response.json().get('result', {})
            
            # Извлечение данных об отеле
            name = details.get('name')
            address_components = details.get('address_components', [])
            formatted_address = details.get('formatted_address')
            phone_number = details.get('formatted_phone_number')

            # Извлечение данных о стране, городе и районе
            country = None
            city = None
            region = None

            for component in address_components:
                if 'country' in component.get('types', []):
                    country = component.get('long_name')
                if 'locality' in component.get('types', []):
                    city = component.get('long_name')
                if 'administrative_area_level_2' in component.get('types', []):
                    region = component.get('long_name')

            # Формирование адреса с учетом региона
            if region:
                address = f"{formatted_address}, {region}"
            else:
                address = formatted_address

            # Проверка, чтобы исключить отели из Patong и Karon
            if 'Patong' not in address and 'Karon' not in address:
                hotel_info = {
                    'name': name,
                    'address': address,
                    'phone_number': phone_number,
                    'country_id': country_id,
                    'city_id': city_id,
                    'region_id': region_id
                }
                hotel_data.append(hotel_info)
        
        next_page_token = hotels.get('next_page_token')
        
        if next_page_token:
            time.sleep(2)
            initial_url = f'{url}&pagetoken={next_page_token}'

fetch_all_results(url)

with open('hotels_details.json', 'w', encoding='utf-8') as f:
    json.dump(hotel_data, f, indent=4, ensure_ascii=False)

print("Список отелей с деталями сохранен в файл hotels_details.json")
