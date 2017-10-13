//config for facebook oauth
module.exports = {
    'successRedirect': 'http://localhost:4200/dashboard',
    'failureRedirect': 'http://localhost:4200/login',
    'clientID': '1327893363986984',
    'clientSecret': 'ff73b6239dfda581c787dc66156440f1',
    'callbackURL': "http://localhost:3000/facebookAuth/auth/facebook/callback",
    'profileURL': "https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email"
}