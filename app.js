let amigos = [];

function agregarAmigo() {
    const input = document.getElementById("amigo");
    const nombre = input.value.trim();

    if (nombre === "") {
        alert("Por favor, ingresa un nombre válido.");
        return;
    }
    if (amigos.includes(nombre)) {
        alert("Este nombre ya está en la lista.");
        return;
    }

    amigos.push(nombre);
    actualizarLista();
    input.value = "";
}

function actualizarLista() {
    const lista = document.getElementById("listaAmigos");
    lista.innerHTML = "";

    amigos.forEach((amigo, index) => {
        const li = document.createElement("li");
        li.textContent = amigo;
        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "❌";
        btnEliminar.onclick = () => eliminarAmigo(index);
        li.appendChild(btnEliminar);
        lista.appendChild(li);
    });
}

function eliminarAmigo(index) {
    amigos.splice(index, 1);
    actualizarLista();
}

function sortearAmigo() {
    if (amigos.length < 2) {
        alert("Debe haber al menos 2 participantes para sortear.");
        return;
    }

    let amigosSinEmparejar = [...amigos];
    let resultado = {};
    
    for (let amigo of amigos) {
        let posiblesOpciones = amigosSinEmparejar.filter(a => a !== amigo);
        
        if (posiblesOpciones.length === 0) {
            alert("No se pudo realizar el sorteo correctamente. Inténtalo de nuevo.");
            return;
        }
        
        let elegido = posiblesOpciones[Math.floor(Math.random() * posiblesOpciones.length)];
        resultado[amigo] = elegido;
        amigosSinEmparejar = amigosSinEmparejar.filter(a => a !== elegido);
    }
    
    mostrarResultados(resultado);
}

function mostrarResultados(resultado) {
    const listaResultados = document.getElementById("resultado");
    listaResultados.innerHTML = "";
    
    for (let [amigo, asignado] of Object.entries(resultado)) {
        const li = document.createElement("li");
        li.textContent = `${amigo} → ${asignado}`;
        listaResultados.appendChild(li);
    }
}
