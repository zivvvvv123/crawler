import json
import re
from bs4 import BeautifulSoup
from bson.objectid import ObjectId
import os

# Directory containing HTML files for the new supermarket
pages_dir = "C:/Users/zivit/Desktop/supermarkets/keshet/src/pages"
output_file = "C:/Users/zivit/Desktop/supermarkets/keshet/src/output/products.json"

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
    except Exception as e:
        print(f"Error reading file {file_path}: {e}")
        return []

    parsed_products = []
    items_container = soup.find('div', class_='items')
    if not items_container:
        return []

    product_containers = items_container.find_all('div', class_='item')

    supermarket_id = ObjectId('667a46b15103d20dd9820d8b')  # Correct supermarket ID

    for container in product_containers:
        try:
            product_name_tag = container.find('div', class_='name')
            product_name = product_name_tag.get_text(strip=True) if product_name_tag else None

            price_tag = container.find('span', class_='price') or container.find('span', class_='sale-price') or container.find('span', class_='regular-price')
            price_text = price_tag.get_text(strip=True) if price_tag else None
            price = clean_price(price_text) if price_text else None

            brand_tag = container.find('span', class_='brand')
            brand = brand_tag.get_text(strip=True) if brand_tag else None

            image_tag = container.find('div', class_='image')
            image_url = None
            if image_tag and 'style' in image_tag.attrs:
                image_url_match = re.search(r'url\("([^"]+)"\)', image_tag['style'])
                image_url = image_url_match.group(1) if image_url_match else None

            additional_description_tag = container.find('span', class_='weight')
            additional_description = clean_text(additional_description_tag.get_text(strip=True)) if additional_description_tag else ''
            quantity, unit = extract_quantity_unit(product_name)
            if quantity is None and unit is None:
                quantity, unit = extract_quantity_unit(additional_description)

            price_per_unit, unit_quantity, unit_from_price = extract_price_per_unit(price_text)
            if unit_from_price:
                unit = unit_from_price

            try:
                price = float(price)
                price = round(price, 1)
            except ValueError:
                price = None

            product_data = {
                'product_name': product_name,
                'price': price,
                'brand': brand,
                'image_url': image_url,
                'supermarket_id': str(supermarket_id),
                'quantity': quantity,
                'unit': unit,
                'price_per_unit': price_per_unit,
                'unit_quantity': unit_quantity
            }

            if quantity is None and unit is None:
                product_data['price_per_kg'] = product_data.pop('price')

            if product_name:
                parsed_products.append(product_data)
        except Exception as e:
            print(f"Error parsing product in {file_path}: {e}")

    return parsed_products

# Parse all HTML files and write the extracted data to a JSON file
all_products = []
total_products_found = 0
for filename in os.listdir(pages_dir):
    file_path = os.path.join(pages_dir, filename)
    if os.path.isfile(file_path):
        products = parse_html_file(file_path)
        all_products.extend(products)
        total_products_found += len(products)

print(f"Total products containers found: {total_products_found}")
print(f"Total products extracted: {len(all_products)}")

try:
    with open(output_file, "w", encoding="utf-8") as json_file:
        json.dump(all_products, json_file, ensure_ascii=False, indent=4)
    print("Parsing and writing to JSON completed successfully.")
except Exception as e:
    print(f"Error writing to JSON file: {e}")
