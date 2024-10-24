import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin

# Starting URL
start_url = "https://www.washington.edu/"

# Send a GET request to the URL
response = requests.get(start_url)

# Parse the page with BeautifulSoup
soup = BeautifulSoup(response.text, 'html.parser')

# Find all the links on the page
links = soup.find_all('a', href=True)

# Process and store each link
for link in links:
    url = urljoin(start_url, link['href'])  # Join relative URLs with the base URL
    print(url)