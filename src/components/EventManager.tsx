import React, { useState, useEffect } from 'react'
import { MqttCommunication } from './MqttCommunication'

const EventManager = () => {
  const [eventName, setEventName] = useState('')

  const handleEventReceived = (eventMessage) => {
    if (eventMessage && eventMessage.name) {
      setEventName(eventMessage.name)
    }
  }

  useEffect(() => {
    const mqttCommunication = MqttCommunication(handleEventReceived)
    mqttCommunication.subscribeAndListenToAppState()

    return () => {
      // Optional: Unsubscribe logic if needed
    }
  }, [])

  return (
    <div>
      Aktuelles Ereignis:
    </div>
  )
}

export default EventManager
