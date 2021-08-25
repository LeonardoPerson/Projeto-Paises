import { useState, useEffect } from "react";
import { Header } from "../../Layout/Header";
import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";
import CircularProgress from '@material-ui/core/CircularProgress';

export const Home = () => {
  const menuInicial = ["Região", "Capital", "Língua", "País", "Código de ligação"];
  const masculino = "um";
  const feminino = "uma"
  const valorDefault = "Escolha uma opção";
  const [filtro, setFiltro] = useState("");
  const [paises, setPaises] = useState([]);
  const [escolhaFiltro, setEscolhaFiltro] = useState("")
  const [loading, setLoading] = useState(true);

  const verificaGenero = (valorDoFiltro) => {
    if (valorDoFiltro) {
      setFiltro(valorDoFiltro)
      if (valorDoFiltro === "Região" || valorDoFiltro === "Capital" || valorDoFiltro === "Língua") {
        setEscolhaFiltro(feminino + " " + valorDoFiltro.toLowerCase());
      } else {
        setEscolhaFiltro(masculino + " " + valorDoFiltro.toLowerCase());
      }
    }
  }

  const opcaoSelecionada = (evt) => {
    evt.preventDefault();
    const busca = menuInicial.find(item => item === evt.target.value)
    verificaGenero(busca);
  }

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all")
      .then(res => {
        console.log(res.data)
        setPaises(res.data)
        setLoading(false);
      }).catch(res => {

      })
  }, [])

  const verificaOpcaoEscolhida = () => {

  }

  return (
    <div>
      <Header />
      <div className="d-flex justify-content-around align-items-center flex-wrap col-md-12 p-5">

        <div className="col-md-4 col-sm-12 col-xs-12 mb-5">
          <div className="col-8 text-center">Filtrar por</div>
          <Dropdown className="d-flex justify-content-center">
            <Dropdown.Toggle className="dropdown col-md-8 col-sm-10 col-xs-12">{filtro || valorDefault}</Dropdown.Toggle>
            <Dropdown.Menu className="col-md-8 col-sm-10 col-xs-12">
              {menuInicial.map((item, index) => (
                <Dropdown.Item className="dropdownItem" as="button" key={index} value={item} onClick={opcaoSelecionada}>
                  {item}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <div className="col-md-4 col-sm-12 col-xs-12 mb-5">
          {filtro &&
            <>
              <div className="col-8 text-center">{filtro}</div>
              <Dropdown className="d-flex justify-content-center">
                <Dropdown.Toggle className="dropdown col-md-8 col-sm-10 col-xs-12">Escolha {escolhaFiltro}</Dropdown.Toggle>
                <Dropdown.Menu className="col-md-8 col-sm-10 col-xs-12">
                  {menuInicial.map((item, index) => (
                    <Dropdown.Item className="dropdownItem" as="button" key={index} value={item} onClick={opcaoSelecionada}>
                      {item}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </>
          }
        </div>

        <div className="col-md-4 col-sm-8 col-xs-10 d-flex justify-content-center mb-5">
          <button className="button-pesquisar px-5 py-2">PESQUISAR</button>
        </div>

        {loading ?
          <CircularProgress />
          :
          paises.map((item, index) => (
            <div key={index}>
              <img src={item.flag} alt={`Bandeira do país ${item.name}`} className="img-paises col-md-4 col-sm-12 col-xs-12 mb-5" />
            </div>
          ))}
      </div>
    </div>



  )
}
