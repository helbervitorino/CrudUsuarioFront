import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ListaUsuario from './components/ListaUsuario'
import GraficoPizza from './components/GraficoPizza'
import GraficoLine from './components/GraficoLine';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div class="container">
          <div class="row">
            <div class="row">
              <div class="col">
                <h2 className="tituloGraficoPizza">Sistemas Operacioanis</h2>
                <GraficoPizza />
              </div>
              <div class="col">
                <h2 className="tituloGraficoLinha">Cadastros por dia</h2>
                <GraficoLine />
              </div>
              <div class="col">
                <h2 class="tituloCadastro">Cadastro de Usuários</h2>
                <ListaUsuario />
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
