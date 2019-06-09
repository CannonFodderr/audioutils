if('serviceWorker' in navigator){
    navigator.serviceWorker.register('../sw.js')
    .then(reg => {
        console.log("SW Registered")
    })
    .catch(err => {console.error("SW not registered")})
}