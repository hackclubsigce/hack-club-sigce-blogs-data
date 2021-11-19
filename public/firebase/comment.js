const db = firebase.firestore();
let queryString = window.location.search;
let urlParam = new URLSearchParams(queryString);
let commentBody = document.getElementById('commentBody');
function postComment() {
    let itemId = urlParam.get('id');
    let user = firebase.auth().currentUser;
    let comment = document.getElementById('comment');
    if (user == null) {
        myModal.show();
    } else {
        db.collection("users").doc("comments").collection(itemId).doc().set({
            name: user.displayName,
            photoURL: user.photoURL,
            comment: comment.value,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            time: getTime()
        })
            .then(() => {
                comment.innerHTML = "";
                comment.value = "";
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
    }

}
function getTime() {
    const fortnightAway = new Date(new Date);
    const date = fortnightAway.getDate();
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"][fortnightAway.getMonth()];
    let time = `${date}<sup>${nth(date)}</sup> ${month} ${fortnightAway.getFullYear()}`;
    return time;
}

try {
    db.collection("users").doc("comments").collection(getId()).orderBy("timestamp");
    db.collection("users").doc("comments").collection(getId())
    .onSnapshot((querySnapshot) => {
        commentBody.innerHTML = "";
        querySnapshot.forEach((doc) => {
            commentDisplay(doc.data(), doc.id);
        });
    });
} catch (error) {
    error.message;
}

function commentDisplay(comment, id) {
    commentBody.innerHTML += `<div class="card p-3" style="margin-bottom: 15px;">
    <div class="d-flex justify-content-between align-items-center">
        <div class="user d-flex flex-row align-items-center"> <img src=${comment.photoURL} width="30" class="user-img rounded-circle" style="margin-right: 15px;"> <span><small class="font-weight-bold text-primary" style="margin-right: 10px; font-weight: bold;">${comment.name}</small> <small class="font-weight-bold">${comment.comment}</small></span> </div> 
    </div>
    <div class="action d-flex justify-content-between mt-2 align-items-center">
        <div class="reply px-4"> <small class="timeDisplay">${comment.time}</small></div>
    </div>
    </div>`
}


function getId() {
    let queryString = window.location.search;
    let urlParam = new URLSearchParams(queryString);
    let id = urlParam.get('id');
    return id;
}

function getData() {
    db.collection("users").doc("comments").collection(getId()).orderBy("timestamp");
    db.collection("users").doc("comments").collection(getId())
        .get()
        .then((querySnapshot) => {
            commentBody.innerHTML = "";
            querySnapshot.forEach((doc) => {
                commentDisplay(doc.data(), doc.id);
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
}

function deleteComment(id, name) {
    let user = firebase.auth().currentUser;
    if (user.displayName == name) {
        db.collection("users").doc("comments").collection(getId()).doc(id).delete().then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    } else {
       alert("You Cannot Delete The Comment!"); 
    }
    
}
const nth = function (d) {
    if (d > 3 && d < 21) return 'th';
    switch (d % 10) {
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
    }
}

{/* <i id="${id}" onclick="deleteComment(this.id)" class="fas fa-trash"></i> */}