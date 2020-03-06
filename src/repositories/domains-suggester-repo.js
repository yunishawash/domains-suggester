const randomInt = require("random-int");

/**
 * 
 * generate random domains suggestions
 * 
 * @param {array} array of string includes the keywords
 * @param {int} number of domains to be generated at least 10
 * @param {tld} string the tld of the domain default `com`
 * 
 */
exports.getDomainSuggestions = (keywords, numberOfDomains = 10, tld = 'com') => {

    let domains = [];
    // generate domains with count of numberOfDomains
    for (let i = 0; i < numberOfDomains; i++) {
        // shuffle keywords array, to get a slice of random keyword(s) to be included in the domain
        let domainWords = shuffle(keywords);
        // slice domainsWords array to get at least on of it items, and at most include all keywords
        domainWords = keywords.slice(0, randomInt(1, keywords.length));
        // include at least one of the keywords in the domain name
        for (let index = 0; index < randomInt(1, 2);) {
            // get random word
            randomWord = getRandomWord();
            // prevent using random word twice in the domain name
            if(domainWords.includes(randomWord)) {
                continue;
            } else {
                // push the word into the domainWords array and increase the index.
                domainWords.push(randomWord);
                index++
            }
 
        }
        // shuffle the array and convert it to string
        let domain = shuffle(domainWords).join("");
        // append the tld to the domain string
        domain += `.${tld}`;
        // push the domain to the domains array
      domains.push(
        {
            domain: domain
        }
      );
    }

    return domains;

};

/**
 * 
 * Get random word
 * 
 */
function getRandomWord()
{
    let words = ["all", "is", "great", "visit", "website", "network", "page",
                    "blog", "group", "agency", "news", "expert", "rocks", "company", "center",
                    "link", "local", "today", "media", "social", "cool", "ltd", "services", "experts", "shop", "live", "space",
                    "cloud","search","super"];
    
    return words[randomInt(words.length -1)];        

}

/**
 * 
 * shuffle the array
 * 
 * @param {*} array 
 */
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}