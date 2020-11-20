const Handlebars = require('handlebars').create(); //Create isolated
const fs = require('fs');
const path = require('path');
const xmlEscape = require('xml-escape');

Handlebars.registerHelper('xmlEscape', (t)=> xmlEscape(formatDataType(t)));
Handlebars.registerPartial('feed',    fs.readFileSync(path.join(__dirname, 'partials/feed.xml'),    {encoding:'utf-8'}));
Handlebars.registerPartial('meeting', fs.readFileSync(path.join(__dirname, 'partials/meeting.xml'), {encoding:'utf-8'}));

const renderer = Handlebars.compile(`<?xml version="1.0" encoding="UTF-8" standalone="yes" ?>\n{{> (lookup . 'type') }}`);

function formatDataType(d) {
    if(d instanceof Date)
        return d.toISOString()
    return d ?? '';
}

module.exports = {
    render: renderer
}