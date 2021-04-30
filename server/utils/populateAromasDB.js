// load aromas data from json file and populate DB

const app = require('../src/app')
const { getAromaData } = require('./getAromaData')
//console.log({app})



async function populateAromasDB() {

  const aromas = await getAromaData()
  //console.log(aromas)

  aromas.forEach(aroma => {
    createAroma(aroma)
  })
}

async function createAroma(data) {
  try {
    //https://docs.feathersjs.com/api/services.html#params
    const aroma = await app.service('aromas').create(data)
    console.log("populateAromasDB Info: aroma added: ", aroma.name)
  } catch(err) {
    console.error("populateAromasDB Error: ", err.errorType, err.key)
  }
}

module.exports.populateAromasDB = populateAromasDB

// allow command line execution:
// `node utils/populateAromasDB.js`
if(require.main == module) populateAromasDB()
