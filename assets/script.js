$(document).ready(function(){
    var eventDiv = $("#event-div");
    eventDiv.empty();
    
    $('#search-btn').click(function(){
        $(".card").removeClass("is-hidden");
        var city = $('#search-bar').val();
        var state = $("#city-state").val();
        $('#search-bar').empty();
        $('#city-name').empty();
        $('#obs').empty();
        $("#city-name").append(city + "," + state).val();
        const aeris = new AerisWeather('HEfYwdO02yETMJe9NBZ3T', 'FMCogyv4t0bjMRYDn5pqOeFIorgecFqvxGcl3SP0');


        aeris.api().endpoint('observations').place(city + "," + state).get().then((result) => {
        const data = result.data.ob;
        document.getElementById('obs').innerHTML = `The current weather is ${data.weatherPrimary.toLowerCase()} and ${data.tempF} degrees.`;
        });

    $.ajax({
        url: "https://api.predicthq.com/v1/places?&q=" + $('#search-bar').val() + "," + state ,
        method: "GET",
        headers: {
            "Authorization": "Bearer pO-fSqOnuaIupI-tTOgNOf_2X8mKH7fL3Z0IPopj"
        }
    }).then(function (response) {
            $("#city-name").append(city).val();
            
            eventDiv.empty();
            console.log(response);
            var cityID = response.results[0].id;
            var city = $('#search-bar').val();
            $.ajax({
                url: "https://api.predicthq.com/v1/events?place.scope=" + cityID + "&category=" + $('#category').val(),
                method: "GET",
                headers: {
                    "Authorization": "Bearer pO-fSqOnuaIupI-tTOgNOf_2X8mKH7fL3Z0IPopj"
                }
            }).then(function (response) {
                function createCard(){
                    if (title){
                        eventDiv.append("<h3><strong>" + title + "</strong></h3>");
                    }
                    if (time){
                        eventDiv.append("<span>"+ time + "</span>");
                    }
                    if(description){
                    eventDiv.append("<p>"+ description + "</p>");
                    }
                    if(venue){
                        eventDiv.append("<p>"+ venue + "</p>");
                    }
                    else if(!venue){
                        eventDiv.append("<p>no venue listed</p>");
                    }    
                    $(".content").prepend(eventDiv);
                    

                }

                console.log(response);
                var searchResults = response.results;

                for(var i = 0; i < searchResults.length; i ++){
                    var eventDiv = $("#event-div");
                    var newResult = searchResults[i];
                    var title = newResult.title; 
                    var time = newResult.start;
                    var description = newResult.description;
                    var venue = "";
                    if (newResult.entities[0]){
                        venue =  newResult.entities[0].name;
                    }
                    createCard();
                }
            });
        }); 
    }); 
}); 