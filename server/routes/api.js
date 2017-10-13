let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let connect = mongoose.connect('mongodb://192.168.252.47:27017/testing');
let currencymodel = require('../models/currencymodel')
let stockmodel = require('../models/stock')
let nasdaq = require('../models/nasdaq');
let request = require('request');
let CronJob = require('cron').CronJob;
let cheerio = require('cheerio');
let fundmodel = require('../models/fundsmodel')
let logger = require('../services/app.logger');



//HTTP Get method start 
router.get('/details', function(req, res, next) {
    nasdaq.find((err, data) => {
        if (err) {
            logger.error("error");

        } else {
            res.json(data)
            logger.info("data");
        }
    })

})
//HTTP Post method for stock price of NASDAQ for WSJ website
router.post('/stock', function(req, res, next) {
    let term = req.body.term;
    request('http://quotes.wsj.com/' + term, function(error, response, html) {
        if (!error && response.statusCode == 200) {
            let $ = cheerio.load(html);
            let stock = [];
            $('.charts-datacol').each(function(i, element) {
                let close = $(this).find('.crinfo_time').text().trim();
                let price = $(this).find('span#quote_val').text().trim();
                let updown = $(this).find('li.crinfo_diff').text().trim();
                let hours = $(this).find('.c_crinfo_sub h5').text().trim();
                let hPrice = $(this).find('span#ms_quote_val').text().trim();
                let hupdown = $(this).find('#ms_quote_deltaBar').text();
                let metadata1 = {
                    closeAt: close,
                    Price: price,
                    upDown: updown,
                    hours: hours,
                    hPrice: hPrice,
                    hupdown: hupdown,

                }
                stock.push(metadata1);
            });

            logger.info("post method for stock price of NASDAQ for WSJ website");
            res.json({ data: stock });
        }
    })
});


function getnasdaq(data) {
    for (let i = 0; i < data.length; i++) {
        term = data[i].Code;
        liststockdata(term);
        // news(term);
    }

    function liststockdata(term) {
        request('http://quotes.wsj.com/' + term, function(error, response, html) {
            if (!error && response.statusCode == 200) {
                let $ = cheerio.load(html);


                $('#news_module li.cr_pressRelease').each(function(i, element) {
                    let news = $(this).next().text().trim();
                    let stockdata = {};
                    stockdata.term = term;
                    stockdata.news = news;

                    liststock = new stockmodel(stockdata);
                    liststock.save((err, data) => {
                        if (err) {
                            logger.error('not found')

                        } else if (data) {
                            logger.info("success")
                        }
                    });
                })
            }
        })
    }
}


function fundsnews() {

    let funddata = {};
    request('https://www.wsj.com/news/types/hedge-funds', function(error, response, html) {
        if (!error && response.statusCode == 200) {
            let $ = cheerio.load(html);
            let funds = [];
            $('#move_2 li').each(function(i, element) {
                let fundsdate = $(this).find('.time-container').text().trim();
                let fundsheadline = $(this).find('.headline').text().trim();
                let fundsnews = $(this).find('.summary-container').text().trim();

                funddata.Time = fundsdate;
                funddata.Headline = fundsheadline;
                funddata.News = fundsnews;

                let listoffund = new fundmodel(funddata)
                listoffund.save((err, data) => {
                    if (err) {
                        logger.error("error in fundsnews")

                    } else if (data) {
                        logger.info("list of funds news")
                    }

                })
            });

        }
    })
}


function currencynews() {
    let currencydata = {};
    request('https://www.wsj.com/news/types/foreign-exchange', function(error, response, html) {
        if (!error && response.statusCode == 200) {
            let $ = cheerio.load(html);
            let currency = [];
            $('#move_2 li').each(function(i, element) {
                let cuurencydate = $(this).find('.time-container').text().trim();
                let currencyheadline = $(this).find('.headline').text().trim();
                let currencynews = $(this).find('.summary-container').text().trim();


                currencydata.Time = cuurencydate;
                currencydata.Headline = currencyheadline;
                currencydata.News = currencynews;
                let listofcurrency = new currencymodel(currencydata)
                listofcurrency.save((err, data) => {
                    if (err) {
                        logger.error("error in currency news")

                    } else if (data) {
                        logger.info("list of currency news")
                    }

                })

            });
        }
    })
}


/*This the cron job function to do scheduling on the nasdaq data*/
var job = new CronJob({
    /*format is second, minute, hour, day of month, months, day of week*/
    cronTime: '00 39 18 * * *',
    onTick: function(req, res, next) {
        nasdaq.find((err, data) => {
            if (err) {
                logger.error("error in cronjob");

            } else {
                getnasdaq(data);
                fundsnews();
                currencynews();
            }
        })

    },
    start: false,
    timeZone: 'Asia/Kolkata'

});
job.start();
//HTTP Post method for stock price of NASDAQ for WSJ website
module.exports = router;