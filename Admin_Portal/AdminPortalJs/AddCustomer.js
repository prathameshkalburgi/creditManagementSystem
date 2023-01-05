


const inputs = document.querySelectorAll(".input");
const form = document.querySelector("form");
// const [firstname, lastname, email, phone, city, country, linkedln, website] = inputs;
// const cvLabel = document.querySelector('cv-label');
// const file = document.querySelector('input[type="file"]');
const file = document.querySelector("#doc");
// const checkbox = document.querySelector('input[type="checkbox"]');

for (let input of inputs) {
    let parent = input.parentElement;
    let label = parent.querySelector("label");
    label.className = "label";
    label.style.color = "black";
    label.style.visibility = "visible";

    input.addEventListener("focus", () => {
        let parent = input.parentElement;
        let label = parent.querySelector("label");
        label.className = "label focus";
        label.style.color = "#00dd5c";
        label.style.visibility = "visible";
    });

    input.addEventListener("blur", () => {
        let parent = input.parentElement;
        let label = parent.querySelector("label");
        label.className = "label";
        label.style.color = "black";
        label.style.visibility = "visible";
    });
}

form.addEventListener("submit", (e) => {
    console.log("submit leave");
    e.preventDefault();
    validateInputs();
});

function validateInputs() {
    for (let input of inputs) {
        if (input.name !== "website") {
            if (input.value.trim() === "") showError(input, "This field is required");
            else {
                showSuccess(input);
            }
        }
    }

    // if (file.value === "" || file.value === "") showError(file, "No file selected");
    // showSuccess(file);
    // if (!checkbox.checked) showError(checkbox, "Do you agree?");
    
        
        var cno = document.getElementById("cno").value;
        var fullName = document.getElementById("fullName").value;
        var phno = document.getElementById("phno").value;
        var address = document.getElementById("address").value;
        var fileDoc = document.getElementById("doc").files[0];
        var Limit = document.getElementById("Limit").value;
        var maxLimit = document.getElementById("maxLimit").value;
        var bankName = document.getElementById("bankName").value;
        var chequeNo = document.getElementById("chequeNo").value;
        var proffs = document.getElementById("proffs").value;
        // window.open("https://codepen.io/i_amsuperfly/pen/MWrEjar", '_self');
        // window.alert(
        //   "leave type: " +
        //     leaveType +
        //     " from date: " +
        //     fromDate +
        //     " to date: " +
        //     toDate +
        //     " reason: " +
        //     reason +
        //     " cv: " +
        //     cv
        // );
        saveLeaveApplication(cno, fullName, phno, address, Limit, maxLimit, bankName,chequeNo,fileDoc,proffs);
        form.reset();
    
}

function showError(input, message) {
    const formControl = input.parentElement;
    const errorMessage = formControl.querySelector("small");
    errorMessage.innerText = message;
    formControl.className = "form-control text error";
}

function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = "form-control text";
}

function saveLeaveApplication(cno, fullName, phno, address, Limit, maxLimit, bankName,chequeNo,fileDoc,proffs) {
    document.getElementById("myNav").style.display = "block"

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // User logged in already or has just logged in.
            console.log(user.uid);
            // console.log(user.displayName);
            var doc;
            if (fileDoc != null) {
                const ref = firebase.storage().ref('doc');
                // document.getElementById("cv").files[0];
                const name =  cno+"-" + fullName;
                const metadata = {
                    contentType: fileDoc.type
                };

                const task = ref.child(name).put(fileDoc, metadata);
                task
                    .then(snapshot => snapshot.ref.getDownloadURL())
                    .then(url => {

                        console.log(url);
                        doc = url;

                        // var key = firebase.database().ref().child('Customer/' + cno + '/').push().key;
                        var leave = {
                            cno: cno,
                            fullName: fullName,
                            phno: phno,
                            address: address,
                            Limit: Limit,
                            maxLimit: maxLimit,
                            bankName: bankName,
                            chequeNo: chequeNo,
                            docUrl: doc,
                            used: 0,
                            maxLimitEnable: false,
                            proffs: proffs
                        }

                        var updates = {};
                        updates["Customers/" + cno ] = leave;
                        firebase.database().ref().update(updates).then(
                            document.getElementById("myNav").style.display = "none",
                            window.alert("Successfully submitted"));
                        // sendMail(user.displayName, leaveType, fromDate, toDate, reason, leaveDocUrl, approvalFacultyName, approvalFacultyMAilId)

                    });
            }

        } else {
            // User not logged in or has just logged out.
            document.getElementById("myNav").style.display = "none"
            window.alert("logged out");
        }
    });

}
