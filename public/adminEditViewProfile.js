$(function () {
    // getProfile();
    let clientID = $('#profileID').val();
    let url = '/adminEditProfile/' + clientID;
    getProfile();
    let areas;
    let categories;

    function getProfile(clientID) {
        $.get(url)
            .done((result) => {
                console.log(result);
                $('#businessName').val(result[0][0].businessName)
                $('#profileDelails').text(`Profile Preview - ${result[0][0].businessName} - ${result[0][0].id}`)
                $('#profileImage').attr('src', result[0][0].profile_image).css('width', '30%')
                $('#mob_no').val(result[0][0].mob_no)
                $('#email').val(result[0][0].email)
                $('#website').val(result[0][0].website)
                $('#facebook').val(result[0][0].facebook)
                $('#instagram').val(result[0][0].instagram)
                $('#linkedin').val(result[0][0].linkedin)
                $('#profile_description').val(result[0][0].profile_description)
                $('#business_image1').attr('src', result[0][0].business_image1).css('width', '30%')
                $('#business_image2').attr('src', result[0][0].business_image2).css('width', '30%')
                $('#business_image3').attr('src', result[0][0].business_image3).css('width', '30%')

                areas = result[1];
                let sortAreas = result[0][0].areas
                sortAreas = JSON.parse(sortAreas)
                console.log(sortAreas)
                // let areaStr = sortAreas.length;
                // sortAreas = sortAreas.substring(1, areaStr - 1)
                // // sortAreas = sortAreas.substring(1,areaStr-1)
                // sortAreas = sortAreas.split(',')
                // console.log(sortAreas)

                function changeArea(value, checked) {
                    for (var i in areas) {
                        if (areas[i].id == value) {
                            areas[i].checked = checked;
                            break; //Stop this loop, we found it!
                        }
                    }
                }
                for (i = 0; i < sortAreas.length; i++) {
                    changeArea(sortAreas[i], "Checked")
                }
                $('#chosenAreas').empty();
                $('#chosenAreas').append(`<h2>Areas</h2>`)
                for (i = 0; i < areas.length; i++) {
                    let areaCheckboxes = `<div class="media-body-info cbox" style="width: 100%">
                        <input type="checkbox" id="area${areas[i].id}" class="media-body-info-detail" ${areas[i].checked}>
                        <label for="area${areas[i].id}" id="">${areas[i].area_description}</label></div>`
                    $(areaCheckboxes).appendTo('#chosenAreas');
                }
                categories = result[2]
                // console.log(categories)

                let sortCategories = result[0][0].catarea
                sortCategories = JSON.parse(sortCategories)
                // let str = sortCategories.length;
                // sortCategories = sortCategories.substring(1,str-1)
                // sortCategories = sortCategories.split(',')

                console.log(sortCategories)


                function changeCat(value, checked) {
                    for (var i in categories) {
                        if (categories[i].id == value) {
                            categories[i].checked = checked;
                            break; //Stop this loop, we found it!
                        }
                    }
                }
                for (i = 0; i < sortCategories.length; i++) {

                    changeCat(sortCategories[i], "Checked")
                    // console.log(sortCategories[i])

                }

                $('#chosenCategories').empty();
                $('#chosenCategories').append(`<h2>Categories</h2>`)
                for (i = 0; i < categories.length; i++) {
                    let categoryCheckboxes = `<div class="media-body-info cbox" style="width: 100%">
                       <input type="checkbox" id="catarea${categories[i].id}" class="media-body-info-detail" ${categories[i].checked}>
                       <label for="catarea${categories[i].id}" id="">${categories[i].category_description}</label></div>`
                    $(categoryCheckboxes).appendTo('#chosenCategories');
                }
                if (result[0][0].adminAssist == 1) {
                    $('#adminAssistance').prop('checked', true)
                } else {
                    $('#adminAssistance').prop('checked', false)
                }
                if (result[0][0].profile_approved == 1) {
                    $('#isApproved').prop('checked', true)
                } else {
                    $('#isApproved').prop('checked', false)
                }
                if (result[0][0].paid_to_date == 1) {
                    $('#paidToDate').prop('checked', true)
                } else {
                    $('#paidToDate').prop('checked', false)
                }
                $('#paymentExpiry').val(result[0][0].payment_expires)
                $('#terms').val(result[0][0].terms)
                $('#selectedOption').val(result[0][0].selectedOption)
                let imagesURL = `/editprofileImages`
                $('#updateImages').attr('href', imagesURL)
                // console.log(imagesURL)
            })
    }
    let originalData;
    let updatedData;

    let focusAreas = `#businessName, #mob_no, #email, #website, #facebook, #instagram, #linkedin, 
                    #profile_description, #chosenCategories, #chosenAreas, #adminAssistance, #paidToDate, 
                    #paymentExpiry, #terms, #selectedOption, #isApproved`;

    $(focusAreas).focus(function (e) {
        if ($('#saveChangesButton').attr('disabled')) {
            e.preventDefault();
            originalData = $(this).val();
            // console.log(originalData);
        }
    });
    $(focusAreas).blur(function (e) {
        if ($('#saveChangesButton').attr('disabled')) {
            e.preventDefault();
            updatedData = $(this).val();
            // console.log(updatedData);
            // saveChangesButton    
            if (originalData !== updatedData) {
                $('#saveChangesButton').attr('disabled', false).css('background-color', 'red')
            }
        }
    });

    $(focusAreas).change(function (e) {
        e.preventDefault();
        if ($('#saveChangesButton').attr('disabled')) {
            $('#saveChangesButton').attr('disabled', false).css('background-color', 'red')
        }
    });

    function calcAreas() {
        areasArray = [];
        if ($('#area1').prop('checked')) {
            let b = $('#area1').attr('id');
            b = parseInt(b.split('area')[1])
            areasArray.push(b)
        }
        if ($('#area2').prop('checked')) {
            let b = $('#area2').attr('id');
            b = parseInt(b.split('area')[1])
            areasArray.push(b)
        }
        if ($('#area3').prop('checked')) {
            let b = $('#area3').attr('id');
            b = parseInt(b.split('area')[1])
            areasArray.push(b)
        }
        if ($('#area4').prop('checked')) {
            let b = $('#area4').attr('id');
            b = parseInt(b.split('area')[1])
            areasArray.push(b)
        }
        if ($('#area5').prop('checked')) {
            let b = $('#area5').attr('id');
            b = parseInt(b.split('area')[1])
            areasArray.push(b)
        }
        if ($('#area6').prop('checked')) {
            let b = $('#area6').attr('id');
            b = parseInt(b.split('area')[1])
            areasArray.push(b)
        }
        if ($('#area7').prop('checked')) {
            let b = $('#area7').attr('id');
            b = parseInt(b.split('area')[1])
            areasArray.push(b)
        }
        if ($('#area8').prop('checked')) {
            let b = $('#area8').attr('id');
            b = parseInt(b.split('area')[1])
            areasArray.push(b)
        }
        console.log(areasArray)
    }

    $('#chosenAreas').click((e) => {
        calcAreas()
    })

    function calcCategories() {
        categoriesArray = [];
        if ($('#catarea1').prop('checked')) {
            let b = $('#catarea1').attr('id');
            b = parseInt(b.split('area')[1])
            categoriesArray.push(b)
        }
        if ($('#catarea2').prop('checked')) {
            let b = $('#catarea2').attr('id');
            b = parseInt(b.split('area')[1])
            categoriesArray.push(b)
        }
        if ($('#catarea3').prop('checked')) {
            let b = $('#catarea3').attr('id');
            b = parseInt(b.split('area')[1])
            categoriesArray.push(b)
        }
        if ($('#catarea4').prop('checked')) {
            let b = $('#catarea4').attr('id');
            b = parseInt(b.split('area')[1])
            categoriesArray.push(b)
        }
        if ($('#catarea5').prop('checked')) {
            let b = $('#catarea5').attr('id');
            b = parseInt(b.split('area')[1])
            categoriesArray.push(b)
        }
        if ($('#catarea6').prop('checked')) {
            let b = $('#catarea6').attr('id');
            b = parseInt(b.split('area')[1])
            categoriesArray.push(b)
        }
        if ($('#catarea7').prop('checked')) {
            let b = $('#catarea7').attr('id');
            b = parseInt(b.split('area')[1])
            categoriesArray.push(b)
        }
        if ($('#catarea8').prop('checked')) {
            let b = $('#catarea8').attr('id');
            b = parseInt(b.split('area')[1])
            categoriesArray.push(b)
        }
        if ($('#catarea9').prop('checked')) {
            let b = $('#catarea9').attr('id');
            b = parseInt(b.split('area')[1])
            categoriesArray.push(b)
        }
        if ($('#catarea10').prop('checked')) {
            let b = $('#catarea10').attr('id');
            b = parseInt(b.split('area')[1])
            categoriesArray.push(b)
        }
        if ($('#catarea11').prop('checked')) {
            let b = $('#catarea11').attr('id');
            b = parseInt(b.split('area')[1])
            categoriesArray.push(b)
        }
        if ($('#catarea12').prop('checked')) {
            let b = $('#catarea12').attr('id');
            b = parseInt(b.split('area')[1])
            categoriesArray.push(b)
        }
        if ($('#catarea13').prop('checked')) {
            let b = $('#catarea13').attr('id');
            b = parseInt(b.split('area')[1])
            categoriesArray.push(b)
        }
        if ($('#catarea14').prop('checked')) {
            let b = $('#catarea14').attr('id');
            b = parseInt(b.split('area')[1])
            categoriesArray.push(b)
        }
        if ($('#catarea15').prop('checked')) {
            let b = $('#catarea15').attr('id');
            b = parseInt(b.split('area')[1])
            categoriesArray.push(b)
        }
        if ($('#catarea16').prop('checked')) {
            let b = $('#catarea16').attr('id');
            b = parseInt(b.split('area')[1])
            categoriesArray.push(b)
        }
        if ($('#catarea17').prop('checked')) {
            let b = $('#catarea17').attr('id');
            b = parseInt(b.split('area')[1])
            categoriesArray.push(b)
        }
        if ($('#catarea18').prop('checked')) {
            let b = $('#catarea18').attr('id');
            b = parseInt(b.split('area')[1])
            categoriesArray.push(b)
        }
        if ($('#catarea19').prop('checked')) {
            let b = $('#catarea19').attr('id');
            b = parseInt(b.split('area')[1])
            categoriesArray.push(b)
        }
        if ($('#catarea20').prop('checked')) {
            let b = $('#catarea20').attr('id');
            b = parseInt(b.split('area')[1])
            categoriesArray.push(b)
        }
        if ($('#catarea21').prop('checked')) {
            let b = $('#catarea21').attr('id');
            b = parseInt(b.split('area')[1])
            categoriesArray.push(b)
        }
        if ($('#catarea22').prop('checked')) {
            let b = $('#catarea22').attr('id');
            b = parseInt(b.split('area')[1])
            categoriesArray.push(b)
        }
        if ($('#catarea23').prop('checked')) {
            let b = $('#catarea23').attr('id');
            b = parseInt(b.split('area')[1])
            categoriesArray.push(b)
        }
        if ($('#catarea24').prop('checked')) {
            let b = $('#catarea24').attr('id');
            b = parseInt(b.split('area')[1])
            categoriesArray.push(b)
        }
        console.log(categoriesArray)
    }

    $('#chosenCategories').click((e) => {
        calcCategories()
    })

    let areasArray = []

    let categoriesArray = []

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
        calcCategories()
        let categoriesToPost = categoriesArray;
        calcAreas()
        // console.log(categoriesToPost)
        let areasToPost = areasArray
        console.log(areasToPost)
        // console.log(areasArray)
        // console.log(categoriesArray)
        let adminAssist;
        if ($('#adminAssistance').prop('checked')) {
            adminAssist = true
        } else {
            adminAssist = false
        }
        console.log(adminAssist)
        let paid_to_date;
        if ($('#paidToDate').prop('checked')) {
            paid_to_date = true
        } else {
            paid_to_date = false
        }
        let payment_expires = moment($('#paymentExpiry').val()).format("YYYY-MM-DD HH:mm:ss")
        // payment_expires =  new Date(payment_expires)
        console.log(payment_expires)
        let terms = $('#terms').val()
        let selectedOption = $('#selectedOption').val()
        let profile_approved;
        if ($('#isApproved').prop('checked')) {
            profile_approved = true
        } else {
            profile_approved = false
        }
        console.log(profile_approved)

        let data = {
            id: id,
            businessName: businessName,
            mob_no: mob_no,
            email: email,
            website: website,
            facebook: facebook,
            instagram: instagram,
            linkedin: linkedin,
            profile_description: profile_description,
            areas: areasToPost,
            catarea: categoriesToPost,
            adminAssist: adminAssist,
            paid_to_date: paid_to_date,
            payment_expires: payment_expires,
            terms: terms,
            selectedOption: selectedOption,
            profile_approved: profile_approved
        }
        // data = {id: [1,2,3,4,5]}
        data = JSON.stringify(data)


        // console.log(data)
        $.ajax({
                url: `/adminUpdateProfile`,
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