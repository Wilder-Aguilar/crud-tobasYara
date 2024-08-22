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
        alert("Confirma que quiere eliminar");
        getFamily();
    } else {
        console.error("Error al eliminar la tarea");
    }
}

// //CREATE - method: POST URL:http://localhost:3000/family
//     async function deleteFamily(){
//         method:"",
//         headers:{}
// }


// //UPDATE - method: DELETE URL:http://localhost:3000/family
//     async function deleteFamily(){
// }


//MOSTRAR EN HTML
function printData() {
    let familyList = document.getElementById("familyList");
    getFamily().then(family => {
        if (family) {
            family.forEach(member => {
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






