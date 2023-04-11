import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import './style.css'
import api from '../../services/api'

function Filme() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFilme() {
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: "347373edaa5c456f717b6eaea534f068",
                    language: "pt-BR",
                }
            })
                .then((response) => {
                    setFilme(response.data);
                    setLoading(false);
                })
                .catch(() => {
                    console.log("FILME NÂO ENCONTRADO");
                    navigate('/', {replace: true});
                    return;
                })
        }
        loadFilme();

        return () => {
            console.log("COMPONENTE FOI DESMONTADO")
        }
    }, [navigate, id])

     function salvarFilme() {
        const minhaLista = localStorage.getItem("@primeflix");

        let filmesSalvos = JSON.parse(minhaLista) || [];
    
        const hasFilme = filmesSalvos.some((filmeSalvo)=> filmeSalvo.id == filme.id);
        //some = função de verificação de tru ou false pro localStorage
        if (hasFilme) {
            toast.warn("ESSE FILME JÀ ESTÀ NA SUA LISTA");
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
        toast.success("FILME SALVO COM SUCESSO");
    }

    if (loading) {
        return (
            <div className="filme-info">
                <h1>Carregando detalhes...</h1>
            </div>
        )
    }

    return (
        <div className="filme-info">
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average} / 10</strong>
            <div className="area-buttons">
                <button onClick={salvarFilme} >Salvar</button>
                <a rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`} target="blank">
                    <button>Trailer</button>
                </a>
            </div>
        </div>
    )
}

export default Filme;