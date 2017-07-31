
      // Initial buttons
      var classicDisneyMovies = ["Snow White & the Seven Dwarfs", "Bambi", "Jungle Book", "Aladdin", "The Little Mermaid", "The Lion King", "Mulan", "Cinderella", "101 Dalmatians", "Fox and the Hound", "Peter Pan", "Sleeping Beauty", "Lady and the Tramp", "Alice in Wonderland", "Beauty and the Beauty", "Pinocchio", "Pocahontas", "Dumbo"];

      // Function for displaying data
      function renderButtons() {

        // Deleting the buttons prior to adding new buttons
        $("#buttons-view").empty();


        // Looping through the array
        for (var i = 0; i < classicDisneyMovies.length; i++) {

          // Then dynamicaly generating buttons for each movie in the array.
          var button = $("<button>");
          // Adding a class
          button.addClass("movie");
          // Adding a data-attribute with a value of the movie at index i
          button.attr("data-name", classicDisneyMovies[i]);
          // Providing the button's text with a value of the movie at index i
          button.text(classicDisneyMovies[i]);
          // Adding the button to the HTML
          $("#buttons-view").append(button);
        }
      }

      // Event on click
      $("#add-buttons").on("click", function(event) {
        event.preventDefault();

        // Saves the input to a variable
        var movie = $("#buttons-input").val().trim();
        classicDisneyMovies.push(movie);
        renderButtons();
      });

      
  
      // Display the initial list of movies
      renderButtons();


      $(document).on("click", ".movie", function() {

        $(".gif-view").empty();

        var movieSelect = $(this).attr("data-name");
        var giphyUrl = "http://api.giphy.com/v1/gifs/search?api_key=3562a99d04ea4cc4a7c4cde52fa66a4e&limit=10&q=" + movieSelect;

        $.ajax({
          url: giphyUrl,
          method: "GET"

        }).done(function(response) {

        for (var i = 0; i < 10; i++) {
    
          gifAnimate = response.data[i].images.fixed_height.url;
          gifStill = response.data[i].images.fixed_height_still.url;
          gifRating = response.data[i].rating;
          

          // Creating and storing an image tag
          var gifImage = $("<img>");

          // Setting the catImage src attribute to imageUrl
          gifImage.attr("src", gifAnimate);
          gifImage.attr("alt", "gif image");
          gifImage.attr("gif-state", "animate");
          gifImage.attr("class", "gif");
          gifImage.attr("gif-still", gifStill);
          gifImage.attr("gif-animate", gifAnimate);


        
          $(".gif-view").append(gifImage, "Rating: ", gifRating);


          }

        });




      });


      $(document).on("click", ".gif", function(){


        var state = $(this).attr("gif-state"); 

        if (state === "still") {


        var temp = $(this).attr("gif-animate");



        $(this).attr("src", temp); 
        $(this).attr("gif-state", "animate"); 



        }

        else {

        var temp = $(this).attr("gif-still");
        
        $(this).attr("src", temp);
        $(this).attr("gif-state", "still");         



        }


      });
      
   

        



  