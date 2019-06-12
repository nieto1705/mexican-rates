Mexican-Rates
======================
Proyecto que muestra en una grafica el desempeño historico del peso frente a otras monedas.

Scripts
======================
Una vez descargado el proyecto hay que ejecutar: 

`npm install`

Para ejecutar proyecto en dev-mode

`npm start`

Para compilar el proyecto para produccion

`npm build`

Servidor para probar el desempeño del build
`gulp buildAndTest`

Estructura de archivos
=======================
```
.
├── gulpfile.js
├── package.json
├── package-lock.json
├── README.md
└── src
    ├── css
    │   ├── c3.min.css
    │   └── styles.css #sass compilado no editar
    ├── fonts
    │   └── Roboto-Regular.ttf
    ├── index.html
    ├── js
    │   ├── App.js #React.js entry point
    │   ├── components
    │   │   ├── DatePicker.js
    │   │   ├── Graph.js
    │   │   └── hocs
    │   │       └── withRates.js
    │   ├── dist
    │   │   └── bundle.js # js compilado no editar
    │   ├── index.js
    │   ├── utils
    │   │   └── constants.js
    │   └── vendor # librerias no commonjs
    │       └── c3.min.js
    └── sass
        └── styles.scss

```
