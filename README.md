# InforMEA Connector 

## Proof of Concept (PoC)

This proof of concept (PoC) code is to create an npm package that can be used to implement InforMEA protocol endpoints for partner MEAs into their existing infrastructure (temporarily or permanently). There is no need of a huge & complex OData library that requires complex development, backed by a SQL database with data synchronized etc. The connector can do live transformation i.e. bridging query to another system/data source (static files, solr, sql server, drupal api, existing webpage etc) to fit your infrastructure. 

The library will provide OData query parser to an Abstract Syntax Tree (AST) object, which can be used to implement simple query (like: `$top` & `$skip`) or more complex query like (`$filter`, `$select` or `$orderBy`). It also provides agreed standard rendering format (OdDta1 XML, JSON) etc.

The PoC shows subset of `Meeting` format. It allows rendering of result in OData1 XML and raw JSON format. The client chooses its preferred format by passing HTTP `Accept` headers with `application/xml` or `application/json` content type. the PoC respects weight client `Accept` syntax.

* The `application/json` render simply uses `JSON.strignify` to render the feed/records to the client
* The `application/xml` render is backed by [Handlebars](https://handlebarsjs.com/) text templating library into OData1 XML using partial xml templates.
* It's possible to adapt it to other formats eg: ics/ical format for meetings to feed calendars

The PoC demonstrates 2 MEA meetings endpoints: CBD and IPPC. 

* https://informea-connector.cbddev.xyz/cbd/meetings returns CBD meetings directly from SCBD's solr index with support of `$top` & `$skip`

* https://informea-connector.cbddev.xyz/ippc/meetings returns list of IPPC meetings by grabbing & parsing IPPC calendar html page! YES! the same page you look at: https://www.ippc.int/en/year/calendar/, the result is cached in memory. No OData query parameter is supported / implemented for this one. 

> Important Note: SCBD does not recommend this html page parsing approach as a long term solution. The goal is to demonstrate a simple way of transforming any source (eg: html output for example a calendar on a webpage) to the InforMEA required OData format, with minimal efforts and resources. This option can be used quickly to parse and gather information from MEAs that have not made their data available to InforMEA yet. *Any changes in the format of the html page could break the extraction process!* For the longer term, it is ***highy***- recommended to find a more sustainable solution that would extract data directly from the source and present it through an API. 

## Example calls

```bash
# in xml
curl -H "Accept: application/xml" https://informea-connector.cbddev.xyz/cbd/meetings?$top=5
curl -H "Accept: application/xml" https://informea-connector.cbddev.xyz/cbd/meetings?$top=20&skip=5
curl -H "Accept: application/xml" https://informea-connector.cbddev.xyz/ippc/meetings

# in json
curl -H "Accept: application/json" https://informea-connector.cbddev.xyz/cbd/meetings?$top=5
curl -H "Accept: application/json" https://informea-connector.cbddev.xyz/ippc/meetings
```

## Sample mappers

* [CBD Meeting](https://github.com/scbd/informea-connector-poc/blob/master/cbd/meetings.js)
* [IPPC Meeting](https://github.com/scbd/informea-connector-poc/blob/master/ippc/meetings.js)

## License

[MIT](https://raw.githubusercontent.com/scbd/informea-connector-poc/master/LICENSE)
