import pymongo

from iyp.IypMepsLoader import IypMepsLoader
from iyp.IypVotesLoader import IypVotesLoader
from iyp.XmlToDictConverter import XmlToDictConverter
from settings import *


def load_converted(loader, converter):
    for item in loader.fetch():
        converted = converter.convert(item)
        if converted:
            yield converted


def store(data, db_name, collection_name):
    conn = None
    try:
        conn = pymongo.MongoClient()
        db = conn[db_name]
        collection = db[collection_name]
        if data:
            collection.insert(data)
    finally:
        if conn:
            conn.close()


print 'Fetching meps'
store([c for c in load_converted(IypMepsLoader(), XmlToDictConverter())], DB_NAME, MEPS_COLLECTION)
print 'done'
# print 'Fetching votes'
# i = 0
# for c in load_converted(IypVotesLoader(), XmlToDictConverter()):
#     store(c, DB_NAME, VOTES_COLLECTION)
#     i += 1
#     print i
# print 'done'