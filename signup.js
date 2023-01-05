function signup(){
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var password =document.getElementById("password").value; 
    var Cpassword =document.getElementById("Cpassword").value;

    if(password != Cpassword){
        window.alert("Password dosent match");

    }
    else{
        firebase.auth().createUserWithEmailAndPassword(email, password)
.then((userCredential) => {
     
    var user = userCredential.user;
          firebase.database().ref('user/'+user.uid).set({
            Email:email,
            role:"staff"
          }).then(
            window.alert("Successfully signedUp"),
            // window.location.href = "Login.html"
            );
})
}
}