import axios from "axios";

axios.create({
    baseURL: 'http://localhost:9900/'
})

export default axios;