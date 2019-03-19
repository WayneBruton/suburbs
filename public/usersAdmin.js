$(function() {
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

    $("#new").attr("checked", true);
    $("#approvedNotPaidUpToDate").attr("checked", false);
    $("#approved").attr("checked", false);
    getProfiles();
  });
  $("#notPaidContainer, #approvedNotPaidUpToDate").click(() => {
    $("#newContainer").css("background-color", "");
    $("#notPaidContainer").css("background-color", "lightgrey");
    $("#approvedContainer").css("background-color", "");

    $("#new").attr("checked", false);
    $("#approvedNotPaidUpToDate").attr("checked", true);
    $("#approved").attr("checked", false);
    getProfiles();
  });
  $("#approvedContainer, #approved").click(() => {
    $("#newContainer").css("background-color", "");
    $("#notPaidContainer").css("background-color", "");
    $("#approvedContainer").css("background-color", "lightgrey");
    setTimeout(() => {
      $("#new").attr("checked", false);
      $("#approvedNotPaidUpToDate").attr("checked", false);
      $("#approved").attr("checked", true);
      getProfiles();
    }, 200);
  });

  // ============== Fetch Profiles ====================

  function getProfiles() {
    let option;
    if ($("#new").attr("checked")) {
      option = 1;
    } else if ($("#approved").attr("checked")) {
      option = 2;
    } else {
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
          }" style="width: 100%; margin: 10px; border: 1px solid lightgrey; padding:5px;"><a href="#">${
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
          }" style="width: 100%; margin: 10px; border: 1px solid lightgrey; padding:5px;"><a href="#">${
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
          }" style="width: 100%; margin: 10px; border: 1px solid lightgrey; padding:5px;"><a href="#">${
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
