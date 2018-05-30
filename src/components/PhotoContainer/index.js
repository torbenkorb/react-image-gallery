import React, { Component } from 'react';
import APIKey from '../../config.js';


class PhotoContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            images: [],
            isLoading: false
        }
    }

    // On initial load and props change the data will be fetched and displayed
    componentWillMount() {
        const term = this.props.match.params.term;
        this.fetchData(term);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.match.params.term !== this.props.match.params.term) {
            const term = nextProps.match.params.term;
            this.fetchData(term);
        }
    }

    // Fetch the data from the Flickr API and save in the state
    fetchData = term => {
        this.setState({isLoading: true});
        return fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&tags=${term}&api_key=${APIKey}&format=json&nojsoncallback=1&per_page=20`)
        .then(res => res.json())
        .then(data => {
            this.setState({
                images: data.photos.photo,
                isLoading: false
            });
        });
    }

    render() {
        const term = this.props.match.params.term;
        const hasResults = this.state.images.length > 0;
        const isLoading = this.state.isLoading;
        const images = this.state.images;

        return (
            <div className="photo-container">
                {isLoading && <h3>Loading...</h3>}
                {hasResults && !isLoading && <h2>{term} Images</h2>}
                <ul>
                    {hasResults && !isLoading &&
                        images.map((result, index) => {
                            const { farm, secret, server, id, title } = result;
                            return (
                                <li key={index}><img src={`https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`} alt={title} /></li>
                            );
                        })
                    }
                    {!hasResults && !isLoading &&
                        <li className="not-found">
                            <h3>No Results Found</h3>
                            <p>You search did not return any results. Please try again.</p>
                        </li>
                    }
                </ul>
            </div>
        );
    }


}

export default PhotoContainer;
