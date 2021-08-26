import { Header } from "../../Layout/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';

export const DetalhesPais = (props) => {
  const error = "Informações não encontradas..."
  const nome = props.match.params.name;
  const [atualizaNome, setAtualizaNome] = useState(nome);
  const [paisesDetalhes, setPaisDetalhes] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [vizinhos, setVizinhos] = useState(null);
  const [vizinhosFinal, setVizinhosFinal] = useState([]);
  const arr = []

  const buscaVizinhos = (border) => {
    console.log(border)
    setVizinhos(border.map(item => item.borders))
  }

  //Buscando os detalhes do país -------------------------------------------------------------------------------------
  useEffect(() => {
    setLoading(true)
    if (atualizaNome) {
      axios.get(`https://restcountries.eu/rest/v2/name/${atualizaNome}`)
        .then(res => {
          setPaisDetalhes(res.data)
          buscaVizinhos(res.data)
          setLoading(false)
        }).catch(res => {
          setErrorMessage(error);
          setLoading(false)
        })

    } else {
      setLoading(false)
      setErrorMessage(error)
    }

  }, [atualizaNome])

  //Buscando os vizinhos -------------------------------------------------------------------------------------------
  useEffect(() => {
    setLoading(true)
    console.log(vizinhos)
    if (vizinhos && vizinhos[0].length !=0) {
      vizinhos.map(item1 => item1.map(item2 => {
        axios.get(`https://restcountries.eu/rest/v2/alpha/${item2}`)
          .then(res => {

            setLoading(false)
            console.log(res)
            const flag = res.data.flag
            const getNome = res.data.name
            arr.push({ flag, getNome })
            if (vizinhos[0].length === arr.length) {
              setVizinhosFinal(arr)
            }
          }).catch(res => {
            setLoading(false)
            setErrorMessage(error);
          })
      }
      ))
    } else {
      setLoading(false)
      setErrorMessage(error)
    }
  }, [vizinhos])

  //Atualizando os detalhes do país escolhido ------------------------------------------------------------------------
  const mostraPais = (item) => {
    console.log(item)
    setAtualizaNome(item)
  }

  console.log(errorMessage)
  return (
    <div>
      <Header />
      {loading ?
        <div className="p-5">
          <CircularProgress />
        </div>
        :
        paisesDetalhes && paisesDetalhes.map((item, index) =>
          <div key={index} className="d-flex flex-wrap p-5">
            <img src={item.flag} className="img-paises" />
            <div className="d-flex flex-column p-4">
              <div className="p-1">Nome: {item.name}</div>
              <div className="p-1">Capital: {item.capital}</div>
              <div className="p-1">Região: <Link to={`/${item.region}`}> {item.region} </Link></div>
              <div className="p-1">Sub-região: {item.subregion}</div>
              <div className="p-1">População: {item.population}</div>
              <div className="p-1">Línguas: {item.languages.map(item => item.name)}</div>
            </div>
          </div>
        )
      }

      <div className="textTitle p-5">Países Vizinhos</div>
      <div className="d-flex flex-wrap justify-content-center">
        {loading ?
          <CircularProgress /> :
          vizinhosFinal.length !=0 ? vizinhosFinal.map((item, index) => (
            <div key={index}>
              <button className="button-vizinhos" onClick={() => mostraPais(item.getNome)} alt={`imagem da bandeira do país ${item.getNome}`}>
                <img src={item.flag} className="img-paises bg-light m-3" />
              </button>
            </div>
          )
          )
          :
          (<div className="errorMessage">{errorMessage}</div>)
        }

      </div>
    </div>
  )
}