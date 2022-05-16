const request = require('request');
const cheerio = require('cheerio');
const { Console } = require('console');

const dateOd = new Date();
const odDate = dateOd.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

const dateDo = new Date(dateOd.setMonth(dateOd.getMonth()+1));
const doDate = dateDo.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

const odUrl = encodeURIComponent(odDate);
const doUrl = encodeURIComponent(doDate);

const mainUrl = 'https://www.csts.cz/cs/KalendarSoutezi/Seznam?OdData=' + odUrl + '&DoData=' + doUrl + '&Region=0';

request(mainUrl, (error,
response, html) => {
  if (!error && response.statusCode == 200) {
    const $ = cheerio.load(html);

	$('.kalendar-box-1').each((i,el) => {
	const soutez = $(el).text();
	const info = $(el).next().text();
	const kat = "Dospělí-B-LAT"
	const link = $(el).parent().find('a').attr('href');
	const sep = "/";
	const _id = (link.split(sep));
	const id = _id[4];

	const dateData = $(el).parent().parent().find($('.big-text')).text();
	const regex = /\d+.\d+.\d+/g;
	const date = dateData.match(regex);
	
	if( info.includes(kat))
	{
		const url = 'https://www.csts.cz/cs/KalendarSoutezi/SeznamPrihlasenych/' + id ;
		//console.log(url);
		request(url, (error,
		response, html) => {
		  if (!error && response.statusCode == 200) {
		    const x = cheerio.load(html);

		    x('.pso-box2').each((a,le) => {
		    if( x(le).text().includes(kat))
		    	{
		    		console.log(soutez);
					console.log(date[0]);
					console.log(x(le).text());
					console.log("----------------------------------------------------------------------------------------------------");
				}

			});
		}
		});
	}
	});
  }
});

var readline = require('readline');

var rl = readline.createInterface(
	process.stdin, process.stdout);


