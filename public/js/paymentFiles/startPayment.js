$(function () {
    let totalMonthly = parseInt($('#Omth').text().substring(1, $('#Omth').text().length)) +
        parseInt($('#Cmth').text().substring(1, $('#Cmth').text().length)) + parseInt($('#AMth').text().substring(1, $('#AMth').text().length));

    let totalAnnual = parseInt($('#OYr').text().substring(1, $('#OYr').text().length)) +
        parseInt($('#CYr').text().substring(1, $('#CYr').text().length)) + parseInt($('#AYr').text().substring(1, $('#AYr').text().length));

    let totalOnceOff = parseInt($('#OOnce').text().substring(1, $('#OOnce').text().length)) +
        parseInt($('#COnce').text().substring(1, $('#COnce').text().length)) + parseInt($('#AOnce').text().substring(1, $('#AOnce').text().length));
    let totals = `<tr>
                    <td>Totals</td>
                    <td class="addPayDetail">R ${totalMonthly}</td>
                    <td class="addPayDetail">R ${totalAnnual}</td>
                    <td class="addPayDetail">R ${totalOnceOff}</td>
                    </tr>`
    $(totals).appendTo('#table')
    choice()
    let id = $('#id').val();
    let successMthly;
    let successAnnual;
    let successOnce;
    
    $('#MonthlyPmt').change(() => {
        $('#amountDue').text(`R ${totalMonthly}`)
        $('#payNow').empty()
        let paynow;
        let urlCancelExtension = $('#urlDetail').text()
        let url = `/createSuccessLink/${id}/Monthly/${totalMonthly}`
        $.get(url).done((response)=>{
            console.log(response)
            successMthly = response;
        })
        // let urlSuccessExtension = `${urlCancelExtension}001-${totalMonthly}`
        let urlSuccessExtension = `${successMthly}`
        console.log(urlSuccessExtension)
            paynow = `<a
                        href="https://www.payfast.co.za/eng/process?cmd=_paynow&amp;receiver=10469596&amp;item_name=RecipeTest110119&amp;amount=${totalMonthly}.00&amp;return_url=http%3A%2F%2Fwww.suburbsdirectory.co.za/successfulPayment/${urlSuccessExtension}&amp;cancel_url=https%3A%2F%2Fwww.suburbsdirectory.co.za/startPaymentProcess/${urlCancelExtension}"><img
                        src="https://www.payfast.co.za/images/buttons/light-small-paynow.png" width="165"
                        height="36" alt="Pay" title="Pay Now with PayFast" /></a>`
         
        $(paynow).appendTo('#payNow')

    })
    $('#AnnualPayment').change(() => {
        $('#amountDue').text(`R ${totalAnnual}`)
        $('#payNow').empty()
        let paynow;
        let urlCancelExtension = $('#urlDetail').text()
        let url = `/createSuccessLink/${id}/Annual/${totalAnnual}`
        $.get(url).done((response)=>{
            console.log(response)
            successAnnual = response;
        })
        let urlSuccessExtension = `${successAnnual}`
            paynow = `<a
                        href="https://www.payfast.co.za/eng/process?cmd=_paynow&amp;receiver=10469596&amp;item_name=RecipeTest110119&amp;amount=${totalAnnual}.00&amp;return_url=http%3A%2F%2Fwww.suburbsdirectory.co.za/successfulPayment/${urlSuccessExtension}&amp;cancel_url=https%3A%2F%2Fwww.suburbsdirectory.co.za/startPaymentProcess/${urlCancelExtension}"><img
                        src="https://www.payfast.co.za/images/buttons/light-small-paynow.png" width="165"
                        height="36" alt="Pay" title="Pay Now with PayFast" /></a>`
         
        $(paynow).appendTo('#payNow')
    })
    $('#OnceOffPayment').change(() => {
        $('#amountDue').text(`R ${totalOnceOff}`)
        $('#payNow').empty()
        let paynow;
        let urlCancelExtension = $('#urlDetail').text()
        let url = `/createSuccessLink/${id}/Once Off/${totalOnceOff}`
        $.get(url).done((response)=>{
            console.log(response)
            successOnce = response;
        })
        let urlSuccessExtension = `${successOnce}`
        // let urlSuccessExtension = `${urlCancelExtension}003-${totalOnceOff}`
            paynow = `<a
                        href="https://www.payfast.co.za/eng/process?cmd=_paynow&amp;receiver=10469596&amp;item_name=RecipeTest110119&amp;amount=${totalOnceOff}.00&amp;return_url=http%3A%2F%2Fwww.suburbsdirectory.co.za/successfulPayment/${urlSuccessExtension}&amp;cancel_url=https%3A%2F%2Fwww.suburbsdirectory.co.za/startPaymentProcess/${urlCancelExtension}"><img
                        src="https://www.payfast.co.za/images/buttons/light-small-paynow.png" width="165"
                        height="36" alt="Pay" title="Pay Now with PayFast" /></a>`
         
        $(paynow).appendTo('#payNow')
    })
    function choice() {
        setTimeout(()=>{
            $('#choice').empty()
        $('#payNow').empty()
        let choice;
        let paynow;
        let urlCancelExtension = $('#urlDetail').text()
        let url = `/createSuccessLink/${id}/Monthly/${totalMonthly}`
        $.get(url).done((response)=>{
            console.log(response)
            successMthly = response;
        })
        // let urlSuccessExtension = `${urlCancelExtension}001-${totalMonthly}`
        let urlSuccessExtension = `${successMthly}`
            choice = `<label for="" id="amountDue" style="font-weight: bold">R ${totalMonthly}</label>`
            paynow = `<a
                        href="https://www.payfast.co.za/eng/process?cmd=_paynow&amp;receiver=10469596&amp;item_name=RecipeTest110119&amp;amount=${totalMonthly}.00&amp;return_url=http%3A%2F%2Fwww.suburbsdirectory.co.za/successfulPayment/${urlSuccessExtension}&amp;cancel_url=https%3A%2F%2Fwww.suburbsdirectory.co.za/startPaymentProcess/${urlCancelExtension}"><img
                        src="https://www.payfast.co.za/images/buttons/light-small-paynow.png" width="165"
                        height="36" alt="Pay" title="Pay Now with PayFast" /></a>`
        $(choice).appendTo('#choice')
        $(paynow).appendTo('#payNow') 
            
        },200)
        
    }
});