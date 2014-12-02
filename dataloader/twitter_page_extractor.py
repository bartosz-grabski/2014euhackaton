
PAGE = 'twitter.html'

def extract():
    content = None
    with open(PAGE) as f:
        content = f.readall()

    BeautifulSoup()