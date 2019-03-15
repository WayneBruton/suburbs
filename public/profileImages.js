// alert('This is a test!!!');

// console.log(profileInfo)
$(function () {

    let clientID = $('#clientID').val()
    console.log(clientID)

    let busName = $('#a_busName').text()
    console.log(busName)

    // let profileImageName;

    $('#a_saveProfileImg').click((e)=>{
        e.preventDefault;
        let imgName = `${clientID}profileImage`
        console.log(imgName);
        let post_url = '/saveProfileImg/' + clientID;
        console.log(post_url)
        $.get(post_url).done((response)=>{
            console.log(response);
            $('#a_profileImageform').css('display','none').fadeOut(750);
            setTimeout(()=>{
                $('#b_profileImageform').css('display', 'flex').fadeIn(750);
            }, 250)
        })
    })
    

    $('#a_imageCrop').draggable({
        containment: "parent"
    }).resizable({
        containment: "parent",
        minWidth: 85,
        minHeight: 85,
        aspectRatio: true
    }).bind({
        resizestop: function (event, ui) {
            a_cropImageNow();
        }
    });

    $('#a_imageCrop').mouseup(function () {
        a_changePositionImageCropper();
        a_cropImageNow();
    });

    


    function a_cropImageNow() {
        var imageURL = $('#a_profileImage').attr('src');
        imageURL = imageURL.split('/');
        imageURL = imageURL[imageURL.length - 1];
        let pos = $('#a_imageCrop').position();
        // console.log('This is the Pos', pos);
        // console.log(imageURL);
        let imagename = $('#a_profileImageId').val();
        console.log(imagename)
        let x = pos.left;
        let y = pos.top;
        let w = $('#a_imageCrop').width();
        let h = $('#a_imageCrop').height();
        let pw = $('#a_profileImage').width();
        let ph = $('#a_profileImage').height();
        let a_profileImageName = `${clientID}ProfilePic`;
        // console.log('profileImage width now:', pw)
        // console.log('profileImage height now:', ph)
        var url = '/crop/' + imageURL + '/' + x + '/' + y + '/' + w + '/' + h + '/' + pw + '/' + ph + '/' + a_profileImageName ;
        $.ajax({
            url: url,
            type: "get", //send it through get method
            success: function (response) {
                //Do Something
                console.log('This is my response', response.data);
                a_profileImageName = response.data;
            },
            error: function (xhr) {
                //Do Something to handle error
                console.log(error);
            }
        });
    }

   
    
    $("#my_form").submit(function (event) {
        event.preventDefault(); //prevent default action 
        var post_url = $(this).attr("action"); //get form action url
        var request_method = $(this).attr("method"); //get form GET/POST method
        var form_data = new FormData(this); //Creates new FormData object
        $('#a_mainImageArea2').empty();
        $('footer').css('display', 'none');
        $.ajax({
            url: post_url,
            type: request_method,
            data: form_data,
            contentType: false,
            cache: false,
            processData: false
        }).done(function (response) { //
            console.log('response from uploadFile',response)
            $('#a_saveProfileImg').css('display', 'block')
            $('#a_mainImageArea2').empty();
            let img = `<img id="a_profileImage" src="${response}" alt="">`
            $(img).appendTo('#a_mainImageArea2');
            console.log('Image Source is::::::',$('#a_profileImage').attr('src'))
            console.log('Image Source is::::::',$('#a_profileImage').attr('src'))
            setTimeout(function () {
                $('#a_mainImageArea').css('display', 'block');
                $('#a_imageCrop').css('display', 'block');
                let p = $('#a_profileImage').position();
                let w = $('#a_profileImage').width();
                let h = $('#a_profileImage').height();
                $('#a_mainImageArea').css('width', w).css('height', h);
                if ($('#a_imageCrop').height() > $('#a_profileImage').height()) {
                    let newHeight = $('#a_profileImage').height() * .9;
                    $('#a_imageCrop').css('width', newHeight).css('height', newHeight);
                }
                if ($('#a_imageCrop').width() > $('#a_profileImage').width()) {
                    let newHeight = $('#a_profileImage').width() * .9;
                    $('#a_imageCrop').css('width', newHeight).css('height', newHeight);
                }
                // $('#acceptProfileBtn').css('width', w).css('display', 'block');
                a_changePositionImageCropper();
                a_cropImageNow();

                // $('footer').css('display', 'block');
            }, 500)

        })
    });
  
    
    $('#a_uploadFile').click(function (e) {
        $('#a_useImage').css('display', 'block');
    })
   
    function a_changePositionImageCropper() {
        let a = $('#a_imageCrop').position();
        let h = $('#a_imageCrop').height();
        let w = $('#a_imageCrop').width();
        let mh = $('#a_mainImageArea').height();
        let mw = $('#a_mainImageArea').width();
        if (a.top < 0) {
            $('#a_imageCrop').css('top', 0);
        }
        if (a.left < 0) {
            $('#a_imageCrop').css('left', 0);
        }
        if (a.left > mw - w) {
            let newLeft = mw - w;
            $('#a_imageCrop').css('left', newLeft);
        }
        if (a.top > mh - h) {
            let newTop = mh - h;
            $('#a_imageCrop').css('top', newTop);
        }
        if (w > mw) {
            $('#a_imageCrop').css('left', 0);
            $('#a_imageCrop').css('width', mw);
        }
        if (h > mh) {
            $('#a_imageCrop').css('top', 0);
            $('#a_imageCrop').css('height', mh);
        }
        if (h > w) {
            $('#a_imageCrop').css('width', w);
        }
        if (w > h) {
            $('#a_imageCrop').css('width', h);
        }
    }


//  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++   
    

    $('#b_saveProfileImg').click((e)=>{
        e.preventDefault;
        let imgName = `${clientID}profileImage`
        console.log(imgName);
        let post_url = '/b_saveProfileImg/' + clientID;
        console.log(post_url)
        $.get(post_url).done((response)=>{
            console.log(response);
            $('#b_profileImageform').css('display','none').fadeOut(750);
            setTimeout(()=>{
                $('#c_profileImageform').css('display', 'flex').fadeIn(750);
            }, 250)
        })
    })
    
    
    $('#b_imageCrop').draggable({
        containment: "parent"
    }).resizable({
        containment: "parent",
        minWidth: 85,
        minHeight: 85,
        aspectRatio: true
    }).bind({
        resizestop: function (event, ui) {
            b_cropImageNow();
        }
    });
    
    $('#b_imageCrop').mouseup(function () {
        b_changePositionImageCropper();
        b_cropImageNow();
    });
    
    
    
    
    function b_cropImageNow() {
        var imageURL = $('#b_profileImage').attr('src');
        imageURL = imageURL.split('/');
        imageURL = imageURL[imageURL.length - 1];
        let pos = $('#b_imageCrop').position();
        // console.log('This is the Pos', pos);
        // console.log(imageURL);
        let imagename = $('#b_profileImageId').val();
        console.log(imagename)
        let x = pos.left;
        let y = pos.top;
        let w = $('#b_imageCrop').width();
        let h = $('#b_imageCrop').height();
        let pw = $('#b_profileImage').width();
        let ph = $('#b_profileImage').height();
        let b_profileImageName = `${clientID}Business1Pic`;
        // console.log('profileImage width now:', pw)
        // console.log('profileImage height now:', ph)
        var url = '/cropB/' + imageURL + '/' + x + '/' + y + '/' + w + '/' + h + '/' + pw + '/' + ph + '/' + b_profileImageName ;
        $.ajax({
            url: url,
            type: "get", //send it through get method
            success: function (response) {
                //Do Something
                console.log('This is my response', response.data);
                b_profileImageName = response.data;
            },
            error: function (xhr) {
                //Do Something to handle error
                console.log(error);
            }
        });
    }
    
    
    
    
    $("#b_my_form").submit(function (event) {
        event.preventDefault(); //prevent default action 
        var post_url = $(this).attr("action"); //get form action url
        var request_method = $(this).attr("method"); //get form GET/POST method
        var form_data = new FormData(this); //Creates new FormData object
        $('#b_mainImageArea2').empty();
        $('footer').css('display', 'none');
        $.ajax({
            url: post_url,
            type: request_method,
            data: form_data,
            contentType: false,
            cache: false,
            processData: false
        }).done(function (response) { //
            $('#b_mainImageArea2').empty();
            $('#b_saveProfileImg').css('display', 'block')

            let img = `<img id="b_profileImage" src="${response}" alt="">`
            $(img).appendTo('#b_mainImageArea2');
            setTimeout(function () {
                $('#b_mainImageArea').css('display', 'block');
                $('#b_imageCrop').css('display', 'block');
                let p = $('#b_profileImage').position();
                let w = $('#b_profileImage').width();
                let h = $('#b_profileImage').height();
                $('#b_mainImageArea').css('width', w).css('height', h);
                if ($('#b_imageCrop').height() > $('#b_profileImage').height()) {
                    let newHeight = $('#b_profileImage').height() * .9;
                    $('#b_imageCrop').css('width', newHeight).css('height', newHeight);
                }
                if ($('#b_imageCrop').width() > $('#b_profileImage').width()) {
                    let newHeight = $('#b_profileImage').width() * .9;
                    $('#b_imageCrop').css('width', newHeight).css('height', newHeight);
                }
                // $('#acceptProfileBtn').css('width', w).css('display', 'block');
                b_changePositionImageCropper();
                b_cropImageNow();
    
                // $('footer').css('display', 'block');
            }, 500)
    
        })
    });
    
    
    $('#b_uploadFile').click(function (e) {
        $('#b_useImage').css('display', 'block');
    })
    
    function b_changePositionImageCropper() {
        let a = $('#b_imageCrop').position();
        let h = $('#b_imageCrop').height();
        let w = $('#b_imageCrop').width();
        let mh = $('#b_mainImageArea').height();
        let mw = $('#b_mainImageArea').width();
        if (a.top < 0) {
            $('#b_imageCrop').css('top', 0);
        }
        if (a.left < 0) {
            $('#b_imageCrop').css('left', 0);
        }
        if (a.left > mw - w) {
            let newLeft = mw - w;
            $('#b_imageCrop').css('left', newLeft);
        }
        if (a.top > mh - h) {
            let newTop = mh - h;
            $('#b_imageCrop').css('top', newTop);
        }
        if (w > mw) {
            $('#b_imageCrop').css('left', 0);
            $('#b_imageCrop').css('width', mw);
        }
        if (h > mh) {
            $('#b_imageCrop').css('top', 0);
            $('#b_imageCrop').css('height', mh);
        }
        if (h > w) {
            $('#b_imageCrop').css('width', w);
        }
        if (w > h) {
            $('#b_imageCrop').css('width', h);
        }
    }


//  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++   
    

$('#c_saveProfileImg').click((e)=>{
    e.preventDefault;
    let imgName = `${clientID}profileImage`
    console.log(imgName);
    let post_url = '/c_saveProfileImg/' + clientID;
    console.log(post_url)
    $.get(post_url).done((response)=>{
        console.log(response);
        $('#c_profileImageform').css('display','none').fadeOut(750);
        setTimeout(()=>{
            $('#d_profileImageform').css('display', 'flex').fadeIn(750);
        }, 250)
    })
})


$('#c_imageCrop').draggable({
    containment: "parent"
}).resizable({
    containment: "parent",
    minWidth: 85,
    minHeight: 85,
    aspectRatio: true
}).bind({
    resizestop: function (event, ui) {
        c_cropImageNow();
    }
});

$('#c_imageCrop').mouseup(function () {
    c_changePositionImageCropper();
    c_cropImageNow();
});




function c_cropImageNow() {
    var imageURL = $('#c_profileImage').attr('src');
    imageURL = imageURL.split('/');
    imageURL = imageURL[imageURL.length - 1];
    let pos = $('#c_imageCrop').position();
    // console.log('This is the Pos', pos);
    // console.log(imageURL);
    let imagename = $('#c_profileImageId').val();
    console.log(imagename)
    let x = pos.left;
    let y = pos.top;
    let w = $('#c_imageCrop').width();
    let h = $('#c_imageCrop').height();
    let pw = $('#c_profileImage').width();
    let ph = $('#c_profileImage').height();
    let c_profileImageName = `${clientID}Business2Pic`;
    // console.log('profileImage width now:', pw)
    // console.log('profileImage height now:', ph)
    var url = '/cropC/' + imageURL + '/' + x + '/' + y + '/' + w + '/' + h + '/' + pw + '/' + ph + '/' + c_profileImageName ;
    $.ajax({
        url: url,
        type: "get", //send it through get method
        success: function (response) {
            //Do Something
            console.log('This is my response', response.data);
            c_profileImageName = response.data;
        },
        error: function (xhr) {
            //Do Something to handle error
            console.log(error);
        }
    });
}




$("#c_my_form").submit(function (event) {
    event.preventDefault(); //prevent default action 
    var post_url = $(this).attr("action"); //get form action url
    var request_method = $(this).attr("method"); //get form GET/POST method
    var form_data = new FormData(this); //Creates new FormData object
    $('#c_mainImageArea2').empty();
    $('footer').css('display', 'none');
    $.ajax({
        url: post_url,
        type: request_method,
        data: form_data,
        contentType: false,
        cache: false,
        processData: false
    }).done(function (response) { //
        $('#c_mainImageArea2').empty();
        $('#c_saveProfileImg').css('display', 'block')

        let img = `<img id="c_profileImage" src="${response}" alt="">`
        $(img).appendTo('#c_mainImageArea2');
        setTimeout(function () {
            $('#c_mainImageArea').css('display', 'block');
            $('#c_imageCrop').css('display', 'block');
            let p = $('#c_profileImage').position();
            let w = $('#c_profileImage').width();
            let h = $('#c_profileImage').height();
            $('#c_mainImageArea').css('width', w).css('height', h);
            if ($('#c_imageCrop').height() > $('#c_profileImage').height()) {
                let newHeight = $('#c_profileImage').height() * .9;
                $('#c_imageCrop').css('width', newHeight).css('height', newHeight);
            }
            if ($('#c_imageCrop').width() > $('#c_profileImage').width()) {
                let newHeight = $('#c_profileImage').width() * .9;
                $('#c_imageCrop').css('width', newHeight).css('height', newHeight);
            }
            // $('#acceptProfileBtn').css('width', w).css('display', 'block');
            c_changePositionImageCropper();
            c_cropImageNow();

            // $('footer').css('display', 'block');
        }, 500)

    })
});


$('#c_uploadFile').click(function (e) {
    $('#c_useImage').css('display', 'block');
})

function c_changePositionImageCropper() {
    let a = $('#c_imageCrop').position();
    let h = $('#c_imageCrop').height();
    let w = $('#c_imageCrop').width();
    let mh = $('#c_mainImageArea').height();
    let mw = $('#c_mainImageArea').width();
    if (a.top < 0) {
        $('#c_imageCrop').css('top', 0);
    }
    if (a.left < 0) {
        $('#c_imageCrop').css('left', 0);
    }
    if (a.left > mw - w) {
        let newLeft = mw - w;
        $('#c_imageCrop').css('left', newLeft);
    }
    if (a.top > mh - h) {
        let newTop = mh - h;
        $('#c_imageCrop').css('top', newTop);
    }
    if (w > mw) {
        $('#c_imageCrop').css('left', 0);
        $('#c_imageCrop').css('width', mw);
    }
    if (h > mh) {
        $('#c_imageCrop').css('top', 0);
        $('#c_imageCrop').css('height', mh);
    }
    if (h > w) {
        $('#c_imageCrop').css('width', w);
    }
    if (w > h) {
        $('#c_imageCrop').css('width', h);
    }
}


//  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++   
    
function previewProfile() {

}


$('#d_saveProfileImg').click((e)=>{
    e.preventDefault;
    let imgName = `${clientID}profileImage`
    console.log(imgName);
    let post_url = '/d_saveProfileImg/' + clientID;
    console.log(post_url)
    $.get(post_url)
    .done((response)=>{
        console.log(response);
        $('#d_profileImageform').css('display','none').fadeOut(750);
        setTimeout(()=>{
            let url = '/previewProfile/' + clientID;
            $('#lertAnchor').attr('href', url)
            console.log('this is the new HREF',$('#lertAncher').attr('href') )
            $('#lert').css('display', 'flex');
        },250)
        
    })
})




$('#d_imageCrop').draggable({
    containment: "parent"
}).resizable({
    containment: "parent",
    minWidth: 85,
    minHeight: 85,
    aspectRatio: true
}).bind({
    resizestop: function (event, ui) {
        d_cropImageNow();
    }
});

$('#d_imageCrop').mouseup(function () {
    d_changePositionImageCropper();
    d_cropImageNow();
});




function d_cropImageNow() {
    var imageURL = $('#d_profileImage').attr('src');
    imageURL = imageURL.split('/');
    imageURL = imageURL[imageURL.length - 1];
    let pos = $('#d_imageCrop').position();
    // console.log('This is the Pos', pos);
    // console.log(imageURL);
    let imagename = $('#d_profileImageId').val();
    console.log(imagename)
    let x = pos.left;
    let y = pos.top;
    let w = $('#d_imageCrop').width();
    let h = $('#d_imageCrop').height();
    let pw = $('#d_profileImage').width();
    let ph = $('#d_profileImage').height();
    let d_profileImageName = `${clientID}Business3Pic`;
    // console.log('profileImage width now:', pw)
    // console.log('profileImage height now:', ph)
    var url = '/cropD/' + imageURL + '/' + x + '/' + y + '/' + w + '/' + h + '/' + pw + '/' + ph + '/' + d_profileImageName ;
    $.ajax({
        url: url,
        type: "get", //send it through get method
        success: function (response) {
            //Do Something
            console.log('This is my response', response.data);
            d_profileImageName = response.data;
        },
        error: function (xhr) {
            //Do Something to handle error
            console.log(error);
        }
    });
}




$("#d_my_form").submit(function (event) {
    event.preventDefault(); //prevent default action 
    var post_url = $(this).attr("action"); //get form action url
    var request_method = $(this).attr("method"); //get form GET/POST method
    var form_data = new FormData(this); //Creates new FormData object
    $('#d_mainImageArea2').empty();
    $('footer').css('display', 'none');
    $.ajax({
        url: post_url,
        type: request_method,
        data: form_data,
        contentType: false,
        cache: false,
        processData: false
    }).done(function (response) { //
        $('#d_mainImageArea2').empty();
        $('#d_saveProfileImg').css('display', 'block')

        let img = `<img id="d_profileImage" src="${response}" alt="">`
        $(img).appendTo('#d_mainImageArea2');
        setTimeout(function () {
            $('#d_mainImageArea').css('display', 'block');
            $('#d_imageCrop').css('display', 'block');
            let p = $('#d_profileImage').position();
            let w = $('#d_profileImage').width();
            let h = $('#d_profileImage').height();
            $('#d_mainImageArea').css('width', w).css('height', h);
            if ($('#d_imageCrop').height() > $('#d_profileImage').height()) {
                let newHeight = $('#d_profileImage').height() * .9;
                $('#d_imageCrop').css('width', newHeight).css('height', newHeight);
            }
            if ($('#d_imageCrop').width() > $('#d_profileImage').width()) {
                let newHeight = $('#d_profileImage').width() * .9;
                $('#d_imageCrop').css('width', newHeight).css('height', newHeight);
            }
            // $('#acceptProfileBtn').css('width', w).css('display', 'block');
            d_changePositionImageCropper();
            d_cropImageNow();

            // $('footer').css('display', 'block');
        }, 500)

    })
});


$('#d_uploadFile').click(function (e) {
    $('#d_useImage').css('display', 'block');
})

function d_changePositionImageCropper() {
    let a = $('#d_imageCrop').position();
    let h = $('#d_imageCrop').height();
    let w = $('#d_imageCrop').width();
    let mh = $('#d_mainImageArea').height();
    let mw = $('#d_mainImageArea').width();
    if (a.top < 0) {
        $('#d_imageCrop').css('top', 0);
    }
    if (a.left < 0) {
        $('#d_imageCrop').css('left', 0);
    }
    if (a.left > mw - w) {
        let newLeft = mw - w;
        $('#d_imageCrop').css('left', newLeft);
    }
    if (a.top > mh - h) {
        let newTop = mh - h;
        $('#d_imageCrop').css('top', newTop);
    }
    if (w > mw) {
        $('#d_imageCrop').css('left', 0);
        $('#d_imageCrop').css('width', mw);
    }
    if (h > mh) {
        $('#d_imageCrop').css('top', 0);
        $('#d_imageCrop').css('height', mh);
    }
    if (h > w) {
        $('#d_imageCrop').css('width', w);
    }
    if (w > h) {
        $('#d_imageCrop').css('width', h);
    }
}


  

});

