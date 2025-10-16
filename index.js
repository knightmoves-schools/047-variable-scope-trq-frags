value = 1;
total = 100;
milesPerHour = 50;
estimatedArrivalTime = 50;

let distanceInMiles = function (value){
    let factor = 1;
    return value * total * factor;
}

document.getElementById("result").innerHTML = distanceInMiles;