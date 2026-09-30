export class AgentSocket {
  private socket: WebSocket | null = null

  connect = (): void => {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      return
    }

    this.socket = new WebSocket('ws://127.0.0.1:5000/ws')

    this.socket.onopen = () => {
      console.log('Desktop agent connected')
    }

    this.socket.onclose = () => {
      console.log('Desktop agent disconnected')
      this.socket = null
    }

    this.socket.onerror = (error) => {
      console.error('Desktop socket error', error)
    }
  }

  send = (data: unknown): void => {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      return
    }

    this.socket.send(JSON.stringify(data))
  }

  close = (): void => {
    if (!this.socket) {
      return
    }

    if (
      this.socket.readyState === WebSocket.OPEN ||
      this.socket.readyState === WebSocket.CONNECTING
    ) {
      this.socket.close()
      this.socket = null
    }
  }
}
