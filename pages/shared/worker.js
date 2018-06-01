const encoder = new TextEncoder()
const decoder = new TextDecoder('utf-8')

global.addEventListner('message', async event => {
  const message = event.data
  const server = await serverPromise
  server.handleMessage(message)
})

class Server {
  handleMessage(message) {
    switch (message.type) {
      case 'ConnectToWebsocket':
        this.connecToWebSocket(message.url)
        break
      case 'action':
        this.windowSender.send(encoder.encode(JSON.stringify(message)))
        break

      default:
        break
    }
  }
}
