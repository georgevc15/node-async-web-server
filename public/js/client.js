$(function(){

   $.get('/pets',appendToList);



$('#form1').on('submit', function(event) {
	event.preventDefault();

	var form = $(this);
	var serverData = form.serialize();
   var currentUrl = window.location;

   //console.log("currentUrl este "+currentUrl);
   //http://localhost:3002/
   
   if(currentUrl == 'http://localhost:3002/') {  var serverLink = 'http://localhost:3000/cat';  } else {  var serverLink = 'https://serene-plateau-90342.herokuapp.com/cat';   }
	
   $.ajax({
		type: 'POST', url: serverLink, data: serverData
	})
	 .error(function() {
	 	//$('.failed').fadeIn().delay(3000).fadeOut('slow');
      location.reload();	
	 })
	 .success(function(serverResponse){
         //appendToList([serverResponse]);
	 		//form.trigger(reset);
         $('.success').show(); 
        
			  setTimeout(function(){ 
				 location.reload();
			  }, 1000);

	 });
});



$('#form2').on('submit', function(event) {
   event.preventDefault();

   var form = $(this);
   var serverData = form.serialize();
   var currentUrl = window.location;
   
   if(currentUrl == 'http://localhost:3002/') {  var serverLink = 'http://localhost:3001/dog';  } else {  var serverLink = 'https://evening-inlet-33905.herokuapp.com/dog';   }

   $.ajax({
      type: 'POST', url: serverLink, data: serverData
   })
    .error(function() {
      //$('.failed').fadeIn().delay(3000).fadeOut('slow'); 
      location.reload();
    })
    .success(function(serverResponse){
         //appendToList([serverResponse]);
         //form.trigger(reset);
         $('.success').show(); 
        
      setTimeout(function(){ 
         location.reload();
      }, 1000);

    });
});



$(document).on('click',".delePet",function(event) {

    
    if(!confirm('Are you sure ?')){
      return false;
    }

    var target = $(event.currentTarget);
    var id = target.data('id');
    var sUrl = target.data('url');


    $.ajax({
      type: 'DELETE',
      crossDomain: true,
      url: sUrl + '/' + id
    }).done(function () {
      target.parents('li').remove();
    });


  });



   function appendToList(pets) {
      //console.log(pets);

            var cats	= pets.results.cat.data;
   			var dogs	= pets.results.dog.data;
            var deleteImg = '<img src="../css/delete.png" width="15px">';
            var updateImg = '<img src="../css/edit.png" width="15px">';
            var currentUrl = window.location;
   			
            if(currentUrl == 'http://localhost:3002/') {  
               var serverLink1 = 'http://localhost:3000/cat'; 
               var serverLink2 = 'http://localhost:3001/dog';  
                  } else {  
               var serverLink1 = 'https://serene-plateau-90342.herokuapp.com/cat'; 
               var serverLink2 = 'https://evening-inlet-33905.herokuapp.com/dog';  
            }



   		var list = [];
   		var content, cats, dogs;

   		for(var i in cats) {
   			cat = cats[i];
   			var id = cats[i]['_id'];
   			var age = cats[i]['age'];
   			var name = cats[i]['name'];
   			var type = cats[i]['type'];
   		
   			content = '<a href="javascript:void(0)">'+updateImg+'</a>  <a href="javascript:void(0)" data-id='+id+' data-url='+serverLink1+' class="delePet">'+deleteImg+' </a> '+name;
			
         list.push($('<li>', { html: content }));
   		
      }	


   		for(var i in dogs) {
   			cat = dogs[i];
   			var id = dogs[i]['_id'];
   			var age = dogs[i]['age'];
   			var name = dogs[i]['name'];
   			var type = dogs[i]['type'];
   		
   			content = '<a href="javascript:void(0)">'+updateImg+'</a>  <a href="javascript:void(0)" data-id='+id+' data-url='+serverLink2+' class="delePet">'+deleteImg+' </a> Name: '+name;

			list.push($('<li>', { html: content }));
   		}	


   			$('.block-list').append(list);
   }
});