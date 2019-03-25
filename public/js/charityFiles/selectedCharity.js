$(function () {
    jQuery.nl2br = function (varTest) {
        return varTest.replace(/(\r\n|\n\r|\r|\n)/g, "<br>");
    };

    jQuery.br2nl = function (varTest) {
        return varTest.replace(/<br>/g, "\r");
    };

    function htmlEntities(str) {
        return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }


    let areaCode = $('#areaCode').val();
    // console.log(areaCode)
    let url = `/getCharityProfile/${areaCode}`
    console.log(url)
    $.get(url).done((response) => {
        if (response.length) {
            console.log(response)
            $('#profileDelails').text(response[0].businessName)
            $('#businessName').val(response[0].businessName)
            $('#mob_no').val(response[0].mob_no)
            $('#email').text(response[0].email)
            $('#website').text(response[0].website)
            $('#email').attr('href', `mailTo:${response[0].email}`)
            $('#profileImage').attr('src', `${response[0].charity_image}`)
            $('#website').attr('href', `${response[0].website}`)
            $('#facebook').attr('href', `mailTo:${response[0].facebook}`)
            $('#facebook').text(response[0].facebook)
            let profileDescription = response[0].profile_description;
            profileDescription = $.nl2br(profileDescription)
            $('.text-infoProfile').empty()
            let textInfo = `<label for="profile_description" id=""><strong>Profile Description:</strong></label>
        <p name="" id="profile_description">${profileDescription}</p>`
            $(textInfo).appendTo('.text-infoProfile')
            $('#accountNumber').val(response[0].accountNumber)
            $('#bankName').val(response[0].bankName)
            $('#branchCode').val(response[0].branchCode)
            $('#branchName').val(response[0].branchName)
        } else {
            $('#profileDelails').text('Charity Coming Soon!')
            $('#ifCharity').css('display', 'none')
        }
    })
})