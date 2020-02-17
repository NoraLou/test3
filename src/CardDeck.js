import React, {Component} from 'react';
import axios from 'axios';
import Card from './Card';
const API_DECK = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';
const API_BASE = 'https://deckofcardsapi.com/api/deck/';

class CardDeck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck : null,
      remaining : null,
      inPlay : []
    }
    this.getCard = this.getCard.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }
  async componentDidMount() {
    let deck = await axios.get(API_DECK);
    this.setState({deck: deck.data});
  }

  async getCard(deckID){
    let response = await axios.get(`${API_BASE}${deckID}/draw/?count=1`);
    let cardResponse = response.data;
    let card = cardResponse.cards[0];
    let { remaining } = cardResponse;
    let updatedDeck = [...this.state.inPlay];
    updatedDeck.push(card);
    this.setState({
      remaining,
      inPlay : updatedDeck
    })
  }

  handleClick(evt) {
    let deckID = this.state.deck ? this.state.deck.deck_id : null;
    this.getCard(deckID);
  }

  render() {
    const {inPlay} = this.state;

    return (
      <div>
        <h5>What is the next code project you want to get excited about ? </h5>
        <button onClick={this.handleClick}>Draw New Card</button>
        <div>
          {inPlay.map(card => (
            <Card
              value={`${card.suit}${card.value}`}
              key={card.code}
              id={card.code}
              imgSrc={card.image}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default CardDeck;