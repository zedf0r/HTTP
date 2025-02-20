export function sendRequest(method, url, body = null) {
    const headers = {
        'Content-type': 'application/json'
    }
    const baseURL = 'http://localhost:7070';
    const requestURL = `${baseURL}${url}`;

    return fetch(requestURL, {
        method: method,
        body:  body ? JSON.stringify(body) : null,
        headers: headers,
    }).then(response => {
        if (response.status === 204) {
            return null;
        }
        if (!response.ok) {
            throw new Error('Что-то пошло не так')
        }

        return response.json()
    })
}
