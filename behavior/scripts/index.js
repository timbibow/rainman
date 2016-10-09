'use strict'

exports.handle = function handle(client) {

  const sayHello = client.createStep({
    satisfied() {
      return Boolean(client.getConversationState().helloSent)
    },

    prompt() {
      client.addResponse('app:response:name:welcome')
      client.addResponse('app:response:name:provide/documentation', {
        documentation_link: 'http://docs.init.ai',
      })
      client.addResponse('app:response:name:provide/instructions')
      client.updateConversationState({
        helloSent: true
      })
      client.done()
    }
  })

  const untrained = client.createStep({
    satisfied() {
      return false
    },

    prompt() {
      client.addResponse('app:response:name:apology/untrained')
      client.done()
    }
  })
  
    const collectCity = client.createStep({
    satisfied() {
      return Boolean(client.getConversationState().weatherCity)
    },

    prompt() {
	    //Need to prompt client for a city
      console.log('Need to ask user for a city')
      client.done()
    }
  })
    
    
    const provideWeather = client.createStep({
  satisfied() {
    return false
  },

  prompt() {
    // Need to provide weather
    client.done()
  },
})
    

  client.runFlow({
    classifications: {},
    
    streams: {
      main: 'getWeather',
      onboarding: [sayHello],
      end: [untrained],
	    getWeather: [collectCity, provideWeather],
    }
  })
}
