import sys
import time

import pymongo
import twitter

from settings import *


twitterURL = 'http://twitter.com'

api = twitter.Api(consumer_key=r'Tj1Q0ArObXLN9gJSPto5YEhjm',
                  consumer_secret=r'6SlrE9MOKAmYOc9lRBC1NAzTmaBzbXuL2LTtRHrz1p1IZd7hkm',
                  access_token_key=r'426067023-MNyMO6Rf6AzUFoLaAx2eWqOr0CqWqRfqDc3L5P7m',
                  access_token_secret=r'vm6Qy0vVXQTnDojJgaX1Bh7GIVhUKKrmhPXqdz1chl4uc')


def fetch(user):
    data = {}

    max_id = None
    total = 0
    while True:
        statuses = api.GetUserTimeline(user, count=200, max_id=max_id)
        newCount = ignCount = 0
        for s in statuses:
            if s.id in data:
                ignCount += 1
            else:
                data[s.id] = s
                newCount += 1
            total += newCount
            print >> sys.stderr, "Fetched %d/%d/%d new/old/total." % (newCount, ignCount, total)
            if newCount == 0:
                break
            max_id = min([s.id for s in statuses]) - 1

    return data.values()


conn = pymongo.MongoClient()
db = conn[DB_NAME]
meps_collection = db[MEPS_COLLECTION]

for mep in meps_collection.find():
    if 'twitter' in mep:
        twitter = mep['twitter']

        twitters_collection = db[TWITTERS_COLLECTION]
        tweets = [{'created_at': a.created_at, 'text': a.text} for a in api.GetUserTimeline(twitter, count=200)]
        twitters_collection.insert(
            {"mepid": mep['mepinfo']['mepid'],
             "tweets": tweets})

        time.sleep(20)

conn.close()
#



