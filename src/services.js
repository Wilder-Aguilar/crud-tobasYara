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

//READ ONE - method: GET
async function getOneFamily(id) {
    const response = await fetch(`${URL_API}/${id}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
    })
    const data = await response.json();
    return data;
}

//PINTAR HTML
const familyList = document.getElementById("familyList")

async function printData() {
    const members = await getAllFamily() //Todo lo que hace la funcion getAllFamily se guarda en la constante const charachters
    familyList.innerHTML = `
        <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>DNI</th>
            <th>Cumpleaños</th>
            <th>Año de ingreso</th>
            <th>País</th>
            <th>Ciudad</th>
            <th>Dirección</th>
            <th>whatsApp</th>
            <th>email</th>
            <th>Fotografia</th>
            <th>Talla</th>
            <th colspan="2">Acciones</th>
        </tr >
        `;
    members.map((member) => {
        familyList.innerHTML += `<tr>
        <td>${member.id}</td>
        <td>${member.name}</td>
        <td>${member.dni}</td>
        <td>${member.birthday}</td>
        <td>${member.entryYear}</td>
        <td>${member.country}</td>
        <td>${member.city}</td>
        <td>${member.addres}</td>
        <td>${member.whatsapp}</td>
        <td>${member.email}</td>
        <td><img src="${member.picture}" alt="Imagen de ${member.name}" width="100" height="100"></td>
        <td>${member.size}</td>
        <td> <button class="editButton" onclick= "openEditForm(${member.id})"><img src="img/edit.png" alt="Editar" width="20" height="30"></button> </td>
        <td> <button class="deleteButton" onclick= "deleteFamily('${member.id}')"><img src="img/delete.png" alt="Editar" width="20" height="30"></button> </td>
        </tr>`
    })
}
printData();

//DELETE - method: DELETE URL:http://localhost:3000/family/id
async function deleteFamily(id) {
    const confirmed = confirm("¿Estás seguro de que deseas eliminar a este fraterno?");
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

// CREATE

//POP UP
    const open = document.getElementById('open');
    const modalContainer = document.getElementById('modalContainer');
    const close = document.getElementById('close');

    open.addEventListener('click', () => {
        modalContainer.classList.add('show');
    });

    close.addEventListener('click', (event) => {
        event.stopPropagation(); // Evita que el evento se propague a otros elementos
        modalContainer.classList.remove('show');
    });

    modalContainer.addEventListener('click', (event) => {
        event.stopPropagation(); // Evita que el modal se cierre al hacer clic fuera de él
    });

// CREATE   method:POST URL:http://localhost:3000/family/id

async function createFamily() {
    const form = document.getElementById("addNewCharacter");
    const newCharacter = {
        name: form.name.value,
        dni: form.dni.value,
        birthday: form.birthday.value,
        entryYear: form.entryYear.value,
        country: form.country.value,
        city: form.city.value,
        addres: form.addres.value,
        whatsapp: form.whatsapp.value,
        email: form.email.value,
        picture: "img/" + form.picture.value,
        size: form.size.value
    };
    if (!form.name.value || !form.dni.value || !form.birthday.value || !form.entryYear.value || !form.city.value || !form.country.value || !form.addres.value || !form.whatsapp.value || !form.email.value || !form.picture.value || !form.size.value) {
        return alert("Todos los campos son necesarios")
    };
    const response = await fetch(URL_API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newCharacter),
    });
    const data = await response.json();
    return data;
}

//UPDATE - method: PUT URL:http://localhost:3000/family

async function openEditForm(id) {
    const modalContainerEdit = document.getElementById('modalContainerEdit');
    modalContainerEdit.classList.add('show');

    const closed = document.getElementById('closeEdit');
    closed.addEventListener('click', (event) => {
        event.stopPropagation();
        modalContainerEdit.classList.remove('show');
    });
    
    const form = document.getElementById("editComponent");
    const member = await getOneFamily(id);
    form.ide.value = member.id;
    form.namee.value = member.name;
    form.dnie.value = member.dni;
    form.birthdaye.value = member.birthday;
    form.entryYeare.value = member.entryYear;
    form.countrye.value = member.country;
    form.citye.value = member.city;
    form.addrese.value = member.addres;
    form.whatsappe.value = member.whatsapp;
    form.emaile.value = member.email;
    form.picturee.value = member.picture;
    form.sizee.value = member.size;
}

async function updateComponent() {
    console.log("UPDATE COMPONENT");
      const form = document.getElementById("editComponent");
      const editComponents = {
          id: form.ide.value,
          name: form.namee.value,
          dni: form.dnie.value,
          birthday: form.birthdaye.value,
          entryYear: form.entryYeare.value,
          country: form.countrye.value,
          city: form.citye.value,
          addres: form.addrese.value,
          whatsapp: form.whatsappe.value,
          email: form.emaile.value,
          picture: "img/" + form.picturee.value,
          size: form.sizee.value
      }
      console.log(editComponents);

      if (!form.namee.value) {
        return alert("Todos los campos son necesarios")
    };

    const response = await fetch(`${URL_API}/${form.ide.value}`, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(editComponents),
      });
      console.log(response);
      const data = await response.json();
      return data
}