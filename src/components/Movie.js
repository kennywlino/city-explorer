import React from 'react';

import Carousel from 'react-bootstrap/Carousel';
import MoviePlaceholderImg from  '../assets/jill-marv-N9uGYWS7Bak-unsplash.jpeg';
import './Movie.css';

class Movie extends React.Component {
    render() {
        let movieCarouselComponents = this.props.movieData.data.map(movie => {
           // let imageSrc = movie.poster_path ? movie.poster_path : 'logo512.png';
           let imageSrc = '';
           if (movie.poster_path) {
            imageSrc = movie.poster_path;
           } else if (movie.backdrop_path) {
            imageSrc = movie.backdrop_path;
           } else {
            imageSrc = MoviePlaceholderImg;
           }
            return (
            <Carousel.Item>
                <img 
                    className="dblock w-100"
                    src={imageSrc}
                    alt={movie.title}
                
                />
                <Carousel.Caption>
                    <h2>{movie.title}</h2>
                   <p>{movie.overview}</p>
                </Carousel.Caption>
            </Carousel.Item>
            )});

        return (
            <>
                <Carousel>
                    {movieCarouselComponents}
                </Carousel>
            </>
        );
    }
}


export default Movie;

// <h1>{this.props.movieData.data[0].title}</h1>
// <p>{this.props.movieData.data[0].overview}</p>