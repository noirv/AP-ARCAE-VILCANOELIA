var juego={
	filas:[[],[],[]],
	espacioVacio: {
    	fila:2,
   		 columna:2
  },

 	crearPieza: function(numero,fila,columna){
	 	var pieza = $("<div>");
	 	pieza.addClass("pieza");
	 	pieza.css({
	 		backgroundImage: "url(piezas/" + numero + ".jpg)",
	 		top: fila*200,
	 		left: columna*200,
	 	});

	 	return {
	 		elemento: pieza,
	 		filaInicial: fila,
	 		columnaInicial: columna,
	 	};

	 },

	instalarPiezas: function(elemento) {
		var numero=1;
		for (var fila=0;fila<3; fila++) {

			for (columna=0; columna<3; columna++) {
				if (fila == this.espacioVacio.fila && columna == this.espacioVacio.columna ) {
					this.filas[fila][columna] = null;
				}
				else
				{
					var pieza = this.crearPieza(numero,fila,columna);
          			this.filas[fila][columna] = pieza;
          			elemento.append(pieza.elemento);
          			numero++
				}
			}
		}

	},

	 moverHaciaAbajo: function(){
		var filaOriginal = this.espacioVacio.fila-1;
    	var columnaOriginal = this.espacioVacio.columna;
	    this.intercambiarPosicionConEspacioVacio(filaOriginal,columnaOriginal);
	 },
	 moverHaciaArriba: function(){
	 	var filaOriginal = this.espacioVacio.fila+1;
    	var columnaOriginal = this.espacioVacio.columna;
    	this.intercambiarPosicionConEspacioVacio(filaOriginal,columnaOriginal);
	 },
	 moverHaciaLaDerecha: function(){
	 	var filaOriginal = this.espacioVacio.fila;
    	var columnaOriginal = this.espacioVacio.columna-1;
	    this.intercambiarPosicionConEspacioVacio(filaOriginal,columnaOriginal);
	 },
	 moverHaciaLaIzquierda: function(){
	 	var filaOriginal = this.espacioVacio.fila;
    	var columnaOriginal = this.espacioVacio.columna+1;
	    this.intercambiarPosicionConEspacioVacio(filaOriginal,columnaOriginal);
	 },


	 capturarTeclas: function(){
	 	var that = this;
	 	$(document).keydown(function(event){
		 	switch(event.which){
		 		case 37:
		 		 	that.moverHaciaLaIzquierda(); 
		 		 	break;
				case 38:
		 		 	that.moverHaciaArriba()
		 		 	break;
		 		case 39: 
		 			that.moverHaciaLaDerecha();
		 			break;
		 		case 40:
		 		 	that.moverHaciaAbajo();
		 		 	break;
		 		default: return;
		 	}
		 	event.preventDefault();
		 	that.chequearSiGano();
	 	});
	},

     moverFichaColumna: function(pieza, fila, columna){
	 	pieza.elemento.css({
	 		top: fila *200,
	 		left: columna * 200 
	 	});
	 },

	 guardarEspacioVacio: function(fila, columna){
	 	this.espacioVacio.fila = fila;
	 	this.espacioVacio.columna = columna;
	 	this.filas[fila][columna] = null;
	 },

	 intercambiarPosicionConEspacioVacio: function(fila, columna){
	 	var pieza = this.filas[fila] && this.filas[fila][columna];
		if (pieza) {
			this.filas[this.espacioVacio.fila][this.espacioVacio.columna] = pieza;
			this.moverFichaColumna(pieza, this.espacioVacio.fila, this.espacioVacio.columna);
			this.guardarEspacioVacio(fila, columna);
		}
	 },

	 chequearSiGano(){
		for (var fila=0; fila<3; fila++) {
			
			for (var columna=0; columna<3; columna++) {
				var piezaActual = this.filas[fila][columna];
				if(piezaActual && !(piezaActual.filaInicial == fila && piezaActual.columnaInicial == columna) ){
					return false;	
				} 
			}	
		}
		alert("Ganaste!");
	 },

	 mezclarFichas(veces){
	 
		var metodos = ["moverHaciaAbajo","moverHaciaArriba","moverHaciaLaDerecha","moverHaciaLaIzquierda"];
		
		for (var i=0; veces>i; i++) {
			var numeroRandom = Math.floor(Math.random() * 4);
			var nombreDeMetodo = metodos[numeroRandom];
			this[nombreDeMetodo]();
		}
		return true;
	 },

  iniciar:function(juego){
	 	this.instalarPiezas(juego);
	 	this.capturarTeclas();
	 	this.mezclarFichas(1000);
	 }
};

$(document).ready(function(){
	var elemento = $("#juego");
  	juego.iniciar(elemento);
 });



