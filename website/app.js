/* Global Variables */
let generate = document.querySelector('#generate');
let URL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
let API = '&appid=86b4e55fb1c67b141bd2192d1d75bda6';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

function generateWeather(){
// add event listener to the button if clicked 
generate.addEventListener('click',function(){
// get the zip code and the user response
const zip = document.getElementById('zip').value;
const UR = document.getElementById('feelings').value;
// get information from the API
getWeather(URL,zip,API)
// post the data to website end point
.then(function(data){
 postWeather('/',{temperature:data.main.temp, date:newDate, userRes:UR})
})
// get the data from the server then update the UI
.then(
    updateUI()
)

});
}
// create async function to fetch the data from the API
const getWeather = async (URL,zip,API)=>{
const res = await fetch (URL+zip+API);
try {
    const data = await res.json();
    console.log(data);
    return data;
}
catch(error){
console.log("error",error);
}

}
// post data to our server 
const postWeather = async (url = '' , data={})=>{
const response = await fetch (url, {
    method : 'POST',
    credentials : 'same-origin',
    headers : {
        'content-type' : 'application/json',
    },
    body: JSON.stringify(data),
});
try {
    const data1 = await response.json();
    console.log(data1);
    return data1;
}
catch(error){
    console.log("error",error);
}
}
// fetch the data from the server and then update UI elements
const updateUI = async () => {
    const request =  await fetch ('/all');
    try {
        const data2 = await  request.json();
        console.log(data2);
        document.getElementById('temp').innerHTML ="Temperature :"+ data2.temperature;
        document.getElementById('date').innerHTML = "Date :"+ data2.date;
        document.getElementById('content').innerHTML ="Your feeling :"+ data2.userResponse;
    }
    catch(error){
        console.log('error',error);
    }
} 

generateWeather();