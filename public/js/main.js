// Initialize Firebase
firebase.initializeApp(firebaseConfig);

document.getElementById("messagebtn").addEventListener("click", function(event){
  event.preventDefault()
  var db = firebase.firestore();

  var first_name = $('#first_name').val();
  var last_name = $('#last_name').val();
  var email = $('#email').val();
  var subject = $('#subject').val();
  var message = $('#message').val(); 
  var contactMsg = $('#contactMsg'); 

  if(!first_name || !last_name || !email || !subject || !message){
    contactMsg.html("One or more fields are empty");
    return;
  }

  db.collection("messages").add({
    first_name,
    last_name,
    email,
    subject,
    message,
    type: "MESSAGE", 
    createDate: new Date()
  })
  .then(function(docRef) {
    // console.log("Document written with ID: ", docRef.id);
    contactMsg.html("Message sent successfully!");
    $('#first_name').val('');
    $('#last_name').val('');
    $('#email').val('');
    $('#subject').val('');
    $('#message').val(''); 
  })
  .catch(function(error) {
    console.error("Error adding document: ", error);
    contactMsg.html("Error Sending the message: "+error);
  });

});

document.getElementById("subscribeSubmit").addEventListener("click", function(event){
  event.preventDefault()
  var db = firebase.firestore();
  var email = $('#subscribe_email').val();
  var contactMsg = $('#subscribe_msg'); 
  if(!email){ contactMsg.html("One or more fields are empty"); return; }
  db.collection("landing_page_subscriptions").add({ email, createDate: new Date() })
  .then(function(docRef) {
    contactMsg.html("Subscribed successfully!");
    $('#subscribe_email').val('');
    $('#subscriptionModal').modal('hide');
    $('#subscription_toast').toast('show');
  }).catch(function(error) {
    console.error("Error adding document: ", error);
    contactMsg.html("Error Sending the message: "+error);
  });

});