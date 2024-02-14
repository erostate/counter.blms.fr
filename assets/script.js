/*
    GLOBAL JS for project COUNTER.BLMS.FR

    Made by: Erostate
    Date: 2024-02-13
    Version: 1.0.0
    URI: https://counter.blms.fr

    License: BLMS
    License URI: https://blms.fr/license
*/

// Add a new input field for a name
function addRowName() {
    // Get the list of names & count the number of names
    var list = document.getElementById('nameList');
    var totalCountName = list.getElementsByTagName('input').length;

    // Define the new name number
    var newNameNumber = totalCountName + 1;

    // Create a new input field
    var newLine = document.createElement('span');
    newLine.className = 'list-name-wrapper';
    newLine.id = 'name' + newNameNumber + '_container';
    newLine.innerHTML = `
    <span>
        <input type="text" id="name${newNameNumber}" placeholder="Name ${newNameNumber}">
        <button id="name${newNameNumber}_button" onclick="saveName(${newNameNumber})">SAVE</button>
    </span>
    <span id="name${newNameNumber}_scoreContainer">
        <h1 class="name-no-save">0</h1>
    </span>
    <span>
        <i class="fa-solid fa-trash name-no-save"></i>
        <i onclick="removeRowName(${newNameNumber})" class="fa-solid fa-xmark"></i>
    </span>
    `;

    // Append the new input field
    list.insertBefore(newLine, document.getElementById('addName'));

    // Focus on the new input field
    document.getElementById('name' + newNameNumber).focus();
}

// Remove an input field for a name
function removeRowName(nameNumber) {
    // Get the list of names & count the number of names
    var list = document.getElementById('nameList');
    var totalCountName = list.getElementsByTagName('input').length;

    // Check if the name number is the last in list
    if (nameNumber < totalCountName) {
        // Rename the input fields
        for (var i = nameNumber + 1; i <= totalCountName; i++) {
            var newVal = i - 1;
        
            // Mettre à jour le placeholder de l'élément
            document.getElementById('name' + i).placeholder = 'Name ' + newVal;
            
            // Mettre à jour l'ID de l'élément
            document.getElementById('name' + i).id = 'name' + newVal;

            // Mettre à jour le onclick du bouton de suppression
            document.getElementById('name' + i + '_container').getElementsByTagName('i')[0].setAttribute('onclick', 'removeRowName(' + newVal + ')');
        
            // Mettre à jour l'ID du conteneur
            document.getElementById('name' + i + '_container').id = 'name' + newVal + '_container';
        }        
    }

    // Remove the input field
    var lineToRemove = document.getElementById('name' + nameNumber + '_container');
    list.removeChild(lineToRemove);
}

function saveName(nameNumber) {
    var deleteRow = ""
    if (nameNumber >= 3) {
        deleteRow = `<i onclick="removeRowName(${nameNumber})" class="fa-solid fa-xmark"></i>`;
    }

    // Get the name
    var name = document.getElementById('name' + nameNumber).value;

    // Check if the name is not empty
    if (name != '') {
        // Change the input field to a span
        var nameContainer = document.getElementById('name' + nameNumber + '_container');
        var valueNameInput = document.getElementById('name' + nameNumber).value;
        nameContainer.classList.remove('name-no-save');
        nameContainer.innerHTML = `
        <span>
            <input disabled type="text" id="name${nameNumber}" placeholder="Name ${nameNumber}" value="${valueNameInput}">
            <button id="name${nameNumber}_button" onclick="editName(${nameNumber})">EDIT</button>
        </span>
        <span id="name${nameNumber}_scoreContainer">
            <button onclick="changeScore(${nameNumber}, 'remove')" class="big-btn"><b><i class="fa-solid fa-minus"></i>1</b></button>
            <h1>0</h1>
            <button onclick="changeScore(${nameNumber}, 'add')" class="big-btn"><b><i class="fa-solid fa-plus"></i>1</b></button>
        </span>
        <span>
            <i class="fa-solid fa-trash"></i>
            ${deleteRow}
        </span>
        `;
    } else {
        document.getElementById('name' + nameNumber).focus();
    }
}

function editName(nameNumber) {
    var deleteRow = ""
    if (nameNumber >= 3) {
        deleteRow = `<i onclick="removeRowName(${nameNumber})" class="fa-solid fa-xmark"></i>`;
    }

    // Enable the input field
    var nameContainer = document.getElementById('name' + nameNumber + '_container');
    var valueNameInput = document.getElementById('name' + nameNumber).value;
    nameContainer.classList.add('name-no-save');
    nameContainer.innerHTML = `
    <span>
        <input type="text" id="name${nameNumber}" placeholder="Name ${nameNumber}" value="${valueNameInput}">
        <button id="name${nameNumber}_button" onclick="saveName(${nameNumber})">SAVE</button>
    </span>
    <span id="name${nameNumber}_scoreContainer">
        <h1>0</h1>
    </span>
    <span>
        <i class="fa-solid fa-trash"></i>
        ${deleteRow}
    </span>
    `;
}




// --- MODAL --- //

function generateErrorModal(status) {
    console.log(status);
    if (status == 'active') {
        document.getElementById('teamList').style.display = 'none';
        document.getElementById('modalError').style.display = 'block';
        document.getElementById('modalError').innerHTML = 'Too many teams for the number of names... Please add some member';
    } else {
        document.getElementById('teamList').style.display = 'flex';
        document.getElementById('modalError').style.display = 'none';
        document.getElementById('modalError').innerHTML = '';
    }
}

// Open the modal
function openModal(modalName) {
    document.getElementById(modalName).style.display = 'block';
}
// Close the modal
function closeModal(modalName) {
    document.getElementById(modalName).style.display = 'none';
}
// Close the modal when clicking outside
window.onclick = function(event) {
    if (event.target.className == 'modal') {
        event.target.style.display = 'none';
    }
}
