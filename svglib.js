document.addEventListener("DOMContentLoaded", init);

function init() {
    const svgs = document.getElementsByTagName("svg");
    for(let svg of svgs) populateSvg(svg);
    
    registerObserver();
}

function populateSvg(target) {
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

function registerObserver() {
    function onChange(mutationList, observer) {
        for(let mutation of mutationList) {
            if(mutation.addedNodes.length > 0) {
                for(let node of mutation.addedNodes) {
                    if(node?.tagName?.toLowerCase() == "svg") {
                        populateSvg(node);
                    }
                }
            }
        };
    }
    const observerOptions = {
        childList: true,
        attributes: false,
        subtree: true
    };
    const observer = new MutationObserver(onChange);
    observer.observe(document, observerOptions);
}

