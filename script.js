var config = {
  apiKey: "AIzaSyB0gZu8LxMQnEN_PAfpHLwoxwBZKrTZYko",
  authDomain: "authtest-a59ff.firebaseapp.com",
  databaseURL: "https://authtest-a59ff.firebaseio.com",
  projectId: "authtest-a59ff",
  // storageBucket: "",
  messagingSenderId: "578814569157",
  appId: "1:578814569157:web:55c76d8aad42ee77"
};
// Initialize Firebase
firebase.initializeApp(config);

const emailInput = $("#email");
const passInput = $("#password");
const btnLogIn = $("#btnSubmit");
const btnCreate = $("#createNew");
const btnLogOut = $("#logout");
const error = $("#error");

btnLogIn.on("click", e => {
  error.addClass("hide")
  e.preventDefault();

  console.log("Signing in User")

  const email = emailInput.val().trim();
  const password = passInput.val().trim();
  const auth = firebase.auth()
  const promise = auth.signInWithEmailAndPassword(email, password);
  promise.catch(e => {
    error.text(e.message);
    error.removeClass("hide");
  });

});

btnCreate.on("click", e => {
  e.preventDefault();

  console.log("creating User")
  //TODO: Check 4 valid email address and Password
  const email = emailInput.val().trim();
  const password = passInput.val().trim();
  const auth = firebase.auth()
  const promise = auth.createUserWithEmailAndPassword(email, password);
  promise.catch(e => {
    error.text(e.message);
    error.removeClass("hide");
  });
});

btnLogOut.on("click", e => {
  console.log("Signing Out User")
  firebase.auth().signOut();
});

firebase.auth().onAuthStateChanged(firebaseUser => {
  if (firebaseUser) {
    btnLogOut.removeClass("hide");
    btnLogIn.addClass("hide");
    btnCreate.addClass("hide")
    error.addClass("hide");
    // console.log(firebaseUser);
  }
  else {
    btnLogOut.addClass("hide");
    btnLogIn.removeClass("hide");
    btnCreate.removeClass("hide");
    error.addClass("hide");
    console.log("Logged Out");
  }
});