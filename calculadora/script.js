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
}function ponernumeros(even){ // pasan todos los botones no especiales
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


