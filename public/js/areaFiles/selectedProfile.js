$(function() {

    jQuery.nl2br = function(varTest){
        return varTest.replace(/(\r\n|\n\r|\r|\n)/g, "<br>");
    };

    jQuery.br2nl = function(varTest){ 
        return varTest.replace(/<br>/g, "\r");
    };

    function htmlEntities(str) {
        return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }
    let profileID = $('#profileID').val()
    let url = `/getProfileInfo/${profileID}` 
  
    $.get(url).done((response)=>{
        let profileDescription = response[0].profile_description;
        profileDescription = $.nl2br(profileDescription)
        let prof_img = `<img id="profileImage" class="figure" src="${response[0].profile_image}" alt="Profile Image" style="width: 100%">`
        $(prof_img).prependTo('.media-object')

        $('.media-body').empty()
        let media_body = `<div class="media-body-info">
        <label for="businessName" id="">Business Name:</label>
        <input type="text" id="businessName" class="media-body-info-detail" value="${response[0].businessName}" style="border: none;background-color: whitesmoke;" disabled>
    </div>
    <div class="media-body-info">
        <label for=" mob_no" id="">Contact:</label>
        <input type="number" id="mob_no" class="media-body-info-detail" value="${response[0].mob_no}" style="border: none; background-color: whitesmoke;" disabled>
    </div>
    <div class="media-body-info">
        <label for=" email" id="">Email:</label>
        <a href="mailTo:${response[0].email}" id="email" class="media-body-info-detail">${response[0].email}</a>
    </div>
    <div class="media-body-info">
        <label for=" website" id="">website:</label>
        <a href="${response[0].website}" type="text" id="website" class="media-body-info-detail" target="_blank">${response[0].website}</a>
    </div>
    <div class="media-body-info">
        <label for=" facebook" id="">facebook:</label>
        <a href="${response[0].facebook}" id="facebook" class="media-body-info-detail" target="_blank">${response[0].facebook}</a>
    </div>
    <div class="media-body-info">
        <label for=" instagram" id="">instagram:</label>
        <a href="${response[0].instagram}" id="instagram" class="media-body-info-detail" target="_blank">${response[0].instagram}</a>
    </div>
    <div class="media-body-info">
        <label for=" linkedin" id="">linkedin:</label>
        <a href="${response[0].linkedin}" id="linkedin" class="media-body-info-detail" target="_blank">${response[0].linkedin}</a>
    </div>`
    $(media_body).appendTo('.media-body')
    $('.text-infoProfile').empty()
    let description = `<label for="profile_description" id=""><strong>Profile Description:</strong></label>
    <p id="profile_description" readonly style="border: none; background-color: whitesmoke">${profileDescription}</p>`
    $(description).appendTo('.text-infoProfile')
    $('.media-object-business').empty()
    let images = `<img id="business_image1" src="${response[0].business_image1}" alt="Business Image 1" class="figure-business" style="width: 100%">
    <img id="business_image2" src="${response[0].business_image2}" alt="Business Image 2" class="figure-business" style="width: 100%">
    <img id="business_image3" src="${response[0].business_image3}" alt="Business Image 3" class="figure-business" style="width: 100%">`
    $(images).appendTo('.media-object-business')
    })
    
})