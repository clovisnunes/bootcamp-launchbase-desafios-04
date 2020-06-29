function confirmDel(evt) {
    if(!confirm("Tem certeza que deseja excluir?")) {
        evt.preventDefault();
    }
}

const buttons = document.getElementsByClassName("del-button");

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", confirmDel)
}