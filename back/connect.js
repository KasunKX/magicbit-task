fetch('http://localhost:5500/api').then(response => {
    return response
}).then(data => {
    return data.json()
}).then(data => {
    console.log(data)
})