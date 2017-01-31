//back-end logic
function Flight(number, departureLocation, departureTime, destinationLocation, destinationTime, price) {
  this.number = number,
  this.departureLocation = departureLocation,
  this.departureTime = departureTime,
  this.destinationLocation = destinationLocation,
  this.destinationTime = destinationTime,
  this.price = price
}

var flight121 = new Flight(121, "Seattle", "8:30a", "Narnia", "5:30p", 890);
var flight123 = new Flight(123, "Los Angeles", "5:30a", "Narnia", "7:40p", 890);

var flights = [flight121, flight123];
var matchingFlightText = "";

var flightSearch = function(selectedDepartureLocation, selectedDestinationLocation) {
  flights.forEach(function(flight) {
    if(flight.departureLocation === selectedDepartureLocation && flight.destinationLocation === selectedDestinationLocation) {
      matchingFlightText += "<tr><td>Air Nimbus</td><td>" + flight.number + "</td><td>" + flight.departureLocation + " " + flight.departureTime + " " + flight.destinationLocation + " " + flight.destinationTime + "</td><td>$" + flight.price;
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
    (matchingFlightText);

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
