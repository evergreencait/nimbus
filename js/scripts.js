//back-end logic

//function to create constructor for all the flights we're going to create
function Flight(number, departureLocation, departureTime, destinationLocation, destinationTime, price) {
  this.number = number,
  this.departureLocation = departureLocation,
  this.departureTime = departureTime,
  this.destinationLocation = destinationLocation,
  this.destinationTime = destinationTime,
  this.price = price
}

//empty string and arrays to be used within declared functions
var matchingFlightText = "";
var returningFlights = [];
var departingFlights = [];
var departureArray = ["Seattle", "Los Angeles", "San Francisco", "Reno", "Austin", "Chicago", "New York", "Miami"];
var destinationArray = ["Narnia", "Hogwarts", "Oz", "Hobbiton", "The Upside-Down", "King's Landing", "Jurassic Park", "Back to the Future"];

//generates departing flights
var createDepartingFlights = function() {
  departureArray.forEach(function(individualDepartureLocation) {
    destinationArray.forEach(function(individualDestinationLocation) {
      //creating variables to use as arguments in the flight instance
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
      //create new instance of flight
      var newFlight = new Flight(flightNumber, individualDepartureLocation, departureTime, individualDestinationLocation, arrivalTime, price);
      //push new instance of flight to the departing flights array
      departingFlights.push(newFlight);
    });
  });
}
//generates return flight info

var createReturnFlights = function() {
  destinationArray.forEach(function(individualDestinationLocation) {
    departureArray.forEach(function(individualDepartureLocation) {
      //creating variables to use as arguments in the flight instance
      var flightNumber = Math.floor(Math.random() * (900)) + 100;
      var departureTime = (Math.floor(Math.random() * 12) + 1) + ":" + (Math.floor(Math.random() * 5) + 1) + "0 AM";
      var arrivalTime = (Math.floor(Math.random() * 12) + 1) + ":" + (Math.floor(Math.random() * 5) + 1) + "0 PM";
      //create new Flight object
      var newFlight = new Flight(flightNumber, individualDepartureLocation, departureTime, individualDestinationLocation, arrivalTime);
      //push new Flight object to returning flights array
      returningFlights.push(newFlight);
    });
  });
}



//search for generated departing flights that match the user's search
var departingFlightSearch = function(selectedDepartureLocation, selectedDestinationLocation) {
  departingFlights.forEach(function(flight) {
    //compares user's departure and destination location to the element we're looking in array
    if(flight.departureLocation === selectedDepartureLocation && flight.destinationLocation === selectedDestinationLocation) {

      //adds text to the table if user's search matches
      matchingFlightText += "<tr class='departFlightRow'><td>Air Nimbus</td><td>" + flight.number + "</td><td>" + flight.departureLocation + " " + "<span class='departureTime'>" + flight.departureTime + "</span>"+ " - " + flight.destinationLocation + " " +  "<span class='arrivalTime'>" + flight.destinationTime + "</span>"+ "</td><td>$" + flight.price + "</tr>";
    }
  });
}

//search for generated departing flights that match the user's search
var returningFlightSearch = function(selectedDepartureLocation, selectedDestinationLocation) {
  //compares user's departure and destination location to the element we're looking in array
  returningFlights.forEach(function(flight) {
    if(flight.departureLocation === selectedDepartureLocation && flight.destinationLocation === selectedDestinationLocation) {

      //adds text to the table if user's search matches
      matchingFlightText += "<tr class='returnFlightRow'><td>Air Nimbus</td><td>" + flight.number + "</td><td>" + flight.destinationLocation + " " + "<span class='departureTime'>" + flight.destinationTime + "</span>"+ " - " + flight.departureLocation + " " +  "<span class='arrivalTime'>" + flight.departureTime + "</span></td><td></tr>";
    }
  });
}
//generates random number for users seat
function randomSeat () {
  return parseInt(Math.floor(Math.random() * 36 ) + 1);
}
//generates random number for users flight gate
function randomGate () {
  return parseInt(Math.floor(Math.random() * 18 ) + 1);
}

//front-end logic
$(document).ready(function() {
  //generates flights for user
  createDepartingFlights();
  createReturnFlights();
  // beginning of when we submit form
  $("form#flight-search").submit(function(event) {
    event.preventDefault();
    matchingFlightText = "";
    $(".departing-flight-options tr").slice(1).remove();
    // collects user input for searching through list of flights
    var selectedDepartureLocation = $("#depart-location").val();
    var selectedDestinationLocation = $("#destination-location").val();
    var selectedDateDeparture = $("input.departureDate").val();
    var selectedDateArrival = $("input.returnDate").val();
    var selectedNumberOfTravelers = $("#traveler-number").val();

    //search for generated departing flights that match the user's search
    departingFlightSearch(selectedDepartureLocation, selectedDestinationLocation);

    // displaying search results
    $(".departing-flight-options").append(matchingFlightText);


      $("span.departure").text(selectedDepartureLocation);
      $("span.destination").text(selectedDestinationLocation);
      $("span.departure2").text(selectedDestinationLocation);
      $("span.destination2").text(selectedDepartureLocation);
      $("span.date1").text(selectedDateDeparture);
      $("span.date2").text(selectedDateArrival);
      $(".flightChoose").show();
      $(".flightSelection").hide();


    $("tr.departFlightRow").click(function() {
      matchingFlightText = "";
      var flightType = $("input:radio[name=trip]:checked").val();
      if (flightType === "roundTrip") {

        returningFlightSearch(selectedDepartureLocation, selectedDestinationLocation);
        $(".return-flight-options").append(matchingFlightText);
        var number1 = $(this).children(":nth-child(2)").text();
        var departureTime = $(this).children(":nth-child(3)").children(":nth-child(1)").text();
        var landingTime = $(this).children(":nth-child(3)").children(":nth-child(2)").text();
        var chosenFlight = new Flight(number1, departureTime);
        $("span#flightNumber1").text(number1);
        $("span#departTime1").text(departureTime);
        $("span#landTime1").text(landingTime);
        $(".flightChoose2").show();
        $(".flightChoose").hide();


        $("tr.returnFlightRow").click(function() {
          matchingFlightText = "";
          var number2 = $(this).children(":nth-child(2)").text();
          var departureTime2 = $(this).children(":nth-child(3)").children(":nth-child(1)").text();
          var landingTime2 = $(this).children(":nth-child(3)").children(":nth-child(2)").text();
          var chosenFlight2 = new Flight(number2, departureTime2);
          $("span#flightNumber2").text(number2);
          $("span#departTime2").text(departureTime2);
          $("span#landTime2").text(landingTime2);
          if (selectedNumberOfTravelers === "1") {
            $("#passenger1").hide();
            $("#passenger2").hide();
          } else if (selectedNumberOfTravelers === "2") {
            $("#passenger2").hide();
          }
          $(".passForm").show();
          $(".flightChoose2").hide();
        });
      } else {
        $(".passForm").show();
      }
    });
  });


  //user submits personal info for flight
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
    $(".fullTicket").show();
    $(".passForm").hide();

  });

});
