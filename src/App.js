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
        /*this.handleChange = this.handleChange.bind(this);*/
    }

    handleChange = (event) => {
     this.setState({value: event.target.value});
    };


    /*handleChange(event)
    {
        this.setState({value: event.target.value});
    }*/
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
            <div className="react-caca">
                <h1 className="title">REACT CACA</h1>
                <input className="input-caca" placeholder={"Type something"} type={"text"} value={this.state.value} onChange={this.handleChange} />
                <ul>
                    {this.state.value !== "" && (this.state.value.length > 2) ?
                        this.state.seriesList.filter(

                            /*The trim() method removes whitespace from both ends of a string. Whitespace
                            in this context is all the whitespace characters
                            (space, tab, no-break space, etc.) and all the line terminator characters
                            (LF, CR, etc.).*/

                            /*The indexOf() method returns the first index at which a given element
                            can be found in the array, or -1 if it is not present.*/

                            a => a.seriesName.toLowerCase().trim().indexOf(this.state.value) > -1
                        ).map(item =>
                            <li> <div className="serie-name" key={item.id}>{item.seriesName}</div>
                                <ul>
                                    {
                                        this.state.seriesEpisodesList.filter(
                                            b => b.serie_id === item.id
                                        ).map(ListEpisode => ListEpisode.episodes_list.filter(
                                            c => c.episodeName
                                            ).map(ListEpisodeName => <li className="episode-name">{ListEpisodeName.episodeName}</li>)
                                        )
                                    }
                                </ul>
                            </li>)
                        : <li>LMGIFY</li>
                    }
                </ul>
            </div>
        )
    }
}


export default App;
