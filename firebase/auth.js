
function signIn() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            var credential = result.credential;
            var user = result.user;
            console.log(user.email)
            try {
                myModal.hide();
            } catch (error) {
                
            }
        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
            console.log(errorCode);
        });
}

function signOut() {
    firebase.auth().signOut().then(() => {
        console.log("Logged Out");
    }).catch((error) => {
        console.log(error.message);
    });
}