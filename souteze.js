const request = require('request');
const cheerio = require('cheerio');


request('https://www.csts.cz/cs/KalendarSoutezi/Seznam?OdData=05%2F01%2F2022%2000%3A00%3A00&DoData=08%2F31%2F2023%2000%3A00%3A00&Region=0', (error,
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
					console.log(x(le).text());
					console.log("----------------------------------------------------------------------------------------------------");
				}

			});
		}
		});
	//	console.log(soutez);
	}
	});
  }
});
