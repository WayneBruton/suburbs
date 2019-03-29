$(function () {
    let charityUploadedImage;
    let charityImage;

    $.get('/getAreas').done((response) => {
        $('#areas').empty();
        response.forEach(el => {
            let option = `<option value="${el.id}">${el.area_description}</option>`
            $(option).appendTo('#areas')
        });
    })
    let charityID = $('#charityID').val()
    let url = `/retrieveCharity/${charityID}`
    $.get(url).done((response) => {
        charityImage = `${response[0].charity_image}`
        $('#charityImage').prop('src', charityImage)
        $('#businessName').val(response[0].businessName)
        $('#npo_number').val(response[0].npo_number)
        $('#first_name').val(response[0].first_name)
        $('#last_name').val(response[0].last_name)
        $('#mob_no').val(response[0].mob_no)
        $('#email').val(response[0].email)
        $('#website').val(response[0].website)
        $('#facebook').val(response[0].facebook)
        $('#areas').val(response[0].areas)
        $('#profile_description').val(response[0].profile_description)
        $('#bankName').val(response[0].bankName)
        $('#accountNumber').val(response[0].accountNumber)
        $('#branchName').val(response[0].branchName)
        $('#branchCode').val(response[0].branchCode)
        if (response[0].isActive == 1) {
            $('#isActive').attr('checked', true)
        } else {
            $('#isActive').attr('checked', false)
        }
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
            charityUploadedImage = `/${response}`;
            $('#charityImage').prop('src', charityUploadedImage).css('display', 'block')
        })
    });


    $('#charityImage').change(function (e) {
        e.preventDefault();
    });

    $('#editCharityBtn').click((e) => {
        e.preventDefault()
        let id = charityID
        let url = `/editCharity`

        // let charityImg = $('#charityImage').prop('src');
        let newCharityImg = charityUploadedImage
        let businessName = $('#businessName').val()
        let npo_number = $('#npo_number').val()
        let first_name = $('#first_name').val()
        let last_name = $('#last_name').val()
        let mob_no = $('#mob_no').val()
        let email = $('#email').val()
        let website = $('#website').val()
        let facebook = $('#facebook').val()
        let areaSelect = $('#areas').val()
        let businessDescription = $('#profile_description').val()
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
            id: id,
            originalCharityImage: charityImage,
            newCharityImg: newCharityImg,
            businessName: businessName,
            npo_number: npo_number,
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

        $.ajax({
            url: url,
            type: 'POST',
            data: JSON.stringify(data),
            success: (data) => {
            },
            contentType: 'application/json',
            dataType: 'json'

        }).done(function (response) {
        })
    })


});