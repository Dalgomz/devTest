import axios from 'axios';

export default { 
	install: (app, options) => {
    const cancelToken = axios.CancelToken;
    const config = {
      timeout: 120 * 1000,
      baseURL: "https://itx-frontend-test.onrender.com/api",
      xsrfHeaderName: 'X-CSRFToken',
      xsrfCookieName: 'csrftoken',
    };
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    const axiosInstance = axios.create(config);
    window.axios = axiosInstance;
    window.axiosCancelToken = cancelToken;
    app.provide('axios', axiosInstance);
	}
};