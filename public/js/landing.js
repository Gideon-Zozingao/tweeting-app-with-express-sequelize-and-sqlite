const modal = document.getElementById("myModal");
const signup = document.getElementById("signup");
// const signup_1=document.getElementById("signup-1");
const signin = document.getElementById("signin");
const modalCont = document.querySelector(".modal-inner-content");
const span = document.getElementsByClassName("close")[0];

const showModal = function() {
  modal.style.display = "block";
}

const closeModal = function() {
  modal.style.display = "none";
}

signup.onclick = function() {
  let XHR = new XMLHttpRequest();
  XHR.open("GET", "/register", true);
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

signin.onclick = function() {
  let XHR = new XMLHttpRequest();
  XHR.open("GET", "/user-login", true);
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

var dateString = 'Mon Jan 12 00:00:00 GMT 2015';
dateString = new Date(dateString).toUTCString();
dateString = dateString.split(' ').slice(0, 4).join(' ');
console.log(dateString);
