const span = document.getElementsByClassName("close")[0];
const modal = document.getElementById("myModal");
const modalCont = document.querySelector(".modal-inner-content");
let deleteClass = document.querySelectorAll("span .delete-link");
let editClass = document.querySelectorAll("span .edit-link");
let activeAvata = document.querySelector("#activeAvata");
let activeUserInfo = document.querySelector("#activeUserInfo");
let userLink = document.querySelectorAll(".userlink");

userLink.forEach(u => {
  u.onclick = function(e) {
    var key = u.accessKey
      //let userDetalits = document.querySelector("#user-delaits")
    let XHR = new XMLHttpRequest();
    XHR.open("GET", `/userDetails/${key}`)
    XHR.send();
    XHR.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          modalCont.innerHTML = this.responseText;
          showModal()
        } else {

        }
      }
      // alert(key)
      //e.preventDefault()

  }
})
activeUserInfo.oclick = function() {

  console.log("HI Every One")
}
activeAvata.onclick = () => {
  const XHR = new XMLHttpRequest();
  XHR.open("GET", `/changerAvata`)
  XHR.send();
  XHR.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      modalCont.innerHTML = this.responseText;
      showModal()
    } else {
      // showModal()
    }
  }
}
editClass.forEach(editBtn => {
  editBtn.addEventListener("click", () => {
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
    } else {
      modalCont.innerHTML = this.responseText;
      showModal();
    }
  }
}

span.onclick = function() {
  modalCont.innerHTML = "";
  closeModal();
}

window.onclick = function(event) {
  if (event.target == modal) {
    modalCont.innerHTML = "";
    closeModal();
  }
}
