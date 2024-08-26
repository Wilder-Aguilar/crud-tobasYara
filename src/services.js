//READ - METHOD GET
//COMO HACER UNA PETICION GET SOBRE UNA ENDPOINT(URL)    -- METODO FETCH QUE ES, COMO SE UTILIZA, POR DONDE PASO LA PETICIÓN

const URL_API = "http://localhost:3000/family";

//READ - method: GET
async function getAllFamily() {
    const response = await fetch(URL_API, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
    })
    const data = await response.json();
    return data;
}

// Obtener tarea por id
async function getFamilyById(id) {
    const response = await fetch(`${URL_API}/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json", // Indica que estamos trabajando con JSON
        },
    });
    const data = await response.json();
    //	console.log(data)
    return data;
}
//getFamilyById(2);


//DELETE - method: DELETE URL:http://localhost:3000/family/id
async function deleteFamily(id) {
    const confirmed = confirm("¿Estás seguro de que deseas eliminar a este fraterno");

    if (confirmed) {
        const response = await fetch(`${URL_API}/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const deletedFamily = await response.json();
        if (response.ok) {
            printData();
        }
        return deletedFamily;
    } else {
        // El usuario canceló la acción
        console.log("Acción cancelada por el usuario.");
        return null;
    }
}

// CREATE   method:POST
async function createFamily() {
    const response = await fetch(URL_API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "name": "ABC",
            "dni": "DEF",
            "birthday": "25/06/1985",
            "entryYear": 2017,
            "country": "Bolivia",
            "city": "La Paz",
            "addres": "Alejandrina Moran,15",
            "whatsapp": "+34 632354542",
            "email": "iJK@gmail.com",
            "picture": "f1.png",
            "size": "M"
        })
    });
    const createdFamily = await response.json();
    if (response.ok) {
        printData();
    }
    return createdFamily;
}

// //UPDATE - method: DELETE URL:http://localhost:3000/family
//     async function deleteFamily(){
// 



//MOSTRAR EN HTML
const familyList = document.getElementById("familyList")

async function printData() {
    const characters = await getAllFamily() //Todo lo que hace la funcion getAllFamily se guarda en la constante const charachters
    familyList.innerHTML = `
        <tr>
            <th>ID</th>
            <th>NOMBRE</th>
            <th>DNI</th>
            <th>CUMPLEAÑOS</th>
            <th>AÑO DE INGRESO</th>
            <th>PAÍS</th>
            <th>CIUDAD</th>
            <th>DIRECCIÓN</th>
            <th>whatsApp</th>
            <th>email</th>
            <th>Fotografía</th>
            <th>Talla</th>
            <th colspan="3">Acciones</th>
        </tr >
        `;
    characters.map((character) => {
        familyList.innerHTML += `<tr>
        <td>${character.id}</td>
        <td>${character.name}</td>
        <td>${character.dni}</td>
        <td>${character.birthday}</td>
        <td>${character.entryYear}</td>
        <td>${character.country}</td>
        <td>${character.city}</td>
        <td>${character.addres}</td>
        <td>${character.whatsapp}</td>
        <td>${character.email}</td>
        <td><img src="${character.picture}" alt="Imagen de ${character.name}" width="100" height="100"></td>
        <td>${character.size}</td>
        <td> <button class="viewButton" onclick= "deleteCharacter(${character.id})">View</button> </td>
        <td> <button class="editButton" onclick= "deleteCharacter(${character.id})">Edit</button> </td>
        <td> <button class="deleteButton" onclick= "deleteFamily(${character.id})">Delete</button> </td>
        </tr>`
    })
}
printData()