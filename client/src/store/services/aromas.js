import feathersClient, { makeServicePlugin, BaseModel } from '../../feathers-client'

class Aroma extends BaseModel {
  constructor(data, options) {
    super(data, options)
  }
  // Required for $FeathersVuex plugin to work after production transpile.
  static modelName = 'Aroma'
  // Define default properties here
  static instanceDefaults() {
    return {
      name: '',
      note: [],
      aromaFamilies: [],
      aroma: '',
      fixative: false,
      tenacious: false,
      diffusive: false,
      description: '',
      appearance: '',
      storageSuggestion: '',
      blendsWellWith: [],
      blendingSuggestion: '',
      safetyConsiderations: '',
      recommendedAmount: '',
      recommendedCombination: [],
      dilutionNote: '',
      popularity: ''
    }
  }
}
const servicePath = 'aromas'
const servicePlugin = makeServicePlugin({
  Model: Aroma,
  service: feathersClient.service(servicePath),
  servicePath
})

// Setup the client-side Feathers hooks.
feathersClient.service(servicePath).hooks({
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },
  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },
  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
})

export default servicePlugin