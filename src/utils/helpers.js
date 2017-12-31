import React from 'react'
import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'
const NOTIFICATION_KEY = 'NOTIFICATION_KEY:FLASHCARDS'

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

export function createNotification() {
  return {
    title: 'Time to Study!',
    body: "👋 don't forget to study your cards today",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      Permissions.askAsync(Permissions.NOTIFICATIONS)
        .then(({ status }) => {
          if (status === 'granted'){
            Notifications.cancelAllScheduledNotificationsAsync()

            let tomorrow = new Date()
            tomorrow.setDate(tomorrow.getDate() + 1)
            tomorrow.setHours(20)
            tomorrow.setMinutes(0)

            Notifications.scheduleLocalNotificationAsync(
              createNotification(),
              {
                time: tomorrow,
                repeat: 'day'
              }
            )

            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
          }
        })
    })
}

export function objToArray(data) {
  console.log(data)
  return (
          Object.keys(data).map(function(key) {
            return {...data[key], key};
          })
        )
}

export function sortResults(theArray, sortParameter){
  return (
    theArray.sort(function(a, b){
      //return b.[sortParameter]-a.[sortParameter]
    })
  )
}
