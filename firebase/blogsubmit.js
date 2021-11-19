async function submitBlog() {
    console.log("Hwllo1")
    let blogTitle = document.getElementById('blogTitle').value;
    let blogShortDesc = document.getElementById('blogShortDesc').value;
    let blogDomain = document.getElementById('blogDomain').value;
    let formFile = document.getElementById('formFile').value;
    let form = document.getElementById('form');
    let review = document.getElementById('review');
    let btnText = document.getElementById('btnText');
    let loader = document.getElementById('loader');
    let user = firebase.auth().currentUser;
    btnText.innerHTML = "Loading...";
    loader.style.display = "block";
    if (user == null) {
        console.log("Hello2")
    } else {
        let obj = {
            name: user.displayName,
            title: blogTitle,
            shortDesc: blogShortDesc,
            domain: blogDomain,
            URL: formFile,
            time: getTime(),
            accepted: false
        }
        let ref = firebase.firestore().collection("Submission").doc(user.displayName).collection(blogDomain).doc(blogTitle).set(obj)
            .then(() => {
                form.style.display = "none";
                review.style.display = "block";
                btnText.innerHTML = "Submitted";
                loader.style.display = "none";
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
    }
}
function getTime() {
    console.log("Time");
    const fortnightAway = new Date(new Date);
    const date = fortnightAway.getDate();
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"][fortnightAway.getMonth()];
    let time = `${date}<sup>${nth(date)}</sup> ${month} ${fortnightAway.getFullYear()}`;
    return time;
}