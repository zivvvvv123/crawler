import json
import re
from bs4 import BeautifulSoup
from bson.objectid import ObjectId
import os

# Directory containing HTML files
pages_dir = "C:/Users/zivit/Desktop/supermarkets/carefour/src/pages"
output_file = "C:/Users/zivit/Desktop/supermarkets/carefour/src/output/products.json"

# Helper function to clean price string
def clean_price(price_str):
    return re.sub(r'[^0-9.]', '', price_str)

# Helper function to clean text
def clean_text(text):
    return text.replace('\u200f', '').strip()

# Helper function to extract quantity and unit from a string
def extract_quantity_unit(description):
    match = re.search(r'(\d+\.?\d*)\s*(מ"ל|גרם|ק"ג|יח\'|ל|ליטר)', description)
    if match:
        return float(match.group(1)), match.group(2)
    return None, None

# Helper function to extract price per unit from a price text
def extract_price_per_unit(price_text):
    match = re.search(r'₪(\d+\.?\d*)\s*/\s*(\d+\.?\d*)\s*(גרם|ק"ג|מ"ל|ל|יחידה|יחידות)', price_text)
    if match:
        return float(match.group(1)), float(match.group(2)), match.group(3)
    return None, None, None

# Function to parse a single HTML file and extract product information
def parse_html_file(file_path):
    try:
        with open(file_path, "r", encoding="utf-8") as file:
            soup = BeautifulSoup(file.read(), 'html.parser')
    except Exception:
        return []

    parsed_products = []
    items_container = soup.find('div', class_='items')
    if not items_container:
        return []

    product_containers = items_container.find_all('div', class_='item')
    supermarket_id = ObjectId('6679be2c57012929c3130e58')

    for container in product_containers:
        try:
            product_name = clean_text(container.find('h1', class_='sr-only-element').get_text())
            price_tag = container.find('span', class_='price')
            price_text = clean_text(price_tag.get_text()) if price_tag else ''
            price = clean_price(price_text)
            
            additional_description = clean_text(container.find('div', class_='name').get_text()) if container.find('div', class_='name') else ''
            brand = clean_text(container.find('span', class_='brand').get_text()) if container.find('span', class_='brand') else ''
            discount = 'מבצע' in container.text
            
            image_url = re.search(r'url\("([^"]+)"\)', container.find('div', class_='image')['style']).group(1) if container.find('div', class_='image') and 'style' in container.find('div', class_='image').attrs else ''

            # Extract quantity and unit
            quantity, unit = extract_quantity_unit(additional_description)
            if quantity is None:
                quantity, unit = extract_quantity_unit(product_name)
            if unit is None:
                unit = ''

            # Extract price per unit from price text
            price_per_unit, unit_quantity, unit_from_price = extract_price_per_unit(price_text)
            if unit_from_price:
                unit = unit_from_price

            # If quantity and unit are still None, try extracting from the weight tag
            if quantity is None and unit == '':
                weight_tag = container.find('span', class_='weight')
                if weight_tag:
                    quantity, unit = extract_quantity_unit(weight_tag.get_text())

            # Calculate price per unit if not already extracted
            if price_per_unit is None and quantity is not None:
                if unit in ['מ"ל', 'גרם']:
                    price_per_unit = round((float(price) / quantity) * 100, 2)
                    unit_quantity = 100
                elif unit in ['ל', 'ק"ג']:
                    price_per_unit = round(float(price) / quantity, 2)
                    unit_quantity = 1

            try:
                price = float(price)
            except ValueError:
                price = None
            
            product_data = {
                'product_name': product_name,
                'price': price,
                'brand': brand,
                'discount': discount,
                'image_url': image_url,
                'supermarket_id': str(supermarket_id),
                'quantity': quantity,
                'unit': unit,
                'price_per_unit': price_per_unit,
                'unit_quantity': unit_quantity
            }
            if quantity == None and unit == "" or unit == None:
                product_data = {
                'product_name': product_name,
                'price_per_kg': price,
                'brand': brand,
                'discount': discount,
                'image_url': image_url,
                'supermarket_id': str(supermarket_id),
                'quantity': quantity,
                'unit': unit,
                'price_per_unit': price_per_unit,
                'unit_quantity': unit_quantity
            }
            parsed_products.append(product_data)
        except Exception:
            pass

    return parsed_products

# Parse all HTML files and write the extracted data to a JSON file
all_products = []
for filename in os.listdir(pages_dir):
    file_path = os.path.join(pages_dir, filename)
    if os.path.isfile(file_path):
        all_products.extend(parse_html_file(file_path))

try:
    with open(output_file, "w", encoding="utf-8") as json_file:
        json.dump(all_products, json_file, ensure_ascii=False, indent=4)
    print("Parsing and writing to JSON completed successfully.")
except Exception as e:
    print(f"Error writing to JSON file: {e}")