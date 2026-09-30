export function saveData(listName, params) {
    localStorage.setItem(listName, JSON.stringify(params));
}

export function getData(listName) {
    return JSON.parse(localStorage.getItem(listName));
}

export function setId(params) {
    localStorage.setItem('orderCode', params);
}

export function getId() {
    return localStorage.getItem('orderCode');
}