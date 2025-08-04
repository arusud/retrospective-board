let noteId = 0;

function addNote() {
  const text = document.getElementById("note-text").value.trim();
  const color = document.getElementById("note-color").value;
  const columnId = document.getElementById("column-select").value;

  if (!text) return alert("Enter some text!");

  const note = document.createElement("div");
  note.className = "note";
  note.draggable = true;
  note.ondragstart = drag;
  note.id = `note-${noteId++}`;
  note.style.backgroundColor = color;
  note.innerHTML = `${text} <button onclick="this.parentElement.remove()">x</button>`;

  document.getElementById(columnId).appendChild(note);
  document.getElementById("note-text").value = "";
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  const data = ev.dataTransfer.getData("text");
  const dragged = document.getElementById(data);
  ev.target.closest(".column").appendChild(dragged);
}
