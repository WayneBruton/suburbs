$(function () {
    $('#email').val('').focus()
    $('#Upassword').blur(function (e) {
        e.preventDefault();
        let passwordText = $(this).val();
        if ((passwordText.length < 6) && (passwordText.length !== 0)) {
            $('#alertMessageText').text('Password must be at least 6 characters long');
            $('#alertMessage').css('display', 'flex');
            $(this).val('');
            $(this).focus();
            setTimeout(() => {
                $('#alertMessage').css('display', 'none');
            }, 1500);
        }
    });
    $('#UpasswordR').blur(function (e) {
        e.preventDefault();
        let passwordTextR = $(this).val();
        let passwordText = $('#Upassword').val();

        if (passwordText !== passwordTextR) {
            $('#alertMessageText').text('Passwords Do not Match');
            $('#alertMessage').css('display', 'flex');
            $(this).focus();
            setTimeout(() => {
                $('#alertMessage').css('display', 'none');
            }, 1500);
        }
    });

    $('#UpasswordR').keyup(function (e) {
        let passwordTextR = $(this).val();
        let passwordText = $('#Upassword').val();
        if (passwordText === passwordTextR) {
            $('#submitBtn').css('display', 'block')
            $('#submitBtn').focus();
        }
    });
    $('#submitBtn').click(() => {
        console.log('Awesome');
    })
    $('#email').blur((e) => {
        e.preventDefault();
        if ($(this).val() !== '') {
            let userEmail = $('#email').val();
            console.log(userEmail)
            let url = `/checkUserExists/${userEmail}`;
            $.get(url, (res) => {
                console.log(res);
            }).done((response) => {
                console.log('This is response to checking if user exists', response)
                if (response.length) {
                    // $('#userExists').val('This user already exists')
                    $('#userExists').css('display', 'block');
                    $('#email').val('');
                    $('#email').focus()
                    setTimeout(() => {
                        $('#userExists').css('display', 'none');
                    }, 1500)
                }
            })
        }
    })



    $('#userEmail').blur((e) => {
        e.preventDefault();
        if ($('#userEmail').val() != '') {
            let userEmail = $('#userEmail').val();
            console.log(userEmail)
            let url = `/checkUserExists/${userEmail}`;
            $.get(url, (res) => {
                console.log(res);
            }).done((response) => {
                console.log('This is response to checking if user exists', response)
                if (response.length === 0) {
                    // $('#userExists').val('This user already exists')
                    $('#LoginUserExists').css('display', 'block');
                    $('#userEmail').val('');
                    $('#userEmail').focus()
                    setTimeout(() => {
                        $('#LoginUserExists').css('display', 'none');
                    }, 1500)
                }
            })
        }
    })

    $('#userresetEmail').blur((e) => {
        e.preventDefault();
        if ($('#userresetEmail').val() != '') {
            let userEmail = $('#userresetEmail').val();
            console.log(userEmail)
            let url = `/checkUserExists/${userEmail}`;
            $.get(url, (res) => {
                console.log(res);
            }).done((response) => {
                console.log('This is response to checking if user exists', response)
                if (response.length === 0) {
                    // $('#userExists').val('This user already exists')
                    $('#LoginUserExists').css('display', 'block');
                    $('#userresetEmail').val('');
                    $('#userresetEmail').focus()
                    setTimeout(() => {
                        $('#LoginUserExists').css('display', 'none');
                    }, 1500)
                }
            })
        }
    })

    let token;

    $('#sendMailToken').click((e) => {
        e.preventDefault();
        let email = $('#userresetEmail').val();
        if (email != '') {
            let url = `/resetUser/${email}`
            console.log(url)
            $.get(url).done((response) => {
                console.log(response);
                token = response[0].resettoken;
                console.log(token)
                $('#sendToken').css('display', 'none')
                $('.resetPass').css('display', 'block')
            })
        }
    })

    $('#token').blur((e)=>{
        e.preventDefault();
        let enteredToken = $('#token').val();
        console.log(enteredToken);
        if (enteredToken !== token) {
            $('#token').val('').focus()
            $('#wrongToken').css('display', 'block')
            setTimeout(()=>{
                $('#wrongToken').css('display', 'none')
            }, 1500)
        }
    })

    $('#repeatPassword').blur((e)=>{
        e.preventDefault();
        if ($('#repeatPassword').val() !== $('#Userpassword').val()){
            $('#repeatPassword').val('')
            $('#Userpassword').val('').focus()
            $('#LoginAlertMessage').css('display', 'block')
            setTimeout(()=>{
                $('#LoginAlertMessage').css('display', 'none')
            }, 1500)
        
        }
    })
});