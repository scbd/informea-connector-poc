const superagent = require('superagent');

// supported fields

// id
// updated
// url
// title.en
// start
// end

module.exports = async function(odataQuery) {
    
    const solrQuery = {
        q: "schema_s:meeting AND realm_ss:chm",
        sort: "createdDate_dt desc",
        rows: odataQuery.$top,
        start: odataQuery.$skip,
    }

    const result   = await superagent.get("https://api.cbd.int/api/v2013/index").query(solrQuery)
    const data     = result.body;
    const meetings = data.response.docs

    return {
        title: "Meetings",
        type: "feed",
        updated: maxDate(meetings.map(o=>new Date(o.createdDate_dt))),
        records : meetings.map(mapSolrMeeting)
    }
}

function mapSolrMeeting(m) {

    return {
        type: "meeting",
        id: m.id,
        url: `https://www.cbd.int/meetings/${encodeURIComponent(m.symbol_s)}`,
        created: new Date(m.createdDate_dt),
        updated: new Date(m.createdDate_dt), //we're missing updated_dt in our index
        start:   new Date(m.startDate_dt),
        end:     new Date(m.endDate_dt),
        title: { 
            ar: m.title_AR_t,
            en: m.title_EN_t,
            es: m.title_ES_t,
            fr: m.title_FR_t,
            ru: m.title_RU_t,
            zh: m.title_ZH_t 
        }
    }
}


function maxDate(dates) {
    const max = Math.max.apply(null, dates);
    return new Date(max);
}