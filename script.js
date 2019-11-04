$.ajax({
    url: "https://api.predicthq.com/v1/places?&q=" + city,
    method: "GET",
    headers: {
      "Authorization": "Bearer TV3nvxQ22JQnqlWiIJzMa3wvh5wRBwCwMHUqdueb"
    }
  }).then(function (response) {
    console.log(response);
    var cityID = response.results[0].id;
    $.ajax({
      url: "https://api.predicthq.com/v1/events?place.scope=" + cityID + "&category=sports",
      method: "GET",
      headers: {
        "Authorization": "Bearer TV3nvxQ22JQnqlWiIJzMa3wvh5wRBwCwMHUqdueb"
      }
    }).then(function (response) {
      console.log(response);
      
    });
  });