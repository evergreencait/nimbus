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



//front-end logic
