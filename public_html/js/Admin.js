$(function () {
   var APPLICATION_ID = "20A6F9A5-CC8A-794B-FF49-615D1FBBCF00",
       SECRET_KEY = "41F1FEBE-827C-7DD6-FFED-8906A8EC1100",
       VERSION = "v1";
       
       Backendless.initApp(APPLICATION_ID, SECRET_KEY, VERSION);
  if(Backendless.UserService.isValidLogin()){
      userLoggedIn(Backendless.LocalCache.get("current-user-id"));
  }else{
    var loginScript = $("#login-template").html();
    var loginTemplate = Handlebars.compile(loginScript);
    $('.main-container').html(loginTemplate);
  }
  $(document).on('submit', '.form-signin', function(event){
      event.preventDefault();
      
      var data = $(this).serializeArray(),
      email = data[0].value,
      password = data[1].value;
      
      Backendless.UserService.login(email, password, true, new Backendless.Async(userLoggedIn, gotError));
  });
  
  $(document).on('click', '.add-task', function(){
      var addTaskScript = $("#add-task-template").html();
  var addTaskTemplate = Handlebars.compile(addTaskScript);
  
  $('.main-container').html(addTaskTemplate);
  tinymce.init({ selector:'textarea'});
  });
  $(document).on('submit', '.form-add-task', function (event){
      event.preventDefault();
      
      var data = $(this).serializeArray(),
          title = data[0].value,
          content = data[1].value;
          
        if(title === "") {
             Materialize.toast('Add Task and/or Notes', 1500);
         }
         else {
         var dataStore = Backendless.Persistence.of(Posts);
         
         var postObject = new Posts({
             title: title,
             content: content,
             authorEmail: Backendless.UserService.getCurrentUser().email
         });
          
          var dataStore = Backendless.Persistence.of(Posts);
          
          var postObject = new Posts({
             title: title,
             content: content,
             authorEmail: Backendless.UserService.getCurrentUser().email
          });
          
          dataStore.save(postObject);
          
          this.title.value = "";
          this.content.value = "";
      }
  });
  
  $(document).on('click', '.logout', function(){
      Backendless.UserService.logout(new Backendless.Async(userLoggedOut, gotError));
      
       // Materialize.toast(message, displayLength, className, completeCallback);
  Materialize.toast('Refresh Page', 4000) // 4000 is the duration of the toast
      var loginScript = $("#login-template").html();
      var loginTemplate = Handlebars.compile(loginScript);
      $('main-container').html(loginTemplate);
  });
});

function Posts(args){
  args = args || {};
  this.title = args.title || "";
  this.content = args.content || "";
  this.authorEmail = args.authorEmail || "";
}   

function userLoggedIn(user) {
  console.log("user successfully logged in");
  var userData;
  if (typeof user == "string"){
      userData = Backendless.Data.of(Backendless.User).findById(user);
  }else{
      userData = user;
  }
  var  welcomeScript = $('#welcome-template').html();
  var welcomeTemplate = Handlebars.compile(welcomeScript);
  var welcomeHTML = welcomeTemplate(userData);
  
  $('.main-container').html(welcomeHTML);
}
function userLoggedOut(){
    console.log("successfully logged out");
}

function gotError(error) {
     // Materialize.toast(message, displayLength, className, completeCallback);
  Materialize.toast('Incorrect Email or Password', 4000) // 4000 is the duration of the toast
  console.log("Error message - " + error.message);
  console.log("Error code - " + error.code);
}

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}