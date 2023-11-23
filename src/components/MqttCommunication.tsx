import { useMqttStore } from '@mirevi/puzzlecube-core'
import useStore from '../stores/useStore'

export const MqttCommunication = () => {
  const { client } = useMqttStore()
  const { addAppState, existsAppState, updateAppState } = useStore()

  const subsribeAndListenToAppState = () => {
    if (client) {
      client.subscribe('puzzleCubes/+/app/state')
      client.on('message', (topic, message) => {
        if (topic.startsWith('puzzleCubes/') && topic.endsWith('/app/state')) {
          const cubeId = topic.split('/')[1]
          const appState = JSON.parse(message.toString())
          const exists = existsAppState(cubeId)

          if (exists) {
            updateAppState(appState)
          } else {
            addAppState(appState)
          }
        }
      })
    }
  }

  /**
   * Send a start message to the mqtt broker
   * @returns void
   */
  const sendStart = () => {
    const payload = {
      type: 'start',
    }

    if (!client) return
    client.publish('puzzleCubes/app/start', JSON.stringify(payload))
  }

  /**
   * Send a stop message to the mqtt broker
   * @returns void
   */
  const sendStop = () => {
    const payload = {
      type: 'stop',
    }

    if (!client) return
    client.publish('puzzleCubes/app/stop', JSON.stringify(payload))
  }

  return {
    subsribeAndListenToAppState,
    sendStart,
    sendStop,
  }
}
