//funciones js peticiones http and dbjson
//READ - METHOD GET
//COMO HACER UNA PETICION GET SOBRE UNA ENDPOINT(URL)    -- METODO FETCH QUE ES, COMO SE UTILIZA, POR DONDE PASO LA PETICIÓN


let apiFamily = "http://localhost:3000/family";

//READ - method: GET  URL:http://localhost:3000/family
async function getFamily() {
    const response = await fetch(apiFamily, {
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
    const response = await fetch(`http://localhost:3000/family/${id}`, {
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
    const response = await fetch(`${apiFamily}/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if (response.ok) {
        alert("Confirmas que quieres eliminar la información de este fraterno");
        getFamily();
    } else {
        console.error("Error al eliminar al fraterno");
    }
}

// //CREATE - method: POST URL:http://localhost:3000/family
//     async function deleteFamily(){
//         method:"",
//         headers:{}
// }


// CREATE   method:POST
async function createFamily() {
    const response = await fetch(URL_API, {
        method: "POST",
        headers: {"Content-Type": "application/json",},
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
        getFamily();
    }
    return createdFamily;
    // Implementar código para crear una nueva tarea
}




// //UPDATE - method: DELETE URL:http://localhost:3000/family
//     async function deleteFamily(){
// }


//MOSTRAR EN HTML
async function printData() {
    let familyList = document.getElementById("familyList");
    getFamily().then(family => {
        if (family) {
            family.map(member => {
                let row = document.createElement("tr")
                Object.entries(member).forEach(([key, value]) => {
                    if (key == "picture") {
                        let imagen = document.createElement('img');
                        imagen.src = './img/' + member.picture;
                        row.appendChild(imagen);
                    }
                    else {
                        let column = document.createElement("td")
                        let columnText = document.createTextNode(value)
                        column.appendChild(columnText)
                        row.appendChild(column)
                    }
                });
                let br = document.createElement("br")
                let br1 = document.createElement("br")
                let viewButton = document.createElement("button");
                viewButton.textContent = "VIEW";
                let editButton = document.createElement("button");
                editButton.textContent = "EDIT";
                let deleteButton = document.createElement("button");
                deleteButton.textContent = "DELETE";
                deleteButton.onclick = () => deleteFamily(member.id);
                row.appendChild(viewButton);
                row.appendChild(br);
                row.appendChild(editButton);
                row.appendChild(br1);
                row.appendChild(deleteButton);
                familyList.appendChild(row)
                viewButton.className = 'viewButton';
                editButton.className = 'editButton';
                deleteButton.className = 'deleteButton';
            })
        }
    });
}
printData()

//CODIGO ej.
// async function printFamily(){
//     const family = await getFamily();
//     family.map(family=>{
//         listTag.innerHTML +=
//         `<li>${family.name} <button onclick="deleteFamily(${family.name})>
//     });


// async function printFamily() {
//   const family = await getFamily();

//   family.forEach(familyMember => {
//     listTag.innerHTML += `
//       <li>${familyMember.name} <button onclick="deleteFamily('${familyMember.name}')">Delete</button></li>
//     `;
//   });
// }
// printFamily()