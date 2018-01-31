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

            })

            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                /*alert("falcon");*/
            });

        fetch('seriesEpisodesList.json',{})
            .then(response => response.json())
            .then(seriesEpisodesListDepuisFichier => {
                this.setState({seriesEpisodesList: seriesEpisodesListDepuisFichier});

            })
            .catch(function (error) {
                console.log(error);
            });


    }

    render() {
        return (
            <div>
                <input type="text" value={this.state.value} onChange={this.handleChange} />
                <ul>
                    {this.state.value !== "" ?
                        this.state.seriesList.filter(
                            a => a.seriesName.toLowerCase().trim().indexOf(this.state.value) > -1
                        ).map(item =>
                            <li key={item.id}>{item.seriesName}
                                <ul>
                                    {
                                        this.state.seriesEpisodesList.filter(
                                            b => b.serie_id == item.id
                                        ).map(episode => episode.episodes_list.filter(
                                            c => c.episodeName
                                            ).map(name => <li>{name.episodeName}</li>)
                                        )
                                    }
                                </ul>
                            </li>)
                        : <li>Loading...</li>
                    }
                </ul>
            </div>
        )
    }
}


export default App;
