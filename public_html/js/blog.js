$(function () {
   var APPLICATION_ID = "20A6F9A5-CC8A-794B-FF49-615D1FBBCF00",
       SECRET_KEY = "41F1FEBE-827C-7DD6-FFED-8906A8EC1100",
       VERSION = "v1";
       
   Backendless.initApp(APPLICATION_ID, SECRET_KEY, VERSION);
   
   var postsCollection = Backendless.Persistence.of(Posts).find();
   
   console.log(postsCollection);
  
  var wrapper = {
      posts: postsCollection.data
  };
  
Handlebars.registerHelper('format', function (time){
   return moment (time).format("dddd, MMMM Do YYYY"); 
});

var blogScript = $("#blogs-template").html();
var blogTemplate = Handlebars.compile(blogScript);
var blogHTML = blogTemplate(wrapper);

$('.main-container').html(blogHTML);

});

function Posts(args) {
    args = args || {};
    this.title= args.title || "";
    this.content = args.content || ""; 
    this.authorEmail = args.authorEmail || "";
}

/* Set the width of the side navigation to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

$(document).on('click', '.deleteB',function (event){
  Materialize.toast('Deleted', 1500);
  Backendless.Persistence.of(Posts).remove(event.target.attributes.data.nodeValue);
  //setTimeout(location.reload(),100000000000);
});

$(document).on('click', '.checkmark',function (event){
  Materialize.toast('Competed', 1500);
});