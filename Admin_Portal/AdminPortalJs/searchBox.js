let words = []
let cno1 = []
let names = []
let objArr = []
var selectId;

var limit = document.getElementById("limit");
var redeemed = document.getElementById("Redeemed");
var balance = document.getElementById("balance");
var FullName = document.getElementById("FullName");
var CutomerNo = document.getElementById("CutomerNo");
var phoneNo = document.getElementById("phoneNo");
var Address = document.getElementById("Address");
var check = document.getElementById("check");


document.querySelector(".debitMoneyClass").style = "display: none"
document.querySelector(".craditMoneyClass").style = "display: none"

document.getElementById("myNav").style.display = "block";




function getDetails() {
    firebase
        .database()
        .ref('Customers')
        .once('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();

                var cno = childData.cno;
                var fullName = childData.fullName;
                var phno = childData.phno;
                var address = childData.address;
                var maxLimit = childData.maxLimit;
                var Limit = childData.Limit;
                // var doc = childData.docUrl;
                // var chequeNo = childData.chequeNo;
                // var bankName = childData.bankName;
                var maxLimitEnable = childData.maxLimitEnable;
                // var proffs = childData.proffs;
                var used = childData.used;
                cno1.push(cno);
                names.push(fullName);
                var obj = {};
                obj.cno = cno;
                obj.Name = fullName;
                obj.maxLimitEnable = maxLimitEnable;
                obj.maxLimit = maxLimit;
                obj.Limit = Limit;
                obj.phno = phno
                obj.address = address;
                obj.used = used;
                objArr.push(obj);


            });
        }).then(document.getElementById("myNav").style.display = "none");
}

const formEl = document.querySelector('#search')
const dropEl = document.getElementById('drop')

var selectSearch = document.getElementById("selectSearch");
words = cno1;

const formHandler = (e) => {
    var selectSearch1 = document.getElementById("selectSearch").value;
    if (selectSearch1 == "cno") {
        const userInput = e.target.value.toLowerCase()

        if (userInput.length === 0) {
            dropEl.style.height = 0
            return dropEl.innerHTML = ''
        }

        const filteredWords = words.filter(word => word.toLowerCase().includes(userInput)).sort().splice(0, 5)

        dropEl.innerHTML = ''
        filteredWords.forEach(item => {
            const listEl = document.createElement('li')
            listEl.textContent = item
            listEl.setAttribute('id', item);
            dropEl.appendChild(listEl)
        })

        var list = document.getElementById("drop");
        for (i = 0; i <= list.childElementCount - 1; i++) {
            list.children[i].addEventListener("click", Alert);
        }

        if (dropEl.children[0] === undefined) {
            return dropEl.style.height = 0
        }

        let totalChildrenHeight = dropEl.children[0].offsetHeight * filteredWords.length
        dropEl.style.height = totalChildrenHeight + 'px'
    } else {
        const userInput = e.target.value.toLowerCase()

        if (userInput.length === 0) {
            dropEl.style.height = 0
            return dropEl.innerHTML = ''
        }

        const filteredWords = names.filter(word => word.toLowerCase().includes(userInput)).sort().splice(0, 5)

        dropEl.innerHTML = ''
        filteredWords.forEach(item => {
            const listEl = document.createElement('li')
            listEl.textContent = item
            listEl.setAttribute('id', item);
            dropEl.appendChild(listEl)
        })

        var list = document.getElementById("drop");
        for (i = 0; i <= list.childElementCount - 1; i++) {
            list.children[i].addEventListener("click", Alert);
        }

        if (dropEl.children[0] === undefined) {
            return dropEl.style.height = 0
        }

        let totalChildrenHeight = dropEl.children[0].offsetHeight * filteredWords.length
        dropEl.style.height = totalChildrenHeight + 'px'
    }

}


formEl.addEventListener('input', formHandler)


