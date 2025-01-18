const axios = require('axios');
const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    const url = 'https://api.themoviedb.org/3/movie/516729?api_key=4ca94f8b470d7e34bd3f59c3914295c8';
    

    axios.get(url)
        .then(response => {
            let data = response.data;
            let releaseDate = new Date(data.release_date).getFullYear();

            let genresToDisplay = '';
            data.genres.forEach(genre => {
                genresToDisplay += `${genre.name}, `;
            });
            genresToDisplay = genresToDisplay.slice(0, -2) + '.'; // Eemalda viimane koma ja tühik

            const posterUrl = `https://image.tmdb.org/t/p/w600_and_h900_bestv2${data.poster_path}`;

            let currentYear = new Date().getFullYear();

            res.render('index', {
                dataToRender: data,
                year: currentYear,
                releaseYear: releaseDate,
                genres: genresToDisplay,
                poster: posterUrl
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            res.status(500).send('An error occurred while fetching data.');
        });
});

app.listen(process.env.PORT || 3000, () => {
    console.log('server is running');
});