
// makeParagraphElement makes a dom element from a properly structured 
// JSON object
const makeParagraphElement = (item) => {
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
    return obj;
};

// makeParagraphElement makes a dom element from a properly structured 
// JSON object
const makePostElement = (item) => {
    let obj = document.createElement('div');
    obj.classList.add('post-section');

    if (item['title']) {
        let titleElement = document.createElement('div');
        titleElement.classList.add('post-title');
        titleElement.innerHTML = item['title'];
        obj.appendChild(titleElement);
    }

    if (item['body']) {
        let bodyElement = document.createElement('div');
        bodyElement.classList.add('post-body');
        bodyElement.innerHTML = item['body'];
        obj.appendChild(bodyElement);
    }

    if (item['links']) {
        let linkContainer = document.createElement('div');
        linkContainer.classList.add('link-container');
        [...item['links']].forEach(linkJSON => {
            if (linkJSON['title'] && linkJSON['href']) {
                let linkElement = document.createElement('a');
                linkElement.innerHTML = linkJSON['title'];
                linkElement.href = linkJSON['href'];
                linkElement.style.width = + String(linkJSON['title'].length * 0.60) + 'em';
                linkContainer.appendChild(linkElement);
            }
        }); 
        obj.appendChild(linkContainer);
    }
    return obj;
};

export const Content = (id) => {
    const theRoot = document.getElementById(id);
    const theObject = {
        obj: theRoot,
        add: (item) => {
            theObject.obj.innerHTML += item;
        },
        clear : () => {
            theRoot.innerHTML = '';
        },
        addSection: (item) => {
            if (!item['type']) {
                return;
            }
            switch (item['type']) {
            case 'paragraph': 
                theObject.addParagraph(item);
                return;
            case 'post': 
                theObject.addPost(item);
                return;
            default:
                return;
            }
        },
        addParagraph: (item) => {
            theRoot.appendChild(makeParagraphElement(item));
        },
        addPost: (item) => {
            theRoot.appendChild(makePostElement(item)); 
        }
    };
    return theObject;
};