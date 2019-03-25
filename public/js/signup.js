$(function () {
    $.get('/getareas', function (data) {
        $.each(data, function (i, val) {
            let areaCheck = `<div id="check${data[i].id}" class="areaChoice" id="areaChoice${data[i].id}">
             <div class="individualArea" id="individualArea${data[i].id}"> <input class="check" style="margin-top: 7px;" type="checkbox"
                     name="areaChosen[]" id="area${data[i].id}"><label for="area${data[i].id}">${data[i].area_description}</label></div>
         </div>`
            $(areaCheck).appendTo('#areaCheckBoxes');
            // name="area${data[i].id}"
        });
    })

    $.get('/getCategories', function (data) {
        $.each(data, function (i, val) {
            let catCheck = `<div id="catCheck${data[i].id}" class="areaChoice" id="categoryChoice${data[i].id}">
        <div class="individualArea" id="individualCategory${data[i].id}"> <input class="check" style="margin-top: 7px;" type="checkbox"
                name="catarea[]" id="catarea${data[i].id}"><label for="catarea${data[i].id}">${data[i].category_description}</label></div>
    </div>`
            $(catCheck).appendTo('#categoryCheckBoxes');
            // name="catarea${data[i].id}"
        });
    })
})