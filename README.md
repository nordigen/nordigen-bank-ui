
# Nordigen Bank UI

![Nordigen Bank UI](https://i.postimg.cc/vmX2xMxX/aspsps-ui.png)

## Installation

To install library, you can use `npm` or `yarn`

```
$ npm install --save nordigen-bank-ui
$ yarn add nordigen-bank-ui
```


## Examples

Full example can be found in a `demo` folder.

Create `index.html`

```html
<link href="../dist/selector.css" rel="stylesheet" />

    <div class="institution-content-wrapper">
        <div id="institution-modal-content">
            <header class="institution-modal-header ">
                <span class="institution-modal-close">&times;</span>
                <h2>Select your bank:</h2>
            </header>
        </div>
        <img src="../demo/./Nordigen_Logo.png" class="institution-company-logo">
    </div>

<script src="../dist/selector.js"></script>
```

Next step is to fetch aspsp list from [Nordigen API](https://nordigen.com/en/docs/account-information/overview/parameters-and-responses/#/aspsps/retrieve%20all%20supported%20ASPSP(s)%20in%20a%20given%20country)

```javascript
// Assume this is response from the API
const exampleList = [
    {
        id: 'RBS_GB_RBSSGBKC',
        name: 'Royal Bank of Scotland',
        bic: 'RBSSGBKC',
        transaction_total_days: '730',
        countries: ['GB'],
        logo: 'https://g.foolcdn.com/art/companylogos/square/rbs.png'
    },
    {
        id: 'BBVAUK_BBVAGB2L',
        name: 'BBVA',
        bic: 'BBVAGB2L',
        transaction_total_days: '730',
        countries: ['GB'],
        logo: 'https://www.bbva.com/wp-content/uploads/2019/07/bbva-logo-nuevo-cuadrado-1024x1024.png'
    }
];
```

Create `institutionSelector` instance and pass following parameters:

* `exampleList` - list of aspsp fetched from Nordigen API
* `institution-modal-content` - div where all banks will be appended
* configs object

```javascript
// Pass your redirect link after user has been authorized in aspsp
const config = {
    redirect_url: 'https://www.example.com'
};


new institutionSelector(exampleList, 'institution-modal-content', config);
```