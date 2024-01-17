const triggerPopupButton = document.querySelector(".add-box"),
popupBox = document.querySelector(".popup-box"),
closePopupButton = popupBox.querySelector("div i"),
updateNoteButton = popupBox.querySelector("button"),
popupTitle = popupBox.querySelector(".top-row p"),
noteTitle = popupBox.querySelector("input"),
noteContent = popupBox.querySelector("textarea");

const months = ["January", "February", "March", "April", "May", "June", "July",
"August", "September", "October", "November", "December"];
let notes = JSON.parse(localStorage.getItem("notes") || "[]"), isUpdate, updateId, updateElement;

function addNotePopup() {
    popupBox.classList.add("show");
    updateNoteButton.innerText = "Add Note";
    popupTitle.innerText = "Add a new note";
    document.querySelector("body").style.overflow = "hidden";
}

function closePopup() {
    popupBox.classList.remove("show");
    noteTitle.value = "";
    noteContent.value = "";
    document.querySelector("body").style.overflow = "auto";
}

function showNote(note) {
    if (!notes) return;
    let filteredContent = note.description.replaceAll("\n", "<br/>");
    let newNote = `<div class="note box">
                        <div class="details">
                            <p class="text-lrg">${note.title}</p>
                            <span class="text-small">${filteredContent}</span>
                        </div>
                        <div class="bottom-bar">
                            <span class="text-small">${note.date}</span>
                            <div class="options">
                                <i onclick="showMenu(this)" class="fas fa-ellipsis-h"></i>
                                <ul class="menu">
                                    <li class="text-small" onclick="updateNote(this)"><i class="fas fa-pencil"></i> Edit</li>
                                    <li class="text-small" onclick="deleteNote(this)"><i class="fas fa-trash"></i>Delete</li>
                                </ul>
                            </div>
                        </div>
                    </div>`;
    printNotes();
    triggerPopupButton.insertAdjacentHTML("afterend", newNote);
}
loadNoteData(); // to show all notes in local storage

function loadNoteData() {
    let noteList = document.querySelectorAll(".note .box");
    if (notes && noteList.length == 0) {
        notes.forEach((note, id) => {
            let filteredContent = note.description.replaceAll("\n", "<br/>");
            let newNote = `<div class="note box">
                                <div class="details">
                                    <p class="text-lrg">${note.title}</p>
                                    <span class="text-small">${filteredContent}</span>
                                </div>
                                <div class="bottom-bar">
                                    <span class="text-small">${note.date}</span>
                                    <div class="options">
                                        <i onclick="showMenu(this)" class="fas fa-ellipsis-h"></i>
                                        <ul class="menu">
                                            <li class="text-small" onclick="updateNote(this)"><i class="fas fa-pencil"></i> Edit</li>
                                            <li class="text-small" onclick="deleteNote(this)"><i class="fas fa-trash"></i>Delete</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>`;
            triggerPopupButton.insertAdjacentHTML("afterend", newNote);
        });
    }
}

/* 
delete html element
remove from local storage
 */
function deleteNote(element) {
    const noteBox = element.closest('.note.box');
    const indexDOM = Array.from(noteBox.parentElement.children).indexOf(noteBox); //this create an array containing all notes and find the index of the current element
    const storageIndex = notes.length - indexDOM; // index of note in the storage
    noteBox.remove();
    notes.splice(storageIndex, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
}

function updateNote(element) {
    triggerPopupButton.click();
    updateNoteButton.innerText = "Update Note";
    popupTitle.innerText = "Edit note";
    const noteBox = element.closest('.note.box');
    const indexDOM = Array.from(noteBox.parentElement.children).indexOf(noteBox);
    const storageIndex = notes.length - indexDOM;
    isUpdate = true;
    updateId = storageIndex;
    updateElement = noteBox;
    noteTitle.value = notes[storageIndex].title;
    noteContent.value = notes[storageIndex].description.replaceAll('<br/>', '\r\n');
}

function printNotes() {
    console.log(notes.length);
    notes.forEach((note, id) => {
        let filteredContent = note.title + " " + note.description;
        console.log(id + " " + filteredContent);
    });
}

function addNewNote() {
    let title = noteTitle.value.trim(),
        description = noteContent.value.trim();
    if (title || description) {
        let currentDate = new Date(),
            month = months[currentDate.getMonth()],
            day = currentDate.getDate(),
            year = currentDate.getFullYear();
        let note = {title, description, date: `${month} ${day}, ${year}`};
        if (isUpdate) {
            notes[updateId] = note;
            isUpdate = false;
            let details = updateElement.querySelector('.details'),
            editedTitle = details.querySelector('p'),
            editedContent = details.querySelector('span');
            editedTitle.innerText = title;
            editedContent.innerText = description;
        } else {
            notes.push(note);
            showNote(note);
        }
        localStorage.setItem("notes", JSON.stringify(notes));
        closePopup();
    }
}


triggerPopupButton.addEventListener("click", addNotePopup);
closePopupButton.addEventListener("click", closePopup);
updateNoteButton.addEventListener("click", addNewNote);

function showMenu(element) {
    element.parentElement.classList.add("show");
    document.addEventListener("click", e => {
        if(e.target.tagName != "I" || e.target != element) {
            element.parentElement.classList.remove("show");
        }
    });
}