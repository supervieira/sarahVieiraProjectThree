const countries = {
    hot:[
        // Hot, city, budget
        {
            country: 'Cartagena, Colombia',
            environment: 'city',
            cost: 'budget',
            url: './assets/cities/cartagena.jpg'
        },
        {
            country: 'Kotor, Montenegro',
            environment: 'city',
            cost: 'budget',
            url: './assets/cities/kotor.jpg'
        },
        {
            country: 'Mexico City, Mexico',
            environment: 'city',
            cost: 'budget',
            url: './assets/cities/mexico-city.jpg'
        },
        
        // Hot, city, luxury
        {
            country: 'Dubai, UAE',
            environment: 'city',
            cost: 'luxury',
            url: './assets/cities/dubai.jpg'
        },
        {
            country: 'Monte Carlo, Monaco',
            environment: 'city',
            cost: 'luxury',
            url: './assets/cities/monte-carlo.jpg'
        },
        {
            country: 'Santorini, Greece',
            environment: 'city',
            cost: 'luxury',
            url: './assets/cities/santorini.jpg'
        },
        
        // Hot, nature, budget
        {
            country: 'Bacalar, Mexico',
            environment: 'nature',
            cost: 'budget',
            url: './assets/cities/bacalar.jpg'
        },
        {
            country: 'Tayrona, Colombia',
            environment: 'nature',
            cost: 'budget',
            url: './assets/cities/tayrona.jpg'
        },
        {
            country: 'Pai, Thailand',
            environment: 'nature',
            cost: 'budget',
            url: './assets/cities/pai.jpg'
        },
        
        // Hot, nature, luxury
        {
            country: 'The Maldives',
            environment: 'nature',
            cost: 'luxury',
            url: './assets/cities/maldives.jpg'
        },
        {
            country: 'Turks & Caicos',
            environment: 'nature',
            cost: 'luxury',
            url: './assets/cities/turks-and-caicos.jpg'
        },
        {
            country: 'Tahiti',
            environment: 'nature',
            cost: 'luxury',
            url: './assets/cities/tahiti.jpg'
        }
    ],

    cold: [
        // Cold, city, budget
        {
            country: 'La Paz, Bolivia',
            environment: 'city',
            cost: 'budget',
            url: './assets/cities/la-paz.jpg'
        },
        {
            country: 'Santiago, Chile',
            environment: 'city',
            cost: 'budget',
            url: './assets/cities/santiago.jpg'
        },
        {
            country: 'Hanoi, Vietnam',
            environment: 'city',
            cost: 'budget',
            url: './assets/cities/hanoi.jpg'
        },

        // Cold, city, luxury
        {
            country: 'Stockholm, Sweden',
            environment: 'city',
            cost: 'luxury',
            url: './assets/cities/stockholm.jpg'
        },
        {
            country: 'Copenhagen, Denmark',
            environment: 'city',
            cost: 'luxury',
            url: './assets/cities/copenhagen.jpg'
        },
        {
            country: 'Lausanne, Switzerland',
            environment: 'city',
            cost: 'luxury',
            url: './assets/cities/lausanne.jpg'
        },

        // Cold, nature, budget
        {
            country: 'Vogel, Slovenia',
            environment: 'nature',
            cost: 'budget',
            url: './assets/cities/vogel.jpg'
        },
        {
            country: 'Ha Giang, Vietnam',
            environment: 'nature',
            cost: 'budget',
            url: './assets/cities/ha-giang.jpg'
        },
        {
            country: 'Glendalough, Ireland',
            environment: 'nature',
            cost: 'budget',
            url: './assets/cities/glendalough.jpg'
        },

        // Cold, nature, luxury
        {
            country: 'St. Moritz, Switzerland',
            environment: 'nature',
            cost: 'luxury',
            url: './assets/cities/st-moritz.jpg'
        },
        {
            country: 'South Island, New Zealand',
            environment: 'nature',
            cost: 'luxury',
            url: './assets/cities/south-island.jpg'
        },
        {
            country: 'Niseko, Japan',
            environment: 'nature',
            cost: 'luxury',
            url: './assets/cities/niseko.jpg'
        },
    ]
};


