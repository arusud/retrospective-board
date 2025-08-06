// 1️⃣ Firebase Config (Replace with your own)
const firebaseConfig = {
  apiKey: "AIzaSyXXXX",
  authDomain: "yourapp.firebaseapp.com",
  projectId: "yourapp",
  storageBucket: "yourapp.appspot.com",
  messagingSenderId: "123456",
  appId: "1:123456:web:abcdef"
};

// 2️⃣ Init Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// 3️⃣ Add Note to Firestore
function addNote() {
  const text = document.getElementById("note-text").value.trim();
  const color = document.getElementById("note-color").value;
  const columnId = document.getElementById("column-select").value;

  if (!text) return alert("Enter some text!");

  db.collection("notes").add({
    text,
    color,
    column: columnId,
    timestamp: Date.now()
  });

  document.getElementById("note-text").value = "";
}

// 4️⃣ Delete Note
function deleteNote(id) {
  db.collection("notes").doc(id).delete();
}

// 5️⃣ Allow Drop
function allowDrop(event) {
  event.preventDefault();
}

// 6️⃣ Drag Start
function drag(event) {
  event.dataTransfer.setData("id", event.target.dataset.id);
}

// 7️⃣ Drop — update note's column in Firestore
function drop(event) {
  event.preventDefault();
  const noteId = event.dataTransfer.getData("id");
  const newColumn = event.target.closest(".column").id;
  db.collection("notes").doc(noteId).update({ column: newColumn });
}

// 8️⃣ Render Notes
function renderNotes(snapshot) {
  // Clear all columns
  document.querySelectorAll(".column").forEach(col => {
    col.querySelectorAll(".note").forEach(note => note.remove());
  });

  snapshot.forEach(doc => {
    const noteData = doc.data();
    const note = document.createElement("div");
    note.className = "note";
    note.draggable = true;
    note.ondragstart = drag;
    note.dataset.id = doc.id;
    note.style.backgroundColor = noteData.color;
    note.innerHTML = `${noteData.text} <button onclick="deleteNote('${doc.id}')">x</button>`;

    document.getElementById(noteData.column).appendChild(note);
  });
}

// 9️⃣ Live Firestore Listener
db.collection("notes").orderBy("timestamp").onSnapshot(renderNotes);
