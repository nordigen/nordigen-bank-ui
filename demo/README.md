# Nordigen Bank UI Example app

* Install packages. This will install `nordigen-bank-ui` package from `package.json`
```
npm i
```

Pass some institution list to `institutionSelector` function.

## Configs options

* `redirectUrl: 'https://www.example.com'` - redirect URL that is being used when modal is being closed.
* `logoUrl: 'https://cdn-logos.gocardless.com/ais/Nordigen_Logo_Black.svg'`  - Logo URL that will be shown below the modal form.
* `countryFilter: true` - will display country list with corresponding institutions. When `countryFilter` is set to `false`, only list of institutions will be shown.
*  `text: "Your text"` - Text that will be displayed on the left side under the logo. Text is limited to 100 characters, and rest will be truncated.
* `styles: {}` - custom styling parameters. Example:
```css
styles: {
    // Primary
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
```
