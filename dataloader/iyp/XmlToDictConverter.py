from pyexpat import ExpatError

import xmltodict


class XmlToDictConverter(object):
    def convert(self, mep):
        try:
            return xmltodict.parse(mep)
        except ExpatError:
            return None
