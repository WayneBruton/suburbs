$(function () {


    //   search profiles by name===================================
    $('#businessName').focus((e) => {
        $("#new").prop("checked", false);
        $("#approvedNotPaidUpToDate").prop("checked", false);
        $("#approved").prop("checked", false);
        $("#newContainer").css("background-color", "");
        $("#notPaidContainer").css("background-color", "");
        $("#approvedContainer").css("background-color", "");
    });

    $('#businessName').keyup(function (e) {
        e.preventDefault();
        if ($(this).val().trim() != '') {
            // console.log($(this).val().trim())
            let option = $(this).val().trim()
            // console.log(option)
            let url = `/getprofilesByName/${option}`
            $.get(url).done((response) => {
                console.log(response)
                $("#retrievedProfiles").empty();
                if (response.length) {
                    $("#retrievedHeading").text("Profile By Name");
                    for (i = 0; i < response.length; i++) {
                        let litem = `<li id="${
            response[i].id
          }" style="width: 100%; margin: 10px; border: 1px solid lightgrey; padding:5px;"><a href="/AdminpreviewProfile/${response[i].id}">${
            response[i].businessName
          } - ${response[i].email}<a></li>`;
                        $(litem).appendTo("#retrievedProfiles");
                    }
                } else if (!response.length) {
                    $("#retrievedHeading").text("There are no matching Profiles");
                }
            })
        }

    });

    $('#businessName').blur(function (e) {
        e.preventDefault();
        $(this).val('')

    });



    // ============ Show profiles================
    $("#findProfilesButton").click(e => {
        e.preventDefault();
        $("#dashboardButtons").css("display", "none");
        $("#areasDetails").css("display", "block");
        $("#retrievedProfiles").empty();
        $("#new").prop("checked", false);
        $("#approvedNotPaidUpToDate").prop("checked", false);
        $("#approved").prop("checked", false);
        $("#newContainer").css("background-color", "");
        $("#notPaidContainer").css("background-color", "");
        $("#approvedContainer").css("background-color", "");
    });

    $("#closeAreasDetails").click(e => {
        e.preventDefault();
        $("#retrievedProfiles").empty();

        $("#new").prop("checked", false);
        $("#approvedNotPaidUpToDate").prop("checked", false);
        $("#approved").prop("checked", false);

        $("#newContainer").css("background-color", "");
        $("#notPaidContainer").css("background-color", "");
        $("#approvedContainer").css("background-color", "");

        $("#dashboardButtons").css("display", "flex");
        $("#areasDetails").css("display", "none");
    });
    // ===============radio group profiles===============

    $("#newContainer, #new").click(() => {
        $("#newContainer").css("background-color", "lightgrey");
        $("#notPaidContainer").css("background-color", "");
        $("#approvedContainer").css("background-color", "");


        setTimeout(() => {
            $("#new").prop("checked", true);
            $("#approvedNotPaidUpToDate").prop("checked", false);
            $("#approved").prop("checked", false);
            getProfiles();
        }, 20);
    });
    $("#notPaidContainer, #approvedNotPaidUpToDate").click(() => {
        $("#newContainer").css("background-color", "");
        $("#notPaidContainer").css("background-color", "lightgrey");
        $("#approvedContainer").css("background-color", "");


        setTimeout(() => {
            $("#new").prop("checked", false);
            $("#approvedNotPaidUpToDate").prop("checked", true);
            $("#approved").prop("checked", false);
            getProfiles();
        }, 20);
    });
    $("#approvedContainer, #approved").click(() => {
        $("#newContainer").css("background-color", "");
        $("#notPaidContainer").css("background-color", "");
        $("#approvedContainer").css("background-color", "lightgrey");
        setTimeout(() => {
            $("#new").prop("checked", false);
            $("#approvedNotPaidUpToDate").prop("checked", false);
            $("#approved").prop("checked", true);
            getProfiles();
        }, 20);
    });

    // ============== Fetch Profiles ==================== 

    function getProfiles() {
        let option;
        if ($("#new").prop("checked")) {
            option = 1;
        } else if ($("#approved").prop("checked")) {
            option = 2;
        } else if ($("#approvedNotPaidUpToDate").prop("checked")) {
            option = 3;
        }
        let url = `/getprofiles/${option}`;
        // /getprofiles/:option
        $.get(url).done(response => {
            $("#retrievedProfiles").empty();
            console.log(response);
            if (response.length && option == 1) {
                $("#retrievedHeading").text("New Profiles");
                for (i = 0; i < response.length; i++) {
                    let litem = `<li id="${
            response[i].id
          }" style="width: 100%; margin: 10px; border: 1px solid lightgrey; padding:5px;"><a href="/AdminpreviewProfile/${response[i].id}">${
            response[i].businessName
          } - ${response[i].email}<a></li>`;
                    $(litem).appendTo("#retrievedProfiles");
                }
            } else if (!response.length && option == 1) {
                $("#retrievedHeading").text("There are no new Profiles");
            }
            if (response.length && option == 2) {
                $("#retrievedHeading").text("Existing Profiles");
                for (i = 0; i < response.length; i++) {
                    let litem = `<li id="${
                        response[i].id
                      }" style="width: 100%; margin: 10px; border: 1px solid lightgrey; padding:5px;"><a href="/AdminpreviewProfile/${response[i].id}">${
                        response[i].businessName
                      } - ${response[i].email}<a></li>`;
                    $(litem).appendTo("#retrievedProfiles");
                }
            } else if (!response.length && option == 2) {
                $("#retrievedHeading").text("There are no existing Profiles");
            }
            if (response.length && option == 3) {
                $("#retrievedHeading").text("Unpaid Profiles");
                for (i = 0; i < response.length; i++) {
                    let litem = `<li id="${
                        response[i].id
                      }" style="width: 100%; margin: 10px; border: 1px solid lightgrey; padding:5px;"><a href="/AdminpreviewProfile/${response[i].id}">${
                        response[i].businessName
                      } - ${response[i].email}<a></li>`;
                    $(litem).appendTo("#retrievedProfiles");
                }
            } else if (!response.length && option == 3) {
                $("#retrievedHeading").text("There are no unpaid Profiles");
            }
        });
    }
    // =============Show Charities Form ======================
    $('#findCharitiesButton').click((e) => {
        $("#dashboardButtons").css("display", "none");
        $("#newCharity").prop("checked", false);
        $("#editCharity").prop("checked", false);
        $("#newCharityContainer").css("background-color", "");
        $("#editCharityContainer").css("background-color", "");
        $('#charityDetails').css('display', 'block')

    })

    $("#closeCharityDetails").click(e => {
        e.preventDefault();
        $("#retrievedCharityProfiles").empty();

        $("#newCharity").prop("checked", false);
        $("#editCharity").prop("checked", false);
        $("#approved").prop("checked", false);

        $("#newCharityContainer").css("background-color", "");
        $("#editCharityContainer").css("background-color", "");

        $("#dashboardButtons").css("display", "flex");
        $("#charityDetails").css("display", "none");
    });

    $("#newContainer, #new").click(() => {
        $("#newContainer").css("background-color", "lightgrey");
        $("#notPaidContainer").css("background-color", "");
        $("#approvedContainer").css("background-color", "");


        setTimeout(() => {
            $("#new").prop("checked", true);
            $("#approvedNotPaidUpToDate").prop("checked", false);
            $("#approved").prop("checked", false);
            getProfiles();
        }, 20);
    });

    // =============== Radio Group Charities =============================


    $("#newCharityContainer, #newCharity").click(() => {
        $("#editCharityContainer").css("background-color", "");
        $("#newCharityContainer").css("background-color", "lightgrey");

        setTimeout(() => {
            $("#editCharity").prop("checked", false);
            $("#newCharity").prop("checked", true);
            $('#retrievedCharityProfiles').empty()
            $('#retrievedCharityHeading').text('Add a new charity')
            let data = `<li><a href="/addCharity">Create New Charity</a></li>`
            $(data).appendTo('#retrievedCharityProfiles');
        }, 20);
    });

    $("#editCharityContainer, #editCharity").click((e) => {
        e.preventDefault()
        $("#editCharityContainer").css("background-color", "lightgrey");
        $("#newCharityContainer").css("background-color", "");

        // setTimeout(() => {
            $("#editCharity").prop("checked", true);
            $("#newCharity").prop("checked", false);
            $('#retrievedCharityProfiles').empty()
            $('#retrievedCharityHeading').text('Edit a charity')
            let url = 'getLatestCharities'
            $.get(url)
            .done((answer)=>{
                console.log(answer)
                // if (response.length) {
                    for (i = 0; i < answer.length; i++) {
                        let l_item = `<li id="${
                            answer[i].id
                          }" style="width: 100%; margin: 10px; border: 1px solid lightgrey; padding:5px;"><a href="/adminEditCharity/${answer[i].id}">${
                            answer[i].businessName
                          } - ${answer[i].email}<a></li>`;
                        $(l_item).appendTo("#retrievedCharityProfiles");
                    }
               
                       
                   
                // }
                
            })
            // getProfiles();
        // }, 20);
    });
});