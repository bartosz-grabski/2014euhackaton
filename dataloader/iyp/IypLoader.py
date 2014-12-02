import urllib2


class IypLoader(object):
    def fetch(self, item_ids_range, item_url):
        for item_id in item_ids_range:
            try:
                item_xml_reader = urllib2.urlopen(item_url.format(item_id))
                item = item_xml_reader.read()
            finally:
                item_xml_reader.close()
            yield item