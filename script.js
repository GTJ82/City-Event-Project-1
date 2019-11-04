var city = $(".input").val();
$.ajax({
    url: "https://api.predicthq.com/v1/places?&q=" + city,
    method: "GET",
    headers: {
      "Authorization": "Bearer TV3nvxQ22JQnqlWiIJzMa3wvh5wRBwCwMHUqdueb"
    }
  }).then(function (response) {
    console.log(response);
    var cityID = response.results[0].id;
    var categorySelect = $(".select").val();
    $.ajax({
      url: "https://api.predicthq.com/v1/events?place.scope=" + cityID + "&category=" + categorySelect,
      method: "GET",
      headers: {
        "Authorization": "Bearer TV3nvxQ22JQnqlWiIJzMa3wvh5wRBwCwMHUqdueb"
      }
    }).then(function (response) {
      console.log(response);
      
    });
  });