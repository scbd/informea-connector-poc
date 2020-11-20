# InforMEA Connector 

## Proof of Concept (PoC)

The idea is to provide a npm package that can be used to rapidly implement InforMEA protocol endpoints for a partner MEA into their existing infrastructure, i.e. no need of a huge & complex OData library that require complex development and backed by a SQL database with data synchronized etc. The connector can do live transformation i.e. bridging query to another system/data source (static files, solr, sql server, drupal api, existing webpage etc) to fit tour infrastructure. 

The library will provide OData query parser to an Abstract Syntax Tree (AST) object, which can be used to implement simple query (like: `$top` & `$skip`) or more complex query like (`$filter`, `$select` or `$orderBy`). It also provide agreed standard rendering format (OdDta1 XML, JSON) etc.

The PoC show subset of `Meeting` format. I allow rendering of result in OData1 XML and raw JSON format. The client choose its preferred format by passing HTTP `Accept` headers with `application/xml` or `application/json` content type. the PoC respect weight client `Accept` syntax

* The `application/json` render simply uses `JSON.strignify` to render the feed/records to the client
* The `application/xml` render is backed by [Handlebars](https://handlebarsjs.com/) text templating library into OData1 XML using partial xml templates.
* It's possible to imaging other format eg: ics/ical format for meetings to feed calendars

The PoC demonstrates 2 Meetings MEA endpoints  

* https://informa-connector.cbddev.xyz/cbd/meetings returns CBD meetings directly from SCBD's solr index with support of `$top` & `$skip`

* https://informa-connector.cbddev.xyz/ippc/meetings returns list of IPPC meetings by grabbing & parsing IPPC calendar html page! YES! the same page you look at: https://www.ippc.int/en/year/calendar/, the result is cached in memory. No OData query parameter is supported. 

> SCBD do not recommend this html page parsing approach as way forward. the goal was to demonstrate the possibility of the connector with minimal effort and resources

