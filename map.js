var map;
var feature;
var popup;
var range = $('#demo').text();
var arrow;






$(".a_risultati").append('test'); //
$('div.results:empty').hide();

$("#addr").keyup(function(event) {
    if (event.keyCode === 13) {
        $("#searchicon").click();
    }
});


    
  

function load_map() { 


    map = L.map('mapid').setView([41.9055688, 12.4659426], 13);

    $('.leaflet-top').removeClass('leaflet-top').addClass('leaflet-bottom');
    $('.leaflet-left').removeClass('leaflet-left').addClass('leaflet-right');

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        maxZoom: 18,
        id: 'mapbox.streets'
    }).addTo(map);

    $('#search')
        .append('<div id="lookup"></div>');

    $('#mouse-coord').hide()
    map.on('click', function (e) { 
        $('#mouse-coord').html('<span class="coord">φ  </span>' + e.latlng.lat + "\t" + '<span style = "margin-left: 7px;" class="coord">λ  </span>' + e.latlng.lng); addr_lookup(e.latlng); 
        $(".lastp").css({"font-size": "11px;","margin-bottom": "3px !important;"});
        $('#mouse-coord').show()
    });

    }

    


var circle = null;
var popup = L.popup()
var marker = null;

var x = document.getElementById("demo1");
		
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
        if (marker !== null)
        {map.removeLayer(marker)
        }
        if (markerlookup !== null)
        {map.removeLayer(markerlookup)
        }
        if (circle !== null)
        {map.removeLayer(circle)
        }
    
        marker = L.marker([position.coords.latitude, position.coords.longitude]).addTo(map);

    } 
}

function showPosition(position) {
    map.panTo(L.latLng(position.coords.latitude, position.coords.longitude));

    if (marker !== null)
        {map.removeLayer(marker)
        }
    
        marker = L.marker([position.coords.latitude, position.coords.longitude]).addTo(map);

        
        
        }



function pan(lat, lng) { //

    
    function showPosition(position) {
        x.innerHTML = "Latitude: " + position.coords.latitude + 
        "<br>Longitude: " + position.coords.longitude;
    }

    map.panTo(L.latLng(lat, lng));
    if (markerlookup !== null)
    {map.removeLayer(markerlookup)}

    

    if (marker !== null)
    {map.removeLayer(marker)}
    marker = L.marker([lat, lng]).addTo(map);

    if (circle !== null)
    { map.removeLayer(circle)}
    circle = L.circle([lat, lng], {radius: range}).addTo(map);
    
    

    if ($('.search-scope') !== null)
    { $('.search-scope').remove()}
    $('#search').append("<div class='search-scope boxstyle'><div class='rangediv'><p>Range <span class='coord'>(km)</span></p><p id='demo'></p></div><input type='range' min='1' max='100' value='1' class='slider' id='myRange'></div>")
    

    var slider = document.getElementById("myRange");
    var output = document.getElementById("demo");

    output.innerHTML = slider.value;

    
    
  
    slider.oninput = function() {
    output.innerHTML = this.value/10;
    circle.setRadius(this.value*10); // Sets the radius of the circle to be the value of the slider
    if (slider.value > 1){
        $('.leaflet-marker-pane').fadeOut(200)
    } else {
        $('.leaflet-marker-pane').fadeIn(200)
    }
    }

   

    function clickCircle(e) {
    var clickedCircle = e.target;
    }
   
}

  
  
$('#loader').css('opacity','0');


function addr_search() {
    $('#loader').css('opacity','1');
    $('#searchicon').css('opacity','0');

    var inp = document.getElementById("addr");

    $.getJSON('https://nominatim.openstreetmap.org/search?format=json&limit=5&email=info@dataninja.it&q=' + inp.value, function (data) {
        var items = [];

        $.each(data, function (key, val) {
            bb = val.boundingbox;
            items.push("<li class='a_risultati'><div class='position_name'><a href='#' onclick='pan(" + val.lat + "," + val.lon +");'>" + val.display_name + '</a></div><p><span class="coord">φ</span> '+val.lat+'\t <span class="coord">λ</span> '+val.lon+'</p></li>');
        });

        $('#results').empty();
        if (items.length != 0) {

            $('<ul/>', {
                'class': 'my-new-list',
                html: items.join('')
            }).appendTo('#results');
            $('<div class="gradient" id="gradientid"></div').appendTo('#results');
            $('<a id="arrowbutton" class="arrow arrowon" type="button" value="click" onclick="arrowanimation()"><img src="./Images/arrow.svg"></img></a>').appendTo('#results');
        } else {
            $('<p class="noresultsp">No results found, please try again!</p>').appendTo('#results');
        }
        $('#loader').css('opacity','0');
        $('#searchicon').css('opacity','1');
        
    });
}

var markerlookup = {};

function addr_lookup(coord) {
    $('.leaflet-marker-pane').fadeIn(200)
    $('.my-new-list1').remove();
    $('#results').empty();

    $.getJSON('https://nominatim.openstreetmap.org/reverse?format=json&zoom=10&email=info@dataninja.it&lat=' + coord.lat + '&lon=' + coord.lng, function (data) {
        var items = [];
        items.push("<li>" + data.display_name);

 

        map.removeLayer(markerlookup)
        markerlookup = L.marker([coord.lat, coord.lng]).addTo(map);

        if (circle !== null)
        { map.removeLayer(circle)}
        circle = L.circle([coord.lat, coord.lng], {radius: range}).addTo(map);
        
        
        

        if ($('.search-scope') !== null)
        { $('.search-scope').remove()}
        $('#search').append("<div class='search-scope boxstyle'><div class='rangediv'><p>Range <span class='coord'>(km)</span></p><p id='demo'></p></div><input type='range' min='1' max='100' value='1' class='slider' id='myRange'></div>")
        

        var slider = document.getElementById("myRange");
        var output = document.getElementById("demo");

        output.innerHTML = slider.value;

        
        
    
        slider.oninput = function() {
        output.innerHTML = this.value/10;
        circle.setRadius(this.value*10); // Sets the radius of the circle to be the value of the slider
        if (slider.value > 1){
            $('.leaflet-marker-pane').fadeOut(200)
        } else {
            $('.leaflet-marker-pane').fadeIn(200)
        }
        }

        
        
    
     
        if (data.display_name) { 
            $('<ul/>', {
                'class': 'my-new-list1',
                html: items.join('')
            }).appendTo('.lastclick');
            $('.my-new-list1').prependTo('.lastclick');
            $('.lastp').prependTo('.lastclick');
            
        } else {
            $('<ul>').text('No results found, please try again!').addClass('my-new-list1').prependTo('.lastclick');
            $('.lastp').prependTo('.lastclick');
           
        }
        if (marker !== null){
         map.removeLayer(marker)
         

        }
    });

    console.log(range)
}





var box = document.getElementById("results");


function arrowanimation() {
    
    box.classList.toggle("arrowlarge");

    if($('#results').hasClass('arrowlarge')){
        $('#gradientid').removeClass('gradient')  
        $('#arrowbutton').removeClass('arrowrotateless')
        $('#arrowbutton').addClass('arrowrotateplus')
        $('.arrow').removeClass('arrowon')
     } else {
        $('#gradientid').addClass('gradient')  
        $('#arrowbutton').removeClass('arrowrotateplus')
        $('#arrowbutton').addClass('arrowrotateless')
        $('.arrow').addClass('arrowon')
     }
    
    }


window.onload = load_map;
