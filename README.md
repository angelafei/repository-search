# repository-search
Perform Infinite-scroll by using the Javascript [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver).

## Installation

```shell
$ git clone https://github.com/angelafei/repository-search.git
$ cd repository-search
$ npm install && npm start (Serve and demonstrate with webpack-dev-server)
```
Open browser and visit http://localhost:8080/ to see the demonstration

## Build for production
```shell
$ npm run build
```
And move dist/ folder to your hosting place

## Unit testing
Implemented with `Mocha`, `Chai`, `Sinon` and `@testing-library/react`; Generated test coverage report with `nyc` 
```shell
$ npm run test
```  

## Flow / Features
User Input -> debounce -> trigger Github repository search -> display results / errors

- debounce: to prevent from triggering api too often
- Infinite scroll: use Intersection Observer api to detect when to load new page
- Axios cancel token: if trigger new search before previous search completed, previous one will be cancelled
- error handling: 
  - console error: 422 (Only the first 1000 search results are available)
  - console error: 403 (API rate limit exceeded)
  - display error: other api error


## Files Structure
```
├── README.md
├── package-lock.json
├── package.json
├── src
│   ├── app.jsx
│   ├── components
│   │   ├── in-view-component.js
│   │   ├── loading-component.js
│   │   ├── results-component.js
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
│       │   ├── results-component.spec.js
│       │   └── search-component.spec.js
│       └── reducer
│           └── index.spec.js
└── webpack.config.js
```

## Future improvement
  - [ ] UI/UX
  - [ ] More error handling