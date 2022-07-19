
import React, {Component} from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Chip from 'material-ui/Chip';

class GameItem extends Component {
    render() {
        var genres = this.props.data.genre.split(',');
        var genrelist = genres.map(function (genre, index) {
            return (
                <Chip key={index} style={{margin: '5% 0 5% 0'}}>{genre}</Chip>
            );
        }, this);

        return (
            <div className="pack">
            <Card style={{flex:1, background: "linear-gradient(#ffccff,#ff99cc)",borderRadius: 50, fontFamily:"Serif"}}>
                <CardHeader
                    title={this.props.data.title}
                    actAsExpander={false}
                    showExpandableButton={false}
                /> 
                
                <CardHeader>
                <div><strong>Platform:</strong> &nbsp;{this.props.data.platform}</div>
                </CardHeader>
                <CardText>
                    <strong>Score:</strong> &nbsp;&nbsp; {this.props.data.score} / 10
                </CardText>
                <CardText color='black'>
                    <div> <strong>Genre:</strong>{this.props.data.genre !== '' && genrelist} </div>
                    <div className='edit'>
                    {this.props.data.editors_choice === 'Y' && <strong>Editors Choice</strong> }
                    </div>
                </CardText>
            </Card>
            </div>
        );
    }
}

export default GameItem;