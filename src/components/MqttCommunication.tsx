import { useMqttStore } from '@mirevi/puzzlecube-core'
import useStore from '../stores/useStore'
import useHelloCubeStore from '../stores/useHelloCubeStore'

/**
 * Custom hook to subscribe to the app state topic and helloCubes topic and listen for messages
 * Provides a function to send a helloCubes message to the mqtt broker
 * @returns void
 */
export const MqttCommunication = () => {
  const { client } = useMqttStore()
  const { addAppState, existsAppState, updateAppState } = useStore()
  const { addHelloCube } = useHelloCubeStore()

  /**
   * Subscribe to the app state topic and helloCubes topic and listen for messages
   * @returns void
   */
  const subscribeAndListenToAppState = () => {
    if (client) {
      client.subscribe('puzzleCubes/+/app/state')
      client.subscribe('puzzleCubes/+/app/helloCubes')
      client.on('message', (topic, message) => {
        if (topic.endsWith('helloCubes')) {
          addHelloCube(JSON.parse(message.toString()))
          console.log('helloCubes', JSON.parse(message.toString()))
        }
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
   * Send a helloCubes message to the mqtt broker
   * @returns void
   */
  const sendHelloCubes = () => {
    const payload = {
      type: 'helloCubes',
    }

    if (!client) return
    client.publish('puzzleCubes/app/helloCubes', JSON.stringify(payload))
  }

  return {
    subscribeAndListenToAppState,
    sendHelloCubes,
  }
}
