$(document).ready(function () {

  
  $.fn.spaceGlow = function () {
    return this.each(function () {
      $(this).hover(
        function () {
          $(this).addClass("highlighted").css("transform", "scale(1.03)");
        },
        function () {
          $(this).removeClass("highlighted").css("transform", "scale(1)");
        }
      );
    });
  };

  
  $.ajax({
    url: "movies.json",
    method: "GET",
    dataType: "json",
    success: function (data) {

      $.each(data, function (index, movie) {
        let movieCard = `
          <div class="movie-card">
            <img src="${movie.poster}" alt="${movie.title} poster">
            <div class="movie-info">
              <h2>${movie.title}</h2>
              <p><strong>Year:</strong> ${movie.year}</p>
              <p><strong>Genre:</strong> ${movie.genre}</p>
              <p><strong>Rating:</strong> ${movie.rating}</p>
              <p><strong>Director:</strong> ${movie.director}</p>
              <p><strong>Summary:</strong> ${movie.summary}</p>
            </div>
          </div>
        `;

        $("#movie-container").append(movieCard);
      });

      
      $(".movie-card").spaceGlow();
    },
    error: function () {
      $("#movie-container").html("<p>Sorry, the movie data could not be loaded.</p>");
    }
  });

});