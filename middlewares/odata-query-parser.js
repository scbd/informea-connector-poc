const parser = require("odata-parser");
const querystring = require('querystring');


module.exports = function(options) {

    return function(req, res, next) {
    
        req.odataQuery = {};

        const odataQueryString = oDataQueryString(req.query);

        if(odataQueryString)
            req.odataQuery = parser.parse(odataQueryString);

        next();
    }
}

function oDataQueryString(query) {

    const odataParams = {
        $callback    : query.$callback,
        $expand      : query.$expand,
        $filter      : query.$filter,
        $format      : query.$format,
        $inlinecount : query.$inlinecount,
        $orderby     : query.$orderby,
        $select      : query.$select,
        $skip        : query.$skip,
        $top         : query.$top
    };
    
    const parts = [];
    
    for(const key in odataParams) {
        if(odataParams[key])
            parts.push(`${key}=${encodeURIComponent(odataParams[key])}`)
    }

    return parts.join("&");
}
