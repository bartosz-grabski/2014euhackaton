from iyp.IypLoader import IypLoader

MEP_URL_TEMPLATE = r'http://www.itsyourparliament.eu/api/mep.php?id={}&key='
MEP_IDS_RANGE = xrange(1, 870)


class IypMepsLoader(IypLoader):
    def fetch(self, mep_ids_range=MEP_IDS_RANGE, mep_url=MEP_URL_TEMPLATE):
        return super(IypMepsLoader, self).fetch(mep_ids_range, mep_url)