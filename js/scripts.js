let promise = new Promise(function(resolve, reject){
  let request = new XMLHttpRequest();
  let url = 'https://cors-anywhere.herokuapp.com/https://s3.amazonaws.com/wheelhouse-cdn/wheelhouse-www/assets/timeslotdata.json';
  request.onload = function(){
    if (this.status === 200){
      resolve(request.response);
    } else {
      reject(Error(request.statusText));
    }
  }
  request.open('GET', url, true);
  request.send();
});

promise.then(function(response){
  let body = JSON.parse(response);
  let buttonRow = document.getElementById('buttonRow');
  for (let i = 0; i < 11; i++){
    let hour = new Date(body.scheduleDays[0].timeSlots[i].slotDateTime).getHours();
    let mins = new Date(body.scheduleDays[0].timeSlots[i].slotDateTime).getMinutes().toString();
    let ampm;
    if (mins === '0'){
      mins = '00';
    }
    if (hour > 12){
      hour = hour % 12;
      ampm = 'p';
    } else {
      ampm = 'a';
    }
    buttonRow.innerHTML += `<div><button class='button' onclick='window.location.href="http://www.wheelhousetesting.net"'>${hour}:${mins}${ampm}</button></div>`;
  }
  buttonRow.innerHTML += `<div><button id='morebutton' onclick='window.location.href="http://www.wheelhousetesting.net"'>More</button></div>`
})

document.getElementById('addContentHere').innerHTML +=
`
<div id="appwidget">
<div class="sub-container">
<h1>Book Online</h1>
<div class="links">
<div>
<a href="http://www.wheelhousetesting.net/">What do we treat?</a>
</div>
<div>
<a href="http://www.wheelhousetesting.net/" id = "howmuch">How much will it cost?</a>
</div>
</div>
</div>
<hr>
<div class='sub-container'>
<h1>Tomorrow</h1>
<div class="row" id="buttonRow">
</div>
</div>
</div>
<style>

h1{
  font-size: x-large;
  font-weight: bold;
  margin-top: -5px;
}
hr{
  width: 400px;
  margin-top: 0px;
  margin-bottom: 0px;
  color: #008CBA;

}
#howmuch{
  float: right;
  margin-top: -20px;
}
.button{
  height: 40px;
  width: 80px;
  background-color: #008CBA;
  color: white;
  font-size: 12px;
  border-radius: 4px;
  border: none;
}
#appwidget{
  border: 2px solid grey;
  height: 314px;
  width: 400px;
  margin: 5px;
  padding:10px 5px 15px 20px;
}
.sub-container{
  padding: 10px;
}
#buttonRow{
  margin-left: 5px;
  margin-right: 5px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 5px;
  grid-row-gap: 10px;
}
#buttonRow:before{
  content: none;
}
#morebutton{
  height: 40px;
  width: 80px;
  background-color: white;
  color: black;
  font-size: 12px;
  border-radius: 4px;
  border-color: black;
}
</style>
`
