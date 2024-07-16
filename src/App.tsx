import { Connector, useMqttStore, useNeighbourhoodStore, CubeConnection } from '@mirevi/puzzlecube-core'
import Header from './components/Header'
import TestButton from './components/TestButtons'
import CubeWindow from './components/cubedisplay/CubeWindow'
import EventManager from './components/EventManager'
import { MqttCommunication } from './components/MqttCommunication'
import { useState, useEffect } from 'react'
import { useHelloCubeStore } from './stores/useHelloCubeStore'
import { texts } from './eventTexts';
import React from 'react'

function App() {
  const { connectionStatus } = useMqttStore()
  const [mqttInitialized, setMqttInitialized] = useState(false)
  const [eventName, setEventName] = useState(1)

  const handleEventReceived = (eventMessage) => {
    if (!eventMessage.isStop){
      setEventName(eventMessage.Type)
    console.log(eventName)
    }
    
  }

  const mqttCommunication = MqttCommunication(handleEventReceived)

  enum EventName {
    SEA_MONSTER = 0,
    SIRENE  = 1,
    STORMY_SEA = 2,
    KEIN_EVENT = 5
  }

  const handleStopEvent = () => {
    const payload = {
      name: eventName,
      $type: "PerformanceEventState, Assembly-CSharp",
      Type: eventName,
      isStart: false,
      isStop: true,
      timestamp: new Date().toISOString(),
    };
    mqttCommunication.sendStopEvent(payload);
    setEventName(100); // Clear the event name after stopping
  }

  useEffect(() => {
    if (connectionStatus === 'connected' && !mqttInitialized) {
      mqttCommunication.subscribeAndListenToAppState()
      setMqttInitialized(true)
    }
  }, [connectionStatus, mqttInitialized])

  const renderTextWithLineBreaks = (text: string) => {
    return text.split('\n').map((str, index) => (
      <React.Fragment key={index}>
        {str}
        <br />
      </React.Fragment>
    ));
  };

  console.log(eventName)
  return (
    <div className='flex relative'>
      <div className='px-7 min-h-screen h-fit bg-fft-yellow flex-1'>
        <Connector brokerUrl={'ws://' + import.meta.env.VITE_MQTT_HOST + ':' + import.meta.env.VITE_MQTT_PORT} />
        <Header />
        <div className="flex flex-col items-start mb-4">
          <div className="w-full flex justify-between items-start mb-4">
          <div className="flex flex-col items-start max-w-md">
            <div className="text-lg font-medium mb-2">
              {eventName != 100 
                ? `Aktuelles Event: ${EventName[eventName]}`
                : "Kein aktuelles Event"}
            </div>
            {eventName != 100 && (
              <div className="break-words">
                {renderTextWithLineBreaks(texts[eventName])}
                <button
                  onClick={handleStopEvent}
                  className="px-4 py-2 mt-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                  Stop Event
                </button>
              </div> 
            )}
          </div>

            <div className="flex-1 flex justify-center">
              <TestButton />
            </div>
            <div className="invisible">
              {/* This invisible div helps balance the layout */}
            </div>
          </div>
        </div>
        <CubeWindow />
      </div>
    </div>
  )
}

export default App