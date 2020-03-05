
############
Ejercicio 1
############

1. Entorno 
El ejercicio se ha realizado con el IDLE de Python en versión 3.8.1

2. Explicación de código
El ejercicio consta de tres métodos, que se llaman en cadena:

-getTipoDeNumeros: Es el método principal. Recorre la lista de números que recibe como parámetro y llama al método "calculaDivisoresYTipo" para cada uno de ellos.

-calculaDivisoresYTipo: recibe un número N de entrada y calcula sus divisores. Con un bucle de i=1 hasta N se calcula si el resto de la división de N entre i es igual a 0, en cuyo caso se ha encontrado un divisor y se suma en la variable "sumatorio". Tras el bucle se llama al método "esPerfectoAbundanteODefectivo" enviándole como parámetros el número N y el sumatorio de sus divisores.

-esPerfectoAbundanteODefectivo: En este se método se realizan unas comparaciones simples del valor de N y el sumatorio de sus divisores, imprimiendo por pantalla un mensaje indicando el tipo de número que es (perfecto, abundante o defectivo)

3. Instrucciones de uso
Para ejecutar el ejercicio, lanzar el fichero "Ejercicio1.py" en un intérprete de Python
Una vez cargado, basta con escribir el método "getTipoDeNumeros" pasando como parámetro una lista de números. 
Ejemplo de prueba:

>>> getTipoDeNumeros([1,2,3,4,5,6,7,8,9,10])
Lista de números de entrada: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
El número 1 es defectivo
El número 2 es defectivo
El número 3 es defectivo
El número 4 es defectivo
El número 5 es defectivo
El número 6 es perfecto
El número 7 es defectivo
El número 8 es defectivo
El número 9 es defectivo
El número 10 es defectivo


############
Ejercicio 2
############

1. Entorno
- HTML
- JavaScript
- JQuery

2. Librerias externas utilizadas:
- jQuery 3.4.1: uso de las funciones y Ajax
- CanvasJS: uso de gráficos
 
3. Árbol de fichieros del ejercicio
\index.html
\js
	\util
		\jquery-3.4.1.min.js
		\canvasjs.min
	\line_chart_handler.js
	\main.js
	\pie_chart_handler.js
	\source_handler.js
	
3. Explicación de código

* index.html: Es el fichero principal el cual contiene una estructura básica de HTML (header y body) y en el que se insertan los ficheros de javascript que realizan la funcionalidad demandada por el ejercicio.

