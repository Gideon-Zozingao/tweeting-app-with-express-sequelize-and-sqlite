const span = document.getElementsByClassName("close")[0];
const modal = document.getElementById("myModal");
const modalCont = document.querySelector(".modal-inner-content");
const userProfile = document.querySelectorAll(".userProfile");
const userThumbnails = document.querySelector(".user-thumnails");
const closeSide = document.querySelector("#close-side")
const openSide = document.querySelector("#open-side")

const showSection = (section) => {
  section.style.display = "block"
}
const closeSection = (section) => {
  section.style.display = "";
}
openSide.onclick = () => {
  openSide.style.display = "none";
  showSection(userThumbnails);
  showSection(closeSide)
}
closeSide.onclick = () => {
  closeSection(closeSide)
  closeSection(userThumbnails);
  showSection(openSide)

}



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
