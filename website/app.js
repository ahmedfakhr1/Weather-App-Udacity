/* Global Variables */
let apiKey = '9bf5fec340a971ad501468a576bd5862';
let zipCode = '';
let API_1 = `https://api.openweathermap.org/data/2.5/forecast?zip=`
let API_2 = `&appid=`;
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

let GenerataButton = document.getElementById('generate');
GenerataButton.addEventListener('click',generate);
function generate(event){
    event.preventDefault();
    //getting zip code from the form.
    zipCode = document.getElementById('zip').value;
    //chaining promises
    let data  = getDataFromWeatherApi(apiKey,zipCode,API_1,API_2);
    data.then(function(data){
        PostDataToServer('/',data);
    }).then(
        function(){
            GETtoShowOnUI('/getData');
        }
    )
}

//getting data from the weather api
let getDataFromWeatherApi = async (apiKey,zipCode,API_1,API_2)=>{

    let data = await fetch(API_1+zipCode+API_2+apiKey);
    try{
        let response = await data.json();
        return response;

    }catch(error){
        console.log('error fetching wether data.')
    }
}
//posting data to the server
let PostDataToServer = async (postRoute,data)=>{
    let userResponse = document.getElementById('feelings').value;
        let obj = {
            temperature : data.list[0].main.temp,
            date : newDate,
            userResponse:userResponse,
        }
    let postResponse = await fetch(postRoute, {
        method: 'POST', 
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),     
      });
}
//getting data from server
let GETtoShowOnUI = async (url)=>{
    let dataFromServer = await fetch(url);
    try{
        let data = await dataFromServer.json(); //waiting to convert the response to json format.
        let text = `in day dated : ${data[data.length - 1].date}, The Temperature is = ${data[data.length - 1].temperature} \n And this is how you feel about it  \n ${data[data.length - 1].userResponse} `
        document.getElementById('holder entry').innerText = text;
        return data;
    }catch(error){
        console.error(error);
    }


}