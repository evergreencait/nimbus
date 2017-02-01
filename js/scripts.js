//back-end logic
function Flight(number, departureLocation, departureTime, destinationLocation, destinationTime, price) {
  this.number = number,
  this.departureLocation = departureLocation,
  this.departureTime = departureTime,
  this.destinationLocation = destinationLocation,
  this.destinationTime = destinationTime,
  this.price = price
}
var flight123 = new Flight(123, "Seattle", "5:30a", "Narnia", "7:40p", 890);

var matchingFlightText = "";
var flights = [flight123];
var departureArray = ["Seattle", "Los Angeles", "San Francisco", "Reno", "Austin", "Chicago", "New York", "Miami"];
var destinationArray = ["Narnia", "Hogwarts", "Oz", "Hobbiton", "The Upside-Down", "King's Landing", "Jurassic Park", "Back to the Future"];


var createFlights = function() {
  departureArray.forEach(function(individualDepartureLocation) {
    destinationArray.forEach(function(individualDestinationLocation) {
      var flightNumber = Math.floor(Math.random() * (900)) + 100;
      var departureTime = (Math.floor(Math.random() * 12) + 1) + ":" + (Math.floor(Math.random() * 5) + 1) + "0 AM";
      var arrivalTime = (Math.floor(Math.random() * 12) + 1) + ":" + (Math.floor(Math.random() * 5) + 1) + "0 PM";
      var price = 899
      if (individualDestinationLocation === "The Upside-Down") {
        price -= 700;
      } else if (individualDestinationLocation === "Hogwarts") {
        price += 1500;
      } else if (individualDestinationLocation === "Jurassic Park") {
        price += 1000;
      } else if (flightNumber > 500) {
        price -= 121;
      }

      var newFlight = new Flight(flightNumber, individualDepartureLocation, departureTime, individualDestinationLocation, arrivalTime, price);

      flights.push(newFlight);

    });
  });
}


var flightSearch = function(selectedDepartureLocation, selectedDestinationLocation) {
    flights.forEach(function(flight) {
      if(flight.departureLocation === selectedDepartureLocation && flight.destinationLocation === selectedDestinationLocation) {
        matchingFlightText += "<tr><td>Air Nimbus</td><td>" + flight.number + "</td><td>" + flight.departureLocation + " " + "<span class='departureTime'>" + flight.departureTime + "</span>"+ " - " + flight.destinationLocation + " " +  "<span class='arrivalTime'>" + flight.destinationTime + "</span>"+ "</td><td>$" + flight.price + "</tr>";
      }

    });
}

function randomSeat () {
  return parseInt(Math.floor(Math.random() * 36 ) + 1);
}

function randomGate () {
  return parseInt(Math.floor(Math.random() * 18 ) + 1);
}




//front-end logic
$(document).ready(function() {
  createFlights();
  $("form#flight-search").submit(function(event) {
    event.preventDefault();
    matchingFlightText = "";
    $(".flight-options tr").slice(1).remove();

    var selectedDepartureLocation = $("#depart-location").val();
    var selectedDestinationLocation = $("#destination-location").val();
    var selectedDateDeparture = $("input.departureDate").val();
    var selectedDateArrival = $("input.returnDate").val();

    flightSearch(selectedDepartureLocation, selectedDestinationLocation);

    $(".flight-options").append(matchingFlightText);

      $("span.departure").text(selectedDepartureLocation);
      $("span.destination").text(selectedDestinationLocation);
      $("span.date1").text(selectedDateDeparture);
      $("span.date2").text(selectedDateArrival);

      $("tr").click(function(){
        var number = $(this).children(":nth-child(2)").text();
        var departureTime = $(this).children(":nth-child(3)").children(":nth-child(1)").text();
        var landingTime = $(this).children(":nth-child(3)").children(":nth-child(2)").text();
        console.log(landingTime);
        var chosenFlight = new Flight(number, departureTime);
        $("span#flightNumber1").text(chosenFlight.number);
        $("span#departTime1").text(departureTime);
        $("span#landTime1").text(landingTime);
      });

  });

  $("form#new-passenger").submit(function(event) {
    event.preventDefault();
    var inputs = ["lastName", "firstName"];

    inputs.forEach(function(input) {
      var userInput = $("input#" + input).val();
      var inputUpper = userInput.toUpperCase();
      $("span." + input).text(inputUpper);
    });

    var inputtedEmail = $("#email").val();
    var inputtedClass = $("#travelClass").val();
    var generatedSeat = randomSeat();
    var generatedGate = randomGate();
    var secondGeneratedSeat = randomSeat();
    var secondGeneratedGate = randomGate();

    $("span.travelClass").text(inputtedClass);
    $("span.email").text(inputtedEmail);
    $("span#seatNumber1").text(generatedSeat);
    $("span#gateNumber1").text(generatedGate);
    $("span#seatNumber2").text(secondGeneratedSeat);
    $("span#gateNumber2").text(secondGeneratedGate);

  });

});
