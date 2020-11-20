const mime = require('mime-types')
const accept = require("@hapi/accept")
const odata1 = require('../odata1/renderer');

const TYPE_XML  = mime.lookup('xml');
const TYPE_JSON = mime.lookup('json');

const defaultRenders = { 
    [TYPE_XML] : odata1.render,
    [TYPE_JSON] : JSON.stringify 
};

module.exports = function(options) {

    options = options ?? { };  

    const renderers =  { ...defaultRenders, ...(options.renderers??{}) };

    const types = Object.keys(renderers);

    return function renderer(req, res, next) {

        const context    = req.data;
        const targetType = accept.mediaType(req.headers.accept, types)
        const renderer   = renderers[targetType];

        if(!renderer)
            throw new Error(`unsupported type ${targetType}`);

        const renderedContent = renderer(context)

        res.status(200)
        res.set('Content-Type', targetType) 
        res.send(renderedContent);
    }
}
