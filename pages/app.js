import Client from './shared/client'
const SOCKET_PATH = process.env.SOCKET_PATH

if (!SOCKET_PATH) {
  console.error('Missing SOCKET_PATH environment variable')
}

class Application {
  constructor(socketPath) {
    this.socketPath = socketPath
    this.windowsById = new Map()
    // this.readyPromise = new Promise(resolve => app.on('ready', resolve))
    this.Client = new Client()
  }

  async start() {
    this.Client.addMessageListner(this._handleMessage.bind(this))
  }

  async _handleMessage(message) {
    // await this.readyPromise
    switch (message.type) {
      case 'OpenWindow':
        {
          // todo : Create Action
          break
        }
    }
  }
}

const application = new Application(SOCKET_PATH)
application.start().then(() => {
  console.log('listening')
})
