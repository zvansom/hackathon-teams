$('.delete-link').on('click', function(e) {
  e.preventDefault();
  var myUrl = $(this).attr('href');
  console.log('DELETE url:', myUrl);
  $.ajax({
    method: 'DELETE',
    url: myUrl
  }).done(function(response) {
    console.log(response);
    // manipulate the DOM with the response
  });
});
