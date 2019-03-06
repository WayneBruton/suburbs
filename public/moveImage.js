$(function () {
    $('#imageCrop').draggable({
        containment: "parent"
    }).resizable({
        containment: "parent",
        minWidth: 85,
        minHeight: 85,
        aspectRatio: true
    }).bind({
        resizestop: function (event, ui) {
            // console.log('Resize Stopped')
            cropImageNow();
        }
    });


// ======================================
// tooltips


    $('#WestCoast').on({
        mouseenter: function () {
            tooltip.show('West Coast', 200)
        },
        mouseleave: function () {
            tooltip.hide();
        }
    });

    $('#WestCoast').on('touchstart', function () {
        $(this).off('mouseenter,mouseleave');
    });

    $('#NorthernSuburbs').on({
        mouseenter: function () {
            tooltip.show('Northern Suburbs', 200)
        },
        mouseleave: function () {
            tooltip.hide();
        }
    });

    $('#NorthernSuburbs').on('touchstart', function () {
        $(this).off('mouseenter,mouseleave');
    });

    $('#HelderBerg').on({
        mouseenter: function () {
            tooltip.show('HelderBerg', 200)
        },
        mouseleave: function () {
            tooltip.hide();
        }
    });

    $('#HelderBerg').on('touchstart', function () {
        $(this).off('mouseenter,mouseleave');
    });

    $('#CapeFlats').on({
        mouseenter: function () {
            tooltip.show('Cape Flats', 200)
        },
        mouseleave: function () {
            tooltip.hide();
        }
    });

    $('#CapeFlats').on('touchstart', function () {
        $(this).off('mouseenter,mouseleave');
    });

    $('#SouthernSuburbs').on({
        mouseenter: function () {
            tooltip.show('Southern Suburbs', 200)
        },
        mouseleave: function () {
            tooltip.hide();
        }
    });

    $('#SouthernSuburbs').on('touchstart', function () {
        $(this).off('mouseenter,mouseleave');
    });

    $('#CityBowl').on({
        mouseenter: function () {
            tooltip.show('City Bowl', 200)
        },
        mouseleave: function () {
            tooltip.hide();
        }
    });

    $('#CityBowl').on('touchstart', function () {
        $(this).off('mouseenter,mouseleave');
    });

    $('#AtlanticSeaboard').on({
        mouseenter: function () {
            tooltip.show('Atlantic Seaboard', 200)
        },
        mouseleave: function () {
            tooltip.hide();
        }
    });

    $('#AtlanticSeaboard').on('touchstart', function () {
        $(this).off('mouseenter,mouseleave');
    });

    $('#SouthPeninsula').on({
        mouseenter: function () {
            tooltip.show('South Peninsula', 200)
        },
        mouseleave: function () {
            tooltip.hide();
        }
    });

    $('#SouthPeninsula').on('touchstart', function () {
        $(this).off('mouseenter,mouseleave');
    });




// tooltips
// ======================================

    $('#check1').click(() => {
        if ($("input[name='area1']").attr('checked')) {
            $("input[name='area1']").attr('checked', false)
        } else {
            $("input[name='area1']").attr('checked', true)
        }
    })
    $('#check2').click(() => {
        if ($("input[name='area2']").attr('checked')) {
            $("input[name='area2']").attr('checked', false)
        } else {
            $("input[name='area2']").attr('checked', true)
        }
    })
    $('#check3').click(() => {
        if ($("input[name='area3']").attr('checked')) {
            $("input[name='area3']").attr('checked', false)
        } else {
            $("input[name='area3']").attr('checked', true)
        }
    })
    $('#check4').click(() => {
        if ($("input[name='area4']").attr('checked')) {
            $("input[name='area4']").attr('checked', false)
        } else {
            $("input[name='area4']").attr('checked', true)
        }
    })
    $('#check5').click(() => {
        if ($("input[name='area5']").attr('checked')) {
            $("input[name='area5']").attr('checked', false)
        } else {
            $("input[name='area5']").attr('checked', true)
        }
    })
    $('#check6').click(() => {
        if ($("input[name='area6']").attr('checked')) {
            $("input[name='area6']").attr('checked', false)
        } else {
            $("input[name='area6']").attr('checked', true)
        }
    })
    $('#check7').click(() => {
        if ($("input[name='area7']").attr('checked')) {
            $("input[name='area7']").attr('checked', false)
        } else {
            $("input[name='area7']").attr('checked', true)
        }
    })
    $('#terms').click(() => {
        if ($("input[name='terms']").attr('checked')) {
            $("input[name='terms']").attr('checked', false)
        } else {
            $("input[name='terms']").attr('checked', true)
        }
    })

    $('#imageCrop').mouseup(function () {
        changePositionImageCropper();
        cropImageNow();
    });

    function cropImageNow() {
        var imageURL = $('#profileImage').attr('src');
        imageURL = imageURL.split('/');
        imageURL = imageURL[imageURL.length - 1];
        let pos = $('#imageCrop').position();
        console.log('This is the Pos', pos);
        console.log(imageURL);
        let x = pos.left;
        let y = pos.top;
        let w = $('#imageCrop').width();
        let h = $('#imageCrop').height();
        let pw = $('#profileImage').width();
        let ph = $('#profileImage').height();
        console.log('profileImage width now:', pw)
        console.log('profileImage height now:', ph)
        var url = '/crop/' + imageURL + '/' + x + '/' + y + '/' + w + '/' + h + '/' + pw + '/' + ph;
        $.ajax({
            url: url,
            type: "get", //send it through get method
            success: function (response) {
                //Do Something
                console.log('This is my response', response.data);
                setTimeout(() => {
                    let cropped_src = response.data + '?';
                    console.log(cropped_src)
                    $('#croppedImage').attr('src', cropped_src + Math.random());
                }, 600);
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
        // console.log($(this).children());
        $('#mainImageArea2').empty();
        $('footer').css('display', 'none');
        $.ajax({
            url: post_url,
            type: request_method,
            data: form_data,
            contentType: false,
            cache: false,
            processData: false
        }).done(function (response) { //
            $('#mainImageArea2').empty();
            // $('#mainImageArea2').height('250px');

            let img = `<img id="profileImage" src="${response}" alt="">`
            $(img).appendTo('#mainImageArea2');
            setTimeout(function () {
                $('#mainImageArea').css('display', 'block');
                $('#imageCrop').css('display', 'block');
                // $('#croppedImageContainer').css('display', 'flex');
                let p = $('#profileImage').position();
                let w = $('#profileImage').width();
                let h = $('#profileImage').height();
                // let screenWidth = window.width();
                // console.log('The screen Width is:', screenWidth)
                $('#mainImageArea').css('width', w).css('height', h);
                if ($('#imageCrop').height() > $('#profileImage').height()) {
                    let newHeight = $('#profileImage').height() * .9;
                    $('#imageCrop').css('width', newHeight).css('height', newHeight);
                }
                if ($('#imageCrop').width() > $('#profileImage').width()) {
                    let newHeight = $('#profileImage').width() * .9;
                    $('#imageCrop').css('width', newHeight).css('height', newHeight);
                }

                $('#acceptProfileBtn').css('width', w).css('display', 'block');
                changePositionImageCropper();
                cropImageNow();
                // $('footer').css('display', 'block');
            }, 500)
            
        }).then(
            setTimeout(function(){
                console.log('This is a Test')
                $('#croppedImageContainer').css('display', 'flex');
                $('footer').css('display', 'block');


            }, 750)

        );
        });

    function changePositionImageCropper() {
        let a = $('#imageCrop').position();
        let h = $('#imageCrop').height();
        let w = $('#imageCrop').width();
        let mh = $('#mainImageArea').height();
        let mw = $('#mainImageArea').width();
        if (a.top < 0) {
            $('#imageCrop').css('top', 0);
        }
        if (a.left < 0) {
            $('#imageCrop').css('left', 0);
        }
        if (a.left > mw - w) {
            let newLeft = mw - w;
            $('#imageCrop').css('left', newLeft);
        }
        if (a.top > mh - h) {
            let newTop = mh - h;
            $('#imageCrop').css('top', newTop);
        }
        // if (w > mw) {
        //     $('#imageCrop').css('left', 0);
        //     $('#imageCrop').css('width', mw);
        // }
        // if (h > mh) {
        //     $('#imageCrop').css('top', 0);
        //     $('#imageCrop').css('height', mh);
        // }
        // if (h > w) {
        //     $('#imageCrop').css('width', w);
        // }
        // if (w > h) {
        //     $('#imageCrop').css('width', h);
        // }
    }


    // ============================================
    // Business Area Description Wordcount

    $('#businessDescription').keyup(function (e) { 
        let characters = $(this).val().length;
        let maxWords = $(this).attr('maxLength');
        let remaining = maxWords - characters;
        let message = `${remaining} characters left.`
        $('#wordcount').html(message);
    });

    $('#businessDescription').on('paste', function () {
        var element = this;
        setTimeout(function () {
          let characters = $(element).val();
          let maxWords = $(element).attr('maxLength');
            let remaining = maxWords - characters;
            let message = `${remaining} characters left.`
            $('#wordcount').html(message);
          // do something with text
        }, 100);
      });


});