$(function () {

    // Create a new array to store the prefered countries in
    // Note: this is defined in the global scope so that multiple event listeners can have access to it
    let resultOptions = [];
    let resultPhotos = [];

    // Create an event listener that will trigger slow scroll to first question when "start" button is clicked
    $('.start').click(function () {
        $('html,body').animate({
            scrollTop: $(".questions").offset().top
        },
            'slow');
    });

    // Create an event listener that will trigger slow scroll to next question when each answer is clicked
    for(let i = 1; i <= 3; i++){
        if(i <=2 ){
            $(`.label${i}`).click(function () {
                $('html,body').animate({
                    scrollTop: $(`.question${i+1}`).offset().top
                },
                    'slow');
            });
        } else{
            $(`.label${i}`).click(function () {
                $('html,body').animate({
                    scrollTop: $(`.submit`).offset().top
                },
                    'slow');
            });
        }
    }

    // Provide a random city suggestion based on the user inputs
    // Function: random integer generator
    function getRandom(arrayLength) {
        return Math.floor(Math.random() * arrayLength);
    }

    // Submit form:
    $('.submitBtn').on('click', function (event) {
        event.preventDefault();

        // Goal: obtain user input
        // (1) Store user's answer in a variable
        // (2) Obtain "checked" radio option from each question
        // Recall: radio buttons are grouped by name - select input by name

        const userSelectedTemp = $('input[name=question1]:checked').val();
        const userSelectedEnvironment = $('input[name=question2]:checked').val();
        const userSelectedCost = $('input[name=question3]:checked').val();

        // Filter our array based on the user's choice:
        const userChoice = countries[userSelectedTemp];
        // The array userChoice contains all cities in cold/hot arrays depending on user's selection
        
        // Select appropriate suggestion from our 'countries' object
        for (let index = 0; index < userChoice.length; index++) {
            // Compare user's selected temp countries (hot/cold, userChoice) with the 'environment' AND 'cost' properties in each corresponding object 
            if (userChoice[index].environment === userSelectedEnvironment 
            &&
            userChoice[index].cost === userSelectedCost)
            {
                resultOptions.push(userChoice[index].country);
                // This will add the name of the country to our resultsObject array if its environment property AND cost property corresponds with the user input

                resultPhotos.push(userChoice[index].url);
                // This will add the photo of the country to our resultsPhotos array if its environment property AND cost property corresponds with the user input
            }
            // Result: we have two newly formed arrays (resultOptions and resultPhotos) that contain all of the countries (and photos of) in our original array that pertain to the user's preferences
        }

        // Make our '.results' section in our HTML visible on our page
        $('.results').css('display', 'flex')

        // Trigger page to scroll down to '.results' section when submit button is clicked
        $('html,body').animate({
            scrollTop: $(".results").offset().top
        },
            'slow');

        // Print to the results section: target our HTML '.results' div        
        // Use the return value from our getRandom() to print
        const randomIndex = getRandom(resultOptions.length);
        const source = `url(${resultPhotos[randomIndex]})`;
        
        $('.random-country').html(`${resultOptions[randomIndex]}`);        
        $('.results').css({
            'backgroundImage': source
        })        
    });


    // When 'generate' button is clicked, loop through our filtered arrays to provide a different answer
    $('.generate').on('click', function () {
        const resultCity = $('.random-country').text();
        const indexOf = resultOptions.indexOf(resultCity);

        if(indexOf === resultOptions.length - 1){
            $('.random-country').html(`${resultOptions[0]}`);

            const source = `url(${resultPhotos[0]})`;

            $('.results').css({
                'backgroundImage': source
            })   
        }
        else{
            $('.random-country').html(`${resultOptions[indexOf + 1]}`);

            const source = `url(${resultPhotos[indexOf + 1]})`;

            $('.results').css({
                'backgroundImage': source
            })  
        }
    })

    // Refresh page when restart button is clicked
    $('.restart').on('click', function(){
        location.reload(true);
    });
});

// Image sources are found in .txt document
