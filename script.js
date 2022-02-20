http://www.themealdb.com/api/json/v1/1/filter.php?i=chicken%20breast

$(function() {
    $("#search").click(function(e) {
        e.preventDefault();
        let ingredient = $("#ingredient").val();
        console.log(ingredient)
        $.ajax({url:`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`, 
                success: function(data) {
                    console.log(data.meals)
                   if(data.meals) {
                    $(".section2 h1").text(`Showing Results For '${ingredient}'`)
                    $(".food-display-div").html("")
                    $.each(data.meals, function(index, meal) {
                        console.log(meal.strMeal)
                        let html = `<div class="card">
                        <img src="${meal.strMealThumb}">
                        <div class="card-body">
                            <h3>${meal.strMeal}</h3>
                            <button class="card-btn" data-id="${meal.idMeal}">Get Recipe</button>
                        </div>
                    </div>`
                        $(".food-display-div").append(html)
                        $(`button[data-id="${meal.idMeal}"]`).click(function() {
                            $.ajax({url:`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`, 
                            success: function(data) {
                                $.each(data.meals, function(index, meal) {
                                    console.log(meal)
                                $(".modal").html(`
                            <div class="modal-body">
                                <div class="close-div"><button class="close-btn"><b>X</b></button></div>
                               <h2>${meal.strMeal}</h2> 
                               <p class="modal-category">${meal.strCategory}</p>
                               <h3>Instructions:</h3>
                               <p>${meal.strInstructions}</p>
                               <img class="modal-image" src="${meal.strMealThumb}">
                               <h3><a href="${meal.strYoutube}">Watch Video</a></h3>
                            </div>
                        `)
                                })
                            $(".modal").show()
                            $(".close-btn").click(function() {
                                $(".modal").hide()
                            })
                            }
                        })
                        })
                    })
                   }
                   else {
                    $(".food-display-div").html("<h2 style=color: #70012B;>Sorry Cannot Find What You Are Looking For</h2>") 
                   }
                }
        })
        $("#ingredient").val("")
    })

})