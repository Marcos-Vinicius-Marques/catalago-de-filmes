import axios from 'axios';
// Base da URL: https://api.themoviedb.org/3/
// URL da API: https://api.themoviedb.org/3/movie/now_playing?api_key=347373edaa5c456f717b6eaea534f068&language=pt-BR

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3/"
})
 
export default api;