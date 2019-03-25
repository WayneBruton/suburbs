$(function () {

    let areasArray = [];
    let categoriesArray = [];
    let adminAssistance = [];
    let packagesArray = []
    let optionChosen = 0;

    // ===============RADIO BUTTONS CLICK ++++++++++++=

    $('#service').click(() => {
        $(this).attr('checked', true)
        $('#product').attr('checked', false)
        $('#both').attr('checked', false)
        setTimeout(() => {
            if ($(this).attr('checked')) {
                $('#psb').val('service');
            }
            console.log($('#psb').val());
        }, 250)
    })
    $('#product').click(() => {
        $(this).attr('checked', true)
        $('#service').attr('checked', false)
        $('#both').attr('checked', false)
        setTimeout(() => {
            if ($(this).attr('checked')) {
                $('#psb').val('product');
            }
            console.log($('#psb').val());
        }, 250)
    })
    $('#both').click(() => {
        $(this).attr('checked', true)
        $('#product').attr('checked', false)
        $('#service').attr('checked', false)
        setTimeout(() => {
            if ($(this).attr('checked')) {
                $('#psb').val('both');
            }
            console.log($('#psb').val());
        }, 250)
    })

    // CHECK BOXES AREA
    // ====================

    function calcAreas() {
        console.log('2nd Check<><><><><><',areasArray);

        areasArray = [];
        if ($('#area1').attr('checked')) {
            areasArray.push(parseInt($('#area1').val()));
        }
        if ($('#area2').attr('checked')) {
            areasArray.push(parseInt($('#area2').val()));
        }
        if ($('#area3').attr('checked')) {
            areasArray.push(parseInt($('#area3').val()));
        }
        if ($('#area4').attr('checked')) {
            areasArray.push(parseInt($('#area4').val()));
        }
        if ($('#area5').attr('checked')) {
            areasArray.push(parseInt($('#area5').val()));
        }
        if ($('#area6').attr('checked')) {
            areasArray.push(parseInt($('#area6').val()));
        }
        if ($('#area7').attr('checked')) {
            areasArray.push(parseInt($('#area7').val()));
        }
        if ($('#area8').attr('checked')) {
            areasArray.push(parseInt($('#area8').val()));
        }

        console.log('Option Chosen is :::', optionChosen);
        if (optionChosen != 0) {
            var obj = packagesArray.find(obj => obj.id == optionChosen);
            console.log('Option Selected is:', obj);
            console.log(obj.per_month)
            console.log(obj.per_year)
            console.log(obj.once_off)

            $('#areasTBL').empty()
            let areaCosts = `<td class="addCostDetail">Areas</td>
                    <td class="addCostDetail" id="areaMonthly">R${obj.per_month}</td>
                    <td class="addCostDetail" id="areaYearly">R${obj.per_year}</td>
                    <td class="addCostDetail" id="areaOnceOff">R${obj.once_off}</td>`
            $(areaCosts).appendTo('#areasTBL')
        }
        // calcAdminAss()
        console.log('102nd Check<><><><><><',areasArray);

        calcTotalCosts();

    }


    $('#optionSelect').on('change', function () {
        var optionText = $("#optionSelect option:selected").val();
        var optionID = $("#optionSelect option:selected").attr('id');
        console.log('This is the option ID', optionID)
        console.log('Value is:::::', optionText)
        console.log(packagesArray)
        // let obj = packagesArray.find(o => o.id == optionText);
        // console.log(obj);
        optionChosen = optionText;
        setTimeout(function () {
            calcAreas();
        }, 200)

    });

    // =========== AREAS =================
    $('#areaCheckBoxes').on('click', "#area1, #area2,#area3, #area4, #area5, #area6, #area7, #area8, #area9, #area10", function () {
        let newVal = $(this).attr('id').split('area');
        console.log('This is the NewVal:', newVal);
        newVal = newVal[newVal.length - 1]
        console.log(newVal)
        if ($(this).attr('checked')) {
            $(this).attr('checked', false)
            $(this).val(0)
        } else {
            $(this).attr('checked', true)
            $(this).val(newVal)
        }

        areasArray = [];
        // if ($("input[name='area1']").attr('checked')) {
        if ($("#area1").attr('checked')) {
            // areasArray.push(parseInt($('#area1').val()));
            areasArray.push(parseInt($('#area1').val()));
        }
        if ($("#area2").attr('checked')) {
            areasArray.push(parseInt($('#area2').val()));
        }
        if ($("#area3").attr('checked')) {
            areasArray.push(parseInt($('#area3').val()));
        }
        if ($('#area4').attr('checked')) {
            areasArray.push(parseInt($('#area4').val()));
        }
        if ($('#area5').attr('checked')) {
            areasArray.push(parseInt($('#area5').val()));
        }
        if ($('#area6').attr('checked')) {
            areasArray.push(parseInt($('#area6').val()));
        }
        if ($('#area7').attr('checked')) {
            areasArray.push(parseInt($('#area7').val()));
        }
        if ($('#area8').attr('checked')) {
            areasArray.push(parseInt($('#area8').val()));
        }
        let numberOfAreas = areasArray.length;
        console.log('AREAS ARRAY', areasArray)
        console.log('number of areas:', numberOfAreas)
        let url = `/getPackages/${numberOfAreas}`
        console.log(url)
        packagesArray = [];
        if (numberOfAreas > 0) {
            $.get(url)
                .then(function (response) {
                    $('#optionSelect').empty();
                    $('#areasTBL').empty();
                    optionChosen = response[0].id;
                    for (i = 0; i < response.length; i++) {
                        let select = `<option id="option${response[i].id}" value="${response[i].id}">${response[i].option_name}-${response[i].option_description}</option>`
                        $(select).appendTo('#optionSelect')
                        packagesArray.push(response[i]);
                        // console.log('This is the packagesArray:::::',packagesArray)
                    }
                    let areaCosts = `<td class="addCostDetail">Areas</td>
                    <td class="addCostDetail" id="areaMonthly">R${response[0].per_month}</td>
                    <td class="addCostDetail" id="areaYearly">R${response[0].per_year}</td>
                    <td class="addCostDetail" id="areaOnceOff">R${response[0].once_off}</td>`
                    $(areaCosts).appendTo('#areasTBL')

                })
            console.log('This is the packagesArray:::::', packagesArray)

        } else {
            $('#optionSelect').empty();
            $('#areasTBL').empty();
            optionChosen = 0;
            // let select = `<option id="option${response[i].id}" value="0">You must choose an area</option>`
            let select = `<option id="option" value="0">You must choose an area</option>`
            $(select).appendTo('#optionSelect')
            let areaCosts = `<td class="addCostDetail">Areas</td>
                    <td class="addCostDetail" id="areaMonthly">R0</td>
                    <td class="addCostDetail" id="areaYearly">R0</td>
                    <td class="addCostDetail" id="areaOnceOff">R0</td>`
            $(areaCosts).appendTo('#areasTBL')
        }


        setTimeout(function () {
            calcAdminAss()
            calcAreas();
        }, 200)
        console.log('first check',areasArray)

    });

    $('#categoryCheckBoxes').on('click', "#catarea1, #catarea2, #catarea3, #catarea4, #catarea5, #catarea6, #catarea7, #catarea8, #catarea9, #catarea10, #catarea11, #catarea12, #catarea13, #catarea14, #catarea15, #catarea16, #catarea17, #catarea18, #catarea19, #catarea20, #catarea21, #catarea22, #catarea23, #catarea24, #catarea25 ", function () {
        let newVal = $(this).attr('id').split('catarea');
        // console.log('This is the NewVal:',newVal);
        newVal = newVal[newVal.length - 1]
        console.log(newVal)
        if ($(this).attr('checked')) {
            $(this).attr('checked', false)
            $(this).val(0)
        } else {
            $(this).attr('checked', true)
            $(this).val(newVal)
        }

        calcCategories();
    });



    

    $('#terms').click(() => {
        calcTotalCosts();
        console.log(areasArray);
        // console.log(categoriesArray);
        
        if ((areasArray.length == 0)||(categoriesArray == 0)){
            alert('Categories and Areas need to be chosen')
            $("input[name='terms']").attr('checked', false) 
            $('#createProfileBtn').css('display', 'none');


        } else {
            if ($("input[name='terms']").attr('checked')) {
                $("input[name='terms']").attr('checked', false) 
                $('#createProfileBtn').css('display', 'none');
    
            } else {
                $("input[name='terms']").attr('checked', true)
                $('#createProfileBtn').css('display', 'inline-block');
            }
        }
        
    })

    function calcTotalCosts() {
        // calcAdminAss()
        setTimeout(function () {
            let totalMonthly = parseFloat($('#areaMonthly').text().split('R')[1]) +
                parseFloat($('#catMonthly').text().split('R')[1]) +
                parseFloat($('#adminMonthly').text().split('R')[1]);


            let totalYearly = parseFloat($('#areaYearly').text().split('R')[1]) +
                parseFloat($('#catYearly').text().split('R')[1]) +
                parseFloat($('#adminYearly').text().split('R')[1]);
            console.log('Monthly:', parseFloat($('#areaYearly').text().split('R')[1]))
            console.log('Yearly:', parseFloat($('#catYearly').text().split('R')[1]))
            console.log('#adminYearly:', parseFloat($('#adminYearly').text().split('R')[1]))

            let totalOnceOff = parseFloat($('#areaOnceOff').text().split('R')[1]) +
                parseFloat($('#catOnceOff').text().split('R')[1]) +
                parseFloat($('#adminOnceOff').text().split('R')[1]);

            $('#totalsTBL').empty();
            let newTotals = `<td class="addCostDetail">Totals</td>
             <td class="addCostDetail" id="totMonthly">R${totalMonthly}</td>
             <td class="addCostDetail" id="totAnnual">R${totalYearly}</td>
             <td class="addCostDetail" id="totOnceOff">R${totalOnceOff}</td>`
            $(newTotals).appendTo('#totalsTBL');

        }, 250)
    }



    function calcAdminAss() {
        adminAssistance = [];
        let mthly_Admin = '';
        let yearly_admin = '';
        let once_offAdmin = '';
        if ($("input[name='adminAssist']").attr('checked')) {
            adminAssistance.push($('#adminAssist').val())
            mthly_Admin = areasArray.length * 80;
            yearly_admin = areasArray.length * 960;
            once_offAdmin = areasArray.length * 80;
        } else {
            adminAssistance = [];
            mthly_Admin = 0;
            yearly_admin = 0;
            once_offAdmin = 0;
        }
        $('#adminTBL').empty();
        let adminCosts = `<td class="addCostDetail">Admin Assist</td>
        <td class="addCostDetail" id="adminMonthly">R${mthly_Admin}</td>
        <td class="addCostDetail" id="adminYearly">R${yearly_admin}</td>
        <td class="addCostDetail" id="adminOnceOff">R${once_offAdmin}</td>`
        $(adminCosts).appendTo('#adminTBL');
        // console.log(categoriesArray.length);
        // console.log(adminAssistance)
        // calcAreas()
        calcTotalCosts();
    }

    $('#adminAssistance').click(() => {
        if ($("input[name='adminAssist']").attr('checked')) {
            $("input[name='adminAssist']").attr('checked', false)
            $('#adminAssist').val(0)
        } else {
            $("input[name='adminAssist']").attr('checked', true)
            $('#adminAssist').val(1)
        }
        calcAdminAss();
        calcTotalCosts();
    })

    // CHECK BOXES CATEGORY

    // ====================


    function calcCategories() {
        categoriesArray = []
        if ($('#catarea1').attr('checked')) {
            categoriesArray.push(parseInt($('#catarea1').val()))
        }
        if ($('#catarea2').attr('checked')) {
            categoriesArray.push(parseInt($('#catarea2').val()))
        }
        if ($('#catarea3').attr('checked')) {
            categoriesArray.push(parseInt($('#catarea3').val()))
        }
        if ($('#catarea4').attr('checked')) {
            categoriesArray.push(parseInt($('#catarea4').val()))
        }
        if ($('#catarea5').attr('checked')) {
            categoriesArray.push(parseInt($('#catarea5').val()))
        }
        if ($('#catarea6').attr('checked')) {
            categoriesArray.push(parseInt($('#catarea6').val()))
        }
        if ($('#catarea7').attr('checked')) {
            categoriesArray.push(parseInt($('#catarea7').val()))
        }
        if ($('#catarea8').attr('checked')) {
            categoriesArray.push(parseInt($('#catarea8').val()))
        }
        if ($('#catarea9').attr('checked')) {
            categoriesArray.push(parseInt($('#catarea9').val()))
        }
        if ($('#catarea10').attr('checked')) {
            categoriesArray.push(parseInt($('#catarea10').val()))
        }
        if ($('#catarea11').attr('checked')) {
            categoriesArray.push($('#catarea11').val())
        }
        if ($('#catarea12').attr('checked')) {
            categoriesArray.push(parseInt($('#catarea12').val()))
        }
        if ($('#catarea13').attr('checked')) {
            categoriesArray.push(parseInt($('#catarea13').val()))
        }
        if ($('#catarea14').attr('checked')) {
            categoriesArray.push(parseInt($('#catarea14').val()))
        }
        if ($('#catarea15').attr('checked')) {
            categoriesArray.push(parseInt($('#catarea15').val()))
        }
        if ($('#catarea16').attr('checked')) {
            categoriesArray.push(parseInt($('#catarea16').val()))
        }
        if ($('#catarea17').attr('checked')) {
            categoriesArray.push(parseInt($('#catarea17').val()))
        }
        if ($('#catarea18').attr('checked')) {
            categoriesArray.push(parseInt($('#catarea18').val()))
        }
        // console.log(categoriesArray);
        let per_monthCat = ''
        let per_yearCat = ''
        let once_offCat = ''
        // console.log('Categories:', categoriesArray);
        if (categoriesArray.length > 1) {
            per_monthCat = (categoriesArray.length - 1) * 10;
            per_yearCat = (categoriesArray.length - 1) * 70;
            once_offCat = (categoriesArray.length - 1) * 10;
        } else {
            per_monthCat = 0;
            per_yearCat = 0;
            once_offCat = 0;
        }
        $('#categoriesTBL').empty();
        let newCatPrices = `<td class="addCostDetail">Categories</td>
        <td class="addCostDetail" id="catMonthly">R${per_monthCat}</td>
        <td class="addCostDetail" id="catYearly">R${per_yearCat}</td>
        <td class="addCostDetail" id="catOnceOff">R${once_offCat}</td>`
        $(newCatPrices).appendTo('#categoriesTBL');
        calcTotalCosts();

    }

    // =========== Submit Form ==============

    $('#busnessName').blur(function (e) { 
        e.preventDefault();
        if ($(this).val() != ''){
            let busName = $(this).val();
        console.log(busName)
        let url = '/checkProfileNames/' + busName
        $.get(url).done((response)=>{
            if (response.length > 0) {
                $('#busineNameExists').css('display','block');
                $(this).focus();
                $(this).val('');    
            }
            setTimeout(()=>{
                $('#busineNameExists').css('display','none');

            },1250)
        })
        }
        
        
    });


    // =============================RESET BTN===============

    $('#resetBtn').click((e) => {
        $("input[name='area1']").attr('checked', false)
        $('#area1').val(0)
        $("input[name='area2']").attr('checked', false)
        $('#area2').val(0)
        $("input[name='area3']").attr('checked', false)
        $('#area3').val(0)
        $("input[name='area4']").attr('checked', false)
        $('#area4').val(0)
        $("input[name='area5']").attr('checked', false)
        $('#area5').val(0)
        $("input[name='area6']").attr('checked', false)
        $('#area6').val(0)
        $("input[name='area7']").attr('checked', false)
        $('#area7').val(0)
        $("input[name='area8']").attr('checked', false)
        $('#area8').val(0)
        $("input[name='catarea1']").attr('checked', false)
        $('#catarea1').val(0)
        $("input[name='catarea2']").attr('checked', false)
        $('#catarea2').val(0)
        $("input[name='catarea3']").attr('checked', false)
        $('#catarea3').val(0)
        $("input[name='catarea4']").attr('checked', false)
        $('#catarea4').val(0)
        $("input[name='catarea5']").attr('checked', false)
        $('#catarea5').val(0)
        $("input[name='catarea6']").attr('checked', false)
        $('#catarea6').val(0)
        $("input[name='catarea7']").attr('checked', false)
        $('#catarea7').val(0)
        $("input[name='catarea8']").attr('checked', false)
        $('#catarea8').val(0)
        $("input[name='catarea9']").attr('checked', false)
        $('#catarea9').val(0)
        $("input[name='catarea10']").attr('checked', false)
        $('#catarea10').val(0)
        $("input[name='catarea11']").attr('checked', false)
        $('#catarea11').val(0)
        $("input[name='catarea12']").attr('checked', false)
        $('#catarea12').val(0)
        $("input[name='catarea13']").attr('checked', false)
        $('#catarea13').val(0)
        $("input[name='catarea14']").attr('checked', false)
        $('#catarea14').val(0)
        $("input[name='catarea15']").attr('checked', false)
        $('#catarea15').val(0)
        $("input[name='catarea16']").attr('checked', false)
        $('#catarea16').val(0)
        $("input[name='catarea17']").attr('checked', false)
        $('#catarea17').val(0)
        $("input[name='catarea18']").attr('checked', false)
        $('#catarea18').val(0)
        $("input[name='adminAssist']").attr('checked', false)
        $('#adminAssist').val(0)
        calcAreas();
        calcCategories()
        calcAdminAss()
        calcTotalCosts();

    })
 

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