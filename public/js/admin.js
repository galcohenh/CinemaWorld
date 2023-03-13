const onCreateMovie = () =>{
    const name = document.getElementById('name').value;
    const releaseDate = document.getElementById('release-date').value;
    const genre = document.getElementById('genre').value;
    const duration = document.getElementById('duration').value;
    const imgUrl = document.getElementById('img-url').value;

    const time = document.getElementById('time').value;
    const hall = document.getElementById('hall').value;
    // const video = document.getElementById('video-url').value;
    // const screens = document.getElementById('screens').value;


    const data = {
        name,
        releaseDate,
        genre: genre.split(','),
        duration: parseInt(duration),
        img: imgUrl,
        screens: [{
            time: time,
            hall: {number: parseInt(hall)},
            takenSeats: [{}],
            
        }]
    }

    fetch('http://localhost:8080/api/movies', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json',
        }
    })
    // console.log({name, releaseDate, genre, duration, imgUrl, screens})
}