function Alert() {
    selectId = document.getElementById("selectSearch").value;
    console.log(this.id);
    document.getElementById('search').value = this.id;
    var filteredResult;
    if (selectId == "cno") {
        filteredResult = objArr.find((x) => x.cno === this.id)
    }
    else {
        filteredResult = objArr.find((y) => y.Name === this.id)
    }
    dropEl.style.height = 0 + 'px'

    limit.innerHTML = filteredResult.Limit;
    redeemed.innerHTML = filteredResult.used;
    balance.innerHTML = filteredResult.Limit - filteredResult.used;
    FullName.innerHTML = filteredResult.Name;
    CutomerNo.innerHTML = filteredResult.cno;
    phoneNo.innerHTML = filteredResult.phno;
    Address.innerHTML = filteredResult.address;

    if (filteredResult.Limit <= filteredResult.used) {
        console.log("he has exceeded his limit")
        document.querySelector(".alertBox").style = "display: block"
        balance.innerHTML = filteredResult.maxLimit - filteredResult.used;
        limit.innerHTML = filteredResult.maxLimit;
        document.getElementById("labelLimit").innerHTML = "<b>Max Limit</b>";
        // document.querySelector(".container").style = "display: none"
    }
    if(filteredResult.Limit >= filteredResult.used){
        document.querySelector(".alertBox").style = "display: none"
        document.getElementById("labelLimit").innerHTML = "<b>Limit</b>";
    }

    if (filteredResult.maxLimitEnable === true) {
        check.style.background = "green";
    }
    if (filteredResult.maxLimitEnable === false) {
        check.style.background = "red";
    }
    document.getElementById("check").addEventListener('click', () => {
        checkMaxLimit(filteredResult.cno);

    });

}


function checkMaxLimit(custNo) {
    const targetIndex = objArr.findIndex(f => custNo === CutomerNo.innerHTML);
    const targetObject = objArr.find(f => custNo === CutomerNo.innerHTML);
    firebase.database().ref().child("Customers").child(custNo).once("value", function (snapshot) {
        var obj = {};
            obj.cno = snapshot.val().cno;
            obj.Name = snapshot.val().Name;
            obj.maxLimitEnable = snapshot.val().maxLimitEnable;
            obj.maxLimit = snapshot.val().maxLimit;
            obj.Limit = snapshot.val().Limit;
            obj.phno = snapshot.val().phno
            obj.address = snapshot.val().address;
            obj.used = snapshot.val().used;
            objArr.push(obj);
            objArr[targetIndex] = obj
        if (snapshot.val().maxLimitEnable === true) {
            check.style.background = "green";
            console.log("inside database");
            
        }
        else {
            check.style.background = "red";
        }
    });
}

function craditMoney() {
    document.getElementById("craditMoney").style = "border-bottom: 3px solid red;"
    document.getElementById("debitMoney").style = ""
    document.querySelector(".debitMoneyClass").style = "display: none"
    document.querySelector(".craditMoneyClass").style = "display: block"

}

function debitMoney() {
    document.getElementById("debitMoney").style = "border-bottom: 3px solid red;"
    document.getElementById("craditMoney").style = ""
    document.querySelector(".craditMoneyClass").style = "display: none"
    document.querySelector(".debitMoneyClass").style = "display: block"
}

