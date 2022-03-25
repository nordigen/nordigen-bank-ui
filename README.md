
# Nordigen Bank UI

![Nordigen Bank UI](https://i.postimg.cc/PrCFNNqd/nordigen-ui.png)

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

Next step is to fetch aspsp list from [Nordigen API](https://nordigen.com/en/docs/account-information/overview/parameters-and-responses/#/aspsps/retrieve%20all%20supported%20ASPSP(s)%20in%20a%20given%20country)

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
    redirectUrl: 'https://www.example.com',
	logoUrl: 'https://cdn.nordigen.com/ais/Nordigen_Logo_Black.svg',
    countryFilter: false, // will display country list with corresponding institutions. When `countryFilter` is set to `false`, only list of institutions will be shown.
    // style configs
    styles: {
        // URL to google font
        fontFamily: 'https://fonts.googleapis.com/css2?family=Roboto&display=swap',
        fontSize: '15',
        textColor: '#1B2021',
        backgroundColor: '#fff',
        hoverColor: '#F1F1F1'
    }
};


new institutionSelector(exampleList, 'institution-modal-content', config);
```

To test fully working example application, consider checking the following repositories and their corresponding examples:

* [NodeJs](https://github.com/nordigen/nordigen-node)
* [Python](https://github.com/nordigen/nordigen-python)
* [Ruby](https://github.com/nordigen/nordigen-ruby)
