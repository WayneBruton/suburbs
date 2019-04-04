$(function () {
    let areas;
    let areaArray = []
    let originalImage;
    let noticeID = $('#noticeID').val()
    let url = `/getNoticeToEdit/${noticeID}`
    $.get(url).done((response) => {
        console.log(response)
        areas = (response[0].areas).split('[')
        areas = areas[1].split(']')
        areas = areas[0].split(',')
        areas = areas.map((area) => {
            area = parseInt(area)
            return area
        })
        $('#heading').val(response[0].heading)
        $('#noticeDescription').val(response[0].notice_text)
        originalImage = response[0].notice_image;
        $('#noticeImage').attr('src', response[0].notice_image)
        let isActive = response[0].isActive
        if (isActive) {
            $('#isActive').prop('checked', 'checked')
        }
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
            console.log('this is the response',response)
            noticeUploadedImage = response;
            $('#noticeImage').prop('src', `/${response}`).css('display', 'block')
        })
    });



    $.get('/getAreas').done((response) => {
        $('#areas').empty()
        response.forEach((el) => {
            let checkBoxes = `<div style="display: flex; flex-direction: column">
                                 <div style="display: flex; justify-content: space-between">
                                <input type="checkbox" name="" id="${el.id}">
                                <label for="${el.id}">${el.area_description}</label>
                                </div>
                                </div>`
            $(checkBoxes).appendTo('#areas')
        })
        setTimeout(() => {
            allocateAreas()
        }, 50)

    })

    $('#saveNoticeBtn').click((e) => {
        e.preventDefault();
        let url = '/updateNotice'
        let id = noticeID
        let heading = $('#heading').val()
        addAreas()
        let areas = areaArray
        let notice_text = $('#noticeDescription').val()
        let notice_image = $('#noticeImage').attr('src')
        if (notice_image == undefined || notice_image == '/' || notice_image == originalImage){
            notice_image = undefined
        }
        
        console.log(notice_image)
        let isActive;
        if ($('#isActive').prop('checked')) {
            isActive = true
        } else {
            isActive = false
        }
        let data = {
            id,
            heading,
            areas,
            notice_text,
            isActive,
            notice_image,
            originalImage
        }

        $.ajax({
            url: url,
            type: 'POST',
            data: JSON.stringify(data),
            success: (data) => {

            },
            contentType: 'application/json',
            dataType: 'json'

        }).done(function (response) {
            console.log(response)
        })
    })

    function addAreas() {
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

    function allocateAreas() {
        if ($('#1').attr('id') == 1) {
            for (i = 0; i < areas.length; i++) {
                if (areas[i] == $('#1').attr('id')) {
                    $('#1').attr('checked', 'checked')
                    break;
                }
            }
        }
        if ($('#2').attr('id') == 2) {
            for (i = 0; i < areas.length; i++) {
                if (areas[i] == $('#2').attr('id')) {
                    $('#2').attr('checked', 'checked')
                    break;
                }
            }
        }
        if ($('#3').attr('id') == 3) {
            for (i = 0; i < areas.length; i++) {
                if (areas[i] == $('#3').attr('id')) {
                    $('#3').attr('checked', 'checked')
                    break;
                }
            }
        }
        if ($('#4').attr('id') == 4) {
            for (i = 0; i < areas.length; i++) {
                if (areas[i] == $('#4').attr('id')) {
                    $('#4').attr('checked', 'checked')
                    break;
                }
            }
        }
        if ($('#5').attr('id') == 5) {
            for (i = 0; i < areas.length; i++) {
                if (areas[i] == $('#5').attr('id')) {
                    $('#5').attr('checked', 'checked')
                    break;
                }
            }
        }
        if ($('#6').attr('id') == 6) {
            for (i = 0; i < areas.length; i++) {
                if (areas[i] == $('#6').attr('id')) {
                    $('#6').attr('checked', 'checked')
                    break;
                }
            }
        }
        if ($('#7').attr('id') == 7) {
            for (i = 0; i < areas.length; i++) {
                if (areas[i] == $('#7').attr('id')) {
                    $('#7').attr('checked', 'checked')
                    break;
                }
            }
        }
        if ($('#8').attr('id') == 8) {
            for (i = 0; i < areas.length; i++) {
                if (areas[i] == $('#8').attr('id')) {
                    $('#8').attr('checked', 'checked')
                    break;
                }
            }
        }
    }
})