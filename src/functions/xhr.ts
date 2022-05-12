import axios from 'axios'

export async function getAxiosRequest(path: string) {
    axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com/'
    axios.defaults.headers.common = { 'Accept': 'application/json' }
    return axios.get(path)
}