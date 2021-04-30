
const fse = require('fs-extra')

const ENV_FILE = ".env"
const BUILD_PROP = "VUE_APP_BUILD_AT"


async function setBuildInfo() {
  await fse.ensureFile(ENV_FILE)
  let buildData = getBuildInfo()
  const data = buildData
  await fse.outputFile(ENV_FILE, data, 'utf-8')
  console.log('INFO: updating file ' + ENV_FILE + ':\n' + data)
}

function getBuildInfo() {
  const options = { dateStyle: "medium", timeStyle: "short" }
  const now =(new Date()).toLocaleString('en-US', options)
  let data = BUILD_PROP + "=" + now
  return data
}


setBuildInfo()
