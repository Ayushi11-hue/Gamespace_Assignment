import React, {Component} from 'react';

import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';
import GameItem from './GameItem';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apiData: [],
            gameNames: [],
            games: [],
            sort: ''
        };

        this.search = this.search.bind(this);
        this.sortbyscore = this.sortbyscore.bind(this);
    }

    componentDidMount() {
        var self = this;

        fetch('https://s3-ap-southeast-1.amazonaws.com/he-public-data/gamesarena274f2bf.json')
            .then(
                function (response) {
                    if (response.status !== 200) {
                        return;
                    }

                    response.json().then(function (data) {
                        data.shift();
                        self.setState({
                            apiData: data,
                            games: data
                        });
                    });
                }
            )
            .catch(function (err) {
            });
    }

    search(query) {
        var games = [];
        var gameNames = [];

        this.state.apiData.forEach(function (game) {
            if (game.title.toLowerCase().indexOf(query.toLowerCase()) >= 0) {
                games.push(game);
                gameNames.push(game.title);
            }
        });

        this.setState({
            games: games,
            gameNames: gameNames,
        });
    }

    sortbyscore() {
        if (this.state.sort === "") {
            var games = this.state.games.sort(scoreComparator);
            this.setState({
                games: games,
                sort: 'asc',
            });
        } else if (this.state.sort === 'asc'){
            this.setState({
                games: this.state.games.reverse(),
                sort: 'dsc',
            });
        } else {
            this.setState({
                games: this.state.games.reverse(),
                sort: 'asc',
            });
        }
    }

    render() {
        var GameList = this.state.games.map(function (game, index) {
            return (
                <GameItem key={index} data={game}/>
            );
        }, this);

        return (
            <div>
                <center>
                    <div className="margin-pack">
                        <AutoComplete
                            hintText="Search..."
                            dataSource={this.state.gameNames}
                            onUpdateInput={this.search}
                            listStyle={{maxHeight: 200, overflow: 'auto'}}
                        />
                        <RaisedButton className="margin-pack" label={(this.state.sort === "" && "Rating Sort") || (this.state.sort === "asc" && "Rating Sort (10 to 1)") || (this.state.sort === "dsc" && "Rating Sort (1 to 10)")} primary={true} onClick={this.sortbyscore} />
                    </div>
                </center>
                <div className="margin-pack flex-box">{GameList}</div>
            </div>
        );
    }
}

export default App;

function scoreComparator(a, b) {
    return parseInt(a.score, 10) - parseInt(b.score, 10);
}