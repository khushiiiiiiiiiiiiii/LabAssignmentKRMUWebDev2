const title = document.querySelector("#title");
const date = document.querySelector("#date");
const category = document.querySelector("#category");
const desc = document.querySelector("#desc");
const addBtn = document.querySelector("#addBtn");
const eventList = document.querySelector("#eventList");
const clearBtn = document.querySelector("#clearBtn");
const sampleBtn = document.querySelector("#sampleBtn");
const searchInput = document.querySelector("#searchInput");

let events = JSON.parse(localStorage.getItem("events")) || [];
let editIndex = null;

function saveEvents() {
    localStorage.setItem("events", JSON.stringify(events));
}

function renderEvents(){
    eventList.innerHTML = "";

    const searchTerm = searchInput.value.toLowerCase();
    const today = new Date().toISOString().split("T")[0];

    let filteredEvents = events.filter(e =>
        e.title.toLowerCase().includes(searchTerm)
    );

    filteredEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

    filteredEvents.forEach((e, i)=>{
        const div = document.createElement("div");
        div.className = "event";

        div.innerHTML = `
            <div class="delete" onclick="deleteEvent(${i})">x</div>
            <h4>${e.title}</h4>
            <p>${e.date}</p>
            <span>${e.category}</span>
            <p>${e.desc}</p>
            <button onclick="editEvent(${i})">Edit</button>
            `;
            
            eventList.appendChild(div);
        });
}

searchInput.addEventListener("input", renderEvents);

addBtn.addEventListener("click", ()=>{
    if(title.value === "" || date.value === "") return;

    if (editIndex == null) {

        events.push({
            title: title.value,
            date: date.value,
            category: category.value,
            desc: desc.value
        });
    } else {
        events[editIndex] = {
            title: title.value,
            date: date.value,
            category: category.value,
            desc: desc.value
        };
        editIndex = null;
        addBtn.textContent = "Add Event";
    }

    saveEvents();
    renderEvents();

    title.value = "";
    date.value = "";
    desc.value = "";
});

function editEvent(i) {
    const event = events[i];

    title.value = event.title;
    date.value = event.date;
    category.value = event.category;
    desc.value = event.desc;

    editIndex = i;
    addBtn.textContent = "Update Event";
}

function deleteEvent(i){
    events.splice(i,1);
    saveEvents()
    renderEvents();
}

clearBtn.onclick = ()=> {
    events = [];
    saveEvents();
    renderEvents();
};

sampleBtn.onclick = ()=> {
    events.push({
        title:"Sample Event",
        date:"2026-01-14",
        category:"Sample Category",
        desc:"Sample event description."
    });
    saveEvents();
    renderEvents();
};

renderEvents();
