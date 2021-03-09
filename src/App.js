import { Component } from "react";
import Buscador from "./componentes/Buscador";
import Resultado from "./componentes/Resutado";


class App extends Component {
  state = {
    termino: '',
    imagenes: [],
    pagina: 1
  }
  paginaAnterior = () => {
    let pagina = this.state.pagina;
    if (pagina === 1) return null;

    pagina -= 1;
    this.setState({ pagina }, () => {
      this.consultarApi();
    })

    console.log('anterior');

  }

  paginaSiguiente = () => {
    let pagina = this.state.pagina;

    pagina += 1;
    this.setState({ pagina }, () => {
      this.consultarApi();
    })

    console.log('siguiente');

  }

  consultarApi = () => {
    const pagina = this.state.pagina;
    const api = `https://pixabay.com/api/?key=1732750-d45b5378879d1e877cd1d35a6&q=${this.state.termino}&per_page=30&page=${pagina}`
    fetch(api)
      .then(respuesta => respuesta.json())
      .then(resultado => this.setState({ imagenes: resultado.hits }))
  }
  datosBusqueda = (termino) => {
    this.setState({
      termino: termino,
      pagina: 1
    }, () => {
      this.consultarApi();
    })
  }


  render() {
    return (
      <div className="app container">
        <div className="jumbotron">
          <p className="lead text-center">Buscador de imágenes</p>
          <Buscador
            datosBusqueda={this.datosBusqueda}
          />
        </div>
        <div className="row justify-content-center">
          <Resultado
            imagenes={this.state.imagenes}
            paginaAnterior={this.paginaAnterior}
            paginaSiguiente={this.paginaSiguiente}
          />
        </div>

      </div>
    );
  }
}

export default App;
