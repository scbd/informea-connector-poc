const express = require('express');
const mime = require('mime-types')
const queryParser = require('./middlewares/odata-query-parser');
const contentRenderer = require('./middlewares/content-type-renderer');

const defaultRenderer = contentRenderer();
const cbdMeetings = require("./cbd/meetings")
const ippcMeetings = require("./ippc/meetings")

const port = process.env.PORT || 3000;
const app = express()

app.use(queryParser());

app.get('/', (req, res) => { res.send('InforMEA connector') })

app.get('/cbd/meetings', async (req, res, next) => {
    
    req.data = await cbdMeetings(req.odataQuery);
    next();

}, defaultRenderer);

app.get('/ippc/meetings', async (req, res, next) => {
    
    req.data = await ippcMeetings(req.odataQuery);
    next();

}, defaultRenderer);

app.listen(port, () => { console.log(`App listening at http://localhost:${port}`) })

