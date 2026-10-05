// ==========================================
// 🎵 MI BIBLIOTECA MUSICAL
// ==========================================


// ==========================================
// ELEMENTOS DE LA PÁGINA
// ==========================================

const btnAgregar = document.getElementById("btnAgregar");

const formulario =
    document.getElementById("formularioCancion");

const btnGuardar =
    document.getElementById("btnGuardar");

const buscador =
    document.getElementById("buscador");

const filtroTonalidad =
    document.getElementById("filtroTonalidad");


// ==========================================
// 💾 CARGAR CANCIONES
// ==========================================

let canciones = JSON.parse(
    localStorage.getItem("canciones")
) || [];


// ==========================================
// ✏️ ÍNDICE DE EDICIÓN
// ==========================================

let indiceEditando = null;


// ==========================================
// 🚀 INICIAR APLICACIÓN
// ==========================================

mostrarCanciones();

// ==========================================
// ✨ ANIMACIÓN INICIAL DE LA BIBLIOTECA
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        document.body.classList.add(
            "biblioteca-cargada"
        );

    }
);

// ==========================================
// ➕ BOTÓN AGREGAR
// ==========================================

if (btnAgregar) {

    btnAgregar.addEventListener(
        "click",
        function () {

            formulario.style.display = "block";

            indiceEditando = null;

            btnGuardar.textContent =
                "💾 Guardar canción";

            limpiarFormulario();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


// ==========================================
// 💾 GUARDAR / EDITAR CANCIÓN
// ==========================================

if (btnGuardar) {

    btnGuardar.addEventListener(
        "click",
        function () {

            const nombre =
                obtenerValor("nombreCancion");

            const portada =
                obtenerValor("portadaCancion");

            const artista =
                obtenerValor("artistaCancion");

            const tonalidad =
                obtenerValor("tonalidadCancion");

            const bpm =
                obtenerValor("bpmCancion");

            const acordes =
                obtenerValor("acordesCancion");

          const notas =
    obtenerTextoSecciones("editorNotas");

const letra =
    obtenerTextoSecciones("editorLetra");

const trompeta =
    obtenerTextoSecciones("editorTrompeta");

            const observaciones =
                obtenerValor("observacionesCancion");

            const youtube =
                obtenerValor("youtubeCancion");

            const youtubeVoces =
                obtenerValor("youtubeVocesCancion");


            // ==================================
            // VALIDAR NOMBRE
            // ==================================

            if (nombre === "") {

                alert(
                    "⚠️ Escribe el nombre de la canción."
                );

                return;

            }


            // ==================================
            // CREAR CANCIÓN
            // ==================================

            const cancion = {

                nombre: nombre,

                portada: portada,

                artista: artista,

                tonalidad: tonalidad,

                bpm: bpm,

                acordes: acordes,

                notas: notas,

                letra: letra,

                trompeta: trompeta,

                observaciones: observaciones,

                youtube: youtube,

                youtubeVoces: youtubeVoces

            };


            // ==================================
            // ✏️ EDITAR
            // ==================================

            if (indiceEditando !== null) {

                canciones[indiceEditando] =
                    cancion;

                alert(
                    "✏️ ¡Canción actualizada correctamente!"
                );

            }


            // ==================================
            // ➕ NUEVA CANCIÓN
            // ==================================

            else {

                canciones.push(cancion);

                alert(
                    "🎵 ¡Canción guardada correctamente!"
                );

            }


            // ==================================
            // 💾 GUARDAR
            // ==================================

            localStorage.setItem(
                "canciones",
                JSON.stringify(canciones)
            );


            // ==================================
            // 🔄 ACTUALIZAR
            // ==================================

            mostrarCanciones();


            formulario.style.display = "none";


            limpiarFormulario();


            indiceEditando = null;


            btnGuardar.textContent =
                "💾 Guardar canción";

        }
    );

}


// ==========================================
// 🎵 MOSTRAR CANCIONES
// ==========================================

function mostrarCanciones(
    lista = canciones
) {

    const contenedor =
        document.getElementById(
            "listaCanciones"
        );


    if (!contenedor) {
        return;
    }


    contenedor.innerHTML = "";


    // ==================================
    // SIN RESULTADOS
    // ==================================

    if (lista.length === 0) {

        contenedor.innerHTML = `

            <div class="cancion">

                <h3>
                    🔎 No se encontraron canciones
                </h3>

                <p>
                    Prueba con otro término
                    de búsqueda.
                </p>

            </div>

        `;

        return;

    }


    // ==================================
    // CREAR TARJETAS
    // ==================================

    lista.forEach(
        function (cancion) {

            const indice =
                canciones.indexOf(cancion);


            const elemento =
                document.createElement(
                    "div"
                );


            elemento.classList.add(
                "cancion"
            );


            // ==================================
            // PORTADA
            // ==================================

            let portadaHTML = "";


            if (
                cancion.portada &&
                cancion.portada.trim() !== ""
            ) {

                portadaHTML = `

                    <img
                        src="${escapeHTML(cancion.portada)}"
                        alt="Portada de ${escapeHTML(cancion.nombre)}"
                        class="portada-cancion"
                        onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
                    >

                    <div
                        class="portada-placeholder"
                        style="display:none;"
                    >
                        🎵
                    </div>

                `;

            }

            else {

                portadaHTML = `

                    <div
                        class="portada-placeholder"
                    >
                        🎵
                    </div>

                `;

            }


            // ==================================
            // TARJETA PRINCIPAL
            // ==================================

            elemento.innerHTML = `

                <div class="tarjeta-cancion">


                    <div class="portada-contenedor">

                        ${portadaHTML}

                    </div>


                    <div class="info-principal">


                        <h3>
                            ${escapeHTML(
                                cancion.nombre
                            )}
                        </h3>


                        <p class="artista">

                            🎤
                            ${escapeHTML(
                                cancion.artista ||
                                "Artista desconocido"
                            )}

                        </p>


                        <p class="tonalidad">

                            🎼
                            ${escapeHTML(
                                cancion.tonalidad ||
                                "Tonalidad no especificada"
                            )}

                        </p>


                    </div>


                    <div class="botones-secciones">


                        <button
                            class="boton boton-musicos"
                            onclick="mostrarMusicos(${indice})"
                        >

                            🎺 MÚSICOS

                        </button>


                        <button
                            class="boton boton-voces"
                            onclick="mostrarVoces(${indice})"
                        >

                            🎤 VOCES

                        </button>


                    </div>


                    <div
                        id="contenido-${indice}"
                        class="contenido-detalle"
                    >

                    </div>


                    <div class="acciones">


                        <button
                            class="boton editar"
                            onclick="editarCancion(${indice})"
                        >

                            ✏️ Editar

                        </button>


                        <button
                            class="boton eliminar"
                            onclick="eliminarCancion(${indice})"
                        >

                            🗑️ Eliminar

                        </button>


                    </div>


                </div>

            `;


            contenedor.appendChild(
                elemento
            );

        }
    );

}


// ==========================================
// 🎺 MÚSICOS
// ==========================================

function mostrarMusicos(indice) {

    const cancion =
        canciones[indice];


    const contenedor =
        document.getElementById(
            `contenido-${indice}`
        );


    if (!cancion || !contenedor) {
        return;
    }


    contenedor.innerHTML = `

        <div class="detalle-musicos">


            <h2>
                🎺 Información para músicos
            </h2>


            <div class="dato-musical">

                <h3>
                    🎼 Tonalidad
                </h3>

                <div class="dato-contenido">

                    ${textoSimple(
                        cancion.tonalidad ||
                        "No especificada"
                    )}

                </div>

            </div>


            <div class="dato-musical">

                <h3>
                    ⏱️ BPM
                </h3>

                <div class="dato-contenido">

                    ${textoSimple(
                        cancion.bpm ||
                        "No especificado"
                    )}

                </div>

            </div>


            <div class="dato-musical">

                <h3>
                    🎹 Acordes
                </h3>

                <div class="dato-contenido">

                    ${mostrarSecciones(
                        cancion.acordes,
                        "acordes"
                    )}

                </div>

            </div>


            <div class="dato-musical">

                <h3>
                    🎼 Notas
                </h3>

                <div class="dato-contenido">

                    ${mostrarSecciones(
                        cancion.notas,
                        "notas"
                    )}

                </div>

            </div>


            <div class="dato-musical">

                <h3>
                    🎺 Notas para trompeta
                </h3>

                <div class="dato-contenido">

                    ${mostrarSecciones(
                        cancion.trompeta,
                        "notas"
                    )}

                </div>

            </div>


            <div class="dato-musical">

                <h3>
                    📝 Observaciones
                </h3>

                <div class="dato-contenido">

                    ${mostrarSecciones(
                        cancion.observaciones,
                        "observaciones"
                    )}

                </div>

            </div>


            <button
                class="boton cerrar-detalle"
                onclick="cerrarDetalle(${indice})"
            >

                🔽 Ocultar información

            </button>


        </div>

    `;


    contenedor.style.display =
        "block";


    contenedor.scrollIntoView({

        behavior: "smooth",

        block: "nearest"

    });

}


// ==========================================
// 🎤 VOCES
// ==========================================

function mostrarVoces(indice) {

    const cancion =
        canciones[indice];


    const contenedor =
        document.getElementById(
            `contenido-${indice}`
        );


    if (!cancion || !contenedor) {
        return;
    }


    // ==================================
    // VIDEO PRINCIPAL
    // ==================================

    let videoPrincipal = `

        <div class="sin-video">

            🎬 No hay video de la canción.

        </div>

    `;


    if (cancion.youtube) {

        const video =
            convertirYoutube(
                cancion.youtube
            );


        if (video) {

            videoPrincipal = `

                <div class="video-youtube">

                    <iframe
                        src="${video}"
                        title="${escapeHTML(cancion.nombre)}"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen>
                    </iframe>

                </div>

            `;

        }

    }


    // ==================================
    // VIDEO DE VOCES
    // ==================================

    let videoVoces = `

        <div class="sin-video">

            🎤 Todavía no hay
            video específico de voces.

        </div>

    `;


    if (cancion.youtubeVoces) {

        const video =
            convertirYoutube(
                cancion.youtubeVoces
            );


        if (video) {

            videoVoces = `

                <div class="video-youtube">

                    <iframe
                        src="${video}"
                        title="Video de voces - ${escapeHTML(cancion.nombre)}"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen>
                    </iframe>

                </div>

            `;

        }

    }


    // ==================================
    // CONTENIDO
    // ==================================

    contenedor.innerHTML = `

        <div class="detalle-voces">


            <h2>
                🎤 Información para voces
            </h2>


            <div class="seccion-letra">

                <h3>
                    🎵 Letra
                </h3>


                <div class="letra-cancion">

                    ${mostrarSecciones(
                        cancion.letra,
                        "letra"
                    )}

                </div>

            </div>


            <div class="seccion-video">

                <h3>
                    🎬 Video de la canción
                </h3>

                ${videoPrincipal}

            </div>


            <div class="seccion-video">

                <h3>
                    🎤 Video de voces
                </h3>

                ${videoVoces}

            </div>


            <button
                class="boton cerrar-detalle"
                onclick="cerrarDetalle(${indice})"
            >

                🔽 Ocultar información

            </button>


        </div>

    `;


    contenedor.style.display =
        "block";


    contenedor.scrollIntoView({

        behavior: "smooth",

        block: "nearest"

    });

}


// ==========================================
// 🔽 CERRAR DETALLE
// ==========================================

function cerrarDetalle(indice) {

    const contenedor =
        document.getElementById(
            `contenido-${indice}`
        );


    if (!contenedor) {
        return;
    }


    contenedor.innerHTML = "";


    contenedor.style.display =
        "none";

}


// ==========================================
// 🔎 BUSCADOR + FILTRO
// ==========================================

function aplicarFiltros() {

    const textoBuscado =
        buscador
            ? buscador.value
                .toLowerCase()
                .trim()
            : "";


    const tonalidadSeleccionada =
        filtroTonalidad
            ? filtroTonalidad.value
                .toLowerCase()
            : "";


    const resultados =
        canciones.filter(
            function (cancion) {

                const contenidoCancion = `

                    ${cancion.nombre || ""}

                    ${cancion.artista || ""}

                    ${cancion.tonalidad || ""}

                    ${cancion.bpm || ""}

                    ${cancion.acordes || ""}

                    ${cancion.notas || ""}

                    ${cancion.letra || ""}

                    ${cancion.trompeta || ""}

                    ${cancion.observaciones || ""}

                `.toLowerCase();


                const coincideTexto =
                    contenidoCancion.includes(
                        textoBuscado
                    );


                const coincideTonalidad =
                    tonalidadSeleccionada === "" ||

                    (
                        cancion.tonalidad || ""
                    )
                    .toLowerCase()
                    .includes(
                        tonalidadSeleccionada
                    );


                return (

                    coincideTexto &&

                    coincideTonalidad

                );

            }
        );


    mostrarCanciones(
        resultados
    );

}


// ==========================================
// 🔎 ACTIVAR BUSCADOR
// ==========================================

if (buscador) {

    buscador.addEventListener(
        "input",
        aplicarFiltros
    );

}


if (filtroTonalidad) {

    filtroTonalidad.addEventListener(
        "change",
        aplicarFiltros
    );

}


// ==========================================
// ✏️ EDITAR CANCIÓN
// ==========================================

function editarCancion(indice) {

    const cancion =
        canciones[indice];


    if (!cancion) {
        return;
    }


    indiceEditando =
        indice;


    document.getElementById(
        "nombreCancion"
    ).value =
        cancion.nombre || "";


    const campoPortada =
        document.getElementById(
            "portadaCancion"
        );

    if (campoPortada) {

        campoPortada.value =
            cancion.portada || "";

    }


    document.getElementById(
        "artistaCancion"
    ).value =
        cancion.artista || "";


    document.getElementById(
        "tonalidadCancion"
    ).value =
        cancion.tonalidad || "";


    document.getElementById(
        "bpmCancion"
    ).value =
        cancion.bpm || "";


    document.getElementById(
        "acordesCancion"
    ).value =
        cancion.acordes || "";


   

cargarTextoSecciones(
    "editorNotas",
    cancion.notas || ""
);

cargarTextoSecciones(
    "editorLetra",
    cancion.letra || ""
);

cargarTextoSecciones(
    "editorTrompeta",
    cancion.trompeta || ""
);
   


    document.getElementById(
        "observacionesCancion"
    ).value =
        cancion.observaciones || "";


    document.getElementById(
        "youtubeCancion"
    ).value =
        cancion.youtube || "";


    const campoYoutubeVoces =
        document.getElementById(
            "youtubeVocesCancion"
        );


    if (campoYoutubeVoces) {

        campoYoutubeVoces.value =
            cancion.youtubeVoces || "";

    }


    formulario.style.display =
        "block";


    btnGuardar.textContent =
        "💾 Guardar cambios";


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


// ==========================================
// 🗑️ ELIMINAR CANCIÓN
// ==========================================

function eliminarCancion(indice) {

    const cancion =
        canciones[indice];


    if (!cancion) {
        return;
    }


    const confirmar =
        confirm(

            `¿Seguro que quieres eliminar "${cancion.nombre}"?`

        );


    if (!confirmar) {
        return;
    }


    canciones.splice(
        indice,
        1
    );


    localStorage.setItem(

        "canciones",

        JSON.stringify(canciones)

    );


    mostrarCanciones();

}


// ==========================================
// 🎬 CONVERTIR LINK DE YOUTUBE
// ==========================================

function convertirYoutube(url) {

    if (!url) {
        return "";
    }


    let videoID = "";


    // ==================================
    // YOUTUBE NORMAL
    // ==================================

    if (
        url.includes("watch?v=")
    ) {

        videoID =
            url
                .split("watch?v=")[1]
                .split("&")[0];

    }


    // ==================================
    // YOUTUBE CORTO
    // ==================================

    else if (
        url.includes("youtu.be/")
    ) {

        videoID =
            url
                .split("youtu.be/")[1]
                .split("?")[0];

    }


    // ==================================
    // YOUTUBE EMBED
    // ==================================

    else if (
        url.includes(
            "youtube.com/embed/"
        )
    ) {

        videoID =
            url
                .split("embed/")[1]
                .split("?")[0];

    }


    if (!videoID) {

        return "";

    }


    return (
        "https://www.youtube.com/embed/" +
        videoID
    );

}


// ==========================================
// 🧹 LIMPIAR FORMULARIO
// ==========================================

function limpiarFormulario() {

    const campos = [

        "nombreCancion",

        "portadaCancion",

        "artistaCancion",

        "tonalidadCancion",

        "bpmCancion",

        "acordesCancion",

        "notasCancion",

        "letraCancion",

        "trompetaCancion",

        "observacionesCancion",

        "youtubeCancion",

        "youtubeVocesCancion"

    ];


    campos.forEach(
        function (id) {

            const campo =
                document.getElementById(id);


            if (campo) {

                campo.value = "";

            }

        }
    );

}


// ==========================================
// 🧩 OBTENER VALOR DE CAMPO
// ==========================================

function obtenerValor(id) {

    const elemento =
        document.getElementById(id);


    if (!elemento) {

        return "";

    }


    return elemento.value.trim();

}

// ==========================================
// 🎵 EDITOR DE SECCIONES
// ==========================================

function agregarSeccion(editorId) {

    const editor =
        document.getElementById(editorId);

    if (!editor) {
        return;
    }

    const bloque =
        document.createElement("div");

    bloque.className =
        "bloque-seccion";

    bloque.innerHTML = `

        <select class="tipo-seccion">

            <option value="INTRO">INTRO</option>
            <option value="VERSO 1">VERSO 1</option>
            <option value="VERSO 2">VERSO 2</option>
            <option value="PRE-CORO">PRE-CORO</option>
            <option value="CORO">CORO</option>
            <option value="PUENTE">PUENTE</option>
            <option value="INTERLUDIO">INTERLUDIO</option>
            <option value="INSTRUMENTAL">INSTRUMENTAL</option>
            <option value="SOLO">SOLO</option>
            <option value="SUBIDA">SUBIDA</option>
            <option value="BAJADA">BAJADA</option>
            <option value="FINAL">FINAL</option>
            <option value="OTRO">OTRO</option>

        </select>

        <textarea
            class="contenido-seccion-editor"
            placeholder="Escribe aquí..."
        ></textarea>

        <button
            type="button"
            class="btn-eliminar-seccion"
            onclick="this.parentElement.remove()"
        >
            🗑️ Eliminar sección
        </button>

    `;

    editor.appendChild(bloque);
}


// ==========================================
// 🧩 CONVERTIR EDITOR → TEXTO
// ==========================================

function obtenerTextoSecciones(editorId) {

    const editor =
        document.getElementById(editorId);

    if (!editor) {
        return "";
    }

    const bloques =
        editor.querySelectorAll(
            ".bloque-seccion"
        );

    const resultado = [];

    bloques.forEach(function (bloque) {

        const tipo =
            bloque.querySelector(
                ".tipo-seccion"
            );

        const contenido =
            bloque.querySelector(
                ".contenido-seccion-editor"
            );

        if (
            !tipo ||
            !contenido ||
            contenido.value.trim() === ""
        ) {
            return;
        }

        resultado.push(

            `[${tipo.value}]\n${contenido.value.trim()}`

        );

    });

    return resultado.join("\n\n");
}


// ==========================================
// 🧩 CARGAR TEXTO → EDITOR
// ==========================================

function cargarTextoSecciones(
    editorId,
    texto
) {

    const editor =
        document.getElementById(editorId);

    if (!editor) {
        return;
    }

    editor.innerHTML = "";

    if (
        !texto ||
        texto.trim() === ""
    ) {

        agregarSeccion(editorId);

        return;
    }

    const partes =
        texto
            .replace(/\r\n/g, "\n")
            .split(
                /\n(?=\[[^\]]+\])/
            );

    partes.forEach(function (parte) {

        const coincidencia =
            parte.match(
                /^\[([^\]]+)\]\s*\n?([\s\S]*)$/
            );

        const bloque =
            document.createElement(
                "div"
            );

        bloque.className =
            "bloque-seccion";

        let tipo =
            "OTRO";

        let contenido =
            parte.trim();

        if (coincidencia) {

            tipo =
                coincidencia[1];

            contenido =
                coincidencia[2].trim();

        }

        bloque.innerHTML = `

            <select class="tipo-seccion">

                <option value="INTRO">INTRO</option>
                <option value="VERSO 1">VERSO 1</option>
                <option value="VERSO 2">VERSO 2</option>
                <option value="PRE-CORO">PRE-CORO</option>
                <option value="CORO">CORO</option>
                <option value="PUENTE">PUENTE</option>
                <option value="INTERLUDIO">INTERLUDIO</option>
                <option value="INSTRUMENTAL">INSTRUMENTAL</option>
                <option value="SOLO">SOLO</option>
                <option value="SUBIDA">SUBIDA</option>
                <option value="BAJADA">BAJADA</option>
                <option value="FINAL">FINAL</option>
                <option value="OTRO">OTRO</option>

            </select>

            <textarea
                class="contenido-seccion-editor"
            ></textarea>

            <button
                type="button"
                class="btn-eliminar-seccion"
                onclick="this.parentElement.remove()"
            >
                🗑️ Eliminar sección
            </button>

        `;

        const selector =
            bloque.querySelector(
                ".tipo-seccion"
            );

        const textarea =
            bloque.querySelector(
                ".contenido-seccion-editor"
            );

        const opciones =
            Array.from(
                selector.options
            );

        const opcionEncontrada =
            opciones.find(
                opcion =>
                    opcion.value.toLowerCase() ===
                    tipo.toLowerCase()
            );

        if (opcionEncontrada) {

            selector.value =
                opcionEncontrada.value;

        }
        else {

            selector.value =
                "OTRO";

        }

        textarea.value =
            contenido;

        editor.appendChild(
            bloque
        );

    });

}


// ==========================================
// 🌐 HACER FUNCIÓN GLOBAL
// ==========================================

window.agregarSeccion =
    agregarSeccion;

// ==========================================
// 🛡️ ESCAPAR HTML
// ==========================================

function escapeHTML(texto) {

    if (
        texto === null ||
        texto === undefined
    ) {

        return "";

    }


    return String(texto)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}


// ==========================================
// 📝 MOSTRAR TEXTO SIMPLE
// ==========================================

function textoSimple(texto) {

    return escapeHTML(
        texto
    )
    .replace(
        /\n/g,
        "<br>"
    );

}


// ==========================================
// 🎵 MOSTRAR SECCIONES
// ==========================================
//
// Puedes escribir:
//
// [VERSO 1]
// letra...
//
// [CORO]
// letra...
//
// [PUENTE]
// letra...
//
// La aplicación separará automáticamente
// cada sección visualmente.
// ==========================================

function mostrarSecciones(
    texto,
    tipo = ""
) {

    if (
        !texto ||
        texto.trim() === ""
    ) {

        return `

            <div class="sin-contenido">

                Todavía no hay información
                registrada.

            </div>

        `;

    }


    const textoLimpio =
        String(texto)
            .replace(/\r\n/g, "\n")
            .trim();


    // ==================================
    // BUSCAR ENCABEZADOS
    // ==================================

    const partes =
        textoLimpio.split(
            /(\[[^\]]+\])/g
        );


    let html = "";

    let seccionActual =
        null;


    partes.forEach(
        function (parte) {

            if (
                !parte ||
                parte.trim() === ""
            ) {

                return;

            }


            const contenido =
                parte.trim();


            // ==================================
            // ES ENCABEZADO
            // ==================================

            if (
                contenido.startsWith("[") &&
                contenido.endsWith("]")
            ) {

                const titulo =
                    contenido
                        .substring(
                            1,
                            contenido.length - 1
                        )
                        .trim();


                seccionActual =
                    document.createElement(
                        "div"
                    );


                html += `

                    <div class="seccion-musical">

                        <div class="titulo-seccion">

                            ${escapeHTML(
                                titulo
                            )}

                        </div>

                `;

            }


            // ==================================
            // CONTENIDO
            // ==================================

            else {

                const contenidoSeguro =
                    escapeHTML(
                        parte.trim()
                    )
                    .replace(
                        /\n/g,
                        "<br>"
                    );


                if (
                    seccionActual
                ) {

                    html += `

                            <div class="contenido-seccion">

                                ${contenidoSeguro}

                            </div>

                        </div>

                    `;

                    seccionActual =
                        null;

                }

                else {

                    html += `

                        <div class="contenido-seccion independiente">

                            ${contenidoSeguro}

                        </div>

                    `;

                }

            }

        }
    );


    // ==================================
    // SI QUEDÓ UNA SECCIÓN ABIERTA
    // ==================================

    if (seccionActual) {

        html += `
            </div>
        `;

    }


    return html;

}


// ==========================================
// 🌐 FUNCIONES GLOBALES
// ==========================================

window.editarCancion =
    editarCancion;


window.eliminarCancion =
    eliminarCancion;


window.mostrarMusicos =
    mostrarMusicos;


window.mostrarVoces =
    mostrarVoces;


window.cerrarDetalle =
    cerrarDetalle;
    

   // ==========================================
// 🔄 TRANSPORTADOR DE TONALIDAD
// ==========================================


// ==========================================
// 🎼 NOTAS CROMÁTICAS
// ==========================================

const notasCromaticas = [

    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B"

];


// ==========================================
// 🎼 NOMBRES DE TONALIDADES
// ==========================================

function obtenerNombreTonalidad(tonalidad) {

    const nombres = {

        "C": "Do mayor",
        "Cm": "Do menor",

        "C#": "Do♯ mayor",
        "C#m": "Do♯ menor",

        "D": "Re mayor",
        "Dm": "Re menor",

        "D#": "Re♯ mayor",
        "D#m": "Re♯ menor",

        "E": "Mi mayor",
        "Em": "Mi menor",

        "F": "Fa mayor",
        "Fm": "Fa menor",

        "F#": "Fa♯ mayor",
        "F#m": "Fa♯ menor",

        "G": "Sol mayor",
        "Gm": "Sol menor",

        "G#": "Sol♯ mayor",
        "G#m": "Sol♯ menor",

        "A": "La mayor",
        "Am": "La menor",

        "A#": "La♯ mayor",
        "A#m": "La♯ menor",

        "B": "Si mayor",
        "Bm": "Si menor"

    };

    return nombres[tonalidad] || tonalidad;

}


// ==========================================
// 🎵 NORMALIZAR TONALIDAD
// ==========================================

function normalizarTonalidad(tonalidad) {

    if (!tonalidad) {
        return "";
    }

    let texto =
        String(tonalidad)
            .trim()
            .toLowerCase();


    const equivalencias = {

        "do": "C",
        "do mayor": "C",
        "do menor": "Cm",

        "do#": "C#",
        "do♯": "C#",
        "do# mayor": "C#",
        "do♯ mayor": "C#",
        "do# menor": "C#m",
        "do♯ menor": "C#m",

        "re": "D",
        "re mayor": "D",
        "re menor": "Dm",

        "re#": "D#",
        "re♯": "D#",
        "re# mayor": "D#",
        "re♯ mayor": "D#",
        "re# menor": "D#m",
        "re♯ menor": "D#m",

        "mi": "E",
        "mi mayor": "E",
        "mi menor": "Em",

        "fa": "F",
        "fa mayor": "F",
        "fa menor": "Fm",

        "fa#": "F#",
        "fa♯": "F#",
        "fa# mayor": "F#",
        "fa♯ mayor": "F#",
        "fa# menor": "F#m",
        "fa♯ menor": "F#m",

        "sol": "G",
        "sol mayor": "G",
        "sol menor": "Gm",

        "sol#": "G#",
        "sol♯": "G#",
        "sol# mayor": "G#",
        "sol♯ mayor": "G#",
        "sol# menor": "G#m",
        "sol♯ menor": "G#m",

        "la": "A",
        "la mayor": "A",
        "la menor": "Am",

        "la#": "A#",
        "la♯": "A#",
        "la# mayor": "A#",
        "la♯ mayor": "A#",
        "la# menor": "A#m",
        "la♯ menor": "A#m",

        "si": "B",
        "si mayor": "B",
        "si menor": "Bm"

    };


    if (equivalencias[texto]) {
        return equivalencias[texto];
    }


    // Si ya viene como C, Am, F#, etc.
    const formato =
        texto
            .replace("♯", "#");


    const convertido =
        formato.charAt(0).toUpperCase() +
        formato.slice(1);


    if (
        notasCromaticas.includes(
            convertido.replace("m", "")
        )
    ) {

        return convertido;

    }


    return "";
}


// ==========================================
// 🎵 CARGAR CANCIONES EN EL SELECTOR
// ==========================================

function cargarCancionesTransportador() {

    const selector =
        document.getElementById(
            "cancionTransportador"
        );


    if (!selector) {
        return;
    }


    selector.innerHTML = `

        <option value="">
            Selecciona una canción
        </option>

    `;


    canciones.forEach(
        function (cancion, indice) {

            const opcion =
                document.createElement(
                    "option"
                );

            opcion.value = indice;

            opcion.textContent =
                cancion.nombre +
                (
                    cancion.artista
                        ? " — " +
                          cancion.artista
                        : ""
                );

            selector.appendChild(
                opcion
            );

        }
    );

}


// ==========================================
// 🎵 SELECCIONAR CANCIÓN
// ==========================================

function seleccionarCancionTransportador() {

    const selector =
        document.getElementById(
            "cancionTransportador"
        );

    const campoOrigen =
        document.getElementById(
            "tonalidadOrigen"
        );


    if (
        !selector ||
        !campoOrigen
    ) {
        return;
    }


    if (selector.value === "") {

        campoOrigen.value = "C";

        return;

    }


    const indice =
        Number(selector.value);


    const cancion =
        canciones[indice];


    if (!cancion) {
        return;
    }


    const tonalidad =
        normalizarTonalidad(
            cancion.tonalidad
        );


    if (tonalidad) {

        campoOrigen.value =
            tonalidad;

    }

}


// ==========================================
// 🎼 TRANSPORTAR NOTAS / ACORDES
// ==========================================

function transportarTexto(
    texto,
    origen,
    destino
) {

    if (
        !texto ||
        texto.trim() === ""
    ) {

        return "";

    }


    const origenNormalizado =
        normalizarTonalidad(
            origen
        );


    const destinoNormalizado =
        normalizarTonalidad(
            destino
        );


    if (
        !origenNormalizado ||
        !destinoNormalizado
    ) {

        return texto;

    }


    const notaOrigen =
        origenNormalizado.replace(
            "m",
            ""
        );


    const notaDestino =
        destinoNormalizado.replace(
            "m",
            ""
        );


    const indiceOrigen =
        notasCromaticas.indexOf(
            notaOrigen
        );


    const indiceDestino =
        notasCromaticas.indexOf(
            notaDestino
        );


    if (
        indiceOrigen === -1 ||
        indiceDestino === -1
    ) {

        return texto;

    }


    let diferencia =
        indiceDestino -
        indiceOrigen;


    // ==================================
    // BUSCAR LA DISTANCIA MÁS CORTA
    // ==================================

    if (diferencia > 6) {

        diferencia -= 12;

    }

    if (diferencia < -6) {

        diferencia += 12;

    }


    // ==================================
    // TRANSPORTAR ACORDES Y NOTAS
    // ==================================

    return texto.replace(

        /\b(C#|D#|F#|G#|A#|Bb|Eb|Ab|Db|Gb|C|D|E|F|G|A|B)(m|maj|min|sus|dim|aug|add)?(\d+)?(\/(C#|D#|F#|G#|A#|Bb|Eb|Ab|Db|Gb|C|D|E|F|G|A|B))?\b/gi,

        function (
            coincidencia,
            nota,
            calidad,
            numero,
            bajoCompleto
        ) {

            let notaNormalizada =
                nota
                    .replace("b", "♭")
                    .replace("♯", "#");


            const equivalentesBemol = {

                "Db": "C#",
                "Eb": "D#",
                "Gb": "F#",
                "Ab": "G#",
                "Bb": "A#"

            };


            notaNormalizada =
                equivalentesBemol[
                    nota
                ] || nota;


            const indiceNota =
                notasCromaticas.indexOf(
                    notaNormalizada
                );


            if (indiceNota === -1) {

                return coincidencia;

            }


            let nuevaPosicion =
                indiceNota +
                diferencia;


            nuevaPosicion =
                (
                    nuevaPosicion %
                    12 +
                    12
                ) % 12;


            let nuevoAcorde =
                notasCromaticas[
                    nuevaPosicion
                ];


            if (calidad) {

                nuevoAcorde +=
                    calidad;

            }


            if (numero) {

                nuevoAcorde +=
                    numero;

            }


            // ==================================
            // BAJO DE ACORDE
            // Ejemplo: C/G
            // ==================================

            if (bajoCompleto) {

                const bajo =
                    bajoCompleto.substring(
                        1
                    );


                const bajoNormalizado =
                    equivalentesBemol[
                        bajo
                    ] || bajo;


                const indiceBajo =
                    notasCromaticas.indexOf(
                        bajoNormalizado
                    );


                if (indiceBajo !== -1) {

                    let nuevaPosicionBajo =
                        indiceBajo +
                        diferencia;


                    nuevaPosicionBajo =
                        (
                            nuevaPosicionBajo %
                            12 +
                            12
                        ) % 12;


                    nuevoAcorde +=
                        "/" +
                        notasCromaticas[
                            nuevaPosicionBajo
                        ];

                }

            }


            return nuevoAcorde;

        }

    );

}


// ==========================================
// 🔄 MOSTRAR RESULTADO
// ==========================================

function ejecutarTransportador() {

    const selector =
        document.getElementById(
            "cancionTransportador"
        );

    const campoOrigen =
        document.getElementById(
            "tonalidadOrigen"
        );

    const campoDestino =
        document.getElementById(
            "tonalidadDestino"
        );

    const resultado =
        document.getElementById(
            "resultadoTransportador"
        );


    if (
        !selector ||
        !campoOrigen ||
        !campoDestino ||
        !resultado
    ) {

        return;

    }


    if (selector.value === "") {

        resultado.innerHTML = `

            <div class="sin-contenido">

                ⚠️ Primero selecciona una canción.

            </div>

        `;

        return;

    }


    const indice =
        Number(selector.value);


    const cancion =
        canciones[indice];


    if (!cancion) {

        resultado.innerHTML = `

            <div class="sin-contenido">

                ❌ No se pudo encontrar
                la canción seleccionada.

            </div>

        `;

        return;

    }


    const origen =
        normalizarTonalidad(
            campoOrigen.value
        );


    const destino =
        normalizarTonalidad(
            campoDestino.value
        );


    if (!origen || !destino) {

        resultado.innerHTML = `

            <div class="sin-contenido">

                ⚠️ No se pudo determinar
                la tonalidad.

            </div>

        `;

        return;

    }


    const nuevaTonality =
        obtenerNombreTonalidad(
            destino
        );


    const acordesTransportados =
        transportarTexto(
            cancion.acordes || "",
            origen,
            destino
        );


    const notasTransportadas =
        transportarTexto(
            cancion.notas || "",
            origen,
            destino
        );


    const trompetaTransportada =
        transportarTexto(
            cancion.trompeta || "",
            origen,
            destino
        );


    resultado.innerHTML = `

        <div class="resultado-transporte">

            <h3>
                🎵 ${escapeHTML(
                    cancion.nombre
                )}
            </h3>


            <p class="artista-transporte">

                🎤 ${
                    escapeHTML(
                        cancion.artista ||
                        "Artista desconocido"
                    )
                }

            </p>


            <div class="tonalidades-transporte">

                <div>

                    <span>
                        🎼 Original
                    </span>

                    <strong>
                        ${escapeHTML(
                            obtenerNombreTonalidad(
                                origen
                            )
                        )}
                    </strong>

                </div>


                <div>

                    <span>
                        🎯 Nueva
                    </span>

                    <strong>
                        ${escapeHTML(
                            nuevaTonality
                        )}
                    </strong>

                </div>

            </div>


            <!-- ==========================
                 ACORDES
                 ========================== -->

            <div class="resultado-musical">

                <h4>
                    🎹 Acordes transportados
                </h4>

                <div class="texto-transportado">

                    ${
                        acordesTransportados
                            ? mostrarSecciones(
                                acordesTransportados,
                                "acordes"
                              )
                            : `
                                <div class="sin-contenido">
                                    No hay acordes registrados.
                                </div>
                              `
                    }

                </div>

            </div>


            <!-- ==========================
                 NOTAS
                 ========================== -->

            <div class="resultado-musical">

                <h4>
                    🎼 Notas transportadas
                </h4>

                <div class="texto-transportado">

                    ${
                        notasTransportadas
                            ? mostrarSecciones(
                                notasTransportadas,
                                "notas"
                              )
                            : `
                                <div class="sin-contenido">
                                    No hay notas registradas.
                                </div>
                              `
                    }

                </div>

            </div>


            <!-- ==========================
                 TROMPETA
                 ========================== -->

            <div class="resultado-musical">

                <h4>
                    🎺 Trompeta transportada
                </h4>

                <div class="texto-transportado">

                    ${
                        trompetaTransportada
                            ? mostrarSecciones(
                                trompetaTransportada,
                                "notas"
                              )
                            : `
                                <div class="sin-contenido">
                                    No hay notas de trompeta registradas.
                                </div>
                              `
                    }

                </div>

            </div>


            <div class="aviso-transporte">

                🛡️ La canción original
                permanece intacta.

                <br>

                Esta es solamente una
                versión transportada.

            </div>

        </div>

    `;

}


// ==========================================
// 🔄 ABRIR / CERRAR TRANSPORTADOR
// ==========================================

document.addEventListener(
    "click",
    function (evento) {


        // ==================================
        // ABRIR
        // ==================================

        const abrir =
            evento.target.closest(
                "#btnTransportador"
            );


        if (abrir) {

            const panel =
                document.getElementById(
                    "panelTransportador"
                );


            if (panel) {

                panel.style.display =
                    "block";

                cargarCancionesTransportador();

            }

            return;

        }


        // ==================================
        // CERRAR
        // ==================================

        const cerrar =
            evento.target.closest(
                "#cerrarTransportador"
            );


        if (cerrar) {

            const panel =
                document.getElementById(
                    "panelTransportador"
                );


            if (panel) {

                panel.style.display =
                    "none";

            }

            return;

        }


        // ==================================
        // TRANSPORTAR
        // ==================================

        const transportar =
            evento.target.closest(
                "#btnTransportar"
            );


        if (transportar) {

            ejecutarTransportador();

        }

    }
);


// ==========================================
// 🎵 CAMBIO DE CANCIÓN
// ==========================================

document.addEventListener(
    "change",
    function (evento) {

        if (
            evento.target &&
            evento.target.id ===
            "cancionTransportador"
        ) {

            seleccionarCancionTransportador();

        }

    }
);


// ==========================================
// 🔄 TRANSPORTAR TEXTO MUSICAL
// ==========================================

function transportarTexto(
    texto,
    origen,
    destino
) {

    if (
        !texto ||
        texto.trim() === ""
    ) {

        return "";

    }


    const indiceOrigen =
        notasCromaticas.indexOf(
            origen.replace("m", "")
        );


    const indiceDestino =
        notasCromaticas.indexOf(
            destino.replace("m", "")
        );


    if (
        indiceOrigen === -1 ||
        indiceDestino === -1
    ) {

        return texto;

    }


    let diferencia =
        indiceDestino -
        indiceOrigen;


    // ==================================
    // TRANSPORTAR CADA NOTA
    // ==================================

    return texto.replace(

        /\b(C#|D#|F#|G#|A#|C|D|E|F|G|A|B)([m]?)\b/g,

        function (
            coincidencia,
            nota,
            menor
        ) {

            const indiceNota =
                notasCromaticas.indexOf(
                    nota
                );


            if (indiceNota === -1) {

                return coincidencia;

            }


            let nuevaPosicion =
                indiceNota +
                diferencia;


            nuevaPosicion =
                (
                    nuevaPosicion %
                    notasCromaticas.length +
                    notasCromaticas.length
                )
                %
                notasCromaticas.length;


            return (
                notasCromaticas[
                    nuevaPosicion
                ] +
                menor
            );

        }

    );

}


// ==========================================
// 🔄 BOTÓN TRANSPORTAR
// ==========================================

if (btnTransportar) {

    btnTransportar.addEventListener(
        "click",
        function () {

            const origen =
                document.getElementById(
                    "tonalidadOrigen"
                ).value;


            const destino =
                document.getElementById(
                    "tonalidadDestino"
                ).value;


            const resultado =
                document.getElementById(
                    "resultadoTransportador"
                );


            // ==================================
            // CALCULAR DIFERENCIA
            // ==================================

            const indiceOrigen =
                notasCromaticas.indexOf(
                    origen.replace("m", "")
                );


            const indiceDestino =
                notasCromaticas.indexOf(
                    destino.replace("m", "")
                );


            let diferencia =
                indiceDestino -
                indiceOrigen;


            // ==================================
            // MOSTRAR RESULTADO
            // ==================================

            resultado.innerHTML = `

                <strong>
                    🎼 Resultado
                </strong>

                <p>

                    ${obtenerNombreTonalidad(origen)}

                    →

                    ${obtenerNombreTonalidad(destino)}

                </p>

                <p>

                    🔄 Movimiento:

                    ${diferencia > 0
                        ? "+" + diferencia
                        : diferencia
                    }

                    semitonos

                </p>

                <hr>

                <p>
                    El transportador está listo
                    para trabajar con las notas
                    y acordes de la canción.
                </p>

            `;

        }
    );

}


// ==========================================
// 🎼 NOMBRE DE TONALIDAD
// ==========================================

function obtenerNombreTonalidad(
    tonalidad
) {

    const nombres = {

        "C": "Do mayor",
        "Cm": "Do menor",

        "C#": "Do♯ mayor",
        "C#m": "Do♯ menor",

        "D": "Re mayor",
        "Dm": "Re menor",

        "D#": "Re♯ mayor",
        "D#m": "Re♯ menor",

        "E": "Mi mayor",
        "Em": "Mi menor",

        "F": "Fa mayor",
        "Fm": "Fa menor",

        "F#": "Fa♯ mayor",
        "F#m": "Fa♯ menor",

        "G": "Sol mayor",
        "Gm": "Sol menor",

        "G#": "Sol♯ mayor",
        "G#m": "Sol♯ menor",

        "A": "La mayor",
        "Am": "La menor",

        "A#": "La♯ mayor",
        "A#m": "La♯ menor",

        "B": "Si mayor",
        "Bm": "Si menor"

    };


    return (
        nombres[tonalidad] ||
        tonalidad
    );

}
console.log("✅ JAVASCRIPT CARGADO CORRECTAMENTE");

/* ==========================================
   📚 SISTEMA DE REPERTORIOS
   ========================================== */

let repertorios = JSON.parse(
    localStorage.getItem("repertorios")
) || [];


// ==========================================
// 🔄 MIGRAR REPERTORIOS ANTIGUOS
// ==========================================

function migrarRepertoriosAntiguos() {

    let huboCambios = false;

    repertorios.forEach(function(repertorio) {

        // Si ya tiene la nueva estructura, no hacemos nada
        if (Array.isArray(repertorio.secciones)) {
            return;
        }

        // Convertir estructura antigua
        const cancionesAntiguas =
            Array.isArray(repertorio.canciones)
                ? repertorio.canciones
                : [];

        repertorio.secciones = [

            {
                tipo: "alabanza",

                cadenas: [

                    {
                        nombre: "Cadena 1",
                        canciones: [...cancionesAntiguas]
                    }

                ]

            }

        ];

        delete repertorio.canciones;

        huboCambios = true;
    });

    if (huboCambios) {
        guardarRepertorios();
    }
}


// ==========================================
// 💾 GUARDAR
// ==========================================

function guardarRepertorios() {

    localStorage.setItem(
        "repertorios",
        JSON.stringify(repertorios)
    );
}


// ==========================================
// 📚 MOSTRAR REPERTORIOS
// ==========================================

function mostrarRepertorios() {

    const panel =
        document.getElementById("panelRepertorios");

    if (!panel) return;

    panel.innerHTML = `

        <div class="encabezado-repertorios">

            <div>

                <h2>📚 Mis Repertorios</h2>

                <p>
                    Organiza tus alabanzas y adoraciones
                    en cadenas.
                </p>

            </div>

            <button
                id="cerrarRepertorios"
                class="boton-cerrar"
                type="button">

                ✖

            </button>

        </div>


        <div class="acciones-repertorios">

            <button
                id="btnNuevoRepertorio"
                class="boton"
                type="button">

                ➕ Nuevo repertorio

            </button>

        </div>


        <div id="listaRepertorios"
             class="lista-repertorios">

            ${
                repertorios.length === 0

                ? `

                    <div class="sin-repertorios">

                        📚 Todavía no tienes repertorios creados.

                    </div>

                `

                : repertorios.map(function(repertorio, indice) {

                    const totalCanciones =
                        contarCancionesRepertorio(repertorio);

                    return `

                        <div class="tarjeta-repertorio">

                            <div class="info-repertorio">

                                <h3>
                                    📚 ${escapeHTML(repertorio.nombre)}
                                </h3>

                                <p>
                                    🎵 ${totalCanciones}
                                    ${
                                        totalCanciones === 1
                                            ? "canción"
                                            : "canciones"
                                    }
                                </p>

                            </div>


                            <div class="acciones-repertorio">

                                <button
                                    class="boton abrir-repertorio"
                                    data-indice="${indice}"
                                    type="button">

                                    📂 Abrir

                                </button>


                                <button
                                    class="boton eliminar-repertorio"
                                    data-indice="${indice}"
                                    type="button">

                                    🗑️ Eliminar

                                </button>

                            </div>

                        </div>

                    `;

                }).join("")
            }

        </div>

    `;

    panel.style.display = "block";

    panel.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


// ==========================================
// 🔢 CONTAR CANCIONES
// ==========================================

function contarCancionesRepertorio(repertorio) {

    if (!repertorio.secciones) return 0;

    let total = 0;

    repertorio.secciones.forEach(function(seccion) {

        if (!seccion.cadenas) return;

        seccion.cadenas.forEach(function(cadena) {

            if (Array.isArray(cadena.canciones)) {
                total += cadena.canciones.length;
            }

        });

    });

    return total;
}


// ==========================================
// ➕ CREAR REPERTORIO
// ==========================================

function crearRepertorio() {

    const nombre = prompt(
        "📚 Escribe el nombre del nuevo repertorio:"
    );

    if (nombre === null) return;

    const nombreLimpio = nombre.trim();

    if (nombreLimpio === "") {

        alert(
            "⚠️ Debes escribir un nombre."
        );

        return;
    }

    repertorios.push({

        id: Date.now(),

        nombre: nombreLimpio,

        secciones: [

            {
                tipo: "alabanza",

                cadenas: []

            }

        ]

    });

    guardarRepertorios();

    mostrarRepertorios();
}


// ==========================================
// 🗑️ ELIMINAR REPERTORIO
// ==========================================

function eliminarRepertorio(indice) {

    const repertorio = repertorios[indice];

    if (!repertorio) return;

    const confirmar = confirm(
        `¿Seguro que quieres eliminar "${repertorio.nombre}"?`
    );

    if (!confirmar) return;

    repertorios.splice(indice, 1);

    guardarRepertorios();

    mostrarRepertorios();
}


// ==========================================
// 📂 ABRIR REPERTORIO
// ==========================================

function abrirRepertorio(indice) {

    const repertorio = repertorios[indice];

    if (!repertorio) return;

    window.repertorioActual = indice;

    mostrarEditorRepertorio();
}


// ==========================================
// 📚 MOSTRAR EDITOR DEL REPERTORIO
// ==========================================

function mostrarEditorRepertorio(indiceRepertorio = window.repertorioActual) {

    const repertorio = repertorios[indiceRepertorio];

    if (!repertorio) {
        console.error("❌ No se encontró el repertorio:", indiceRepertorio);
        return;
    }

    // Guardamos cuál repertorio estamos editando
    window.repertorioActual = indiceRepertorio;

    const panel = document.getElementById("panelRepertorios");

    if (!panel) {
        console.error("❌ No existe #panelRepertorios");
        return;
    }

    panel.innerHTML = `
        <div class="editor-repertorio">

            <div class="encabezado-repertorio">
                <h2>📚 ${escapeHTML(repertorio.nombre)}</h2>

                <button
                    type="button"
                    onclick="mostrarRepertorios()">
                    ◀ Volver
                </button>
            </div>

            ${repertorio.secciones.map(
                (seccion, indiceSeccion) => `

                <div class="seccion-repertorio">

                    <h3>
                        ${
                            seccion.tipo === "alabanza"
                                ? "🎵 ALABANZA"
                                : "🙌 ADORACIÓN"
                        }
                    </h3>

                    <div class="cadenas-repertorio">

                        ${
                            seccion.cadenas.length === 0
                                ? `
                                    <p>
                                        No hay cadenas todavía.
                                    </p>
                                  `
                                : seccion.cadenas.map(
                                    (cadena, indiceCadena) =>
                                        renderCadenaRepertorio(
                                            cadena,
                                            indiceSeccion,
                                            indiceCadena
                                        )
                                  ).join("")
                        }

                    </div>

                    <button
                        type="button"
                        class="btn-agregar-cadena"
                        onclick="agregarCadenaRepertorio(${indiceSeccion})">

                        ➕ Agregar cadena

                    </button>

                </div>

            `
            ).join("")}

        </div>
    `;

    panel.style.display = "block";
}

   

// ==========================================
// 🙌 RENDERIZAR SECCIÓN
// ==========================================

function renderSeccionRepertorio(
    seccion,
    seccionIndex
) {

    const titulo =
        seccion.tipo === "adoracion"
            ? "🙌 ADORACIÓN"
            : "🎵 ALABANZA";


    return `

        <div class="bloque-seccion-repertorio">

            <div class="cabecera-seccion-repertorio">

                <h2>
                    ${titulo}
                </h2>


                <button
                    class="boton eliminar-seccion-repertorio"
                    data-seccion="${seccionIndex}"
                    type="button">

                    🗑️ Eliminar sección

                </button>

            </div>


            <div class="cadenas-repertorio">

                ${
                    seccion.cadenas.map(function(cadena, cadenaIndex) {

                        return renderCadenaRepertorio(
                            cadena,
                            seccionIndex,
                            cadenaIndex
                        );

                    }).join("")
                }

            </div>


            <button
                class="boton btn-agregar-cadena"
                data-seccion="${seccionIndex}"
                type="button">

                ➕ Agregar cadena

            </button>

        </div>

    `;
}


// ==========================================
// 🔗 RENDERIZAR CADENA
// ==========================================

function renderCadenaRepertorio(
    cadena,
    seccionIndex,
    cadenaIndex
) {

    return `
<div class="cabecera-cadena">

    <h4>
        🔗 ${escapeHTML(cadena.nombre)}
    </h4>

    <button
        class="btn-eliminar-cadena"
        data-accion="eliminar-cadena"
        data-repertorio="${window.repertorioActual}"
        data-seccion="${seccionIndex}"
        data-cadena="${cadenaIndex}"
        type="button">
        🗑️
    </button>

</div>

            <div class="canciones-cadena">

                ${
                    cadena.canciones.length === 0

                    ? `

                        <div class="cadena-vacia">

                            🎵 Esta cadena está vacía.

                        </div>

                    `

                    : cadena.canciones.map(function(
                        cancionIndex,
                        posicion
                    ) {

                        const cancion =
                            canciones[cancionIndex];

                        if (!cancion) return "";

                        return `

                            <div class="fila-cancion-cadena">

                                <span class="numero-cancion">
                                    ${posicion + 1}
                                </span>


                                <div class="info-cancion-cadena">

                                    <strong>
                                        🎵 ${escapeHTML(cancion.nombre)}
                                    </strong>

                                    <small>
                                        🎼 ${
                                            escapeHTML(
                                                cancion.tonalidad ||
                                                "Sin tonalidad"
                                            )
                                        }
                                    </small>

                                </div>


                                <button
                                    class="boton ver-cadena"
                                    data-seccion="${seccionIndex}"
                                    data-cadena="${cadenaIndex}"
                                    data-posicion="${posicion}"
                                    type="button">

                                    ▶️ Ver

                                </button>


                                <button
                                    class="boton quitar-de-cadena"
                                    data-seccion="${seccionIndex}"
                                    data-cadena="${cadenaIndex}"
                                    data-posicion="${posicion}"
                                    type="button">

                                    🗑️

                                </button>

                            </div>

                        `;

                    }).join("")
                }

            </div>


            <div class="acciones-cadena">

                <button
                    class="boton agregar-cancion-cadena"
                    data-seccion="${seccionIndex}"
                    data-cadena="${cadenaIndex}"
                    type="button">

                    ➕ Agregar canción

                </button>

            </div>

        </div>

    `;
}


// ==========================================
// ➕ AGREGAR SECCIÓN
// ==========================================

function agregarSeccionRepertorio() {

    const indice =
        window.repertorioActual;

    const repertorio =
        repertorios[indice];

    if (!repertorio) return;


    const tipo = prompt(
        "¿Qué sección quieres agregar?\n\n" +
        "1 = 🎵 Alabanza\n" +
        "2 = 🙌 Adoración"
    );

    if (tipo === null) return;


    let tipoNormalizado;

    if (tipo === "2") {

        tipoNormalizado = "adoracion";

    } else {

        tipoNormalizado = "alabanza";

    }


    repertorio.secciones.push({

        tipo: tipoNormalizado,

        cadenas: []

    });


    guardarRepertorios();

    mostrarEditorRepertorio();
}


// ==========================================
// 🗑️ ELIMINAR SECCIÓN
// ==========================================

function eliminarSeccionRepertorio(indiceSeccion) {

    const repertorio =
        repertorios[window.repertorioActual];

    if (!repertorio) return;


    if (repertorio.secciones.length === 1) {

        alert(
            "⚠️ El repertorio debe tener al menos una sección."
        );

        return;
    }


    const confirmar = confirm(
        "¿Eliminar esta sección y todas sus cadenas?"
    );

    if (!confirmar) return;


    repertorio.secciones.splice(
        indiceSeccion,
        1
    );


    guardarRepertorios();

    mostrarEditorRepertorio();
}


// ==========================================
// ➕ AGREGAR CADENA
// ==========================================
// ==========================================
// ➕ AGREGAR CADENA
// ==========================================

function agregarCadenaRepertorio(indiceSeccion) {

    const indiceRepertorio =
        window.repertorioActual;

    const repertorio =
        repertorios[indiceRepertorio];

    if (!repertorio) {
        console.error("❌ No hay repertorio activo.");
        return;
    }

    const seccion =
        repertorio.secciones[indiceSeccion];

    if (!seccion) {
        console.error("❌ No se encontró la sección.");
        return;
    }

    if (!Array.isArray(seccion.cadenas)) {
        seccion.cadenas = [];
    }

    const numero =
        seccion.cadenas.length + 1;

    seccion.cadenas.push({
        nombre: `Cadena ${numero}`,
        canciones: []
    });

    guardarRepertorios();

    mostrarEditorRepertorio();
}


// ==========================================
// 🗑️ ELIMINAR CADENA
// ==========================================

function eliminarCadenaRepertorio(
    indiceRepertorio,
    indiceSeccion,
    indiceCadena
) {

    const repertorio =
        repertorios[indiceRepertorio];

    if (!repertorio) return;

    const seccion =
        repertorio.secciones[indiceSeccion];

    if (!seccion) return;

    const cadena =
        seccion.cadenas[indiceCadena];

    if (!cadena) return;

    if (
        !confirm(
            `¿Seguro que quieres eliminar "${cadena.nombre}"?`
        )
    ) {
        return;
    }

    seccion.cadenas.splice(
        indiceCadena,
        1
    );

    guardarRepertorios();

    mostrarEditorRepertorio();
}

// ==========================================
// ➕ AGREGAR CANCIÓN A CADENA
// ==========================================

function mostrarSelectorCanciones(
    indiceSeccion,
    indiceCadena
) {

    const repertorio =
        repertorios[window.repertorioActual];

    if (!repertorio) return;


    const seccion =
        repertorio.secciones[indiceSeccion];

    const cadena =
        seccion.cadenas[indiceCadena];


    const yaAgregadas =
        cadena.canciones;


    const disponibles =
        canciones.filter(function(cancion, indice) {

            return !yaAgregadas.includes(indice);

        });


    const panel =
        document.getElementById("panelRepertorios");


    panel.innerHTML = `

        <div class="encabezado-repertorios">

            <div>

                <h2>
                    ➕ Agregar canciones
                </h2>

                <p>
                    ${escapeHTML(cadena.nombre)}
                </p>

            </div>


            <button
                id="cerrarRepertorios"
                class="boton-cerrar"
                type="button">

                ✖

            </button>

        </div>


        <button
            id="btnVolverEditorRepertorio"
            class="boton"
            type="button">

            ↩️ Volver a la cadena

        </button>


        <div class="lista-selector-canciones">

            ${
                disponibles.length === 0

                ? `

                    <div class="sin-repertorios">

                        🎵 Todas tus canciones
                        ya están en esta cadena.

                    </div>

                `

                : disponibles.map(function(
                    cancion,
                    cancionIndex
                ) {

                    const indiceReal =
                        canciones.indexOf(cancion);

                    return `

                        <div class="fila-selector-cancion">

                            <div>

                                <strong>
                                    🎵 ${
                                        escapeHTML(
                                            cancion.nombre
                                        )
                                    }
                                </strong>

                                <small>

                                    🎼 ${
                                        escapeHTML(
                                            cancion.tonalidad ||
                                            "Sin tonalidad"
                                        )
                                    }

                                </small>

                            </div>


                            <button
                                class="boton seleccionar-cancion-cadena"
                                data-cancion="${indiceReal}"
                                type="button">

                                ➕ Agregar

                            </button>

                        </div>

                    `;

                }).join("")
            }

        </div>

    `;


    window.selectorSeccion =
        indiceSeccion;

    window.selectorCadena =
        indiceCadena;
}


// ==========================================
// 🎵 AGREGAR CANCIÓN SELECCIONADA
// ==========================================

function agregarCancionSeleccionada(
    indiceCancion
) {

    const repertorio =
        repertorios[window.repertorioActual];

    if (!repertorio) return;


    const cadena =
        repertorio.secciones[
            window.selectorSeccion
        ].cadenas[
            window.selectorCadena
        ];


    if (cadena.canciones.includes(indiceCancion)) {

        alert(
            "⚠️ Esta canción ya está en la cadena."
        );

        return;
    }


    cadena.canciones.push(indiceCancion);


    guardarRepertorios();


    mostrarSelectorCanciones(
        window.selectorSeccion,
        window.selectorCadena
    );
}


// ==========================================
// 🗑️ QUITAR CANCIÓN
// ==========================================

function quitarCancionDeCadena(
    indiceSeccion,
    indiceCadena,
    posicion
) {

    const repertorio =
        repertorios[window.repertorioActual];

    if (!repertorio) return;


    const cadena =
        repertorio.secciones[
            indiceSeccion
        ].cadenas[
            indiceCadena
        ];


    const confirmar = confirm(
        "¿Quitar esta canción de la cadena?\n\n" +
        "La canción permanecerá en tu biblioteca."
    );


    if (!confirmar) return;


    cadena.canciones.splice(
        posicion,
        1
    );


    guardarRepertorios();

    mostrarEditorRepertorio();
}


// ==========================================
// 🎼 MODO MÚSICO
// ==========================================

function mostrarCancionCadena(
    indiceSeccion,
    indiceCadena,
    posicion
) {

    const repertorio =
        repertorios[window.repertorioActual];

    if (!repertorio) return;


    const cadena =
        repertorio.secciones[
            indiceSeccion
        ].cadenas[
            indiceCadena
        ];


    const total =
        cadena.canciones.length;


    if (
        posicion < 0 ||
        posicion >= total
    ) {
        return;
    }


    const indiceCancion =
        cadena.canciones[posicion];


    const cancion =
        canciones[indiceCancion];


    if (!cancion) return;


    const panel =
        document.getElementById("panelRepertorios");


    panel.innerHTML = `

        <div class="modo-musico-repertorio">


            <div class="cabecera-modo-musico">

                <button
                    id="btnVolverCadena"
                    class="boton"
                    type="button">

                    ↩️ Volver

                </button>


                <div class="contador-cancion">

                    ${posicion + 1} / ${total}

                </div>

            </div>


            <div class="titulo-cancion-musico">

                <h1>
                    🎵 ${escapeHTML(cancion.nombre)}
                </h1>

            </div>


            <section class="bloque-musico">

                <h2>
                    🎼 Acordes
                </h2>

                <div class="contenido-musico">

                    ${
                        textoSimple(
                            cancion.acordes ||
                            "Sin acordes registrados."
                        )
                    }

                </div>

            </section>


            <section class="bloque-musico">

                <h2>
                    🎵 Notas
                </h2>

                <div class="contenido-musico">

                    ${
                        mostrarSecciones(
                            cancion.notas,
                            "notas"
                        )
                    }

                </div>

            </section>


            <section class="bloque-musico">

                <h2>
                    🎺 Notas de trompeta
                </h2>

                <div class="contenido-musico">

                    ${
                        mostrarSecciones(
                            cancion.trompeta,
                            "trompeta"
                        )
                    }

                </div>

            </section>


            <div class="navegacion-canciones">

                <button
                    id="btnCancionAnterior"
                    class="boton boton-navegacion"
                    type="button"
                    ${
                        posicion === 0
                            ? "disabled"
                            : ""
                    }>

                    ◀ Anterior

                </button>


                <span>

                    ${posicion + 1}
                    de
                    ${total}

                </span>


                <button
                    id="btnCancionSiguiente"
                    class="boton boton-navegacion"
                    type="button"
                    ${
                        posicion === total - 1
                            ? "disabled"
                            : ""
                    }>

                    Siguiente ▶

                </button>

            </div>


        </div>

    `;


    window.cancionActualCadena =
        posicion;

    window.seccionActualCadena =
        indiceSeccion;

    window.cadenaActualCadena =
        indiceCadena;
}


// ==========================================
// ⬅️ CANCIÓN ANTERIOR
// ==========================================

function cancionAnteriorCadena() {

    mostrarCancionCadena(

        window.seccionActualCadena,

        window.cadenaActualCadena,

        window.cancionActualCadena - 1

    );
}


// ==========================================
// ➡️ CANCIÓN SIGUIENTE
// ==========================================

function cancionSiguienteCadena() {

    const repertorio =
        repertorios[
            window.repertorioActual
        ];


    const cadena =
        repertorio.secciones[
            window.seccionActualCadena
        ].cadenas[
            window.cadenaActualCadena
        ];


    const siguiente =
        window.cancionActualCadena + 1;


    // Si todavía hay canciones
    if (siguiente < cadena.canciones.length) {

        mostrarCancionCadena(

            window.seccionActualCadena,

            window.cadenaActualCadena,

            siguiente

        );

        return;
    }


    // Si terminó la cadena
    alert(
        "🎉 Has llegado al final de esta cadena."
    );
}


// ==========================================
// 🎯 EVENTOS
// ==========================================

document.addEventListener(
    "click",
    function(evento) {

        const boton =
            evento.target.closest("button");

        if (
            boton &&
            boton.dataset.accion === "eliminar-cadena"
        ) {

            eliminarCadenaRepertorio(
                Number(boton.dataset.repertorio),
                Number(boton.dataset.seccion),
                Number(boton.dataset.cadena)
            );

            return;
        }

        // 📚 Abrir repertorios
        // 📚 Abrir repertorios
        const btnRepertorios =
            evento.target.closest(
                "#btnRepertorios"
            );

        if (btnRepertorios) {

            mostrarRepertorios();

            return;
        }


        // ✖ Cerrar
        const cerrar =
            evento.target.closest(
                "#cerrarRepertorios"
            );

        if (cerrar) {

            const panel =
                document.getElementById(
                    "panelRepertorios"
                );

            if (panel) {

                panel.style.display =
                    "none";

            }

            return;
        }


        // ➕ Nuevo repertorio
        const nuevo =
            evento.target.closest(
                "#btnNuevoRepertorio"
            );

        if (nuevo) {

            crearRepertorio();

            return;
        }


        // 📂 Abrir
        const abrir =
            evento.target.closest(
                ".abrir-repertorio"
            );

        if (abrir) {

            abrirRepertorio(
                Number(
                    abrir.dataset.indice
                )
            );

            return;
        }


        // 🗑️ Eliminar repertorio
        const eliminar =
            evento.target.closest(
                ".eliminar-repertorio"
            );

        if (eliminar) {

            eliminarRepertorio(
                Number(
                    eliminar.dataset.indice
                )
            );

            return;
        }


        // ➕ Agregar sección
        const agregarSeccion =
            evento.target.closest(
                "#btnAgregarSeccionRepertorio"
            );

        if (agregarSeccion) {

            agregarSeccionRepertorio();

            return;
        }


        // 🗑️ Eliminar sección
        const eliminarSeccion =
            evento.target.closest(
                ".eliminar-seccion-repertorio"
            );

        if (eliminarSeccion) {

            eliminarSeccionRepertorio(
                Number(
                    eliminarSeccion.dataset.seccion
                )
            );

            return;
        }


        // ➕ Agregar cadena
        const agregarCadena =
            evento.target.closest(
                ".btn-agregar-cadena"
            );

        if (agregarCadena) {

            agregarCadenaRepertorio(
                Number(
                    agregarCadena.dataset.seccion
                )
            );

            return;
        }


        // ➕ Agregar canciones
        const agregarCanciones =
            evento.target.closest(
                ".agregar-cancion-cadena"
            );

        if (agregarCanciones) {

            mostrarSelectorCanciones(

                Number(
                    agregarCanciones.dataset.seccion
                ),

                Number(
                    agregarCanciones.dataset.cadena
                )

            );

            return;
        }


        // 🎵 Seleccionar canción
        const seleccionarCancion =
            evento.target.closest(
                ".seleccionar-cancion-cadena"
            );

        if (seleccionarCancion) {

            agregarCancionSeleccionada(
                Number(
                    seleccionarCancion.dataset.cancion
                )
            );

            return;
        }


        // 🗑️ Quitar canción
        const quitarCancion =
            evento.target.closest(
                ".quitar-de-cadena"
            );

        if (quitarCancion) {

            quitarCancionDeCadena(

                Number(
                    quitarCancion.dataset.seccion
                ),

                Number(
                    quitarCancion.dataset.cadena
                ),

                Number(
                    quitarCancion.dataset.posicion
                )

            );

            return;
        }


        // ▶️ Ver canción
        const verCancion =
            evento.target.closest(
                ".ver-cadena"
            );

        if (verCancion) {

            mostrarCancionCadena(

                Number(
                    verCancion.dataset.seccion
                ),

                Number(
                    verCancion.dataset.cadena
                ),

                Number(
                    verCancion.dataset.posicion
                )

            );

            return;
        }


        // ↩️ Volver a cadena
        const volverCadena =
            evento.target.closest(
                "#btnVolverCadena"
            );

        if (volverCadena) {

            mostrarEditorRepertorio();

            return;
        }


        // ◀ Anterior
        const anterior =
            evento.target.closest(
                "#btnCancionAnterior"
            );

        if (anterior) {

            cancionAnteriorCadena();

            return;
        }


        // ▶ Siguiente
        const siguiente =
            evento.target.closest(
                "#btnCancionSiguiente"
            );

        if (siguiente) {

            cancionSiguienteCadena();

            return;
        }


        // ↩️ Volver al editor
        const volverEditor =
            evento.target.closest(
                "#btnVolverEditorRepertorio"
            );

        if (volverEditor) {

            mostrarEditorRepertorio();

            return;
        }


        // 📚 Volver a repertorios
        const volverRepertorios =
            evento.target.closest(
                "#btnVolverRepertorios"
            );

        if (volverRepertorios) {

            mostrarRepertorios();

            return;
        }

    }
);


// ==========================================
// 🚀 INICIAR SISTEMA
// ==========================================

migrarRepertoriosAntiguos();

console.log(
    "✅ SISTEMA DE REPERTORIOS CARGADO"
);

// ==========================================
// 🔗 SISTEMA DE CONEXIONES
// ==========================================

const btnConexiones = document.getElementById("btnConexiones");
const panelConexiones = document.getElementById("panelConexiones");
const cerrarConexiones = document.getElementById("cerrarConexiones");

// Abrir CONEXIONES
if (btnConexiones) {
    btnConexiones.addEventListener("click", () => {

        // Cerrar repertorios si está abierto
        const panelRepertorios = document.getElementById("panelRepertorios");

        if (panelRepertorios) {
            panelRepertorios.style.display = "none";
        }

        panelConexiones.style.display = "block";

        panelConexiones.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
}

// Cerrar CONEXIONES
if (cerrarConexiones) {
    cerrarConexiones.addEventListener("click", () => {
        panelConexiones.style.display = "none";
    });
}

// ==========================================
// 🔗 SISTEMA COMPLETO DE CONEXIONES
// ==========================================

let conexiones = JSON.parse(localStorage.getItem("conexiones")) || [];
let cancionConexionActual = null;
let conexionEditando = null;


// ==========================================
// 💾 GUARDAR CONEXIONES
// ==========================================

function guardarConexiones() {
    localStorage.setItem("conexiones", JSON.stringify(conexiones));
}


// ==========================================
// 🎼 TONALIDADES
// ==========================================

const mapaTonalidadesConexion = {
    "Do mayor": { nota: "C", indice: 0, modo: "mayor" },
    "Do menor": { nota: "C", indice: 0, modo: "menor" },

    "Do# mayor": { nota: "C#", indice: 1, modo: "mayor" },
    "Do# menor": { nota: "C#", indice: 1, modo: "menor" },

    "Re mayor": { nota: "D", indice: 2, modo: "mayor" },
    "Re menor": { nota: "D", indice: 2, modo: "menor" },

    "Mib mayor": { nota: "D#", indice: 3, modo: "mayor" },
    "Mib menor": { nota: "D#", indice: 3, modo: "menor" },

    "Mi mayor": { nota: "E", indice: 4, modo: "mayor" },
    "Mi menor": { nota: "E", indice: 4, modo: "menor" },

    "Fa mayor": { nota: "F", indice: 5, modo: "mayor" },
    "Fa menor": { nota: "F", indice: 5, modo: "menor" },

    "Fa# mayor": { nota: "F#", indice: 6, modo: "mayor" },
    "Fa# menor": { nota: "F#", indice: 6, modo: "menor" },

    "Sol mayor": { nota: "G", indice: 7, modo: "mayor" },
    "Sol menor": { nota: "G", indice: 7, modo: "menor" },

    "Lab mayor": { nota: "G#", indice: 8, modo: "mayor" },
    "Lab menor": { nota: "G#", indice: 8, modo: "menor" },

    "La mayor": { nota: "A", indice: 9, modo: "mayor" },
    "La menor": { nota: "A", indice: 9, modo: "menor" },

    "Sib mayor": { nota: "A#", indice: 10, modo: "mayor" },
    "Sib menor": { nota: "A#", indice: 10, modo: "menor" },

    "Si mayor": { nota: "B", indice: 11, modo: "mayor" },
    "Si menor": { nota: "B", indice: 11, modo: "menor" }
};


// ==========================================
// 🎵 OBTENER INFORMACIÓN DE TONALIDAD
// ==========================================

function analizarTonalidadConexion(tonalidad) {

    if (!tonalidad) return null;

    let texto = tonalidad
        .trim()
        .replace(/\s+/g, " ");

    if (mapaTonalidadesConexion[texto]) {
        return mapaTonalidadesConexion[texto];
    }

    // Intento flexible
    let menor = /menor/i.test(texto);

    let notaTexto = texto
        .replace(/mayor/gi, "")
        .replace(/menor/gi, "")
        .trim();

    const equivalencias = {
        "Do": "C",
        "Re": "D",
        "Mi": "E",
        "Fa": "F",
        "Sol": "G",
        "La": "A",
        "Si": "B"
    };

    let alteracion = "";

    if (notaTexto.includes("#")) {
        alteracion = "#";
    }

    if (/b$/.test(notaTexto)) {
        alteracion = "#";
    }

    let base = notaTexto
        .replace("#", "")
        .replace("b", "")
        .trim();

    let nota = equivalencias[base];

    if (!nota) return null;

    nota += alteracion;

    const indices = {
        "C": 0,
        "C#": 1,
        "D": 2,
        "D#": 3,
        "E": 4,
        "F": 5,
        "F#": 6,
        "G": 7,
        "G#": 8,
        "A": 9,
        "A#": 10,
        "B": 11
    };

    if (indices[nota] === undefined) return null;

    return {
        nota,
        indice: indices[nota],
        modo: menor ? "menor" : "mayor"
    };
}


// ==========================================
// 🔢 DISTANCIA ENTRE TONALIDADES
// ==========================================

function distanciaTonalidadesConexion(origen, destino) {

    const a = analizarTonalidadConexion(origen);
    const b = analizarTonalidadConexion(destino);

    if (!a || !b) return null;

    let distancia = b.indice - a.indice;

    if (distancia < 0) {
        distancia += 12;
    }

    return distancia;
}


// ==========================================
// 🎼 NOMBRE DE DISTANCIA
// ==========================================

function nombreDistanciaConexion(semitonos) {

    const nombres = {
        0: "misma tonalidad",
        1: "semitono arriba",
        2: "tono arriba",
        3: "tercera menor",
        4: "tercera mayor",
        5: "cuarta justa",
        6: "tritono",
        7: "quinta justa",
        8: "sexta menor",
        9: "sexta mayor",
        10: "séptima menor",
        11: "séptima mayor"
    };

    return nombres[semitonos] || `${semitonos} semitonos`;
}


// ==========================================
// 🎵 OBTENER NOTA FINAL
// ==========================================

function obtenerUltimaNotaConexion(texto) {

    if (!texto) return null;

    const limpio = texto
        .replace(/\[[^\]]+\]/g, " ")
        .replace(/\n/g, " ")
        .trim();

    const notas = limpio.match(
        /\b(?:Do|Re|Mi|Fa|Sol|La|Si|C|D|E|F|G|A|B)(?:#|b)?\b/gi
    );

    if (!notas || !notas.length) return null;

    return notas[notas.length - 1];
}


// ==========================================
// 🎺 NOTA FINAL DE LA CANCIÓN
// ==========================================

function obtenerNotaFinalCancionConexion(cancion) {

    const fuentes = [
        cancion.trompeta,
        cancion.notas
    ];

    for (const fuente of fuentes) {

        const nota = obtenerUltimaNotaConexion(fuente);

        if (nota) {
            return nota;
        }
    }

    return null;
}


// ==========================================
// 🎺 NORMALIZAR NOTA
// ==========================================

function normalizarNotaConexion(nota) {

    if (!nota) return null;

    let n = nota.trim();

    const equivalencias = {
        "Do": "C",
        "Re": "D",
        "Mi": "E",
        "Fa": "F",
        "Sol": "G",
        "La": "A",
        "Si": "B"
    };

    let base = n.replace("#", "").replace("b", "");

    if (equivalencias[base]) {
        base = equivalencias[base];
    }

    if (n.includes("#")) {
        base += "#";
    }

    if (n.includes("b")) {

        const bemoles = {
            "C": "B",
            "D": "C#",
            "E": "D#",
            "F": "E",
            "G": "F#",
            "A": "G#",
            "B": "A#"
        };

        base = bemoles[base] || base;
    }

    return base;
}


// ==========================================
// 🎺 DISTANCIA ENTRE NOTAS
// ==========================================

function distanciaNotasConexion(nota1, nota2) {

    const notas = [
        "C", "C#", "D", "D#",
        "E", "F", "F#", "G",
        "G#", "A", "A#", "B"
    ];

    const a = notas.indexOf(normalizarNotaConexion(nota1));
    const b = notas.indexOf(normalizarNotaConexion(nota2));

    if (a === -1 || b === -1) return null;

    let distancia = b - a;

    if (distancia < 0) {
        distancia += 12;
    }

    return distancia;
}


// ==========================================
// 🥁 ANALIZAR BPM
// ==========================================

function analizarBPMConexion(cancionA, cancionB) {

    const bpmA = Number(cancionA.bpm);
    const bpmB = Number(cancionB.bpm);

    if (!bpmA || !bpmB) {
        return {
            disponible: false,
            texto: "No hay BPM suficiente para analizar."
        };
    }

    const diferencia = bpmB - bpmA;

    if (diferencia === 0) {
        return {
            disponible: true,
            diferencia: 0,
            texto: "Ambas canciones tienen el mismo BPM."
        };
    }

    if (diferencia > 0) {
        return {
            disponible: true,
            diferencia,
            texto: `La siguiente canción aumenta ${diferencia} BPM.`
        };
    }

    return {
        disponible: true,
        diferencia,
        texto: `La siguiente canción disminuye ${Math.abs(diferencia)} BPM.`
    };
}


// ==========================================
// 🔥 ANALIZAR CAMBIO DE INTENSIDAD
// ==========================================

function analizarIntensidadConexion(cancionA, cancionB) {

    const bpm = analizarBPMConexion(cancionA, cancionB);

    if (!bpm.disponible) {
        return "No hay suficiente información de BPM para analizar la intensidad.";
    }

    if (bpm.diferencia >= 15) {
        return "🔥 Puede funcionar como una subida clara de energía.";
    }

    if (bpm.diferencia >= 5) {
        return "⬆️ Puede producir una subida moderada de energía.";
    }

    if (bpm.diferencia <= -15) {
        return "🌊 Puede funcionar como una bajada clara de intensidad.";
    }

    if (bpm.diferencia <= -5) {
        return "⬇️ Puede producir una bajada moderada de energía.";
    }

    return "➡️ El cambio de BPM es pequeño y puede permitir una transición natural.";
}


// ==========================================
// 🤖 GENERAR ANÁLISIS AUTOMÁTICO
// ==========================================

function generarAnalisisConexion(origen, destino) {

    const tonalidadOrigen = analizarTonalidadConexion(origen.tonalidad);
    const tonalidadDestino = analizarTonalidadConexion(destino.tonalidad);

    const distancia = distanciaTonalidadesConexion(
        origen.tonalidad,
        destino.tonalidad
    );

    const notaFinal = obtenerNotaFinalCancionConexion(origen);

    const bpm = analizarBPMConexion(origen, destino);

    let puntos = 0;
    let razones = [];
    let ideas = [];

    // TONALIDAD
    if (tonalidadOrigen && tonalidadDestino) {

        if (
            tonalidadOrigen.nota === tonalidadDestino.nota &&
            tonalidadOrigen.modo === tonalidadDestino.modo
        ) {

            puntos += 40;

            razones.push(
                "Las dos canciones están en la misma tonalidad."
            );

            ideas.push(
                "Puedes hacer una transición directa manteniendo la tonalidad."
            );

        } else if (
            tonalidadOrigen.nota === tonalidadDestino.nota
        ) {

            puntos += 30;

            razones.push(
                "Las dos canciones comparten la misma nota fundamental, aunque cambia el modo."
            );

            ideas.push(
                "Puedes aprovechar la misma nota fundamental para cambiar de mayor a menor o viceversa."
            );

        } else if (
            distancia === 7 ||
            distancia === 5
        ) {

            puntos += 25;

            razones.push(
                `Existe una relación de ${nombreDistanciaConexion(distancia)}.`
            );

            ideas.push(
                "Puedes preparar la nueva tonalidad mediante un acorde puente o una nota de transición."
            );

        } else if (
            distancia === 1 ||
            distancia === 11
        ) {

            puntos += 18;

            razones.push(
                "Las tonalidades están separadas por un semitono."
            );

            ideas.push(
                "Puede funcionar una subida o bajada cromática antes de entrar a la siguiente canción."
            );

        } else {

            puntos += 8;

            razones.push(
                `Existe un cambio de ${nombreDistanciaConexion(distancia)}.`
            );

            ideas.push(
                "Conviene utilizar una transición armónica o instrumental antes de entrar."
            );
        }
    }

    // NOTA FINAL
    if (notaFinal && tonalidadDestino) {

        const notaDestino = tonalidadDestino.nota;

        const distanciaNota = distanciaNotasConexion(
            notaFinal,
            notaDestino
        );

        if (distanciaNota === 0) {

            puntos += 30;

            razones.push(
                `La canción termina en ${notaFinal}, que coincide con la fundamental de la siguiente tonalidad.`
            );

            ideas.push(
                `🎺 Puedes sostener ${notaFinal} y utilizarla como puente hacia la siguiente canción.`
            );

        } else if (
            distanciaNota === 1 ||
            distanciaNota === 11
        ) {

            puntos += 20;

            razones.push(
                `La nota final ${notaFinal} está a un semitono de la tonalidad siguiente.`
            );

            ideas.push(
                `🎺 Puedes hacer una aproximación cromática desde ${notaFinal}.`
            );

        } else if (
            distanciaNota === 5 ||
            distanciaNota === 7
        ) {

            puntos += 15;

            razones.push(
                `La nota final ${notaFinal} tiene una relación cercana con la tonalidad siguiente.`
            );

            ideas.push(
                `🎺 Puedes utilizar ${notaFinal} como nota de preparación antes de la entrada.`
            );
        }
    }

    // BPM
    if (bpm.disponible) {

        if (Math.abs(bpm.diferencia) <= 5) {
            puntos += 15;

            razones.push(
                "La diferencia de BPM es pequeña."
            );

            ideas.push(
                "Puedes hacer una transición prácticamente continua de ritmo."
            );

        } else if (bpm.diferencia > 0) {

            puntos += 10;

            razones.push(
                "La siguiente canción tiene mayor BPM."
            );

            ideas.push(
                "Puedes aumentar progresivamente la energía antes de entrar."
            );

        } else {

            puntos += 5;

            razones.push(
                "La siguiente canción tiene menor BPM."
            );

            ideas.push(
                "Conviene cerrar el ritmo actual antes de entrar a la nueva canción."
            );
        }
    }

    // CLASIFICACIÓN
    let nivel;

    if (puntos >= 75) {
        nivel = "Conexión fuerte";
    } else if (puntos >= 50) {
        nivel = "Conexión posible";
    } else {
        nivel = "Conexión experimental";
    }

    return {
        puntos,
        nivel,
        razones,
        ideas,
        notaFinal,
        tonalidadDestino: tonalidadDestino
            ? tonalidadDestino.nota
            : null,
        intensidad: analizarIntensidadConexion(origen, destino)
    };
}


// ==========================================
// 🔎 BUSCADOR DE CANCIONES
// ==========================================

function buscarCancionesConexion(texto) {

    const termino = texto
        .toLowerCase()
        .trim();

    if (!termino) {
        return canciones;
    }

    return canciones.filter(cancion => {

        return [
            cancion.nombre,
            cancion.artista,
            cancion.tonalidad
        ]
            .filter(Boolean)
            .some(valor =>
                valor.toLowerCase().includes(termino)
            );
    });
}


// ==========================================
// 🎨 INTERFAZ PRINCIPAL
// ==========================================

function construirInterfazConexiones() {

    const contenedor = document.getElementById("contenidoConexiones");

    if (!contenedor) return;

    contenedor.innerHTML = `
        <div class="conexion-buscador">

            <label for="buscadorConexion">
                🔎 Buscar una alabanza
            </label>

            <input
                type="text"
                id="buscadorConexion"
                class="input-conexion"
                placeholder="Escribe el nombre, artista o tonalidad..."
            >

            <div id="resultadosBusquedaConexion"
                 class="resultados-busqueda-conexion">
            </div>

        </div>

        <div id="conexionSeleccionada"
             class="conexion-seleccionada">
        </div>

        <div id="conexionesGuardadas"
             class="conexiones-guardadas">
        </div>
    `;

    const buscador = document.getElementById("buscadorConexion");

    buscador.addEventListener("input", () => {

        mostrarResultadosBusquedaConexion(
            buscador.value
        );
    });

    mostrarResultadosBusquedaConexion("");
}


// ==========================================
// 🔎 RESULTADOS DEL BUSCADOR
// ==========================================

function mostrarResultadosBusquedaConexion(texto) {

    const contenedor = document.getElementById(
        "resultadosBusquedaConexion"
    );

    if (!contenedor) return;

    const resultados = buscarCancionesConexion(texto);

    if (!texto.trim()) {

        contenedor.innerHTML = `
            <div class="conexion-mensaje">
                🔎 Escribe el nombre de una canción para comenzar.
            </div>
        `;

        return;
    }

    if (!resultados.length) {

        contenedor.innerHTML = `
            <div class="conexion-mensaje">
                No encontramos canciones con esa búsqueda.
            </div>
        `;

        return;
    }

    contenedor.innerHTML = resultados
        .map(cancion => {

            const indice = canciones.indexOf(cancion);

            return `
                <button
                    class="resultado-cancion-conexion"
                    onclick="seleccionarCancionConexion(${indice})"
                >

                    <div>
                        <strong>${escapeHTML(cancion.nombre || "Sin nombre")}</strong>

                        <small>
                            ${escapeHTML(cancion.artista || "Artista desconocido")}
                        </small>
                    </div>

                    <span>
                        ${escapeHTML(cancion.tonalidad || "Sin tonalidad")}
                    </span>

                </button>
            `;
        })
        .join("");
}


// ==========================================
// 🎵 SELECCIONAR CANCIÓN
// ==========================================

function seleccionarCancionConexion(indice) {

    const cancion = canciones[indice];

    if (!cancion) return;

    cancionConexionActual = indice;

    mostrarCancionConexionSeleccionada();

    mostrarConexionesGuardadas();

    document
        .getElementById("conexionSeleccionada")
        ?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
}


// ==========================================
// 🎵 MOSTRAR CANCIÓN SELECCIONADA
// ==========================================

function mostrarCancionConexionSeleccionada() {

    const contenedor = document.getElementById(
        "conexionSeleccionada"
    );

    if (!contenedor) return;

    const origen = canciones[cancionConexionActual];

    if (!origen) return;

    const sugerencias = canciones
        .map((cancion, indice) => ({
            cancion,
            indice
        }))
        .filter(item =>
            item.indice !== cancionConexionActual
        )
        .map(item => ({
            ...item,
            analisis: generarAnalisisConexion(
                origen,
                item.cancion
            )
        }))
        .sort((a, b) =>
            b.analisis.puntos - a.analisis.puntos
        );

    contenedor.innerHTML = `

        <div class="cancion-origen-conexion">

            <div class="conexion-origen-cabecera">

                <div>

                    <span class="etiqueta-conexion">
                        CANCIÓN SELECCIONADA
                    </span>

                    <h2>
                        🎵 ${escapeHTML(origen.nombre || "Sin nombre")}
                    </h2>

                    <p>
                        ${escapeHTML(origen.artista || "Artista desconocido")}
                    </p>

                </div>

                <div class="datos-origen-conexion">

                    <span>
                        🎼 ${escapeHTML(origen.tonalidad || "Sin tonalidad")}
                    </span>

                    <span>
                        🥁 ${escapeHTML(origen.bpm || "—")} BPM
                    </span>

                </div>

            </div>

            <div class="acciones-conexion-principal">

                <button
                    class="boton boton-generar-conexion"
                    onclick="abrirSelectorDestinoConexion()"
                >
                    🔗 Crear conexión
                </button>

                <button
                    class="boton boton-sugerencias-conexion"
                    onclick="mostrarSugerenciasConexion()"
                >
                    🤖 Ver sugerencias
                </button>

            </div>

        </div>

        <div id="sugerenciasConexion"
             class="sugerencias-conexion">

            <div class="titulo-conexiones">
                <h3>🤖 Posibles conexiones</h3>
                <p>
                    El programa analiza las canciones de tu biblioteca
                    y propone relaciones basadas en tonalidad, BPM
                    y notas registradas.
                </p>
            </div>

            <div id="listaSugerenciasConexion"></div>

        </div>

        <div id="editorConexion"
             class="editor-conexion"
             style="display:none;">
        </div>

    `;
}


// ==========================================
// 🤖 MOSTRAR SUGERENCIAS
// ==========================================

function mostrarSugerenciasConexion() {

    const contenedor = document.getElementById(
        "listaSugerenciasConexion"
    );

    if (!contenedor) return;

    const origen = canciones[cancionConexionActual];

    if (!origen) return;

    const sugerencias = canciones
        .map((cancion, indice) => ({
            cancion,
            indice,
            analisis: generarAnalisisConexion(
                origen,
                cancion
            )
        }))
        .filter(item =>
            item.indice !== cancionConexionActual
        )
        .sort((a, b) =>
            b.analisis.puntos - a.analisis.puntos
        );

    if (!sugerencias.length) {

        contenedor.innerHTML = `
            <div class="conexion-mensaje">
                Necesitas tener al menos dos canciones
                para generar sugerencias.
            </div>
        `;

        return;
    }

    contenedor.innerHTML = sugerencias
        .slice(0, 8)
        .map(item =>
            renderSugerenciaConexion(item)
        )
        .join("");
}


// ==========================================
// 💡 TARJETA DE SUGERENCIA
// ==========================================

function renderSugerenciaConexion(item) {

    const cancion = item.cancion;
    const analisis = item.analisis;
    const indice = item.indice;

    return `

        <div class="tarjeta-sugerencia-conexion">

            <div class="cabecera-sugerencia">

                <div>

                    <span class="nivel-conexion">
                        ${escapeHTML(analisis.nivel)}
                    </span>

                    <h3>
                        ${escapeHTML(cancion.nombre || "Sin nombre")}
                    </h3>

                    <p>
                        ${escapeHTML(cancion.artista || "Artista desconocido")}
                    </p>

                </div>

                <div class="puntuacion-conexion">
                    ${analisis.puntos}
                </div>

            </div>

            <div class="datos-sugerencia">

                <span>
                    🎼 ${escapeHTML(cancion.tonalidad || "Sin tonalidad")}
                </span>

                <span>
                    🥁 ${escapeHTML(cancion.bpm || "—")} BPM
                </span>

            </div>

            <div class="razones-conexion">

                <strong>🧠 ¿Por qué?</strong>

                <ul>
                    ${analisis.razones
                        .map(razon =>
                            `<li>${escapeHTML(razon)}</li>`
                        )
                        .join("")}
                </ul>

            </div>

            <div class="ideas-conexion">

                <strong>💡 Ideas de transición</strong>

                <ul>
                    ${analisis.ideas
                        .map(idea =>
                            `<li>${escapeHTML(idea)}</li>`
                        )
                        .join("")}
                </ul>

            </div>

            <div class="intensidad-conexion">

                ${escapeHTML(analisis.intensidad)}

            </div>

            <div class="acciones-sugerencia">

                <button
                    class="boton boton-pequeno"
                    onclick="abrirEditorConexion(
                        ${cancionConexionActual},
                        ${indice}
                    )"
                >
                    🔗 Crear conexión
                </button>

                <button
                    class="boton boton-secundario boton-pequeno"
                    onclick="verAnalisisCompletoConexion(
                        ${cancionConexionActual},
                        ${indice}
                    )"
                >
                    👁️ Ver análisis
                </button>

            </div>

        </div>

    `;
}


// ==========================================
// 🔗 ABRIR SELECTOR DE DESTINO
// ==========================================

function abrirEditorConexion(origenIndice, destinoIndice) {

    cancionConexionActual = origenIndice;

    abrirSelectorDestinoConexion();

    setTimeout(() => {

        const destino = document.getElementById("destinoConexion");

        if (destino) {
            destino.value = destinoIndice;
            actualizarPreviewConexion();
        }

    }, 50);
}

function abrirSelectorDestinoConexion() {

    const editor = document.getElementById(
        "editorConexion"
    );

    if (!editor) return;

    const origen = canciones[cancionConexionActual];

    if (!origen) return;

    const opciones = canciones
        .map((cancion, indice) => {

            if (indice === cancionConexionActual) return "";

            return `
                <option value="${indice}">
                    ${escapeHTML(cancion.nombre || "Sin nombre")}
                    — ${escapeHTML(cancion.tonalidad || "Sin tonalidad")}
                </option>
            `;
        })
        .join("");

    editor.style.display = "block";

    editor.innerHTML = `

        <div class="editor-conexion-caja">

            <h3>🔗 Crear una conexión</h3>

            <div class="ruta-conexion">

                <div>
                    <small>DESDE</small>
                    <strong>
                        ${escapeHTML(origen.nombre)}
                    </strong>
                </div>

                <span>→</span>

                <div>
                    <small>HACIA</small>

                    <select id="destinoConexion"
                            class="input-conexion">

                        ${opciones}

                    </select>

                </div>

            </div>

            <div id="previewConexion"
                 class="preview-conexion">
            </div>

            <label>
                🎺 Idea de transición
            </label>

            <textarea
                id="ideaConexion"
                class="textarea-conexion"
                placeholder="Ejemplo: mantener Mi en trompeta y subir a Fa#..."
            ></textarea>

            <label>
                📝 Observaciones
            </label>

            <textarea
                id="observacionesConexion"
                class="textarea-conexion"
                placeholder="Escribe cualquier detalle que quieras recordar..."
            ></textarea>

            <div class="acciones-editor-conexion">

                <button
                    class="boton boton-guardar-conexion"
                    onclick="guardarConexionActual()"
                >
                    💾 Guardar conexión
                </button>

                <button
                    class="boton boton-secundario"
                    onclick="cerrarEditorConexion()"
                >
                    Cancelar
                </button>

            </div>

        </div>

    `;

    document
        .getElementById("destinoConexion")
        .addEventListener("change", actualizarPreviewConexion);

    actualizarPreviewConexion();

    editor.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


// ==========================================
// 👁️ PREVISUALIZACIÓN
// ==========================================

function actualizarPreviewConexion() {

    const destinoSelect = document.getElementById(
        "destinoConexion"
    );

    const preview = document.getElementById(
        "previewConexion"
    );

    if (!destinoSelect || !preview) return;

    const origen = canciones[cancionConexionActual];
    const destino = canciones[Number(destinoSelect.value)];

    if (!origen || !destino) return;

    const analisis = generarAnalisisConexion(
        origen,
        destino
    );

    preview.innerHTML = `

        <div class="preview-cabecera">

            <strong>
                🧠 Análisis automático
            </strong>

            <span class="nivel-conexion">
                ${escapeHTML(analisis.nivel)}
            </span>

        </div>

        <div class="preview-datos">

            <div>
                <small>TONALIDAD</small>
                <strong>
                    ${escapeHTML(origen.tonalidad || "—")}
                    →
                    ${escapeHTML(destino.tonalidad || "—")}
                </strong>
            </div>

            <div>
                <small>BPM</small>
                <strong>
                    ${escapeHTML(origen.bpm || "—")}
                    →
                    ${escapeHTML(destino.bpm || "—")}
                </strong>
            </div>

            <div>
                <small>NOTA FINAL</small>
                <strong>
                    ${escapeHTML(
                        analisis.notaFinal || "No registrada"
                    )}
                </strong>
            </div>

        </div>

        <div class="preview-ideas">

            <strong>💡 El programa propone:</strong>

            <ul>
                ${analisis.ideas
                    .map(idea =>
                        `<li>${escapeHTML(idea)}</li>`
                    )
                    .join("")}
            </ul>

        </div>

        <div class="intensidad-conexion">

            ${escapeHTML(analisis.intensidad)}

        </div>
    `;
}


// ==========================================
// 💾 GUARDAR CONEXIÓN
// ==========================================

function guardarConexionActual() {

    const destinoSelect = document.getElementById(
        "destinoConexion"
    );

    const idea = document.getElementById(
        "ideaConexion"
    );

    const observaciones = document.getElementById(
        "observacionesConexion"
    );

    if (!destinoSelect) return;

    const destinoIndice = Number(
        destinoSelect.value
    );

    const origen = canciones[cancionConexionActual];
    const destino = canciones[destinoIndice];

    if (!origen || !destino) {
        alert("No se pudo crear la conexión.");
        return;
    }

    const analisis = generarAnalisisConexion(
        origen,
        destino
    );

    const nuevaConexion = {

        id: conexionEditando
            ? conexionEditando.id
            : Date.now(),

        origen: cancionConexionActual,

        destino: destinoIndice,

        idea: idea
            ? idea.value.trim()
            : "",

        observaciones: observaciones
            ? observaciones.value.trim()
            : "",

        analisis: analisis,

        fecha: new Date().toISOString()
    };

    if (conexionEditando) {

        const indice = conexiones.findIndex(
            conexion =>
                conexion.id === conexionEditando.id
        );

        if (indice !== -1) {
            conexiones[indice] = nuevaConexion;
        }

    } else {

        conexiones.push(nuevaConexion);
    }

    guardarConexiones();

    conexionEditando = null;

    alert("✅ Conexión guardada correctamente.");

    cerrarEditorConexion();

    mostrarConexionesGuardadas();
}


// ==========================================
// ❌ CERRAR EDITOR
// ==========================================

function cerrarEditorConexion() {

    const editor = document.getElementById(
        "editorConexion"
    );

    if (!editor) return;

    editor.style.display = "none";
    editor.innerHTML = "";

    conexionEditando = null;
}


// ==========================================
// 🔗 MOSTRAR CONEXIONES GUARDADAS
// ==========================================

function mostrarConexionesGuardadas() {

    const contenedor = document.getElementById(
        "conexionesGuardadas"
    );

    if (!contenedor) return;

    if (cancionConexionActual === null) {

        contenedor.innerHTML = "";

        return;
    }

    const relacionadas = conexiones.filter(
        conexion =>
            conexion.origen === cancionConexionActual ||
            conexion.destino === cancionConexionActual
    );

    if (!relacionadas.length) {

        contenedor.innerHTML = `

            <div class="bloque-sin-conexiones">

                <h3>🔗 Conexiones anteriores</h3>

                <p>
                    Esta alabanza todavía no tiene conexiones guardadas.
                </p>

                <small>
                    Cuando crees una conexión aparecerá aquí.
                </small>

            </div>

        `;

        return;
    }

    contenedor.innerHTML = `

        <div class="titulo-conexiones">

            <h3>
                🔗 Conexiones anteriores
            </h3>

            <p>
                Conexiones relacionadas con esta alabanza.
            </p>

        </div>

        <div class="lista-conexiones-guardadas">

            ${relacionadas
                .map(renderConexionGuardada)
                .join("")}

        </div>

    `;
}


// ==========================================
// 🔗 RENDER DE CONEXIÓN GUARDADA
// ==========================================

function renderConexionGuardada(conexion) {

    const origen = canciones[conexion.origen];
    const destino = canciones[conexion.destino];

    if (!origen || !destino) {
        return "";
    }

    const esOrigen =
        conexion.origen === cancionConexionActual;

    return `

        <div class="tarjeta-conexion-guardada">

            <div class="ruta-guardada">

                <div class="cancion-ruta">

                    <span>🎵</span>

                    <strong>
                        ${escapeHTML(origen.nombre)}
                    </strong>

                    <small>
                        ${escapeHTML(origen.tonalidad || "Sin tonalidad")}
                    </small>

                </div>

                <div class="flecha-ruta">
                    →
                </div>

                <div class="cancion-ruta">

                    <span>🎵</span>

                    <strong>
                        ${escapeHTML(destino.nombre)}
                    </strong>

                    <small>
                        ${escapeHTML(destino.tonalidad || "Sin tonalidad")}
                    </small>

                </div>

            </div>

            <div class="detalle-conexion-guardada">

                <div>
                    <strong>💡 Transición</strong>

                    <p>
                        ${escapeHTML(
                            conexion.idea ||
                            "No se agregó una idea personalizada."
                        )}
                    </p>
                </div>

                <div>
                    <strong>📝 Observaciones</strong>

                    <p>
                        ${escapeHTML(
                            conexion.observaciones ||
                            "Sin observaciones."
                        )}
                    </p>
                </div>

            </div>

            <div class="acciones-conexion-guardada">

                <button
                    class="boton boton-pequeno"
                    onclick="verConexionGuardada(${conexion.id})"
                >
                    👁️ Ver análisis
                </button>

                <button
                    class="boton boton-secundario boton-pequeno"
                    onclick="editarConexion(${conexion.id})"
                >
                    ✏️ Editar
                </button>

                <button
                    class="boton boton-eliminar-conexion boton-pequeno"
                    onclick="eliminarConexion(${conexion.id})"
                >
                    🗑️ Eliminar
                </button>

            </div>

        </div>

    `;
}


// ==========================================
// 👁️ VER CONEXIÓN
// ==========================================

function verConexionGuardada(id) {

    const conexion = conexiones.find(
        item => item.id === id
    );

    if (!conexion) return;

    const origen = canciones[conexion.origen];
    const destino = canciones[conexion.destino];

    if (!origen || !destino) return;

    const analisis = generarAnalisisConexion(
        origen,
        destino
    );

    alert(
        `🔗 ${origen.nombre} → ${destino.nombre}\n\n` +

        `🎼 Tonalidad:\n` +
        `${origen.tonalidad || "—"} → ${destino.tonalidad || "—"}\n\n` +

        `🥁 BPM:\n` +
        `${origen.bpm || "—"} → ${destino.bpm || "—"}\n\n` +

        `🎺 Nota final:\n` +
        `${analisis.notaFinal || "No registrada"}\n\n` +

        `🧠 Análisis:\n` +
        `${analisis.razones.join("\n")}\n\n` +

        `💡 Ideas:\n` +
        `${analisis.ideas.join("\n")}\n\n` +

        `🔥 Intensidad:\n` +
        `${analisis.intensidad}`
    );
}


// ==========================================
// 👁️ VER ANÁLISIS DE SUGERENCIA
// ==========================================

function verAnalisisCompletoConexion(
    origenIndice,
    destinoIndice
) {

    const origen = canciones[origenIndice];
    const destino = canciones[destinoIndice];

    if (!origen || !destino) return;

    const analisis = generarAnalisisConexion(
        origen,
        destino
    );

    alert(
        `🧠 ANÁLISIS DE CONEXIÓN\n\n` +

        `${origen.nombre} → ${destino.nombre}\n\n` +

        `Nivel: ${analisis.nivel}\n\n` +

        `¿Por qué?\n` +
        analisis.razones.join("\n") +
        `\n\n` +

        `Ideas:\n` +
        analisis.ideas.join("\n") +
        `\n\n` +

        `🔥 ${analisis.intensidad}`
    );
}


// ==========================================
// ✏️ EDITAR CONEXIÓN
// ==========================================

function editarConexion(id) {

    const conexion = conexiones.find(
        item => item.id === id
    );

    if (!conexion) return;

    conexionEditando = conexion;

    cancionConexionActual = conexion.origen;

    mostrarCancionConexionSeleccionada();

    setTimeout(() => {

        const editor = document.getElementById(
            "editorConexion"
        );

        if (!editor) return;

        editor.style.display = "block";

        const origen = canciones[conexion.origen];

        const opciones = canciones
            .map((cancion, indice) => {

                if (indice === conexion.origen) {
                    return "";
                }

                return `
                    <option
                        value="${indice}"
                        ${indice === conexion.destino ? "selected" : ""}
                    >
                        ${escapeHTML(cancion.nombre)}
                        —
                        ${escapeHTML(cancion.tonalidad || "Sin tonalidad")}
                    </option>
                `;
            })
            .join("");

        editor.innerHTML = `

            <div class="editor-conexion-caja">

                <h3>✏️ Editar conexión</h3>

                <div class="ruta-conexion">

                    <div>
                        <small>DESDE</small>
                        <strong>
                            ${escapeHTML(origen.nombre)}
                        </strong>
                    </div>

                    <span>→</span>

                    <div>

                        <small>HACIA</small>

                        <select
                            id="destinoConexion"
                            class="input-conexion"
                        >
                            ${opciones}
                        </select>

                    </div>

                </div>

                <div
                    id="previewConexion"
                    class="preview-conexion"
                ></div>

                <label>
                    🎺 Idea de transición
                </label>

                <textarea
                    id="ideaConexion"
                    class="textarea-conexion"
                >${escapeHTML(conexion.idea || "")}</textarea>

                <label>
                    📝 Observaciones
                </label>

                <textarea
                    id="observacionesConexion"
                    class="textarea-conexion"
                >${escapeHTML(conexion.observaciones || "")}</textarea>

                <div class="acciones-editor-conexion">

                    <button
                        class="boton boton-guardar-conexion"
                        onclick="guardarConexionActual()"
                    >
                        💾 Guardar cambios
                    </button>

                    <button
                        class="boton boton-secundario"
                        onclick="cerrarEditorConexion()"
                    >
                        Cancelar
                    </button>

                </div>

            </div>
        `;

        document
            .getElementById("destinoConexion")
            .addEventListener(
                "change",
                actualizarPreviewConexion
            );

        actualizarPreviewConexion();

        editor.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }, 50);
}


// ==========================================
// 🗑️ ELIMINAR CONEXIÓN
// ==========================================

function eliminarConexion(id) {

    const conexion = conexiones.find(
        item => item.id === id
    );

    if (!conexion) return;

    const origen = canciones[conexion.origen];
    const destino = canciones[conexion.destino];

    const confirmar = confirm(
        `¿Eliminar la conexión?\n\n` +
        `${origen?.nombre || "Canción"} → ` +
        `${destino?.nombre || "Canción"}`
    );

    if (!confirmar) return;

    conexiones = conexiones.filter(
        item => item.id !== id
    );

    guardarConexiones();

    mostrarConexionesGuardadas();
}


// ==========================================
// 🔗 ABRIR / CERRAR CONEXIONES
// ==========================================

const btnConexionesFinal =
    document.getElementById("btnConexiones");

const panelConexionesFinal =
    document.getElementById("panelConexiones");

const cerrarConexionesFinal =
    document.getElementById("cerrarConexiones");

if (btnConexionesFinal) {

    btnConexionesFinal.addEventListener(
        "click",
        () => {

            const panelRepertorios =
                document.getElementById(
                    "panelRepertorios"
                );

            if (panelRepertorios) {
                panelRepertorios.style.display =
                    "none";
            }

            panelConexionesFinal.style.display =
                "block";

            construirInterfazConexiones();

            panelConexionesFinal.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    );
}

if (cerrarConexionesFinal) {

    cerrarConexionesFinal.addEventListener(
        "click",
        () => {

            panelConexionesFinal.style.display =
                "none";
        }
    );
}


// ==========================================
// 🌐 FUNCIONES GLOBALES
// ==========================================

window.seleccionarCancionConexion =
    seleccionarCancionConexion;

window.abrirSelectorDestinoConexion =
    abrirSelectorDestinoConexion;

window.mostrarSugerenciasConexion =
    mostrarSugerenciasConexion;

window.abrirEditorConexion =
    abrirEditorConexion;

window.verAnalisisCompletoConexion =
    verAnalisisCompletoConexion;

window.guardarConexionActual =
    guardarConexionActual;

window.cerrarEditorConexion =
    cerrarEditorConexion;

window.verConexionGuardada =
    verConexionGuardada;

window.editarConexion =
    editarConexion;

window.eliminarConexion =
    eliminarConexion;

console.log("🔗 SISTEMA DE CONEXIONES CARGADO");