import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin
import re

start_url = "https://www.washington.edu/"

response = requests.get(start_url)
soup = BeautifulSoup(response.text, 'html.parser')

links = soup.find_all('a', href=True)

# exclude disallowed paths in `robots.txt`
disallowed_patterns = [
    re.compile(r'\?s=.*'),
    re.compile(r'/search/'),
    re.compile(r'/graduation/\?s=.*')
]

def is_allowed(url):
    for pattern in disallowed_patterns:
        if pattern.search(url):
            return False
    return True

with open("webscraper_data.txt", "w") as file:
    for link in links:
        url = urljoin(start_url, link['href'])
        if is_allowed(url):
            try:
                page_response = requests.get(url, verify=False)
                page_soup = BeautifulSoup(page_response.text, 'html.parser')
                for tag in page_soup(['header', 'script', 'style', 'meta', 'head', 'noscript']):
                    tag.decompose()
                text_content = page_soup.get_text(separator="\n", strip=True)
                file.write(f"Content from {url}:\n{text_content}\n\n")
            except Exception as e:
                print(f"Failed to retrieve {url}: {e}")
