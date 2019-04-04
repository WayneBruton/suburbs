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
    let url = `/getCharityProfile/${areaCode}`
    $.get(url).done((response) => {
        console.log(response)
        if (response.length) {
            $('#ifCharity').css('display', 'block')

            $('#profileDelails').text(response[0].businessName)
            $('#businessName').val(response[0].businessName)
            $('#mob_no').val(response[0].mob_no)
            $('#email').text(response[0].email)
            $('#website').text(response[0].website)
            $('#email').attr('href', `mailTo:${response[0].email}`)
            $('#profileImage').attr('src', `${response[0].charity_image}`)
            // $('#charity_image1').attr('src', `${response[0].charity_image1}`)
            // $('#charity_image2').attr('src', `${response[0].charity_image2}`)
            // $('#charity_image3').attr('src', `${response[0].charity_image3}`)
            $('#website').attr('href', `${response[0].website}`)
            $('#facebook').attr('href', `mailTo:${response[0].facebook}`)
            $('#facebook').text(response[0].facebook)
            $('#npo_number').val(response[0].npo_number)
            let profileDescription = response[0].profile_description;
            profileDescription = $.nl2br(profileDescription)
            $('.text-infoProfile').empty()
            let textInfo = `<label for="profile_description" id=""><strong>Profile Description:</strong></label>
        <p name="" id="profile_description">${profileDescription}</p>`
            $(textInfo).appendTo('.text-infoProfile')
            // console.log(textInfo)
            // let images;
            $('.media-object-business').empty()
            if (response[0].charity_image1 != null && response[0].charity_image1 != "") {
                let images = `<img id="charity_image1" src="${response[0].charity_image1}" alt="charity Image 1" class="figure-business">`
                $(images).appendTo('.media-object-business')
            }
            if (response[0].charity_image2 != null && response[0].charity_image2 != "") {
                let images = `<img id="charity_image2" src="${response[0].charity_image2}" alt="charity Image 2" class="figure-business">`
                $(images).appendTo('.media-object-business')
            }
            if (response[0].charity_image3 != null && response[0].charity_image3 != "") {
                let images = `<img id="charity_image3" src="${response[0].charity_image3}" alt="charity Image 3" class="figure-business">`
                $(images).appendTo('.media-object-business')
            }
            
  
            // let images = `<img id="charity_image1" src="" alt="charity Image 1" class="figure-business">
            //                 <img id="charity_image2" src="" alt="charity Image 2" class="figure-business">
            //                 <img id="charity_image3" src="" alt="charity Image 3" class="figure-business">`
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