import SockJS from 'sockjs-client'
import stomp from 'webstomp-client'

export default (context, inject) => {
  const ws = new SockJS(`${process.env.serverUrl}/ws`)
  const client = stomp.over(ws, {
    heartbeat: false,
    debug: false
  })
  inject('stomp', () => new Promise((resolve, reject) => {
    if (client.connected) {
      resolve(client)
      return
    }
    client.connect({}, () => resolve(client), reject)
  }))
}
