# Tarea1-IIC3103-2021-01

## Tecnologías implementadas

La siguiente tarea se realizó con la librería React JS con el fin de facilitar el desarrollo de esta aplicaciones en una sola página. Esta tarea realiza consultas a la API https://tarea-1-breaking-bad.herokuapp.com/api mediante la librería Axios de Javascript. En este sentido, toda el código se escribió en los lenguajes HTML, CSS y Javascript.

## Arquitectura de archivos

```
Tarea1-IIC3103-2021-01
└───📑README.md
└───📂.vscode
└───📂public
└───📂src
    └───📂img
    └───📂style
    │ └───🎨App.css
    │ └───🎨index.css
    │ └───🎨autocomplete.css
    └───📂js
        └───📂components (💻 todos los archivos .jsx)
```

## Funcionalidades implementadas

La aplicación logró implementar las siguientes funcionalidades requeridas.

- La información de la API se extrae haciendo las llamadas HTTP cada vez a la API https://tarea-1-breaking-bad.herokuapp.com/api, sin uso de bases de datos pre-pobladas. De esta forma se utiliza la información actual de esta última para reflejar los distintos resultados.

- En cada una las secciones de series en la barra de navegación, se pueden ver las temporadas asociadas junto a sus episodios correspondientes. Cada episodio es clickeable y se puede ver con mayor detalle toda su información extraída de la API.

- Desde la vista anterior, se pueden clickear los personajes relacionados a un episodio en particular, para revisar toda su información extraída de la API. Una de estas informaciones es acerca de todas las temporadas en las que ha aparecido el personaje, las cuales a su vez son clickeable y llevan a la vista de temporadas en donde se muestran todos los episodios de esta.

- En la barra de navegación se muestra un buscador (a lo largo de todo el sitio) que permite buscar de manera personalizada distintos personajes. Cada uno de estos personajes es clickeables y llevan a una vista que muestra todo su detalle.

## Funcionalidades NO implementadas / Complicaciones

- El buscador de la aplicación no logró incluir todos los personajes que cumplen con la regla de búsqueda, es decir, no se logró realizar la compaginación requerida de todos los resultados. En este sentido, solo se puede buscar dentro de 10 posibles personajes.

- La aplicación tuvo una pequeña complicación en el manejo de eventos de los clicks. Para visualizar la información de los elementos clickeados en las secciones del detalle de los episodios y de los personajes (tanto desde los episodio, como desde el buscador), se requiere de presionar otro elemento del mismo tipo y para mostrar la información, es decir, esta no aparece en el mismo instante en el que se clickea. No logré resolver ese :bug:. Sin embargo, una vez realizado el segundo click, la información ya se ve de manera consistente.

## Deploy

Como lo sugiere el link de esta aplicación, el deploy de la tarea se realizó mediante la plataforma de Heroku.

- Link: https://t1-iic3103-jacouyoumdjian.herokuapp.com/

## Referencias

- https://www.youtube.com/watch?v=Ke90Tje7VS0
- https://www.medium.com
- https://www.w3schools.com/
- https://morioh.com/
- https://getbootstrap.com/