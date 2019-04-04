$(function(){
    let areaArray = []
    $.get('/getAreas').done((response)=>{
        $('#areas').empty()
        response.forEach((el)=>{
            let checkboxes = `<div style="display: flex; flex-direction: column">
            <div style="display: flex; justify-content: space-between">
            <input type="checkbox" name="" id="${el.id}">
                                <label for="${el.id}">${el.area_description}</label>
                                </div>
                                </div>`
            $(checkboxes).appendTo('#areas')
        })
    })

    $('#loadNoticeImage').submit(function (e) {
        e.preventDefault();
        var post_url = $(this).attr("action"); //get form action url
        var request_method = $(this).attr("method"); //get form GET/POST method
        var form_data = new FormData(this); //Creates new FormData object
        $.ajax({
            url: post_url,
            type: request_method,
            data: form_data,
            contentType: false,
            cache: false,
            processData: false
        }).done(function (response) {
            charityUploadedImage = response;
            $('#noticeImage').prop('src', response).css('display', 'block')
        })
    });


    $('#createNoticeBtn').click((e)=>{
        e.preventDefault();
        let url = '/createNotice'
        let heading = $('#heading').val()
        addAreas()
        let areas = areaArray
        let notice_text = $('#noticeDescription').val()
        let isActive;
        if ($('#isActive').prop('checked')) {
            isActive = true
        } else {
            isActive = false
        }
        let notice_image = $('#noticeImage').attr('src')
        // console.log(noticeImage)
        let data = {
            heading,
            areas,
            notice_text,
            isActive,
            notice_image
        }


        $.ajax({
            url: url,
            type: 'POST',
            data: JSON.stringify(data),
            success: (data)=>{
            },
            contentType: 'application/json',
            dataType:'json'

        }).done(function (response) { 
        })
    })


    function addAreas(){
        areaArray = []
        if ($('#1').prop('checked')) {
            areaArray.push(parseInt($('#1').prop('id')))
        }
        if ($('#2').prop('checked')) {
            areaArray.push(parseInt($('#2').prop('id')))
        }
        if ($('#3').prop('checked')) {
            areaArray.push(parseInt($('#3').prop('id')))
        }
        if ($('#4').prop('checked')) {
            areaArray.push(parseInt($('#4').prop('id')))
        }
        if ($('#5').prop('checked')) {
            areaArray.push(parseInt($('#5').prop('id')))
        }
        if ($('#6').prop('checked')) {
            areaArray.push(parseInt($('#6').prop('id')))
        }
        if ($('#7').prop('checked')) {
            areaArray.push(parseInt($('#7').prop('id')))
        }
        if ($('#8').prop('checked')) {
            areaArray.push(parseInt($('#8').prop('id')))
        }

    }

})