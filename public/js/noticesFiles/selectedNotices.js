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

    let areaCode = $('#areaCode').val()
    let areaDescription;
    let areaURL = `/getNoticeArea/${areaCode}`
    $.get(areaURL).done((response) => {
        areaDescription = response[0].area_description
        $('#pageHeader').text(`${areaDescription}`)
    })
    let url = `/getNotices/${areaCode}`
    setTimeout(() => {
        $.get(url).done((response) => {
            console.log(response);
            if (!response.length) {
                $('#noNotices').css('display', 'block')
                $('#someNotices').css('display', 'none')
            } else {
                $('#noNotices').css('display', 'none')
                $('#someNotices').css('display', 'block')
                $('#someNotices').empty()
                $('#someNotices').append(`<ul id="noticeUL" style="margin-top: 40px;">`)
                response.forEach((el) => {
                    let createdDate = moment(`${el.created_at}`).format('DD-MM-YYYY')
                    let noticeText = el.notice_text
                    let img = el.notice_image
                    console.log(img.length)
                    noticeText = $.nl2br(noticeText)
                    let content;
                    if (img.length != 0) {
                        content = `
                        <li style="border: 1px solid black; margin-top: 10px; padding: 10px 10px;display:flex; justify-content: space-between; border-radius: 7px;"><div style="display: flex;"><img src="${img}" alt="test" style="width: 20px; height: 20px; margin-right: 10px;"><a href="#${el.heading}" style="display:flex; justify-content: space-between;">${el.heading}</a></div>${createdDate}</li>
                    ` 
                    } else {
                        content = `
                         <li style="border: 1px solid black; margin-top: 10px; padding: 10px 10px;display:flex; justify-content: space-between;border-radius: 7px;"><div style="display: flex;"><a href="#${el.heading}" style="display:flex; justify-content: space-between;">${el.heading}</a></div>${createdDate}</li>
                    `
                    }
                    $(content).appendTo('#someNotices')
                })
                $('#someNotices').append(`</ul><br><hr><br>`)
                $('#someNotices').append(`<h2>Notices</h2>`)

                response.forEach((el) => {
                    let createdDate = moment(`${el.created_at}`).format('DD-MM-YYYY')
                    let noticeText = el.notice_text
                    let img = el.notice_image
                    console.log(img.length)
                    noticeText = $.nl2br(noticeText)
                    let content;
                    if (img.length != 0) {
                    content = `<div id="${el.heading}"> <br><br><br>    
                                    <div id="header" style="display: flex;justify-content: space-between">
                                    <h2 id="title" class="text-center" style="align-self: auto; margin-top: 25px;">${el.heading}</h2>
                                    <h2 id="dateCreated"class="text-center" style="align-self: auto; margin-top: 25px;">${createdDate}</h2>
                                    <a href="#returnTo">Return</a>
                                    </div>
                                    </div>
                                    <div class="about-content" style="border: 1px solid black; padding: 3px 3px; border-radius: 7px">
                                        <div style=""><img src="${img}" alt="test" style="width: 50%; margin-right: 10px;"></div>
                                        <p id="actualNotice">${noticeText}</p>
                                    </div><br>
                                    <hr><br>`
                    } else {
                        content = `<div id="${el.heading}"><br><br><br>     
                                    <div id="header" style="display: flex;justify-content: space-between">
                                    <h2 id="title" class="text-center" style="align-self: auto; margin-top: 25px;">${el.heading}</h2>
                                    <h2 id="dateCreated"class="text-center" style="align-self: auto; margin-top: 25px;">${createdDate}</h2>
                                    <a href="#returnTo">Return</a>
                                    </div>
                                    </div>
                                    <div class="about-content" style="border: 1px solid black; padding: 3px 3px; border-radius: 7px">
                                        <p id="actualNotice">${noticeText}</p>
                                    </div><br>
                                    <hr><br>`

                    }
                    $(content).appendTo('#someNotices')


                })

            }

        })
    }, 50)

})