document.getElementById("submit").addEventListener('click', () => {
    document.getElementById("myNav").style.display = "block"
    var updateDatetime = new Date().today() + "_" + new Date().timeNow();
    var vehicleNumber = document.getElementById("vehicleNo").value.toUpperCase();
    var billNumber = document.getElementById("billNo").value
    var amount = document.getElementById("amount").value
    var object = objArr.find(o => o.cno === CutomerNo.innerHTML)

    var presentAmount = parseInt(object.used) + parseInt(amount);
    if (presentAmount <= object.Limit) {

        var key = firebase.database().ref().child('transaction/' + CutomerNo.innerHTML + '/').push().key;
        var tran = {
            key: key,
            dateTime: updateDatetime,
            vehicleNo: vehicleNumber,
            billNo: billNumber,
            status: "debited",
            amountd: amount
        }
        var updates = {};
        updates["transaction/" + CutomerNo.innerHTML + "/" + key] = tran;

        firebase.database().ref().update(updates)

        firebase.database().ref().child("Customers").child(CutomerNo.innerHTML).update({
            used: presentAmount
        }).then(
            document.getElementById("myNav").style.display = "none",
            window.alert("Successfully updated\n total limit: " + object.Limit + "\n Used Amount: " + presentAmount + "\n balance amount" + (object.Limit - presentAmount))
            , window.location.reload());

    }
    // ----------------------------------------------LIMIT_EXCEEDES--------------------------------------------------------------
    else if (presentAmount > object.Limit && object.maxLimitEnable == false) {
        document.getElementById("myNav").style.display = "none"
        window.alert("The amount has exceeded his limit. Please repay the balance as soon as possible.")
    }
    // -------------------------------------------------MAX_LIMIT------------------------------------------------------------------
    else if (presentAmount > object.Limit && object.maxLimitEnable == true && presentAmount <= object.maxLimit) {
        var key = firebase.database().ref().child('transaction/' + CutomerNo.innerHTML + '/').push().key;
        var tran = {
            key: key,
            dateTime: updateDatetime,
            vehicleNo: vehicleNumber,
            billNo: billNumber,
            status: "debited",
            amountd: amount,
            maxLimitUsed: true
        }

        var updates = {};
        updates["transaction/" + CutomerNo.innerHTML + "/" + key] = tran;

        firebase.database().ref().update(updates)
        console.log("inside max limit db")
        firebase.database().ref().child("Customers").child(CutomerNo.innerHTML).update({
            used: presentAmount
        }).then(
            document.getElementById("myNav").style.display = "none",
            window.alert("Successfully updated\n total limit: " + object.Limit + "\n Used Amount: " + presentAmount + "\n balance amount: " + (object.maxLimit - presentAmount))
            , window.location.reload());
    }
    else if(presentAmount > object.Limit && object.maxLimitEnable == true && presentAmount > object.maxLimit) {
        document.getElementById("myNav").style.display = "none"
        window.alert("The amount has exceeded his max limit. Please repay the balance as soon as possible.")
    }

});

document.getElementById("submitDebit").addEventListener('click', () => {

    var updateDatetime = new Date().today() + "_" + new Date().timeNow();
    var refundRs = document.getElementById("refundRs").value
    console.log(refundRs)
    var object = objArr.find(o => o.cno === CutomerNo.innerHTML)
    console.log(object.used)
    var presentAmountUsed = parseInt(object.used) - parseInt(refundRs);
    var key = firebase.database().ref().child('transaction/' + CutomerNo.innerHTML + '/').push().key;
    var tran = {
        key: key,
        dateTime: updateDatetime,
        status: "cradited",
        amounRecieved: refundRs
    }


    var updates = {};
    updates["transaction/" + CutomerNo.innerHTML + "/" + key] = tran;

    firebase.database().ref().update(updates)
    firebase.database().ref().child("Customers").child(CutomerNo.innerHTML).update({
        used: presentAmountUsed
    }).then(
        document.getElementById("myNav").style.display = "none",
        window.alert("Successfully updated\n total limit: " + object.Limit + "\n Used Amount: " + presentAmountUsed + "\n balance amount: " + (object.Limit - presentAmountUsed))
        , window.location.reload());
});


// For todays date;
Date.prototype.today = function () {
    return ((this.getDate() < 10) ? "0" : "") + this.getDate() + "/" + (((this.getMonth() + 1) < 10) ? "0" : "") + (this.getMonth() + 1) + "/" + this.getFullYear();
}

// For the time now
Date.prototype.timeNow = function () {
    return ((this.getHours() < 10) ? "0" : "") + this.getHours() + ":" + ((this.getMinutes() < 10) ? "0" : "") + this.getMinutes() + ":" + ((this.getSeconds() < 10) ? "0" : "") + this.getSeconds();
}


// document.getElementById("addRow").addEventListener(cl)