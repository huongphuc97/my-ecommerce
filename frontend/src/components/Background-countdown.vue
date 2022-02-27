<template>
  <div class="background">
    <div class="content d-flex justify-content-between">
      <ul class="mr-5 text-center">
        <li class="mb-4 text" id="day"></li>
        <li class="mb-4 text" id="hours"></li>
        <li class="mb-4 text" id="minutes"></li>
        <li class="mb-4 text" id="seconds"></li>
      </ul>
      <div class="ml-5 mr-5">
        <h1>20% OFF FOR ALL T-SHIRT COLLECTION</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
          laborum earum maxime laudantium sed, vitae voluptas eaque iusto fugit
          beatae sint praesentium quibusdam consequuntur natus nostrum
          placeatnatus nostrum placeat
        </p>
        <button>shop now</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "countdown",
};
var cdDate = new Date("07/29/2022 00:00:00").getTime();
setInterval(function () {
  var now = new Date().getTime();
  var distance = (cdDate - now) / 1000;
  var d = Math.floor(distance / (60 * 60 * 24));
  var h = Math.floor((distance % (60 * 60 * 24)) / (60 * 60));
  var m = Math.floor((distance % (60 * 60)) / 60);
  var s = Math.floor(distance % 60);
  let dayId = document.getElementById("day");
  let hoursId = document.getElementById("hours");
  let minutesId = document.getElementById("minutes");
  let secondsId = document.getElementById("seconds");
  if (dayId && hoursId && minutesId && secondsId) {
    dayId.innerHTML = d + "<br>" + "Days";
    hoursId.innerHTML = h + "<br>" + "Hours";
    minutesId.innerHTML = m + "<br>" + "Minutes";
    secondsId.innerHTML = s + "<br>" + "Seconds";
  } else return false;
}, 1000);
</script>
<style scoped>
.background {
  background-image: url(../assets/background-countdown.png);
  background-size: cover;
  background-position: 50%;
  padding: 320px 0;
  position: relative;
}
.content {
  position: absolute;
  top: 20%;
  left: 35%;
}
.text {
  font-size: 20px;
  font-weight: 700;
  padding: 10px 0;
  color: #545454;
}
ul li {
  border: 1px solid #c5c5c5;
  width: 100px;
  padding-top: 10px;
  font-size: 14px;
}
button {
  padding: 10px 24px;
  background-color: #000;
  color: #fff;
  text-transform: uppercase;
  border: none;
  margin-top: 2px;
}
@media screen and (min-width: 810) and (max-width: 1000px) {
  .background {
    padding: 300px 0;
  }
}
@media screen and (max-width: 809px) {
  .background {
    display: none;
  }
}
</style>
