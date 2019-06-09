/* eslint-disable no-restricted-globals */
self.addEventListener('install', () => {
    console.log("Installing SW")
})

self.addEventListener('activate', () => {
    console.log('SW Activated')
})

self.addEventListener('fetch', e => {
    console.log("Fetch requested")
})