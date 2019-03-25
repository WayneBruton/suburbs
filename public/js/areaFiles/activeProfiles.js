$(function () {
    let areaCode = $('#areaCode').val()
    console.log(areaCode)
    let viewColor = $('#areaColor').val()
    console.log(viewColor)
    let url = `/getActiveProfilesCategories/${areaCode}`
    $.get(url).done((response) => {
        $('#showCategories').empty()
        for (i = 0; i < response.length; i++) {
            let categoriesAvailable;
            if (response[i].count != 0) {
                categoriesAvailable = `<button name="activeCategories" id="${response[i].id}" class="contactBtns" style="background-color: ${viewColor};color: white;margin:5px 5px; border: 1px solid ${viewColor}; border-radius: 7px">${response[i].category_description}  (${response[i].count})</button>`
            } else {
                categoriesAvailable = `<button name="noActiveCategories" id="${response[i].id}" class="contactBtns" style="background-color: ${viewColor};color: white;margin:5px 5px; border: 1px solid ${viewColor}; border-radius: 7px">${response[i].category_description}  (${response[i].count})</button>`
            }

            $(categoriesAvailable).appendTo('#showCategories');
        }
    })
    $('#showCategories').on('click', `#1, #2, #3, #4, #5, #6, #7, #8, #9, #10, #11, #12, #13, #14, #15, #16, #17, #18, #19, #20, #21, #22, #23, #24,
    #25, #26, #27, #28, #29, #30, #31, #32, #33, #34, #35, #36, #37, #38, #39, #40, #41, #42, #43, #44, #45, #46, #47, #48`, function (e) {
        e.preventDefault()
        if ($(this).prop('name') == 'noActiveCategories') {
            $('#success').fadeIn(600).css('display', 'block')
            setTimeout(() => {
                $('#success').slideDown(600).css('display', 'none')
            }, 1750)
        } else {
            // console.log($(this).prop('id'))
            let categoryId = $(this).prop('id')
            let url = `/getActiveProfiles/${areaCode}/${categoryId}`
            console.log(url)
            $.get(url).done((response) => {
                $('#showCategories').css('display', 'none')
                $('#thisProfile').empty()
                let profileWidth = '';
                if (window.screen.width < 800) {
                    profileWidth = '100%'
                } else {
                    if (response.length == 1) {
                        profileWidth = '50%'
                    } else if (response.length == 2) {
                        profileWidth = '40%'
                    } else {
                        profileWidth = '30%'
                    }

                }
                for (i = 0; i < response.length; i++) {
                    let profileDescription = response[i].profile_description;
                    if (profileDescription.length > 160) {
                        profileDescription = profileDescription.substring(0, 160) + '...';
                    } else {
                        profileDescription = profileDescription + '...'
                    }
                    console.log(profileDescription)
                    let profileToShow = `<div id="p_display"
                                        style="display: flex; flex-direction: column; width: ${profileWidth}; border: 3px solid ${viewColor}; border-radius: 7px; justify-content: space-evenly; margin: 10px 5px; padding: 10px 10px;">
                                        <div style="display: flex; justify-content: center; flex-wrap: wrap; width: 100%">
                                        <h3>${response[i].businessName}</h3>
                                        </div>
                                        <img src="${response[i].profile_image}" alt="${response[i].businessName}" srcset=""
                                        style=" border: 3px solid ${viewColor};border-radius: 7px; width: 100%">
                                        <br>
                                        <p>${profileDescription}</p>
                                        <button id="${response[i].id}" class="contactBtns" style="background-color: ${viewColor};color: white;margin:5px 5px; border: 1px solid ${viewColor}; border-radius: 7px; width: 100%; align-items: center"><a href="/showProfile/${response[i].id}" style="color: white;">View Profile</a></button></div>`
                    $(profileToShow).appendTo('#thisProfile');
                }
                setTimeout(() => {
                    $('#showProfiles').css('display', 'flex')
                })
                console.log(response)
            })
        }
    })

    $('#closeProfiles').click((e) => {
        $('#showCategories').css('display', 'flex')
        $('#showProfiles').css('display', 'none')
    })
})