const textoEncriptado = document.getElementById ("texto-encriptado");
const bottonEncrip = document.getElementById ("bottonEncrip");
const bottonDesencrip = document.getElementById ("bottonDesencrip");
const bottonCopy = document.getElementById ("bottonCopy");
const campoMensaje = document.getElementById ("texto-info");
const imagenMuñeco = document.getElementById ("imagen-muñeco");
const instrucUsuario = document.getElementById ("instruc-usuario");

let remplazar = [
    ["e", "enter"],
    ["o", "ober"],
    ["i", "imes"],
    ["a", "ai"],
    ["u", "ufat"],
]

const replace = (nuevoValor) =>{
    campoMensaje.innerHTML = nuevoValor;
    textoEncriptado.value = "";
    imagenMuñeco.classList.add("oculto");
    instrucUsuario.style.display = "none";
    bottonCopy.style.display = "block";
    instrucUsuario.classList.add("ajustar");
    campoMensaje.classList.add("ajustar");
}

const reset = () =>{
    campoMensaje.innerHTML = "";
    imagenMuñeco.classList.remove("oculto");
    instrucUsuario.style.display = "block";
    bottonCopy.style.display = "none";
    instrucUsuario.classList.remove("ajustar");
    campoMensaje.classList.remove("ajustar");
    textoEncriptado.focus();
}

bottonEncrip.addEventListener("click", () => {
    let texto = textoEncriptado.value.toLowerCase(); //Cambia las letras a minusculas
    texto = texto.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); //Elimina acentos y diacríticos
    texto = texto.replace(/[^a-z]/g,""); //Elimina caracteres no alfabéticos
    if (texto != ""){
        function encriptar(newText){
            for (let i=0; i < remplazar.length; i++){
                if (newText.includes(remplazar[i][0])){
                    newText = newText.replaceAll(remplazar[i][0], remplazar[i][1]);
                };
            };
            return newText; 
        };
        replace(encriptar(texto));
    }else{
        alert("Increse texto a encriptar")
        reset ();
    };
});

bottonDesencrip.addEventListener("click", () => {
    let texto = textoEncriptado.value.toLowerCase();
    texto = texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    texto = texto.replace(/[^a-z]/g,""); 
    if  (texto != ""){
        function desencriptar(newText){
            for (let i=0; i < remplazar.length; i++){
                if (newText.includes(remplazar[i][1])){
                    newText = newText.replaceAll(remplazar[i][1], remplazar[i][0]);
                };
            };
            return newText; 
        };
        replace(desencriptar(texto));        
    }else{
        alert("Increse texto a desencriptar")
        reset ();
    };
});

bottonCopy.addEventListener("click", () => {
    let texto =  campoMensaje;
    texto.select();
    document.execCommand("copy");
    alert("El Texto fue copiado");
    reset ();  
});