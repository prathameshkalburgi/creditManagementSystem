document.getElementById("myNav").style.display = "block";
var totalCustomer = document.getElementById("totalCustomer");
var creditAllotated = document.getElementById("creditAllotated");
var creditUtilised = document.getElementById("creditUtilised");
var Balance = document.getElementById("Balance");

var totalC = 0;
var creditA = 0;
var creditU = 0;
var bal = 0;

firebase
    .database()
    .ref('Customers')
    .once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            creditA += parseInt(childData.maxLimit);
            totalC = totalC + 1;
            creditU += parseInt(childData.used)
            console.log(childData.used);
            creditAllotated.innerHTML = creditA;
            totalCustomer.innerHTML = totalC;
            creditUtilised.innerHTML = creditU;
            Balance.innerHTML = creditA - creditU;

        });
    }).then(() => {
        if (parseInt(totalCustomer.innerHTML) > 0) {
            document.getElementById("myNav").style.display = "none"
        }
    }
);

