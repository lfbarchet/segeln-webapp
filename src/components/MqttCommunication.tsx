import { useMqttStore } from '@mirevi/puzzlecube-core'
import useStore from '../stores/useStore'
import useHelloCubeStore from '../stores/useHelloCubeStore'
import { useCubeStateStore } from '@mirevi/puzzlecube-core'

export const MqttCommunication = (onEventReceived) => {
  const { client } = useMqttStore()
  const { addAppState, existsAppState, updateAppState } = useStore()
  const { addHelloCube } = useHelloCubeStore()
  const { cubeState } = useCubeStateStore()

  const subscribeAndListenToAppState = () => {
    if (client) {
      client.subscribe('puzzleCubes/+/app/state')
      client.subscribe('puzzleCubes/+/app/helloCubes')
      client.subscribe('segeln/app/performance')
      client.on('message', (topic, message) => {
        if (topic.endsWith('helloCubes')) {
          addHelloCube(JSON.parse(message.toString()))
          console.log('helloCubes', JSON.parse(message.toString()))
        }
        if (topic.endsWith('performance')) {
          const eventMessage = JSON.parse(message.toString())
          console.log('event kam', eventMessage)
          onEventReceived(eventMessage)
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

  const sendHelloCubes = () => {
    console.log(cubeState.length)

  

    // const payload = {
    //   name: 'start',
    //   timestamp: new Date().toISOString(),
    // };

    const payload = {
      name: 'start',
      roles: {
        wheel: cubeState[0]?.id || 'default',
        sail: cubeState[1]?.id || 'DESKTOP-7I21F8H.<APP>',
        map: cubeState[2]?.id || 'sj'
      },
      timestamp: new Date().toISOString(),
    };
    

    if (!client) return;
    client.publish('segeln/app/events', JSON.stringify(payload));
  };

  const sendStopEvent = (payload) => {
    if (!client) return;

    client.publish('segeln/app/performance', JSON.stringify(payload));
  };

  return {
    subscribeAndListenToAppState,
    sendHelloCubes,
    sendStopEvent
  }
}
