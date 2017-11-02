//console.log('this is loaded');
var Twitter = require('twitter');

var twitterKeys = {
  consumer_key: 'MxOBZcTCTzsCbGGCFkyK4f90L',
  consumer_secret: 'X4o1mVtbrRQSXpWlvkaZEbzIZD4FByLu7hzP0VGjQoCxVwGkmF',
  access_token_key: '924730639047327744-E4JEEZRreryFw4cnlALuscttLH5dvH6',
  access_token_secret: 'QBiuxw3muA0W3rzLWmyPO7G1z5QtiK4AKNVhcvYN1dV5B',
}

var client = new Twitter({
      consumer_key: twitterKeys.consumer_key,
      consumer_secret: twitterKeys.consumer_secret,
      access_token_key: twitterKeys.access_token_key,
      access_token_secret: twitterKeys.access_token_secret
    });

module.exports = client;
