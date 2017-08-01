window.onload = function() {
      
      // Initial list of movie buttons
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

      
      // Function to toggle between still and animate
      function clickAnimate() {

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
      }


      
      // Function to link API
      function ajaxGet() {
        $(".gif-view").empty();
        var movieSelect = $(this).attr("data-name");
        var giphyUrl = "https://api.giphy.com/v1/gifs/search?api_key=3562a99d04ea4cc4a7c4cde52fa66a4e&limit=10&q=" + movieSelect;
        $.ajax({
          url: giphyUrl,
          method: "GET"
        }).done(ajaxDone);
      }


      // Function to run when ajax get is complete
      function ajaxDone(response) {

        for (var i = 0; i < 10; i++) {
    
          gifAnimate = response.data[i].images.fixed_height.url;
          gifStill = response.data[i].images.fixed_height_still.url;
          gifRating = response.data[i].rating;
          
          // Creating and storing an image tag
          var gifImage = $("<div>");
          var imgCreate = $("<img>");
          
          // Setting up attributes and ids.
          gifImage.attr("class", "gifDiv")
          imgCreate.attr("src", gifAnimate);
          imgCreate.attr("alt", "gif image");
          imgCreate.attr("gif-state", "animate");
          imgCreate.attr("class", "gif");
          imgCreate.attr("gif-still", gifStill);
          imgCreate.attr("gif-animate", gifAnimate);

          gifImage.append(imgCreate);
          gifImage.append("<h2>Rating: " + gifRating.toUpperCase());

          $(".gif-view").append(gifImage);
          }

        }

      
      // Display the initial list of movies
      renderButtons();

      // Event on click to add new buttons
      $("#add-buttons").on("click", function(event) {
        event.preventDefault();

      // Saves the input to a variable, add it to movies array, creates new button
      var movie = $("#buttons-input").val().trim();
      classicDisneyMovies.push(movie);
      renderButtons();
      });

      // Click listener to run when a movie button is clicked to retreive GIFs
      $(document).on("click", ".movie", ajaxGet);
      
      // Click listener to run when a gif is clicked to togger still/animate
      $(document).on("click", ".gif", clickAnimate);

}
      
   

        



  