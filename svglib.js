document.addEventListener("DOMContentLoaded", svglibjs_init);

function svglibjs_init() {
    const svgs = document.getElementsByTagName("svg");
    for(let svg of svgs) svglibjs_populateSvg(svg);
    
    svglibjs_registerObserver();
}

function svglibjs_populateSvg(target) {
    if (target.hasChildNodes()) return;
    const src = target.attributes["src"];
    if (src?.value == undefined) return;

    fetch(src.value)
        .then(resource => resource.text())
        .then(content => {
            loadedNode = new DOMParser().parseFromString(content, "image/svg+xml").documentElement;
            for(let attr of target.attributes){ 
                loadedNode.setAttribute(attr.name, attr.value);
            }
            target.parentNode.insertBefore(loadedNode, target);
            target.remove();
        })
}

function svglibjs_registerObserver() {
    function onChange(mutationList, observer) {
        for(let mutation of mutationList) {
            if(mutation.addedNodes.length > 0) {
                for(let node of mutation.addedNodes) {
                    findClildCall(node, "svg", svglibjs_populateSvg);                }
            }
        };
        function findClildCall(node, tagName, callback) {
            if(node?.tagName?.toLowerCase() == tagName.toLowerCase()) {
                callback(node);
            }
            if(node?.hasChildNodes()) {
                for(child of node.childNodes) {
                    findClildCall(child,tagName, callback);
                }
            }
        }

    }
    const observerOptions = {
        childList: true,
        attributes: false,
        subtree: true
    };
    const observer = new MutationObserver(onChange);
    observer.observe(document, observerOptions);
}

