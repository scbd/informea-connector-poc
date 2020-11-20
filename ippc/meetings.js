const cheerio = require('cheerio');
const superagent = require('superagent');
const meetings = require('../cbd/meetings');




// supported fields

// id
// updated
// url
// title.en
// start
// end
let cachedMeetings;
module.exports = async function(odataQuery) {

    let meetings = cachedMeetings 

    if(!meetings) {
        const result  = await superagent.get("https://www.ippc.int/en/year/calendar/")
        const html = result.text;

        const $ = cheerio.load(html);

        const rows = $('#divmainbox #publications > tbody > tr');

        meetings = []
        
        rows.each(function() { 
            var row = $(this); 

            if(row.find("td").length<2)
                return;
            
            var tit   = row.find("td a").text(); 
            var path  = row.find("td a").attr('href'); 
            var id    = path.replace(/.*\/(\d+)$/, "$1");
            var start = toDate(row.find("td:nth-child(1)").text()); 
            var end   = toDate(row.find("td:nth-child(2)").text());  

            meetings.push(mapMeeting(id, start, end, tit, path));
            
        });

        cachedMeetings = meetings;
    }

    return {
        title: "Meetings",
        type: "feed",
        updated: maxDate(meetings.map(o=>o.start)),
        records : meetings
    }
}

function mapMeeting(id, start, end, title, path) {

    return {
        type: "meeting",
        id: id,
        url: `https://www.ippc.int${path}`,
        created: start,
        updated: start, 
        start:   start,
        end:     end,
        title: { 
            en: title,
        }
    }
}


function maxDate(dates) {
    const max = Math.max.apply(null, dates);
    return new Date(max);
}

function toDate(t) {
    return new Date(t.replace(/(\d{2})-(\d{2})-(\d{4})/, "$3-$2-$1T00:00:00.000Z"));
}