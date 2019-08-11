import { Content } from './content.js';

const projects = document.getElementById('projects');
const doings = document.getElementById('doings');
const about = document.getElementById('about');

const content = Content('content');

projects.addEventListener('mouseover', (e) => {
	projects.setAttribute('data-after', randomElement(projectsEmojis));
});

doings.addEventListener('mouseover', (e) => {
	doings.setAttribute('data-after', randomElement(doingsEmojis));
});

about.addEventListener('mouseover', (e) => {
	about.setAttribute('data-after', randomElement(aboutEmojis));
});

function randomElement(arr) {
	const i = Math.floor(Math.random() * arr.length);
	return arr[i];
}

const projectsEmojis = ['🔨', '💪', '💻', '⚙', '🔧'];
const doingsEmojis   = ['⚽', '🥘', '🏃‍♂️', '📚', '🎮'];
const aboutEmojis    = ['👨', '💎', '😎', '😄', '☕️'];

const loadSection = (hash) => {
    switch(hash) {
    case '#projects':
        getSectionData('static/projects.json');
        return;
    case '#doings':
        getSectionData('static/doings.json');
        return;
    case '#about':
        getSectionData('static/about.json');
        return;
    default:
        return;
    }
}

window.addEventListener("hashchange", function () {
    window.scrollTo(window.scrollX, 0);
    loadSection(window.location.hash);
});

window.addEventListener('load', () => {
    loadSection(window.location.hash);
});

const loadInfo = (fileName) => {
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

const getSectionData = (path) => {
    loadInfo(path).then(json => {
        content.clear();
        console.log(json);
        [...JSON.parse(json)].forEach(section => {
            content.addSection(section);
        });
    });
};