const span = document.getElementsByClassName("close")[0];
const modal = document.getElementById("myModal");
const modalCont = document.querySelector(".modal-inner-content");
const userProfile = document.querySelectorAll(".userProfile");
userProfile.forEach(user => {
  user.onclick = function() {
    var key = user.accessKey
    let userDetalits = document.querySelector("#user-delaits")
    let XHR = new XMLHttpRequest();
    XHR.open("GET", `/userDetails/${key}`)
    XHR.send();
    XHR.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        userDetalits.innerHTML = this.responseText;
      } else {}
    }
  }
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
