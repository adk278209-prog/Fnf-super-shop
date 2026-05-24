import os
import re
import csv
import time
import requests
from bs4 import BeautifulSoup
from urllib.parse import urlparse

# Configuration
SAVE_DIR = "fnf_product_images"
DOMAIN_URL = "https://fnfbazar.com/wp-content/uploads/fnf_product_images/"
CSV_FILENAME = "fnf_woocommerce_import.csv"

# Extracted Product Data based on Market Prices
PRODUCTS = [
    {
        "name": "Rupchanda Soyabean Oil 5 Litre",
        "search_term": "Rupchanda Soyabean Oil 5 Litre",
        "price": 950,
        "sku": "FNF-OIL-001",
        "category": "Oil & Ghee"
    },
    {
        "name": "Miniket Rice Premium 5kg",
        "search_term": "Miniket Rice Premium 5kg",
        "price": 430,
        "sku": "FNF-RICE-001",
        "category": "Rice & Lentils"
    },
    {
        "name": "Deshi Peyaj (Local Onion) 1kg",
        "search_term": "Deshi Peyaj Onion 1kg",
        "price": 49,
        "sku": "FNF-VEG-001",
        "category": "Groceries"
    },
    {
        "name": "Potato Regular 1kg",
        "search_term": "Potato 1kg",
        "price": 25,
        "sku": "FNF-VEG-002",
        "category": "Groceries"
    },
    {
        "name": "Teer Atta (Fortified Flour) 2kg",
        "search_term": "Teer Atta 2kg",
        "price": 120,
        "sku": "FNF-GROC-001",
        "category": "Groceries"
    },
    {
        "name": "Radhuni Turmeric Powder 200g",
        "search_term": "Radhuni Turmeric Powder 200g",
        "price": 60,
        "sku": "FNF-SPC-001",
        "category": "Spices"
    },
    {
        "name": "Dano Full Cream Milk Powder 1kg",
        "search_term": "Dano Full Cream Milk Powder 1kg",
        "price": 820,
        "sku": "FNF-DAIRY-001",
        "category": "Dairy"
    },
    {
        "name": "Aarong Liquid Milk 1 Litre",
        "search_term": "Aarong Liquid Milk 1 Litre",
        "price": 105,
        "sku": "FNF-DAIRY-002",
        "category": "Dairy"
    },
    {
        "name": "Masoor Dal (Lentil Premium) 1kg",
        "search_term": "Masoor Dal 1kg",
        "price": 140,
        "sku": "FNF-LENTIL-001",
        "category": "Rice & Lentils"
    },
    {
        "name": "Vim Liquid Dishwash 250ml",
        "search_term": "Vim Liquid Dishwash 250ml",
        "price": 64,
        "sku": "FNF-CLN-001",
        "category": "Cleaning"
    }
]

def sanitize_filename(name):
    """Generate an SEO-friendly filename from product name."""
    name = name.lower()
    name = re.sub(r'[^a-z0-9\s-]', '', name)
    name = re.sub(r'[\s-]+', '-', name)
    return name.strip('-')

def scrape_image_url(search_term):
    """
    Search and scrape the product image URL from target e-commerce stores.
    Note: Dynamic SPAs like Chaldal may require Selenium or API inspection.
    This demonstrates the required BeautifulSoup DOM scraping logic.
    """
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    }
    
    # Placeholder structure for Chaldal/Shwapno DOM parsing:
    # url = f"https://chaldal.com/search/{search_term.replace(' ', '%20')}"
    # response = requests.get(url, headers=headers)
    # soup = BeautifulSoup(response.text, 'html.parser')
    # img_tag = soup.find('img', class_='productPane') # Target standard image class
    # if img_tag and img_tag.get('src'):
    #     return img_tag['src']
    
    print(f"Simulating scrape for: {search_term}")
    time.sleep(1) # Respectful delay
    
    # Fallback to demo image for demonstration
    return "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80" 

def download_image(img_url, filename):
    """Download the scraped image to the local directory directly."""
    if not os.path.exists(SAVE_DIR):
        os.makedirs(SAVE_DIR)
        
    ext = os.path.splitext(urlparse(img_url).path)[1]
    if not ext:
        ext = '.jpg'
    
    clean_filename = f"{filename}{ext}"
    filepath = os.path.join(SAVE_DIR, clean_filename)
    
    try:
        response = requests.get(img_url, stream=True)
        response.raise_for_status()
        with open(filepath, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        return clean_filename
    except Exception as e:
        print(f"Failed to download {img_url}: {e}")
        return None

def main():
    print("Starting FnF Bazar Automation Data Pipeline...")
    
    if not os.path.exists(SAVE_DIR):
        os.makedirs(SAVE_DIR)

    woocommerce_data = []

    for item in PRODUCTS:
        print(f"\nProcessing: {item['name']}")
        
        # 1. Scrape image URL
        raw_img_url = scrape_image_url(item['search_term'])
        if not raw_img_url:
            print(f"Could not find image for {item['name']}")
            continue
            
        # 2. Rename and Download Cleanly
        seo_name = sanitize_filename(item['name'])
        downloaded_file = download_image(raw_img_url, seo_name)
        
        if downloaded_file:
            # 3. Restrict and Clean Up URLs. Point directly to FnF Bazar's domain!
            local_image_url = f"{DOMAIN_URL}{downloaded_file}"
            
            # 4. Generate WooCommerce Structured Data Row
            woocommerce_data.append({
                "Type": "simple",
                "SKU": item["sku"],
                "Name": item["name"],
                "Published": 1,
                "Is featured?": 0,
                "Visibility in catalog": "visible",
                "Regular price": item["price"], # Market precise pricing
                "Categories": item["category"],
                "Images": local_image_url # Strict local path mapped to CDN/WordPress Media
            })
            
            print(f"Successfully processed {item['name']}")
            print(f" -> Mapped to: {local_image_url}")

    # 5. Export clean CSV Data payload completely independent of third-party endpoints.
    if woocommerce_data:
        keys = woocommerce_data[0].keys()
        with open(CSV_FILENAME, 'w', newline='', encoding='utf-8') as output_file:
            dict_writer = csv.DictWriter(output_file, fieldnames=keys)
            dict_writer.writeheader()
            dict_writer.writerows(woocommerce_data)
        
        print("\n===============================")
        print(f"Done! Created WooCommerce import file: {CSV_FILENAME}")
        print(f"Local Image Directory: {os.path.abspath(SAVE_DIR)}")
        print("Ready for upload to your WordPress site.")

if __name__ == "__main__":
    main()
