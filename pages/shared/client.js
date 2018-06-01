export default class Client {
  constructor(worker) {
    this.worker = worker
  }

  onMessage(callback) {
    this.worker.addEventListner('message', message => {
      callback(message.data)
    })
  }

  sendMessage(message) {
    this.worker.postMessage(message)
  }
}
