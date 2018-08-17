$(document).ready(function() {
  $('#edit-form').submit(function(e) {
    e.preventDefault();
    let teamUrl = $(this).attr('href');
    let teamData = $(this).serialize();

    $.ajax({
      method: "PUT",
      url: teamUrl,
      data: teamData
    }).done( data => {
      console.log('Updated', data);
      window.location = '/teams';
    }).fail( err => {
      console.log("Err:", err);
    })
  });

  $('#delete-btn').click(function(e) {
    e.preventDefault();
    let teamUrl = $(this).attr('href');
    console.log(teamUrl);

    $.ajax({
      method: "DELETE",
      url: teamUrl
    }).done( data => {
      console.log('Bingo!', data);
      window.location = '/teams';
    }).fail( err => {
      console.log("Err:", err)
    });
  });
});
