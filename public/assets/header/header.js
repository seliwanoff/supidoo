$(document).ready(function() {

    $(".navbar-toggler").click(function() {


    })
    $(window).load(function() {
        // PAGE IS FULLY LOADED  
        // FADE OUT YOUR OVERLAYING DIV
        $('#overlay').fadeOut();
    });
    $("#passwordupdate").click(function() {
        var password = $("#password").val();
        if (password) {
            $(this).prop("diasbled", true).val('loading..');
            $.ajax({
                url: '../asset/header/process.php',
                type: 'GET',
                tradition: true,
                data: {
                    'password': password,

                },
                success: function(data) {
                    console.log(data);
                    if (data == 1) {
                        $(".main-message-1").css("display", "block");

                        $(".main-message-1").text("Password Changed Successfully");
                        window.setTimeout(function() {
                            $(".main-message-1").css("display", "none");
                        }, 3000)
                        $("#passwordupdate").val("Update");
                        $("#password").val("");


                    } else {

                        $(".main-message-1").text("Could not update Password").css("background", "red");
                        window.setTimeout(function() {
                            $(".main-message-1").css("display", "none");
                        }, 3000);
                        $("#passwordupdate").prop("disabled", false).val("Update");
                    }
                }
            })
        }
    })
    $("#updateemail").click(function() {

        var email = $("#email").val();
        if (email) {
            $(this).prop("diasbled", true).val('loading..');
            $.ajax({
                url: '../asset/header/process.php',
                type: 'GET',
                tradition: true,
                data: {
                    'email': email,

                },
                success: function(data) {

                    if (data == 1) {
                        $(".main-message-1").css("display", "block");
                        $(".main-message-1").text("Email Changed Successfully");
                        window.setTimeout(function() {
                            $(".main-message-1").css("display", "none");
                        }, 3000)
                        $("#passwordupdate").val("Update");
                        $("#email").val("");


                    } else {
                        $(".main-message-1").css("display", "block");
                        $(".main-message-1").text("Could not update Email").css("background", "red");
                        window.setTimeout(function() {
                            $(".main-message-1").css("display", "none");


                        }, 3000);
                        $("#updateemail").prop("disabled", false).val("Update");


                    }
                }
            })
        }
    })
    $("#deposit-con").click(function() {
        $(".instruction").css("display", "flex");
    })
    $("#close", ".instruction").click(function() {
        $(".instruction").hide();
    })
    $(".btn-mmn").click(function() {
alert()
        var amount = $("#amount").val();
        if (amount >= 50) {
            $(this).prop("diasbled", true).val('loading..');
            $.ajax({
                url: 'process.php',
                type: 'GET',
                tradition: true,
                data: {
                    'password': '',

                },
                success: function(data) {

                    if (data == 1) {

                        alert("Password Change successfully");
                    } else {
                        alert("Could not update password");
                    }
                }
            })
        } else {
            $(".throwerror").text("Minimum Amount $50").css("color", "red");
        }
    })
    $("#buy").click(function() {

        var fakeprice = $("#fakeprice").val();
        var fakeid = $("#fakeid").val();
        var service = $("#services").val();
        $.ajax({
            url: '../asset/header/process.php',
            type: 'GET',
            tradition: true,
            data: {
                'price': fakeprice,
                'id': fakeid,
                'service': service,
                'buy': "Buy"

            },

            success: function(data) {

                if (data == 1) {
                    $(".main-message-1").css("display", "block");
                    $(".main-message-1").html("You Have successfully purchased this item. Wait till it redirect your the tools details");
                    window.setTimeout(function() {
                        $(".main-message-1").css("display", "none");
                        window.location.href = '../details/?id=' + fakeid;
                    }, 3000)
                } else {
                    $(".main-message-1").css("display", "block");
                    $(".main-message-1").html("You balance is low from the the price of the item, Kindly deposit and try again.").css("background", "red");
                    window.setTimeout(function() {
                        $(".main-message-1").css("display", "none");


                    }, 3000);
                }
            }
        })

    })
})