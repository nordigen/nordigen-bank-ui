# Nordigen Bank UI Example app

* Install packages. This will install `nordigen-bank-ui` package from `package.json`
```
npm i
```

Pass some institution list to `institutionSelector` function.

## Configs options

* `redirectUrl: 'https://www.example.com'` - redirect URL that is being used when modal is being closed.
* `logoUrl: 'https://cdn.nordigen.com/ais/Nordigen_Logo_Black.svg'`  - Logo URL that will be show below the modal form.
* `countryFilter: true` - will display country list with corresponding institutions. When `countryFilter` is set to `false`, only list of institutions will be shown.
* `styles: {}` - custom styling parameters. Example:
```css
styles: {
    fontFamily: 'HKGrotesk-Bold',
    fontSize: '15',
    textColor: '#1B2021',
    backgroundColor: '#fff',
    hoverColor: '#F1F1F1'
}
```
