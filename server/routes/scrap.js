//importing pre-defined dependencies
let express = require('express');
let router = express.Router();
let request = require('request');
let CronJob = require('cron').CronJob;
let cheerio = require('cheerio');
let nodemailer = require('nodemailer');
let mongoose = require('mongoose');

//importing user-defined dependencies
let config = require('../config/database')
let connect = mongoose.connect('mongodb://192.168.252.47:27017/testing');
let currencymodel = require('../models/currencymodel')
let stockmodel = require('../models/stock')
let nasdaq = require('../models/nasdaq');
let fundmodel = require('../models/fundsmodel')
let user = require('../models/userModel')
let configure = require('../config/configure');
let logger = require('../services/app.logger');

//HTTP Get method for getting Nasdaq code and company

router.get('/details', function(req, res, next) {
    nasdaq.find((err, data) => {
        if (err) {
            logger.error("error in getting details");
        } else {
            res.json(data)
        }
    })
})

//HTTP Get method for getting Nasdaq code and company End



//HTTP Get method for getting fund news 
router.get('/fund', function(req, res, next) {
    date = new Date();
    fundmodel.find({ day: date.getDay(), month: date.getMonth(), year: date.getFullYear() }, (err, data) => {
        if (err) {
            logger.error("error in getting fund details");

        } else {
            res.json(data)
        }
    })
})

//HTTP Get method for getting news End



//HTTP Get method for getting Nasdaq News
router.get('/news/:id', function(req, res, next) {
    date = new Date();
    stockmodel.find({ term: req.params.id, day: date.getDay(), month: date.getMonth(), year: date.getFullYear() }, (err, data) => {
        if (err) {
            logger.error("error in getting news at particular id");


        } else {
            res.json(data)

        }
    })
})
//HTTP Get method for getting Nasdaq News end

//HTTP Get method for getting Currency News
router.get('/currency', function(req, res, next) {
    date = new Date();
    currencymodel.find({ day: date.getDay(), month: date.getMonth(), year: date.getFullYear() }, (err, data) => {
        if (err) {
            logger.error("error in getting currency")

        } else {
            res.json(data)

        }
    })

})

//HTTP Get method for getting Currency News End


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


            res.json({ data: stock });
        }
    })
});
//HTTP Post method for stock price of NASDAQ for WSJ website

//function for scrap nasdaq news from wsj
function getnasdaq(data) {
    for (let i = 0; i < data.length; i++) {
        term = data[i].Code;
        liststockdata(term);

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
                    date = new Date();
                    stockdata.day = date.getDay();
                    stockdata.month = date.getMonth();
                    stockdata.year = date.getFullYear();
                    liststock = new stockmodel(stockdata);
                    liststock.save((err, data) => {
                        if (err) {
                            logger.error('not found')
                        } else if (data) {

                        }
                    });
                })
            }
        })
    }
}
//function for scrap nasdaq news from wsj End

//function for scrap fund news from wsj
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
                date = new Date();
                date = new Date();
                funddata.day = date.getDay();
                funddata.month = date.getMonth();
                funddata.year = date.getFullYear();

                let listoffund = new fundmodel(funddata)
                listoffund.save((err, data) => {
                    if (err) {
                        logger.error("error in getting funds list");

                    } else if (data) {

                    }

                })
            });

        }
    })
}
//function for scrap fund news from wsj End

//function for scrap currency news from wsj
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
                date = new Date();
                currencydata.day = date.getDay();
                currencydata.month = date.getMonth();
                currencydata.year = date.getFullYear();

                let listofcurrency = new currencymodel(currencydata)
                listofcurrency.save((err, data) => {
                    if (err) {
                        logger.error("error in getting currencynews")

                    } else if (data) {
                        logger.info("currencynews fetched successfully")

                    }

                })

            });
        }
    })
}
//function for scrap fund news from wsj end

/*This the cron job function to get all emailId and there preference set*/
var dailyMailJob = new CronJob({
    /*format is second, minute, hour, day of month, months, day of week*/
    //This cron will work on 11:00 AM daily
    cronTime: '00 05 16 * * *',

    onTick: function(req, res) {
        user.find((err, data) => {
            if (err) {
                res.status(403).send({ success: false, message: 'You are unauthorized' })
            } else {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].preferences[0].frequency == 'Daily') {
                        date = new Date();
                        if (data[i].preferences[0].items[0].itemName == 'Nasdaq Stocks') {
                            let news = stockmodel.find({ day: date.getDay(), month: date.getMonth(), year: date.getFullYear() }).select('news');
                            news.exec(function(err, stockData) {
                                if (err) {
                                    logger.error("error in stockmodel")
                                } else {
                                    let stock = stockData.map(ele => ele.news)
                                    sendMails(data[i].email, stock)
                                }
                            })
                        } else if (data[i].preferences[0].items[0].itemName == 'Funds') {
                            let news = fundmodel.find({ day: date.getDay(), month: date.getMonth(), year: date.getFullYear() }).select('News')
                            news.exec(function(err, fundData) {
                                if (err) {
                                    logger.error("error");
                                } else {
                                    let fund = fundData.map(ele => ele.News)
                                    sendMails(data[i].email, fund)
                                }
                            })
                        } else if (data[i].preferences[0].items[0].itemName == 'Currency') {
                            let news = currencymodel.find({ day: date.getDay(), month: date.getMonth(), year: date.getFullYear() }).select('News');
                            news.exec(function(err, currencyData) {
                                if (err) {
                                    logger.error("error in getting preferences currency")
                                } else {
                                    let currency = currencyData.map(ele => ele.News)
                                    sendMails(data[i].email, currency)
                                }
                            })
                        }
                    }
                }
            }
        })
    },
    start: false,
    timeZone: 'Asia/Kolkata'

});
dailyMailJob.start();

