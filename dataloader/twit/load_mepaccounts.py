from bs4 import BeautifulSoup
import pymongo

from settings import *


PAGE = 'twitter.html'


def extract():
    with open(PAGE, 'r') as f:
        markup = '\r\n'.join(f.readlines())

    soup = BeautifulSoup(markup)

    for a in soup.findAll(True, {'class': 'js-user-profile-link'}):
        mepname = a.find('strong').text
        mepaccount = a['href'][1:]

        yield mepname, mepaccount


def set_mepaccount(mepname, mepaccount, meps_collection):
    print meps_collection.find_and_modify(query={'mepinfo.fullname': mepname}, update={'$set': {'twitter': mepaccount}})


conn = pymongo.MongoClient()
db = conn[DB_NAME]
meps_collection = db[MEPS_COLLECTION]
print meps_collection.update({}, {'$set': {'twitter': None}}, multi=True)

for mepname, mepaccount in extract():
    set_mepaccount(mepname, mepaccount, meps_collection)

conn.close()