//Create Array
//function displayBandData() {
// var favBand = [""];
$("document").ready(function () {
    //string for bands
    var favBands = ["The Killers", "David Bowie", "The Beatles", "Pink Floyd", "Paramore"];

    function displayBandInfo() {
        var band = $(this).attr("data-band");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + band + "&api_key=rKG0A9jhIHcf9NmF8DCZndPZQeDnW7pr&limit=10";
        console.log(queryURL);
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                var results = response.data;
                console.log(results);
                //for loop of results from buttons/searches
                for (var i = 0; i < results.length; i++) {
                    //variables used in for loop
                    var gifDiv = $("<div class='item'>");
                    var rating = results[i].rating;
                    var p = $("<p>").text("Rating: " + rating);
                    //variables to make gif dynamic
                    var imageAnimate = results[i].images.fixed_height.url;
                    var imageStatic = results[i].images.fixed_height_still.url;
                    var bandImage = $("<img>");

                    bandImage.addClass("musicGiphy")
                    // Attributes
                    bandImage.attr("src", imageStatic);
                    bandImage.attr("data-state", "still");
                    bandImage.attr("data-still", imageStatic);
                    bandImage.attr("data-animate", imageAnimate);



                    //   gifDiv.prepend(button)
                    gifDiv.prepend(p);
                    gifDiv.prepend(bandImage);
                    $("#gifsHere").prepend(gifDiv);
                }
            });

    }
    // //Change gif status upon click


    // })

    // Function for displaying band data
    function renderButtons() {

        // Deletes the bands prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttonsHere").empty();
        // Loops through the array of bands
        for (var i = 0; i < favBands.length; i++) {

            // Then dynamicaly generates buttons for each band in the array
            // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
            var a = $("<button>");
            // Adds a class of bandName to our button
            a.addClass("bandName");
            // Added a data-attribute
            a.attr("data-band", favBands[i]);
            // Provided the initial button text
            a.text(favBands[i]);
            // Added the button to the buttonsHere div
            $("#buttonsHere").append(a);
        }
    }

    // This function handles events where the add band button is clicked
    $("#addGif").on("click", function (event) {
        event.preventDefault();
        // This line of code will grab the input from the textbox
        var userBand = $("#bandInput").val().trim();

        // The band from the textbox is then added to our array
        favBands.push(userBand);

        // Calling renderButtons which handles the processing of the band array
        renderButtons();
    });

    $(document).on("click", ".bandName", displayBandInfo);
    // Calling the renderButtons function to display the intial buttons
    renderButtons();




    $("#gifsHere").on("click", ".musicGiphy", function () {
        var state = $(this).attr("data-state");
        console.log("Wazzzzup");
        if (state == "still") {
            var dataAnimate = $(this).attr("data-animate")
            $(this).attr("src", dataAnimate);
            $(this).attr("data-state", "animate");
        }
        else if (state == "animate") {
            var dataStill = $(this).attr("data-still")
            $(this).attr("src", dataStill);
            $(this).attr("data-state", "still");
        }
    });
})

