//variables calculadoraa
var result  = document.getElementById("result") //numero actual
var opp = document.getElementById("operacion") //operacion actual
var punto = document.getElementById("punto")  //punto
var hbtn = document.getElementById("hbtn")  //historial
var dbtn = document.getElementById("dbtn")  //historial
var tbtn = document.getElementById("tbtn")  //historial
var h = document.getElementsByClassName("historial")  //historial
var historial=[]

var s =0//s es para superponer los numeros depues del resultado
var z =0 // z es la variable que dice si hay operador
var y = 0 // y es la variable que marca si hay punto
arrPrin=[]// array para operar con los numeros

var btns= document.querySelectorAll(".btn") //poner btn en pantalla
for (const btn of btns) {
    var tex=btn.innerText
    if(tex!="=" && tex!="C" && tex  !="±"){    //no pasan botones especiales
        btn.addEventListener("click",ponernumeros)
    }
    else if(tex=="=") {                        //pasa el igual
        btn.addEventListener("click",operacion)
    }
    else if(tex=="C"){                        //pasa el borrar
        btn.addEventListener("click",resetear)
    }
    else if(tex=="±"){                        //pasa el cambiar signo
        btn.addEventListener("click",masmenos)
    }

}









function ponernumeros(even){ // pasan todos los botones no especiales
    var guardar = result.value; //ver el numero actual
    var num = even.srcElement.firstChild.data;//cojer el numero del boton que pulsamos
    var clas=even.srcElement.classList //cojer la clase del boton que pulsamos
    var y=hiPunt() // ver si hay puntos
    if(clas[1]=="numero" && y==0 && guardar<10000000|| clas[1]!="operador" && clas[2]!="punto" && y<3 && guardar<10000000 ){
        //solo entran numeros y 1 punto por numero
        if(guardar!= 0 && s==0 || guardar==0 && num==="." || guardar==="0." ){// si el numero es diferente a 0 guardalo
        result.value=(guardar+num)//actualizamos el numero actual
        }
        else {
            s=0
            result.value=(num)// si es 0 sobrescrivelo
        }

    }
    else if(clas[1]=="operador" && z==0 ){//pasan los operadores si no hay otros
        arrPrin.push(parseFloat(guardar))// guarda el numero actual
        result.value=(0)// elimina el numero actual
        arrPrin.push(num)//guarda el operador
        z=1// ya hay un operador
        s=0
        var opPant=arrPrin[arrPrin.length-2] +arrPrin[arrPrin.length-1]
        opp.value= opPant//imprimimos la operacion arriba
    }
    else if (clas[1]=="operador" && z==1 && guardar==0){
        arrPrin.pop(arrPrin.length-1)
        arrPrin.push(num)
        var opPant=arrPrin[arrPrin.length-2] +arrPrin[arrPrin.length-1]
        opp.value= opPant//imprimimos la operacion arriba
    }
    else if(clas[1]=="operador" && z==1 && guardar!=0 ){
        operacion()
        z=1
        s=0
        guardar=result.value
        arrPrin.push(parseFloat(guardar))
        arrPrin.push(num)
        opp.value= guardar + num
        result.value=(0)
    }
}


function operacion(){
    var r
    if(arrPrin.length>1){
        arrPrin.push(parseFloat(result.value))  //guardamos el valor actual
        var opg=opp.value                       // guardamos el valor anterior
        var opPant=arrPrin[arrPrin.length-1]    //cojemos el valor que acabamos de guardar
        opp.value=opg + opPant                  //lo imprimimos junto al anterior
        z=0                                     // se puede volver a poner operador
        for (i=0;i < arrPrin.length;i++){
            if (arrPrin[i]%2!=0){//cojemos los numeros impares y vemos que funcion tenemos que hacer
                var nu1=arrPrin[i-1]//cojemos el valor de la izquierda del operador
                var nu2=arrPrin[i+1]//cojemos el valor de la derecha del operador
                switch(arrPrin[i]){
                    case "+":
                        r=(nu1+nu2)
                        result.value=numdspunt(r)
                    break
                    case "-":
                        r=(nu1-nu2)
                        result.value=numdspunt(r)
                    break
                    case "x":
                        r=(nu1*nu2)
                        result.value=numdspunt(r)
                    break
                    case "/":
                        r=(nu1/nu2)
                        result.value=numdspunt(r)
                    break
                    case "%":
                        r=(nu1%nu2)
                        result.value=numdspunt(r)
                    break
                }
            }
        }
        s=1
        arrPrin.push(numdspunt(r))
        console.log(arrPrin)
        historial.push(arrPrin)
        arrPrin=[]
        history()
    }
}
//funciones especiales
function masmenos() {
    var flit = parseFloat(result.value)     //el numero actual
    var flut = Math.sign(flit)              //per saber si es negatiu o no "torna 1 si es positu"
    if(flut == 1){                          // torna -1 si es negatiu
        result.value = -Math.abs(flit)      //el valor es positu
    }
    else if (flut == -1){                    //el valor es negatiu
        result.value = Math.abs(flit)
    }

}

function resetear(){// funcion para borrar todo
    result.value = 0;
    opp.value = "";
    arrPrin=[]
    z=0
    y=0
}

function hiPunt(){ // funcion para saber si hay punto
    var puntopunt = result.value.split("."); //Separar resultat si hi ha punt
    var numpunt=parseInt(puntopunt[1])//guarda valor despres de coma
    if(puntopunt.length > 1){ // si hay mas de una posicion en el array es que hay punto
        if(numpunt>10){y=3}                     //no es pot ficar numeros
        else if(numpunt<10 &&numpunt>0){y=2}    //podem ficar 2 num despres del punt
        else y=1                                //hi ha un punt
    }
    else y=0                                    //si solo hay una posicion en el array no hay punto
    return y
}

function numdspunt(x){
    var str = String(x)
    var splitresult = str.split(".")
    if(splitresult.length > 1){
    var newsplit = splitresult[1].split("");
    var newstring = newsplit[0]+newsplit[1];
    var totalstring =splitresult[0]+"."+ newstring;
    return parseFloat(totalstring)
    }
    else if(splitresult.length < 2){
        return x
    }
}

//cambio de modo
function colorChange() {
    var resul = document.getElementsByClassName("box-result")
    var oper = document.getElementsByClassName("operador")
    var numb = document.getElementsByClassName("numero")
    var fond = document.getElementsByClassName("calculadora")
    resul[0].classList.add("box-resultd");
    resul[1].classList.add("box-resultd");
    fond[0].classList.add("darkfond");

    for(op of oper){
        op.classList.add("darkoper");
    }
    for (const nu of numb) {
        nu.classList.add("darknumero");
    }
    h[0].classList.remove("historialV")
 }

 function normal(){
    var resul = document.getElementsByClassName("box-result")
    var oper = document.getElementsByClassName("operador")
    var numb = document.getElementsByClassName("numero")
    var fond = document.getElementsByClassName("calculadora")
    resul[0].classList.remove("box-resultd");
    resul[1].classList.remove("box-resultd");
    fond[0].classList.remove("darkfond");

    for(op of oper){
        op.classList.remove("darkoper");
    }
    for (const nu of numb) {
        nu.classList.remove("darknumero");
    }
    h[0].classList.remove("historialV")
 }
