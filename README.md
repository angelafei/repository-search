# repository-search

## Installation

```shell
$ git clone https://github.com/angelafei/repository-search.git
$ cd repository-search
$ npm install && npm start
```  

## Unit testing
Implemented with `Mocha`, `Chai`, `Sinon` and `@testing-library/react`
```shell
$ npm run test
```  


## Source Code File Structure
```
├── README.md
├── package-lock.json
├── package.json
├── src
│   ├── app.jsx
│   ├── components
│   │   ├── in-view-component.js
│   │   ├── loading-component.js
│   │   └── search-component.js
│   ├── fonts
│   │   └── Roboto-Light.ttf
│   ├── index.html
│   ├── main.jsx
│   ├── reducer
│   │   └── index.js
│   ├── styles
│   │   ├── _reset.scss
│   │   ├── _style.scss
│   │   ├── loading.scss
│   │   └── main.scss
│   └── tests
│       ├── app.spec.js
│       ├── components
│       │   ├── in-view-component.spec.js
│       │   ├── loading-component.spec.js
│       │   └── search-component.spec.js
│       └── reducer
│           └── index.spec.js
└── webpack.config.js
```

## Future improvement
  - [ ] UI/UX