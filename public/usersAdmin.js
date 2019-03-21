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
        }, 200);
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
        }, 200);
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
        }, 200);
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
});