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

    let url = '/getAreas'
    $.get(url).done((response) => {
        $('#areaCharityChosen').empty()
        response.forEach(el => {
            let areaSelect = `<option value="area${el.id}">${el.area_description}</option>`
            $(areaSelect).appendTo('#areaCharityChosen')
        });
    })

    $('#sendMail').click((e) => {
        e.preventDefault();
        let description = $('#description').val()
        description = $.br2nl(description)
        let areaCharityChosen = $('#areaCharityChosen option:selected').text()
        let facebook = $('#facebook').val()
        let website = $('#website').val()
        let email = $('#email').val()
        let contact_number = $('#contact_number').val()
        let contact_person = $('#contact_person').val()
        let charity_name = $('#charity_name').val()

        let data = {
            description,
            areaCharityChosen,
            facebook,
            website,
            email,
            contact_number,
            contact_person,
            charity_name
        }

        data = JSON.stringify(data)
        $.ajax({
            url: `/send-charity-email`,
            type: 'post',
            data: data,
            contentType: 'application/json; charset=utf-8',
            cache: false,
            processData: true
        }).done((response) => {
            if (response == 'Email sent successfully!') {
                $('#successEmail').css('display', 'block')
                $('#description').val('')
                $('#facebook').val('')
                $('#website').val('')
                $('#email').val('')
                $('#contact_number').val('')
                $('#contact_person').val('')
                $('#charity_name').val('')
                setTimeout(() => {
                    $('#successEmail').css('display', 'none')
                }, 1500)
            }
        })
    })
})