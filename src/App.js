import React, {Component} from 'react';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value:'',
            seriesList: [],
            seriesEpisodesList: []
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event)
    {
        this.setState({value: event.target.value});
    }
    componentDidMount() {


        fetch('seriesList.json',{})
            .then(response => response.json())
            .then(seriesListDepuisFichier => {
                this.setState({seriesList: seriesListDepuisFichier});

            });
        fetch('seriesEpisodesList.json',{})
            .then(response => response.json())
            .then(seriesEpisodesListDepuisFichier => {
                this.setState({seriesEpisodesList: seriesEpisodesListDepuisFichier});

            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                alert("j'ai fait ce que j'ai pu");
            });

    }

    render() {
        return (
            <div>
                <label>
                    Name:
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <ul>
                    {this.state.seriesList.length ?
                        this.state.seriesList.map(item => <li key={item.id}>{item.seriesName}</li>)
                        : <li>Loading...</li>
                    }
                    {this.state.seriesEpisodesList.length ?
                        this.state.seriesEpisodesList.map(item => <li key={item.serie_id}>{item.episodeName}</li>)
                        : <li>Loading...</li>
                    }
                </ul>
            </div>
        )
    }
}


export default App;
