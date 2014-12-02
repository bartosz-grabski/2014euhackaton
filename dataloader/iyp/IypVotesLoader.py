from iyp.IypLoader import IypLoader

VOTE_URL_TEMPLATE = r'http://www.itsyourparliament.eu/api/vote.php?id={}&key='
VOTE_IDS_RANGE = xrange(1, 8000)


class IypVotesLoader(IypLoader):
    def fetch(self, vote_ids_range=VOTE_IDS_RANGE, vote_url=VOTE_URL_TEMPLATE):
        return super(IypVotesLoader, self).fetch(vote_ids_range, vote_url)