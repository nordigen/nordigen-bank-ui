const institutionSbAnchor = document.createElement("a");
const modalContent = document.querySelector(".institution-modal-content");

const _createHTMLNode = (element, className, node) => {
    const htmlEntity = document.createElement(element);
    htmlEntity.classList.add(className);
    document.body.appendChild(htmlEntity);
    return document.querySelector(`.${className}`);
}

const _createImgNode = ({url, className}) => {
    const img = document.createElement("img");
    img.src = url;
    img.className = className;

    return img;
}

function _institutionSbSetSearchBox(searchBox){
    let input = document.createElement("input");
    let search = institutionSbAnchor.cloneNode(true);

    const searchImg = _createImgNode({
        url: "data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjMDAwMDAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciICB2aWV3Qm94PSIwIDAgMzAgMzAiIHdpZHRoPSIzMHB4IiBoZWlnaHQ9IjMwcHgiPjxwYXRoIGQ9Ik0gMTMgMyBDIDcuNDg4OTk3MSAzIDMgNy40ODg5OTcxIDMgMTMgQyAzIDE4LjUxMTAwMyA3LjQ4ODk5NzEgMjMgMTMgMjMgQyAxNS4zOTY1MDggMjMgMTcuNTk3Mzg1IDIyLjE0ODk4NiAxOS4zMjIyNjYgMjAuNzM2MzI4IEwgMjUuMjkyOTY5IDI2LjcwNzAzMSBBIDEuMDAwMSAxLjAwMDEgMCAxIDAgMjYuNzA3MDMxIDI1LjI5Mjk2OSBMIDIwLjczNjMyOCAxOS4zMjIyNjYgQyAyMi4xNDg5ODYgMTcuNTk3Mzg1IDIzIDE1LjM5NjUwOCAyMyAxMyBDIDIzIDcuNDg4OTk3MSAxOC41MTEwMDMgMyAxMyAzIHogTSAxMyA1IEMgMTcuNDMwMTIzIDUgMjEgOC41Njk4Nzc0IDIxIDEzIEMgMjEgMTcuNDMwMTIzIDE3LjQzMDEyMyAyMSAxMyAyMSBDIDguNTY5ODc3NCAyMSA1IDE3LjQzMDEyMyA1IDEzIEMgNSA4LjU2OTg3NzQgOC41Njk4Nzc0IDUgMTMgNSB6Ii8+PC9zdmc+",
        className: "institution-search-icon"
    });

    searchBox.className += "institution-search-container";
    input.className += "institution-search-input";

    // Set attributes
    search.href = "#";
    input.setAttribute("placeholder", "Search...");
    input.setAttribute("onkeyup", "_institutionSbSearchAspsp()");

    searchBox.appendChild(searchImg);
    searchBox.appendChild(input);

    return searchBox;
};


function _createInstitutionBankList(body, institutionLogos) {
    
	const institutionContainer = _createHTMLNode(
		'div',
		'institution-container',
		modalContent
	);
	institutionContainer.classList.add('institution-search-bx-body');

	// Set logos
	institutionLogos.forEach((el) => {
		const institutionList = document.createElement('div');
		institutionList.className = 'list-institution';

		let institutionRow = institutionSbAnchor.cloneNode(true);
        let institutionImg = document.createElement("img");
        let instituionSpan = document.createElement("span");
        instituionSpan.innerText = el.name;

		institutionList.appendChild(institutionRow);

		institutionImg.src = el.logo;
		institutionImg.className = 'institution-logo';
		institutionRow.className += 'institution-' + el.id;
		institutionRow.href = '#';

		institutionRow.dataset.institution = el.id;
		institutionRow.appendChild(institutionImg);
        institutionRow.appendChild(instituionSpan);

        institutionContainer.appendChild(institutionList);
		institutionList.appendChild(institutionRow);
	});

    const targetNode = document.getElementById(body);
	targetNode.appendChild(institutionContainer);
};

function _institutionSbSearchAspsp() {
    
    let input, filter,txtValue;
    input = document.querySelector(".institution-search-input");
    filter = input.value.toUpperCase();
    const institutionList = document.querySelectorAll(".list-institution");

    for (let i = 0; i < institutionList.length; i++) {
        txtValue = institutionList[i].textContent || i.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            institutionList[i].style.display = "";
        } else {
            institutionList[i].style.display = "none";
        }
    }
}


function _institutionSbSetConfig(config){    
    const close = document.querySelector(".institution-modal-close");
    close.addEventListener("click", () => {
        window.location.href = (!config.redirectUrl) ? document.URL : config.redirectUrl;
    });
}    

function institutionSelector(institutions, targetNode, config={}) {
    const institutionContentWrapper = document.querySelector(".institution-content-wrapper");

    _institutionSbSetConfig(config);

    const instituionsLogos = institutions;
    const root = document.getElementById(targetNode);

    // create search
    const searchDiv = document.createElement("div");
    const searchNode = _institutionSbSetSearchBox(searchDiv);

    root.appendChild(searchNode);

    _createInstitutionBankList(targetNode, instituionsLogos);

    // create logo
    if (config.logoUrl) {
        
        const logoImage = _createImgNode({
            url: config.logoUrl,
            className: "institution-company-logo"
        })

        institutionContentWrapper.appendChild(logoImage);
    }

};