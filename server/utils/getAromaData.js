// load aromas data from json file

const fse = require('fs-extra')

const AROMAS_FILE_PATH = '../_ref_material/essential-oils-all.json'

function parseJson(data) {
  return JSON.parse(data)
}

async function getAromaData() {
  let aromasData = await fse.readFile(AROMAS_FILE_PATH, 'utf-8')
  aromasData = parseJson(aromasData)

  return aromasData
}


module.exports.getAromaData = getAromaData

// allow command line execution:
// `node utils/getAromaData.js`
if(require.main == module) getAromaData()
