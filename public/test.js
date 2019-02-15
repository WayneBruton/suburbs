// alert('Testing');

var detail;
var files;
var files2;

$(function(){
    $('#test').click(function (e) { 
        detail = this.baseURI;
        // files = this.files;
        // var detail2 = this.files;
        console.log(detail);
        // console.log(detail2);
    });
    $('#latestTest').click(function (e) { 
        e.preventDefault();
        var detail2 = detail
        files = $('#test')
        files2 = files[0].value;
        files = files[0].files[0].name;
        // files = files[0].files[0];
        // detail = detail.baseURI;
        // var detail2 = this.files;
        // console.log(detail2);
        console.log(files);
        // console.log(files2);
        // $('#testImg').prop('src', files);
        // console.log(detail2);
        var url = '/upload/' + files;
        // var url = '/register';
        console.log(url);
        fetch(url)
        .then((data)=> {

        $('#testImg').prop('src', data.url);

            console.log(data.url);
        })
        // $(this).css('background-color', 'red');
    //    $.get(url, function(data){
    //        console.log(data);
    //    });
    //    $.get(url, function (data) {
    //     // $('#clientData').empty();
    //     // $.each(data, function () {
    //     //     var input = this.id + ' - ' + this.first_name + ' : ' + this.last_name;
    //     //     $('<div class="client-li"><li id="client-li">' + input + '</li><button class="edit-btn" id="' + this.id + '">Edit / View</button></div>').appendTo('#clientData');
    //     // });
    //     console.log(data);
  
       
    });


})