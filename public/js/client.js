$(function(){

   $.get('/pets',appendToList);


$('#form1').on('submit', function(event) {
	event.preventDefault();

	var form = $(this);
	var serverData = form.serialize();

	$.ajax({
		type: 'POST', url: 'http://localhost:3000/cat', data: serverData
	})
	 .error(function() {
	 	$('.failed').fadeIn().delay(3000).fadeOut('slow');	
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

   $.ajax({
      type: 'POST', url: 'http://localhost:3001/dog', data: serverData
   })
    .error(function() {
      $('.failed').fadeIn().delay(3000).fadeOut('slow'); 
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






   function appendToList(pets) {
      //console.log(pets);

            var cats	= pets.results.cat.data;
   			var dogs	= pets.results.dog.data;
            var deleteImg = '<img src="../css/delete.png" width="15px">';
            var updateImg = '<img src="../css/edit.png" width="15px">';

   			//console.log(cats);
   			//console.log(dogs);

   		var list = [];
   		var content, cats, dogs;

   		for(var i in cats) {
   			cat = cats[i];
   			var id = cats[i]['_id'];
   			var age = cats[i]['age'];
   			var name = cats[i]['name'];
   			var type = cats[i]['type'];
   		
   			content = '<a href="#stay">'+updateImg+'</a>  <a href="#stay">'+deleteImg+' </a> '+name;

   			//console.log("id este"+id);
   			//console.log(cat);
			list.push($('<li>', { html: content }));
   		}	


   		for(var i in dogs) {
   			cat = dogs[i];
   			var id = dogs[i]['_id'];
   			var age = dogs[i]['age'];
   			var name = dogs[i]['name'];
   			var type = dogs[i]['type'];
   		
   			content = '<a href="#stay">'+updateImg+'</a>  <a href="#stay">'+deleteImg+' </a> Name: '+name;

   			console.log("id este"+id);
   			//console.log(content);
			list.push($('<li>', { html: content }));
   		}	

   			//console.log(list);

   			$('.block-list').append(list);
   }
});