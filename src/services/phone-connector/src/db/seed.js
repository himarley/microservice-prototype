module.exports = [
  {
    tableName: "phones",
    partitionKey: "number",
    records: [
      {
        number: "+14012258508",
        verified: true,
        blocked: true,
        lookup: {
          source: "twilio",
          data: {
            carrier: "AT&T Wireless",
            type: "mobile",
            mobileCountryCode: "311",
            mobileNetworkCode: "180",
            country: "US",
            formattedNumber: "(401) 225-8508",
            number: "+14012258508",
            user: "KAUFMAN ALLAN",
            userType: "CONSUMER",
            raw: {
                callerName: {
                    caller_name: "KAUFMAN ALLAN",
                    caller_type: "CONSUMER",
                    error_code: null
                },
                countryCode: "US",
                phoneNumber: "+14012258508",
                nationalFormat: "(401) 225-8508",
                carrier: {
                    mobile_country_code: "311",
                    mobile_network_code: "180",
                    name: "AT&T Wireless",
                    type: "mobile",
                    error_code: null
                },
                addOns: null,
                url: "https://lookups.twilio.com/v1/PhoneNumbers/+14012258508?Type=carrier&Type=caller-name"
            }
          }
        }
      }
    ]
  }
]