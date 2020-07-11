import React, { Component } from "react";
import axios from "axios";
import Card from "./Card";
import "./Deck.css";

const API_BASE_URL = "http://deckofcardsapi.com/api/deck";

class Deck extends Component {
  state = {
    deck: null,
    drawn: [],
  };

  async componentDidMount() {
    let deck = await axios.get(`${API_BASE_URL}/new/shuffle/`);
    this.setState({ deck: deck.data });
  }

  getCard = async () => {
    let id = this.state.deck.deck_id;
    //make a request using deck id
    try {
      let cardUrl = `${API_BASE_URL}/${id}/draw`;
      let cardRes = await axios.get(cardUrl);
      if (!cardRes.data.success) {
        throw new Error("No cards remaining.");
      }
      let card = cardRes.data.cards[0];
      // set state using new card info from api
      this.setState((state) => ({
        drawn: [
          ...state.drawn,
          {
            id: card.code,
            image: card.image,
            name: `${card.value} of ${card.suit} `,
          },
        ],
      }));
    } catch (error) {
      alert(error);
    }
  };

  render() {
    const cards = this.state.drawn.map((c) => (
      <Card key={c.id} name={c.name} image={c.image} />
    ));
    return (
      <div className="Deck">
        <h1 className="Deck-title">♦ Card Dealer ♦</h1>
        <h2 className="Deck-title subtitle">
          ♦ A little demo made with React ♦
        </h2>
        <button className="Deck-btn" onClick={this.getCard}>Get Card!</button>
        <div className="Deck-card-area">{cards}</div>
      </div>
    );
  }
}

export default Deck;
