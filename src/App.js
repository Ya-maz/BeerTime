import React from 'react';
import Layout from './hoc/Layout';
import Registration from './containers/Registration/Registration';
import Main from './containers/Main/Main';

class App extends React.Component {

  state = {
      menu: false,
      beers: [],
    }

  onToggleHandler = () => {
      this.setState({
          menu: !this.state.menu
      })
  }

  componentDidMount() {
    const items = []
    fetch('https://api.punkapi.com/v2/beers')
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Request failed!');
    })
    .then(jsonResponse => jsonResponse.splice(0,5))
    .then(arr => {
      arr.forEach(element => {
        items.push({
          id: element.id,
          name: element.name,
          tagline: element.tagline,
          description: element.description,
          imageUrl: element.image_url, 
          abv: element.abv, //alcohol by volume
          ibu: element.ibu, //international bittering unit
          ebc: element.ebc, //color Units Ebc (European Brewery Convention) 
          food_pairing: element.food_pairing
        })
        
      })
      return items
    }).then(items => {
        this.setState(() => {
          return {beers: items }
        })
        
    })
    .catch(networkError => console.log(networkError.message));
  }

  render () {
    return (
      <Layout isOpen={this.state.menu} onToggle={this.onToggleHandler}>
          <Main beers={this.state.beers}/>
        <Registration isOpen={this.state.menu} onToggle={this.onToggleHandler}/>  
      </Layout>
    );
  }
}

export default App;
