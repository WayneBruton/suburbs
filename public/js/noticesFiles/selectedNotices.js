$(function(){

    jQuery.nl2br = function(varTest){
        return varTest.replace(/(\r\n|\n\r|\r|\n)/g, "<br>");
    };

    jQuery.br2nl = function(varTest){ 
        return varTest.replace(/<br>/g, "\r");
    };

    function htmlEntities(str) {
        return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    let areaCode = $('#areaCode').val()
    let areaDescription;
    let areaURL = `/getNoticeArea/${areaCode}`
    $.get(areaURL).done((response)=>{
        areaDescription = response[0].area_description
        $('#pageHeader').text(`${areaDescription}`)
    })
    let url = `/getNotices/${areaCode}`
    setTimeout(()=>{
        $.get(url).done((response)=>{
            if (!response.length) {
                $('#noNotices').css('display', 'block')
                $('#someNotices').css('display', 'none')
            } else {
                $('#noNotices').css('display', 'none')
                $('#someNotices').css('display', 'block')
                $('#someNotices').empty()
                response.forEach((el)=>{
                    let createdDate = moment(`${el.created_at}`).format('DD-MM-YYYY')
                    let noticeText = el.notice_text
            noticeText = $.nl2br(noticeText)
                    
                    let content = `<div >     
                                    <div id="header" style="display: flex; justify-content: space-between">
                                    <h2 id="title" class="text-center" style="align-self: auto; margin-top: 25px;">${el.heading}</h2>
                                    <h2 id="dateCreated"class="text-center" style="align-self: auto; margin-top: 25px;">${createdDate}</h2>
                                    </div>
                                    </div>
                                    <div class="about-content" style="border: 1px solid black; padding: 3px 3px; border-radius: 7px">
                                        <p id="actualNotice">${noticeText}</p>
                                    </div><br>
                                    <hr><br>`
                $(content).appendTo('#someNotices')
                })
            }
        })
    },50)
    
})