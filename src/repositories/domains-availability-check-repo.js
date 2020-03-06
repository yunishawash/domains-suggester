const request = require("request");
const { availabilityApi, availabilityApiToken } = require("../config");

/**
 * 
 * Receive the domains needed to be checked
 * @param {array} domains 
 * @return {array of objects} the domains 
 * 
 */
exports.checkDomainsAvailability =  async (domains) => {

    // TODO: if there is enough time, do a bulk api for all of the domains

    let domainsWithAvailability = [];

    for (let index = 0; index < domains.length; index++) {

        const e = domains[index];
        
        let availability =  await checkDomainAvailability(e.domain);
        domainsWithAvailability.push({
                domain: e.domain,
                availability: availability
        });
    }

    return (domainsWithAvailability); 

};

/**
 * 
 * Check wether a domain is avaivlable or not by hitting a 3rd party service
 * 
 * @param {string} domain the domain needed to be checked
 * @return {boolean} true or false 
 * 
 */
checkDomainAvailability =  domain => {

  return new Promise((resolve, reject) => {
    
      // get the api and api token and fill in the url
      // for each domain check the avaiability
      let baseUrl = `${availabilityApi}?apiKey=${availabilityApiToken}`;
      let url = baseUrl + `&domainName=${domain}&da=1&outputFormat=JSON&ignoreRawTexts=1`;
      request.get({ url: url }, (err, response) => {

        let data = JSON.parse(response.body);
        resolve(data.WhoisRecord.domainAvailability == "AVAILABLE");

      });

  }); // end promise

};;