/*This the cron job function to get all emailId and there preference set*/
var weeklyMailJob = new CronJob({
    /*format is second, minute, hour, day of month, months, day of week*/
    //This cron will work on 11:30 AM every Monday
    cronTime: '00 30 11 * * 1',
    onTick: function(req, res) {
        user.find((err, data) => {
            if (err) {
                res.status(403).send({ success: false, message: 'You are unauthorized' })
            } else {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].preferences[0].frequency == 'Weekly') {
                        date = new Date();
                        if (data[i].preferences[0].items[1].itemName == 'Nasdaq Stocks') {
                            let news = stockmodel.find({ day: date.getDay(), month: date.getMonth(), year: date.getFullYear() }).select('news');
                            news.exec(function(err, stockData) {
                                if (err) {
                                    logger.error('error in stockmodel')
                                } else {
                                    let stock = stockData.map(ele => ele.news)
                                    sendMails(data[i].email, stock)
                                }
                            })
                        } else if (data[i].preferences[0].items[0].itemName == 'Funds') {
                            let news = fundmodel.find({ day: date.getDay(), month: date.getMonth(), year: date.getFullYear() }).select('News')
                            news.exec(function(err, fundData) {
                                if (err) {
                                    logger.error('error in getting data relating to funds')
                                } else {
                                    let fund = fundData.map(ele => ele.News)
                                    sendMails(data[i].email, fund)
                                }
                            })
                        } else if (data[i].preferences[0].items[2].itemName == 'Currency') {
                            let news = currencymodel.find({ day: date.getDay(), month: date.getMonth(), year: date.getFullYear() }).select('News');
                            news.exec(function(err, currencyData) {
                                if (err) {
                                    logger.error("err")
                                } else {
                                    let currency = currencyData.map(ele => ele.News)

                                    sendMails(data[i].email, currency)
                                }
                            })
                        }

                    }
                }
            }
        })
    },
    start: false,
    timeZone: 'Asia/Kolkata'

});
weeklyMailJob.start();

/*This the cron job function to get all emailId and there preference set*/
var monthlyMailJob = new CronJob({
    /*format is second, minute, hour, day of month, months, day of week*/
    //This cron will work on 10:30 AM on 10th of Every Month
    cronTime: '00 30 10 10 * *',
    onTick: function(req, res) {
        user.find((err, data) => {
            if (err) {
                res.status(403).send({ success: false, message: 'You are unauthorized' })
            } else {
                for (let i = 0; i < data.length; i++) {
                    date = new Date();
                    if (data[i].preferences[0].frequency == 'Monthly') {
                        if (data[i].preferences[0].items[1].itemName == 'Nasdaq Stocks') {
                            let news = stockmodel.find({ month: date.getMonth() }).select('news');
                            news.exec(function(err, stockData) {
                                if (err) {
                                    logger.error('error in stockmodel')
                                } else {
                                    let stock = stockData.map(ele => ele.news)
                                    sendMails(data[i].email, stock)
                                }
                            })
                        } else if (data[i].preferences[0].items[0].itemName == 'Funds') {
                            let news = fundmodel.find({ month: date.getMonth() }).select('News')
                            news.exec(function(err, fundData) {
                                if (err) {
                                    logger.error('error in news')
                                } else {
                                    let fund = fundData.map(ele => ele.News)
                                    sendMails(data[i].email, fund)
                                }
                            })
                        } else if (data[i].preferences[0].items[2].itemName == 'Currency') {
                            let news = currencymodel.find({ month: date.getMonth() }).select('News');
                            news.exec(function(err, currencyData) {
                                if (err) {
                                    logger.error('error in news')
                                } else {
                                    let currency = currencyData.map(ele => ele.News)

                                    sendMails(data[i].email, currency)
                                }
                            })
                        }
                    }
                }
            }
        })
    },
    start: false,
    timeZone: 'Asia/Kolkata'

});
monthlyMailJob.start();

// This function is used to send mail to the user as their preference 
function sendMails(emailId, fundsData) {
    let transporter = nodemailer.createTransport({
        service: configure.serviceProvider,
        auth: {
            user: configure.mailSendingId,
            pass: configure.mailSendingPass
        }
    });
    let mailOptions = {
        from: configure.mailSendingId,
        to: emailId,
        subject: 'Personalized Emailer',
        html: `<ul>News</ul><br><li>
							${fundsData}
							</li>`
    };
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            logger.warn("emailId is wrong");

        } else {
            logger.info("Email sent to user to reset password");

        }
    });
}

/*This the cron job function to do scheduling on the nasdaq data,fund data,currency*/
var job = new CronJob({
    /*format is second, minute, hour, day of month, months, day of week*/
    cronTime: '00 30 14 * * *',
    onTick: function(req, res, next) {
        nasdaq.find((err, data) => {
            if (err) {
                logger.error("error")
            } else {
                logger.info('Sheduler start')
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

module.exports = router;