$(function () {
    //Make the DIV element draggagle:
    dragElement(document.getElementById("imageCrop"));

function dragElement(elmnt) {
    var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        /* if present, the header is where you move the DIV from:*/
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        /* otherwise, move the DIV from anywhere inside the DIV:*/
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
        // move cropImage back into main image
        let a = $('#imageCrop').position();
        if (a.top < 0) {
            $('#imageCrop').css('top', 0);
            console.log(a.top);
        }
        if (a.left < 0) {
            $('#imageCrop').css('left', 0);
            console.log(a.left);
        }
    }
}

$('#params').click(function (e) {
    e.preventDefault();
    let a = $('#mainImageArea').position();
    let b = $('#mainImageArea').width();
    let c = $('#mainImageArea').height();
    console.log('position:', a)
    console.log('width:', b)
    console.log('height:', c)
    let d = $('#imageCrop').position();
    let f = $('#imageCrop').width();
    let g = $('#imageCrop').height();
    console.log('ImageCrop position:', d)
    console.log('ImageCrop width:', f)
    console.log('ImageCrop height:', g)
    let h = $('#profileImage').position();
    let i = $('#profileImage').width();
    let j = $('#profileImage').height();
    console.log('profileImage position:', h)
    console.log('profileImage width:', i)
    console.log('profileImage height:', j)

});


});

