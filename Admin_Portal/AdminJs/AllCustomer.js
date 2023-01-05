document.getElementById("myNav").style.display = "block";
firebase
  .database()
  .ref('Customers')
  .once('value', function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      var childKey = childSnapshot.key;
      var childData = childSnapshot.val();

      //   task_array.push(Object.values(childData));
      // console.log('data for '+ snapshot.key);

      // console.log('name '+ childSnapshot.val().LeaveType);
      var cno = childData.cno;
      // console.log("leave type "+LeaveType);
      var fullName = childData.fullName;
      var phno = childData.phno;
      var address = childData.address;
      var maxLimt = childData.maxLimit;
      var Limit = childData.Limit;
      var doc = childData.docUrl;
      var chequeNo = childData.chequeNo;
      var bankName = childData.bankName;
      var maxLimitEnable = childData.maxLimitEnable;
      var proffs = childData.proffs;
      //   console.log(childSnapshot.key);
      addBox(cno, fullName, phno, address, maxLimt, Limit, doc, chequeNo, bankName, maxLimitEnable, proffs);
    });

  });
function addBox(cno, fullName, phno, address, maxLimt, Limit, doc, chequeNo, bankName, maxLimitEnable, proffs) {
  var code;
  //   <i class="fas fa-id-card"></i>
  var newCard = document.getElementById("newCard");
  code =
    "<div class='col-lg-6 col-xl-4 col-md-6 col-sm-12' id='" + cno + "'>" +
    "<div class='card card-default p-4'>" +
    "<a href='javascript:0' class='media text-secondary' data-toggle='modal' data-target='#modal-contact' onclick='getDetails(this)'>" +
    " <div class='media-bod'>" +
    "<h5 class='mt-0 mb-2 text-dark' id='FullName'>" + fullName + "</h5>" +
    "<ul class='list-unstyled text-smoke'>" +
    "<li class='d-flex'>" +
    " <i class='mdi mdi-map mr-1'></i>" +
    "<p id='" + cno + "'>" + cno + "</p>" +
    " </li>" +
    "<li class='d-flex'>" +
    // "<i class='mdi mdi-email mr-1'></i>" +
    // "<span>exmaple@email.com</span>" +
    " </li>" +
    "<li class='d-flex'>" +
    "<i class='mdi mdi-card mr-1'></i>" +
    " <span id='" + phno + "'>" + phno + "</span>" +
    " </li>" +
    "</ul>" +
    "</div>" +
    "</a>" +
    "</div>" +
    "</div>";
  newCard.innerHTML += code;
  document.getElementById("myNav").style.display = "none"
}

function getDetails(el) {
  document.getElementById("myNav").style.display = "block"
  var name = el.children[0].getElementsByTagName("h5")[0].innerHTML;
  console.log(name);
  document.getElementById("sFullName").innerHTML = name;
  firebase
    .database()
    .ref('Customers')
    .once('value', function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        if (name === childData.fullName) {

          document.getElementById("cno").innerHTML = "Customer No : " + childData.cno;
          document.getElementById("address").innerHTML = "Address : " + childData.address;
          document.getElementById("maxLimit").innerHTML = "Max Limit : " + childData.maxLimit;
          document.getElementById("Limit").innerHTML = childData.Limit;
          document.getElementById("bankName").innerHTML = "Bank Name : " + childData.bankName;
          document.getElementById("chequeNo").innerHTML = "Cheque No : " + childData.chequeNo;
          document.getElementById("phno").innerHTML = childData.phno;

          document.getElementById("used").innerHTML = childData.used;
          document.getElementById("balance").innerHTML = childData.Limit - childData.used;
          // -----------------------------------------------------------------------------------
          document.getElementById("cno1").value = childData.cno;
          document.getElementById("fullName1").value = childData.fullName;
          document.getElementById("address1").value = childData.address;
          document.getElementById("maxLimit1").value = childData.maxLimit;
          document.getElementById("Limit1").value = childData.Limit;
          document.getElementById("bankName1").value = childData.bankName;
          document.getElementById("chequeNo1").value = childData.chequeNo;
          document.getElementById("phno1").value = childData.phno;
          document.getElementById("doc").value = childData.docUrl;

          console.log(childData.maxLimitEnable);
          if (childData.maxLimitEnable == false) {
            document.getElementById("enableMaxLimit").innerHTML = "Enable Max Limit";

            //   var leave = {
            //     maxLimitEnable: true,
            // }
            //   var updates = {};
            //   updates["Customers/" + cno ] = leave;
            //   firebase.database().ref().update(updates).then(window.alert("Successfully submitted"));
          }
          else {
            document.getElementById("enableMaxLimit").innerHTML = "Disable Max Limit";
          }

          a = document.getElementById("doc");
          a.setAttribute("href", childData.docUrl);

          document.getElementById("enableMaxLimit").value = childData.cno;
          // enableButtonIdSet.setAttribute("value",cno)
        }
      });
    }).then(() => {
      document.getElementById("myNav").style.display = "none"
    })


}

function changeMaxLimit(value, el) {
  console.log(el);
  console.log(value);
  var state = document.getElementById("enableMaxLimit").innerHTML
  if (state == "Disable Max Limit") {

      
      firebase.database().ref("Customers/" + value).update({
        maxLimitEnable: false,
      }).then(
        document.getElementById("enableMaxLimit").innerHTML = "Enable Max Limit"
    );
    
  }
  else {
    firebase.database().ref("Customers/" + value).update({
      maxLimitEnable: true,
    }).then(
      document.getElementById("enableMaxLimit").innerHTML = "Disable Max Limit"
  );
    
  }
}


function update() {
  var cno = document.getElementById("cno1").value;
  console.log(cno);
  var fullName = document.getElementById("fullName1").value;
  var phno = document.getElementById("phno1").value;
  var address = document.getElementById("address1").value;
  var fileDoc = document.getElementById("doc1");
  console.log(fileDoc);
  var Limit = document.getElementById("Limit1").value;
  var maxLimit = document.getElementById("maxLimit1").value;
  var bankName = document.getElementById("bankName1").value;
  var chequeNo = document.getElementById("chequeNo1").value;
  if (fileDoc != null) {
    fileDoc = document.getElementById("doc1").files[0];
    const ref = firebase.storage().ref('doc');
    // document.getElementById("cv").files[0];
    const name = cno + "-" + fullName;
    const metadata = {
      contentType: fileDoc.type
    };


    const task = ref.child(name).put(fileDoc, metadata);
    task
      .then(snapshot => snapshot.ref.getDownloadURL())
      .then(url => {
        firebase.database().ref("Customers/" + cno).update({
          cno: cno,
          fullName: fullName,
          phno: phno,
          address: address,
          Limit: Limit,
          maxLimit: maxLimit,
          bankName: bankName,
          chequeNo: chequeNo,
          docUrl: url
        }).then(
          window.alert("Successfully updated")
        );
      });
  }
  else {
    firebase.database().ref("Customers/" + cno).update({
      cno: cno,
      fullName: fullName,
      phno: phno,
      address: address,
      Limit: Limit,
      maxLimit: maxLimit,
      bankName: bankName,
      chequeNo: chequeNo
    }).then(
      window.alert("Successfully updated")
    );
  }
}
