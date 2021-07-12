function onSubmit(e){
    if(!patente.checkValidity()){
        alert("La patente ingresada no es valida");
        e.preventDefault();
    }
}

window.onload = ()=>{
    const form = document.querySelector(".form-patente");
    form.addEventListener("submit", onSubmit);
}