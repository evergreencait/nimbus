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

var createFlights = function() {
  departureLocation.forEach(function(individualDepartureLocation) {
    destinationLocation.forEach(function(individualDestinationLocation) {
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




    });
  });
}

var flights = [flight123];
var matchingFlightText = "";

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
  $("form#flight-search").submit(function(event) {
    event.preventDefault();

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

    $("span.travelClass").text(inputtedClass);
    $("span.email").text(inputtedEmail);
    $("span#seatNumber").text(generatedSeat);
    $("span#gateNumber").text(generatedGate);

  });
});
