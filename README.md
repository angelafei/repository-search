# repository-search
Perform Infinite-scroll by Using the Javascript [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver).

## Installation

```shell
$ git clone https://github.com/angelafei/repository-search.git
$ cd repository-search
$ npm install && npm start (Serve and demonstrate with webpack-dev-server)
```

## Build for production
```shell
$ npm run build
```
And move dist/ folder to your hosting place

## Unit testing
Implemented with `Mocha`, `Chai`, `Sinon` and `@testing-library/react`
```shell
$ npm run test
```  

## Flow
User Input -> debounce -> trigger Github repository search -> display results / errors


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