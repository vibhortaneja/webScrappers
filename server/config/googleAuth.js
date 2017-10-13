//config for google oauth

module.exports = {
    'successRedirect': 'http://localhost:4200/dashboard',
    'failureRedirect': 'http://localhost:4200/login',
    'clientID': '498991143269-avc657ppso53u7fkspkcf7rvc2jgca5e.apps.googleusercontent.com',
    'clientSecret': 'GmvqieQlsDgseQD6aaN7rFDd',
    'callbackURL': "http://localhost:3000/googleAuth/auth/google/callback"
}