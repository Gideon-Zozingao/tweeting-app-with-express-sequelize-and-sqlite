const span = document.getElementsByClassName("close")[0];
const modal = document.getElementById("myModal");
const modalCont = document.querySelector(".modal-inner-content");

let deleteClass = document.querySelectorAll("span .delete-link");
//btn edit-link
let editClass = document.querySelectorAll("span .edit-link");

editClass.forEach(editBtn => {
  editBtn.addEventListener("click", () => {
    //console.log(`Edit: ${editBtn.accessKey}`)
    const XHR = new XMLHttpRequest();
    XHR.open("GET", `/editTwit/${editBtn.accessKey}`)
    XHR.send();
    XHR.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        modalCont.innerHTML = this.responseText;
        showModal()

      } else {
        showModal()
      }
    }
  })
})

deleteClass.forEach(delBtn => {
  delBtn.addEventListener("click", () => {
    console.log(`Edit: ${delBtn.accessKey}`)
    const XHR = new XMLHttpRequest();
    XHR.open("GET", `/deleteTwit/${delBtn.accessKey}`)
    XHR.send();
    XHR.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        modalCont.innerHTML = this.responseText;
        showModal()
      } else {
        modalCont.innerHTML = this.responseText;
        showModal()
      }
    }
  })
})

const showModal = function() {
  modal.style.display = "block";
}
const closeModal = function() {
  modal.style.display = "none";
}
const addTwits = document.getElementById("addTwits");
addTwits.onclick = function() {
    let XHR = new XMLHttpRequest();
    XHR.open("GET", "/add-twit", true);
    XHR.send()
    XHR.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        modalCont.innerHTML = this.responseText;
        showModal();
      } else {}
    }
  }
  // When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modalCont.innerHTML = "";
    closeModal();
  }
  // When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modalCont.innerHTML = "";
    closeModal();
  }
}
