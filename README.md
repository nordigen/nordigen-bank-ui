
# Nordigen Bank UI

![Nordigen Bank UI](https://i.postimg.cc/pTMwtMjh/JS-Ui.png)

## Installation

To install library, you can use `npm` or `yarn`

```
$ npm install --save nordigen-bank-ui
$ yarn add nordigen-bank-ui
```

Or add package via `script` tag using CDN

* CSS: https://unpkg.com/nordigen-bank-ui@1.0.1/package/src/selector.min.css

* JS: https://unpkg.com/nordigen-bank-ui@1.0.1/package/src/selector.js
## Examples

Full example can be found in a `demo` folder.

Create `index.html`

```html
<link href="./node_modules/nordigen-bank-ui/package/src/selector.min.css" rel="stylesheet" />

    <div class="institution-content-wrapper">
        <div id="institution-modal-content">
            <header class="institution-modal-header ">
                <span class="institution-modal-close">&times;</span>
                <h2>Select your bank:</h2>
            </header>
        </div>
    </div>

<script src="./node_modules/nordigen-bank-ui/package/src/selector.js"></script>
```

Next step is to fetch aspsp list from [Nordigen API](https://nordigen.com/en/docs/account-information/integration/parameters-and-responses/#/institutions/retrieve%20all%20supported%20Institutions%20in%20a%20given%20country)

```javascript
// Assume this is response from the API
const exampleList = [
    {
        "id": "ABNAMRO_ABNAGB2LXXX",
        "name": "ABN AMRO Bank Commercial",
        "bic": "ABNAGB2LXXX",
        "transaction_total_days": "540",
        "countries": [
            "GB"
        ],
        "logo": "https://cdn.nordigen.com/ais/ABNAMRO_FTSBDEFAXXX.png"
    },
    {
        "id": "BBVAUK_BBVAGB2L",
        "name": "BBVA",
        "bic": "BBVAGB2L",
        "transaction_total_days": "730",
        "countries": [
            "GB"
        ],
        "logo": "https://cdn.nordigen.com/ais/BBVABE_BBVABEBB.png"
    },
];
```

Create `institutionSelector` instance and pass following parameters:

* `exampleList` - list of aspsp fetched from Nordigen API
* `institution-modal-content` - div where all banks will be appended
* configs object

```javascript
// Pass your redirect link after user has been authorized in institution
const config = {
    // Redirect URL that is being used when modal is being closed.
    redirectUrl: 'https://www.example.com',
    // Text that will be displayed on the left side under the logo. Text is limited to 100 characters, and rest will be truncated.
    text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean mavdvd",
    // Logo URL that will be shown below the modal form.
    logoUrl: 'https://cdn.nordigen.com/ais/Nordigen_Logo_Black.svg',
    // Will display country list with corresponding institutions. When `countryFilter` is set to `false`, only list of institutions will be shown.
    countryFilter: false,
    // style configs
    styles: {
        // Primary
        // Link to google font
        fontFamily: 'https://fonts.googleapis.com/css2?family=Roboto&display=swap',
        fontSize: '15',
        backgroundColor: '#F2F2F2',
        textColor: '#222',
        headingColor: '#222',
        linkColor: '#8d9090',
        // Modal
        modalTextColor: '#1B2021',
        modalBackgroundColor: '#fff',
        // Button
        buttonColor: '#3A53EE',
        buttonTextColor: '#fff'
    }
};


new institutionSelector(exampleList, 'institution-modal-content', config);
```

If custom redirect flow is required with `institution_id` in URL

```js
const container = document.querySelector(".institution-container");
const observer = new MutationObserver((event) => {
    const institutions = Array.from(document.querySelectorAll('.ob-list-institution > a'));
    institutions.forEach((institution) => {
        institution.addEventListener("click", (e) => {
            e.preventDefault();
            const aspspId = e.currentTarget.getAttribute('data-institution');
            // custom redirect
            window.location = `http://example.com/${aspspId}`;
        })
    })
  });

const conf = {
    childList: true
};
observer.observe(container, conf);
```

## Development

Minify and add vendor prefixes before pushing CSS changes

```
npm run build
```

To test fully working example application, consider checking the following repositories and their corresponding examples:

* [Node.js](https://github.com/nordigen/nordigen-node)
* [Python](https://github.com/nordigen/nordigen-python)
* [Ruby](https://github.com/nordigen/nordigen-ruby)
