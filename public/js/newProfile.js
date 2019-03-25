$(function () {
    let clientID = $('#profileID').val();
    let url = '/viewNewProfile/' + clientID;
    getProfile();


    jQuery.nl2br = function(varTest){
        return varTest.replace(/(\r\n|\n\r|\r|\n)/g, "<br>");
    };

    jQuery.br2nl = function(varTest){
        return varTest.replace(/<br>/g, "\r");
    };

    function htmlEntities(str) {
        return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }


    // $('#saveChangesButton').attr('disabled', true)


    function getProfile(clientID) {
        $.get(url)
            .done((result) => {
                let profileDescription = result[0].profile_description;
                // profileDescription = htmlEntities(profileDescription)
                profileDescription = $.br2nl(profileDescription)
                // profileDescription = $.nl2br(profileDescription)
                let profileImageWidth = '';
                if (window.screen.width < 800) {
                    profileImageWidth = '100%'
                } else {
                    profileImageWidth = '30%' 
                }
                console.log(result);
                console.log(result[0].profile_image)
                $('#businessName').val(result[0].businessName)
                $('#profileDelails').text(`Profile Preview - ${result[0].businessName}`)
                $('#profileImage').attr('src', result[0].profile_image).css('width', `${profileImageWidth}`)
                $('#mob_no').val(result[0].mob_no)
                $('#email').val(result[0].email)
                $('#website').val(result[0].website)
                $('#facebook').val(result[0].facebook)
                $('#instagram').val(result[0].instagram)
                $('#linkedin').val(result[0].linkedin)
                $('#profile_description').val(profileDescription)
                $('#business_image1').attr('src', result[0].business_image1).css('width', `${profileImageWidth}`)
                $('#business_image2').attr('src', result[0].business_image2).css('width', `${profileImageWidth}`)
                $('#business_image3').attr('src', result[0].business_image3).css('width', `${profileImageWidth}`)
                // let imagesURL = `/editprofileImages/${result[0].id}/${result[0].businessName}`
                let imagesURL = `/editprofileImages`
                $('#updateImages').attr('href', imagesURL)
                console.log(imagesURL)
            })
    }
    let originalData; 
    let updatedData;

    let focusAreas = '#businessName, #mob_no, #email, #website, #facebook, #instagram, #linkedin, #profile_description';

    $(focusAreas).focus(function (e) {
        if ($('#saveChangesButton').attr('disabled')) {
            e.preventDefault();
            originalData = $(this).val();
            console.log(originalData);
        }

    });
    $(focusAreas).blur(function (e) {
        if ($('#saveChangesButton').attr('disabled')) {
            e.preventDefault();
            updatedData = $(this).val();
            console.log(updatedData);
            // saveChangesButton    
            if (originalData !== updatedData) {
                $('#saveChangesButton').attr('disabled', false).css('background-color', 'red')
            }
        }
    });

    $('#saveChangesButton').click((e) => {
        e.preventDefault();
        let id = clientID;
        let businessName = $('#businessName').val()
        let mob_no = $('#mob_no').val()
        let email = $('#email').val()
        let website = $('#website').val()
        let facebook = $('#facebook').val()
        let instagram = $('#instagram').val()
        let linkedin = $('#linkedin').val()
        let profile_description = $('#profile_description').val()
        let data = {
            id: id,
            businessName: businessName,
            mob_no: mob_no,
            email: email,
            website: website,
            facebook: facebook,
            instagram: instagram,
            linkedin: linkedin,
            profile_description: profile_description
        }
        // let data = {id: 'Wayne'}
        data = JSON.stringify(data)
        // console.log(data)
        $.ajax({
                url: `/updateProfile`,
                type: 'post',
                data: data,
                contentType: 'application/json; charset=utf-8',
                cache: false,
                processData: true
            }).done(() => {
                $('#success').css('display', 'block')
                $('#saveChangesButton').attr('disabled', true).css('background-color', 'white')
                setTimeout(() => {
                    $('#success').css('display', 'none')
                }, 1200)
            })
            .catch((e) => {
                $('#failure').css('display', 'block')
                $('#saveChangesButton').attr('disabled', true).css('background-color', 'white')
                setTimeout(() => {
                    $('#failure').css('display', 'none')
                }, 1200)
            })
    })

    // localStorage.setItem(key, value);
    // localStorage.getItem(key);
    // localStorage.removeItem("lastname");

    // http://localhost:3000/previewProfile/212


}); 