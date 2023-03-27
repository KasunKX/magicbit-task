import { useState, useEffect, useRef } from 'react'
import Charts from './chart'


const App = () => {

  const [data, setData] = useState({"state":"Not Connected","server":"","subscribedTo":"","lastUpdated":"No Messages Recieved"})
  const [value, setValue] = useState(0)
  const [activeUnit, setActiveUnit] = useState('C')
  const [showConWindow, setShowConWindow] = useState('none')
  const [pastValues, setPastValues] = useState([])
  const [xvalues, setXvalues] = useState([])

  // Buttons
  const celcius = useRef()
  const farenheit = useRef()
  const serverurl = useRef()
  const topicName = useRef()
  const dataText = useRef()
  let previous = ''


  useEffect(() => {
    setInterval(() => {
      fetch('http://localhost:5500/api/')
    .then(response => {
      return response.json()
    }).then(data => {
      setData(data.connection)
    
    try{
        
        let update = pastValues
        let current = parseFloat(data.message)
        previous = pastValues.slice(-1)
        
        if (current > 0){
      
          if (current != previous){
            update.push(data.message)
            setValue([data.message, (data.message * (9/5) + 32).toFixed(2)])
            

          setPastValues(update)
          }
        }
        
    }catch(err){
      console.log(err)
    }

    
      
    })
    }, 3000)
  }, [])

  // Buttons Event Listeners

const changeUnit = (unit) =>{ 

    setActiveUnit(unit)
}

const updateMqtt = ()=> {
    
  fetch('http://localhost:5500/api/post', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
      server: serverurl.current.value,
      topicName: topicName.current.value
    })
  })
  .then(response => response.json())
  
}

  return <>
  
    <div className="app" style={showConWindow == 'flex' ? {filter: 'blur(10px)'}: {filter: 'blur(0)'}} >
      <div className="container">
      
      {/* <div className="notification" style={{background: notification.state == true ? 'rgb(185, 255, 185)': 'rgb(255, 217, 217) ' }}>
          {notification[0]}
      </div> */}

      <div className="dataContainer">

          <div className="left">

            <div className="top">

              <div className="topLeft">
                <h2 ref={dataText} style={{animation:'recieveDataAnimation'}}>{activeUnit == 'C' ? value[0]: value[1]} ° {activeUnit}</h2>
                </div>
              <div className="topRight">
                <button className='F' onClick={() => {changeUnit('F')}} ref={farenheit} style={activeUnit == 'F'? {background:'#978cff', color:'white'}: {background:'white'} } >F</button>
                <button className='F' onClick={() => {changeUnit('C')}} ref={celcius} style={activeUnit == 'C'? {background:'#978cff', color:'white'}: {background:'white'} } >C</button>
              </div>

            </div>


            <div className="center">

              <div className="connectionDetails">

                  {data.state == 'Connected' ? <>
                    <h3>Connections Status - {data.state}</h3>
                    <h3>Server - {data.server}</h3>
                    <h3>Subscribed Topic - {data.subscribedTo}</h3>
                    <h3>Last Updated - {data.lastUpdated}</h3>
                  </>

                  :<>
                    <h3>Connections Status - {data.state}</h3>
                    <h3>-</h3>
                    <h3>-</h3>
                    <h3>-</h3>
                  </>}

                  </div>
            </div>

            <div className="bottom">
            <button className='btnCon' onClick={() => {
              
              {showConWindow == 'none' ? setShowConWindow('flex') : setShowConWindow('flex')}
              

            }}>MQTT Connection</button>

              <button className='reset'>Reset Chart</button>
            </div>

          </div>

          <div className="right">
          <h1>Magicbit Tempereture Sensor Data</h1>
              <Charts data={pastValues}/>
          </div>

      </div>

    </div>
    </div>

    <div className="conWindow" style={{display: showConWindow}}>
      <h2 className="setupText" style={{display: showConWindow}}>
              Setup MQTT Connection
            </h2>

            <div className="connection">

              <div className="url inp">
                 <h3 className="name">Server URL</h3>
                 <input type="text" className='field' ref={serverurl} />
              </div>

              <div className="topic inp">
                <h3 className="name">Topic</h3>
                <input type="text" className='field' ref={topicName}/>
              </div>

              <button onClick={() => {
                setShowConWindow('none')
                updateMqtt()
                }}>Connect</button>
              <button onClick={() => {setShowConWindow('none')}}>Close</button>

            </div>

      </div>

  </>
}

export default App