* main.js: Contiene el código principal de la pagina web. A continuación paso a describir en detalle los metodos más importantes. Para el resto de métodos no descritos en este apartado, se dispone de una pequeña documentación en el propio código.

	- initialize(): 
	Inicia el proceso de carga del contenido de la página. Para ello utilizo la función "loadSource" definida en el ficheo javascript "source_handler.js". Éste realiza una petición ajax para la recuperación de los datos expuestos por las API.
	Por lo tanto hago tres peticiones, informando en cada una la URL de la fuente de datos.
	Las URLs están almacenadas en la constante "SOURCE_URLS", un array con las direcciones ofrecidas en el enunciado del ejercicio.
	
	A continuación, con la respuesta obtenida por la petición ajax en el método "done", es decir cuando la petición ha terminado, se llama al método "prepareDataSource" que va a leer los datos obtenidos de las fuentes y montar la estructura de datos (un map) que será utilizada para la ordenación y el muestreo en las gráficas.
	
	Por último una vez se hayan obtenido los datos de las tres fuentes, se procede a la ordenación de éstos en el método "sortSourcesMapByDate" y se cargan en los dos graficos.
	
	- prepareDataSource():
	Este método realiza la lectura de los datos de cada fuente. Los datos se tratan como un array de objetos, por lo que mediante un bucle se recorre cada posición del array y se recupera el objeto. 
	
	Dependiendo de la fuente de la que estemos leyendo sus datos recuperados, accedemos a la información de manera diferente, pues las fechas, categorías y valores tienen nombres diferentes.
	Es decir, por ejemplo para la fuente 1, acceder a la información de fecha es de la forma:
	data[i].d y para la fuente 2 es de la forma: data[i].myDate
	
	Por ello he implementado un "switch" para distinguir qué fuente estamos recorriendo.
	
	Una vez hemos obtenido la fecha, la categoría y el valor para una posición del array, éstos son informados en el método "updateSourcesMap" que irá actualizando un map con las categorías como claves, y un array de fechas y valores como value.
	 
	- updateSourcesMap():
	Método para iniciar y actualizar una estructura de datos Map que almacene la información de las tres fuentes. 
	
	La estructura de datos tendrá la forma siguiente:
		- Key: Formada por cada categoría encontrada en los datos
		- Value: Formado por un array de objetos que contendrán los valores fecha en formato "human friendly", valor y fecha en milisegundos, es decir de la forma siguiente:
		{x:date, y:value, d:milliseconds}
		
	La idea consiste en agrupar los valores para cada fecha única y por categoría. Es decir si para una categoría y una fecha, se sumarán todos los valores encontrados en la misma fecha.
		
	La razon de añadir una fecha en "human friendly" es para facilitar el muestreo de las fechas en la grafica de lineas, pues se realiza un mapeo del dato "x" para mostrar la información como una etiqueta "dd. MM" en el eje de las X.
		
	La decisión de hacerlo de esta forma es debido a que facilita dos implementaciones:
		1. La ordenación de los objetos utilizando el dato fecha en milisegundos
		2. El muestreo de los datos en las gráficas, pues para la librería utilizada en este caso, es necesario formar un array de objetos en la forma {x:value, y:value}, donde "x" muestra los datos en el eje horizontal e "y" muestra los datos del eje vertical. 
		
	Y gracias a preparar el map de esta forma, la obtención de los arrays para cada categoría es muy simple (map.get(categoria)) y directamente se cargan el grafico con nada o poca implementación a posteriori.
	
	Para añadir datos y actualizar el map se hace lo siguiente.
		- Si la categoría informada no existe en el map, se añade junto a un array con un objeto que contiene la fecha HF, el valor y la fecha en milisegundos.
		
		- Si la categoría existe, se recorre el array de datos de esa categoría y comprobamos que la fecha informada existe en el array.
		
		- Si la fecha existe, se sumará el valor informado con el valor que existe para esa fecha.
		
		- Si la fecha no existe en el array, se añade un nuevo objeto en el array para la fecha y valor informado.


* source_handler.js: Aquí declaro la función "loadSource" la cual realiza una petición a las API mediante ajax y se devuelve como objeto. En caso de error en la llamada se muestra el mensaje de error en un contenedor html (source_container) 


* line_char_handler.js: Función que gestiona la carga de datos en la gráfica de lineas y el renderizado en la página. Para esta gráfica se cargan los datos a partir del mapa completo recuperando los arrays de cada clave del mapa.

Para ello se envía el mapa como parametro a la función, se recorren todas sus claves con un bucle y se almacena en un objeto "data" el array de objetos para cada clave. (Ver dataArray en el código)

De esta forma cada clave del mapa será una de las líneas del gráfico, y puesto que el mapa está ordenado previamente, las fechas se muestran ordenadas cronológicamente.

Para saber más de este tipo de gráfica visitar la documentación de la librería Canvas:
	https://canvasjs.com/docs/charts/chart-types/html5-line-chart/
	
* pie_chart_handler.js: Función que gestiona la carga de datos en la gráfica circular y el renderizado en la página.

Similar al proceso de carga de datos de la gráfica de lineas, para cada clave del mapa de datos se recorre en un bucle todas las posiciones del array de objetos. Con el fin de calcular el valor parcial de todos los elementos "valor" por categoría, y posteriormente obtener el valor total de todas las categorías.

De esta forma obtengo el porcentaje que supone el valor de cada categoría con respecto al global.

Este dato es actualizado en el campo "y" del array a cargar en la gráfica.
(Ver dataPointsArray dentro del código)

Para saber más de este tipo de gráfica visitar la documentación de la librería Canvas:
	https://canvasjs.com/docs/charts/chart-types/html5-pie-chart/

4. Instrucciones de uso
Abrir el fichero \Ejercicio2\index.html en un navegador de internet (Firefox o Chrome)

* Importante:
El ejercicio se ha probado en Firefox sin detectar problemas en el muestreo de datos.
Si utilizamos el navegador Chrome, debido al caracter asíncrono de las peticiones ajax, aparentemente la primera carga de la página en este navegador no realiza todas las operaciones a tiempo antes de mostrar los datos en las gráficas. Una vez se han cacheado los datos, si actualizamos la página los datos se muestran correctamente.