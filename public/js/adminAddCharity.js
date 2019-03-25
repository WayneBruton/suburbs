$(function () {
    let charityUploadedImage;
    $.get('/getareas').done((response) => {
        console.log(response)
        $('#areaSelect').empty()
        // $('#areaSelect').append('<option value="0">Choose an area</option>')
        response.forEach(element => {
            let option = `<option value="${element.id}">${element.area_description}</option>`
            $(option).appendTo('#areaSelect')
        });
    })

    $('#loadCharityImg').submit(function (e) {
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
            console.log('Image File::::', response)
            charityUploadedImage = response;
            $('#charityImage').prop('src', response).css('display', 'block')
        })
    });

    $('#createCharityBtn').click((e) => {
        e.preventDefault()
        let url = `/createCharity`
        // let charityImg = $('#charityImage').prop('src');
        let charityImg = charityUploadedImage
        let businessName = $('#businessName').val()
        let first_name = $('#first_name').val()
        let last_name = $('#last_name').val()
        let mob_no = $('#mob_no').val()
        let email = $('#email').val()
        let website = $('#website').val()
        let facebook = $('#facebook').val()
        let areaSelect = $('#areaSelect').val()
        let businessDescription = $('#businessDescription').val()
        let bankName = $('#bankName').val()
        let branchName = $('#branchName').val()
        let accountNumber = $('#accountNumber').val()
        let branchCode = $('#branchCode').val()
        let isActive;
        if ($('#isActive').prop('checked')) {
            isActive = true
        } else {
            isActive = false
        }

        let data = {
            charityImg: charityImg,
            businessName: businessName,
            first_name: first_name,
            last_name: last_name,
            mob_no: mob_no,
            email: email,
            website: website,
            facebook: facebook,
            areaSelect: areaSelect,
            businessDescription: businessDescription,
            bankName: bankName,
            branchName: branchName,
            accountNumber: accountNumber,
            branchCode: branchCode,
            isActive: isActive
        }
        console.log(isActive)

        console.log(data)
        $.ajax({
            url: url,
            type: 'POST',
            data: JSON.stringify(data),
            success: (data)=>{
                console.log('success')
            },
            contentType: 'application/json',
            dataType:'json'
            // cache: false,
            // processData: false
        }).done(function (response) { 
            console.log(response)   
        })
    })

    // ================= Validation =======================================


    $('#businessName').blur((e) => {
        e.preventDefault()
        if ($('#businessName').val() == '') {
            $('#businessName').attr('placeholder', $('#businessName').attr('placeholder') + ' - REQUIRED')
            $('#businessName').focus()
        }
    })
    $('#first_name').blur((e) => {
        e.preventDefault()
        if ($('#first_name').val() == '') {
            $('#first_name').attr('placeholder', $('#first_name').attr('placeholder') + ' - REQUIRED')
            $('#first_name').focus()
        }
    })
    $('#last_name').blur((e) => {
        e.preventDefault()
        if ($('#last_name').val() == '') {
            $('#last_name').attr('placeholder', $('#last_name').attr('placeholder') + ' - REQUIRED')
            $('#last_name').focus()
        }
    })
    $('#mob_no').blur((e) => {
        e.preventDefault()
        if ($('#mob_no').val() == '') {
            $('#mob_no').attr('placeholder', $('#mob_no').attr('placeholder') + ' - REQUIRED')
            $('#mob_no').focus()
        }
    })
    $('#email').blur((e) => {
        e.preventDefault()
        if ($('#email').val() == '') {
            $('#email').attr('placeholder', $('#email').attr('placeholder') + ' - REQUIRED')
            $('#email').focus()
        }
    })
    $('#website').blur((e) => {
        e.preventDefault()
        if ($('#website').val() == '') {
            $('#website').attr('placeholder', $('#website').attr('placeholder') + ' - REQUIRED')
            $('#website').focus()
        }
    })

    $('#businessDescription').keyup(function (e) {
        let textLength = $('#businessDescription').val().length;
        if (textLength < 160) {
            let newTextLength = 160 - textLength;
            let newText = `${newTextLength} remaining for minimum requirement`
            $('#lettercount').text(newText)
        } else {
            $('#lettercount').text('')

        }
    });
    $('#businessDescription').blur((e) => {
        e.preventDefault()
        let textLength = $('#businessDescription').val().length;
        if ($(textLength < 160) || $(textLength > 3000)) {
            $('#businessDescription').focus()
            $('#lettercountWarning').text('Incorrect Number of characters').css('color', 'red')
            setTimeout(() => {
                $('#lettercountWarning').text('')
            }, 2000)
        }
    })
})