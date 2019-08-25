const photos = document.getElementById('photos');
const loading = document.getElementById('loading');

let isLoading = true;
let stack = [];

window.addEventListener('load', () => {
    setTimeout(() => {
        loadPhotos('static/photography/index.json');
    }, 500);
    
});

const tryShow = () => {
    if (stack.length == 0 && !isLoading) {
        if (loading) {loading.style.display = 'none';}
        if (photos) {photos.style.display = 'flex';}
    }
};

const loadPhotos = (path) => {
    loadJSON(path)
    .then(json => {
        photos.innerHTML = '';
        isLoading = true;
        [...JSON.parse(json)].forEach(el => {
            let img = document.createElement('img');
            stack.push(0);
            img.onload = () => {
                stack.pop();
                tryShow();
            };
            img.onerror = () => {
                stack.pop();
                tryShow();
            };
            img.src = el['src'];
            img.alt = el['alt'];
            photos.appendChild(img);
        });
        isLoading = false;
        tryShow();
    });
};

const loadJSON = (fileName) => {
    return new Promise((resolve) => {
        getJSON(fileName, resolve);
    });
}

const getJSON = async (fileName, res, rej) => {
    let xhr = new XMLHttpRequest();
    xhr.overrideMimeType('application/json');
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            res(xhr.responseText);
        }
        else {
        }
    };
    xhr.open('GET', fileName, true);
    xhr.send();
}