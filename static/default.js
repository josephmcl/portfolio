const projects = document.getElementById('projects');
const doings = document.getElementById('doings');
const about = document.getElementById('about');

const content = {
    obj: document.getElementById('content'),
    add: (item) => {
        content.obj.innerHTML += item;
    },
    clear : () => {
        content.obj.innerHTML = '';
    },
    addSection: (item) => {
        switch (item['type']) {
        case 'paragraph': content.addParagraph(item);
        }
    },
    addParagraph: (item) => {
        let obj = document.createElement('div');
        obj.classList.add('paragraph-section');

        if (item['title']) {
            let titleElement = document.createElement('div');
            titleElement.classList.add('section-title');
            titleElement.innerHTML = item['title'];
            obj.appendChild(titleElement);
        }

        if (item['body']) {
            let bodyElement = document.createElement('div');
            bodyElement.classList.add('section-body');
            bodyElement.innerHTML = item['body'];
            obj.appendChild(bodyElement);
        }

        content.obj.appendChild(obj);
    }
};
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

window.addEventListener("hashchange", function () {
    window.scrollTo(window.scrollX, 0);
    switch(window.location.hash) {
    case '#projects':
        // getProjects();
        return;
    case '#doings':
        // getEverythingElse();
        return;
    case '#about':
        getSectionData('static/about.json');
        return;
    default:
        return;
    }
});

window.addEventListener('load', () => {
    switch(window.location.hash) {
    case '#projects':
        // getProjects();
        return;
    case '#doings':
        // getEverythingElse();
        return;
    case '#about':
        getSectionData('static/about.json');
        return;
    default:
        return;
    }
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
        [...JSON.parse(json)].forEach(section => {
            content.addSection(section);
        });
    });
};