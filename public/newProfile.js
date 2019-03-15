$(function () {
    let clientID = $('#profileID').val();

    let url = '/viewNewProfile/' + clientID;
    $.get(url)
        .done((result) => {
            console.log(result);
            console.log(result[0].profile_image)
            $('#businessName').val(result[0].businessName)
            $('#profileDelails').text(`Profile Preview - ${result[0].profile_heading}`)
            $('#profileImage').attr('src', result[0].profile_image).css('width', '30%')
            $('#mob_no').val(result[0].mob_no)
            $('#email').val(result[0].email)
            $('#website').val(result[0].website)
            $('#facebook').val(result[0].facebook)
            $('#instagram').val(result[0].instagram)
            $('#linkedin').val(result[0].linkedin)
            $('#profile_description').val(result[0].profile_description)
            $('#business_image1').attr('src', result[0].business_image1).css('width', '30%')
            $('#business_image2').attr('src', result[0].business_image2).css('width', '30%')
            $('#business_image3').attr('src', result[0].business_image3).css('width', '30%')
        })

        // http://localhost:3000/previewProfile/212


});