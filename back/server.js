const express = require('express')
const app = express()
const cors = require('cors')
const mqtt = require('mqtt')
const sqlite3 = require('sqlite3')
const bodyParser = require('body-parser');

// let client = mqtt.connect('mqtt://broker.hivemq.com')
// client.subscribe('TEMP')

let client = mqtt.connect('')

app.use(bodyParser.json());
app.use(cors())
app.use(express())

value = '0'
note = ['',true]

const old = ''
let topic = 'TEMP'
let status = 'Not Connected'
let updatedAt = 'No Messages Recieved'
let url = ''


app.get('/api', (req, res) => {
    res.json({message: value, connection: {state:status,server:url, subscribedTo: topic, lastUpdated: updatedAt}})
  });


app.post('/api/post', (req, res) => {
    url = req.body.server
    topic = req.body.topicName

    client = mqtt.connect(url)
    status = 'Not Connected'
    
    client.on('connect', () => {
        console.log(`Connected to ${url}`)
        note = ['Connected te', true]
        status= 'Connected'
        console.log(`Connected to ${url}`)
    })

    console.log(`Subscribed to ${topic}`)
    note = [`Subscribed to ${topic}`, true]
    
    client.subscribe(topic)

    client.on('message',  (topic, message) => {
        value = message.toString()
        updatedAt = new Date().toLocaleString()
});

    })

client.subscribe(topic)

client.on('message',  (topic, message) => {
    value = message.toString()
    console.log(value)
});


app.listen(5500, ()=>{
    console.log(`Server Started on Port 5500`)
})
