import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cocktails: [],
      cocktailsToShow: [],
    };
  }
  // Hago una request al endpoint apenas carga el componente
  componentDidMount() {
    fetch(
      'https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=Cocktail_glass'
    )
      .then((response) => response.json())
      .catch((e) => console.log(e))
      .then((data) => {
        // El endpoint solo trae 3 propiedades, mockeo la lista de ingredientes
        let drinksWithIngredients = data.drinks;
        drinksWithIngredients.forEach((element) => {
          element.ingredients = ['Vodka', 'Lemon juice'];
        });
        this.setState({
          cocktails: { drinks: drinksWithIngredients },
          cocktailsToShow: data,
        });
      });
  }

  // Uso el evento change para manipular la lista de cocktails en vivo
  changeHandler = (e) => {
    const userInputID = e.target.value;

    const cocktailList = this.state.cocktails.drinks;
    if (userInputID) {
      const newList = cocktailList.filter((x) => {
        return x.idDrink.includes(userInputID);
      });
      this.setState({
        cocktailsToShow: {
          drinks: [...newList],
        },
      });
    } else {
      this.setState({
        cocktailsToShow: this.state.cocktails,
      });
    }
  };

  submitHandler = (e) => {
    e.preventDefault();
  };

  result = () => {
    const data = this.state.cocktailsToShow.drinks;
    if (data) {
      return data.map((cocktail) => (
        <div className="main-card" key={cocktail.idDrink}>
          <img
            src={cocktail.strDrinkThumb}
            alt="cocktails"
            height="200"
            width="200"
          />
          <h2 className="main-title">{cocktail.strDrink}</h2>
          <p className="main-ing">
            Ingredients:
            {cocktail.ingredients.map((x) => (
              <div> {x} </div>
            ))}
          </p>
        </div>
      ));
    }
  };

  render() {
    return (
      <>
        <div className="main-container">
          <form onSubmit={this.submitHandler}>
            <div className="search-container">
              <input
                type="search"
                className="search-field"
                onChange={this.changeHandler}
              />
              <button className="submit-btn">SEARCH COCKTAILS</button>
            </div>
          </form>
        </div>
        {this.result()}
      </>
    );
  }
}

export default App;
