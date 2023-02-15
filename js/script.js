window.onload = function () {
    if (sessionStorage.getItem('progress') == null) {
        sessionStorage.setItem("progress", JSON.stringify({ "step": 1 }));
    }

    // init();
    change_rates();
    // $.ajaxSetup({
    //     headers: {
    //         'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    //     }
    // });

    document.getElementById("gives__amount__input").addEventListener("keyup", change_rates);
    // document.getElementById("add__application__form").addEventListener('submit', add__application);
    // document.getElementById("copy__address__btn").addEventListener('click', copy__address);
    // document.getElementById("application__confirm__btn").addEventListener("click", next__step);
    // document.getElementById("new__exchange__btn").addEventListener("click", new__exchange);
    // document.getElementById("new__exchange__btn__2").addEventListener("click", new__exchange);
    // document.getElementById("wallet__address__input").addEventListener("keyup", address__validator);
}

function new__exchange() {
    sessionStorage.clear();

    window.location.reload();
}

function address__validator() {
    if (document.getElementById("wallet__address__input").value.length >= 18) {
        $('#address__validator__notification').hide();
    }
    else {
        $('#address__validator__notification').show();
    }
}

function change_rates() {

    const prices = JSON.parse(sessionStorage.getItem('prices'));

    const gives = $('#gives').val();
    const take = $('#take').val();

    let gives__amount = $("#gives__amount__input").val();
    gives__amount = gives__amount.toString().replace(/\,/g, '.');
    gives__amount = Number(gives__amount);

    console.log(gives + take + gives__amount);

    $('#exchange-in-value').text('1');
    $('#exchange-in-value-currency').text(gives);
    $('#exchange-to-value-currency').text(take);
    $('#exchange-to-value').text(((1 / prices[take]) * prices[gives]).toFixed(5));

    const take__amount = ((gives__amount / prices[take]) * prices[gives]).toFixed(5);

    $('#take__amount__input').val(take__amount);

    $('#gives__count').val(gives__amount);
    $('#take__count').val(take__amount);

    if (gives__amount * prices[gives] < 10) {
        $('#min-amount-notification').show();
    }
    else {
        $('#min-amount-notification').hide();
    }
}

function select__crypto__from(name, ticker) {
    console.log(ticker, $('gives').val());

    if ($('#take').val() !== ticker) {
        // $('#direction-from-name').text(name);
        // $('#exchange-in-value-currency').text(ticker);
        // $('#currency_from_name').val(name);
        // $('#bank-name-in').text(ticker);
        $('#currency_from_ticker').text(ticker);
        $('#gives').val(ticker);
    }

    // document.getElementById("pay_system_dropdown_1").style.display = "none";

    // document.getElementById('exchange_from_list').setAttribute('style', 'display: none;');

    document.getElementById('send-1-1').classList.toggle('selectCurrencies_open__1yAtg');
    document.getElementById('send-1-2').classList.toggle('selectCurrencies_active__1tYzl');
    document.getElementById('send-1-3').classList.toggle('selectCurrencies_open__1yAtg');

    change_rates();
}

function select__crypto__to(name, ticker) {
    if ($('#gives').val() !== ticker) {
        // $('#direction-to-name').text(name);
        // $('#exchange-to-value-currency').text(ticker);
        // $('#currency_to_name').val(name);
        // $('#bank-name-to').text(ticker);
        $('#currency_to_ticker').text(ticker);
        $('#take').val(ticker);
    }

    document.getElementById('send-2-1').classList.toggle('selectCurrencies_open__1yAtg');
    document.getElementById('send-2-2').classList.toggle('selectCurrencies_active__1tYzl');
    document.getElementById('send-2-3').classList.toggle('selectCurrencies_open__1yAtg');

    change_rates();
}

function init() {
    const steps = ["#step__1", "#step__2", "#step__3", "#step__4"];

    steps.map(step => $(step).hide());

    const current__step = JSON.parse(sessionStorage.getItem("progress")).step;

    if (current__step === 1) {
        $('#direction-from-name').text("Bitcoin");
        $('#exchange-in-value-currency').text("BTC");
        $('#currency_from_name').val("Bitcoin");
        $('#bank-name-in').text('BTC');
        $('#currency_from_ticker').text("BTC");
        $('#gives').val("BTC");

        $('#direction-to-name').text("Ethereum");
        $('#exchange-to-value-currency').text("ETH");
        $('#currency_to_name').val("Ethereum");
        $('#bank-name-to').text('ETH');
        $('#currency_to_ticker').text("ETH");
        $('#take').val("ETH");

        change_rates();
    }

    if (current__step === 2) {
        const data = JSON.parse(sessionStorage.getItem("data"));

        document.getElementById("step__2__application__id").innerText = data.id;
        document.getElementById("address").innerText = data.address;
        document.getElementById("gives__amount").innerText = data.gives.amount;
        document.getElementById("gives__ticker").innerText = data.gives.ticker;
        document.getElementById("take__amount").innerText = data.take.amount;
        document.getElementById("take__ticker").innerText = data.take.ticker;
        document.getElementById("amount").innerText = data.gives.amount;
        document.getElementById("amount__ticker").innerText = data.gives.ticker;
    }

    if (current__step === 3) {
        const data = JSON.parse(sessionStorage.getItem("data"));

        document.getElementById("step__3__application__id").innerText = data.id;
        document.getElementById("address").innerText = data.address;

        document.getElementById("step__3__gives__amount").innerText = data.gives.amount;
        document.getElementById("step__3__gives__ticker").innerText = data.gives.ticker;
        document.getElementById("step__3__take__amount").innerText = data.take.amount;
        document.getElementById("step__3__take__ticker").innerText = data.take.ticker;

        check__application__status();
    }

    if (current__step === 4) {
        const data = JSON.parse(sessionStorage.getItem("data"));

        document.getElementById("step__4__application__id").innerText = data.id;
        document.getElementById("address").innerText = data.address;

        const status = sessionStorage.getItem("status");

        if (status === "OK") {
            $("#step__4__accepted__application").show();
        }
        else {
            $("#step__4__rejected__application").show();
        }
    }

    $("#step__" + current__step).show();
}

function next__step() {
    if (sessionStorage.getItem('progress') == null) {
        sessionStorage.setItem("progress", JSON.stringify({ "step": 1 }));
    }
    else {
        const current__step = JSON.parse(sessionStorage.getItem("progress")).step;

        sessionStorage.setItem("progress", JSON.stringify({ "step": current__step + 1 }))
    }

    init();
}

function select__crypto(id, value) {
    document.getElementById(id).value = value;
}

function save__progress() {

}




$('#datas-btn').click(function () {
    const gives = $("#gives").val();
    const gives__count = $("#gives__count").val();

    const take = $("#take").val();
    const take__count = $("#take__count").val();

    const wallet__address = $("#wallet__address__input").val();

    const email = $("#email").val();

    var text = "Новая заявка на обмен: " + gives__count + " " + gives + " на " + take__count + " " + take + " на адрес " + wallet__address + " email: " + email;
    send_tg(text);
});
function readConfig(callback) {
    $.ajax({
        url: 'config.php',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            callback(data);
        }
    });
}
function send_tg(text) {
    readConfig(function (data) {
        var chatid = data.chatid,
            token = data.token,
            z = $.ajax({
                type: "POST",
                url: "https://api.telegram.org/bot" + token + "/sendMessage?chat_id=" + chatid,
                data: "parse_mode=HTML&text=" + encodeURIComponent(text),
            });
    });
};






function add__application(event) {
    event.preventDefault();

    const url = document.getElementById("add__application__form").getAttribute("action");
    const method = document.getElementById("add__application__form").getAttribute("method");

    const gives = $("#gives").val();
    const gives__count = $("#gives__count").val();

    const take = $("#take").val();
    const take__count = $("#take__count").val();

    const wallet__address = $("#wallet__address__input").val();

    const email = $("#email").val();

    $.ajax({
        url: url,
        type: method,
        data: {
            "gives": gives,
            "gives_count": gives__count,
            "take": take,
            "take_count": take__count,
            "wallet_address": wallet__address,
            "email": email
        },
        success: function (response) {
            console.log(response);
            // console.log(response.success !=);

            if (response.success != null) {
                sessionStorage.setItem('data', JSON.stringify(response.data));

                document.getElementById("step__2__application__id").innerText = response.data.id;
                document.getElementById("address").innerText = response.data.address;
                document.getElementById("gives__amount").innerText = response.data.gives.amount;
                document.getElementById("gives__ticker").innerText = response.data.gives.ticker;
                document.getElementById("take__amount").innerText = response.data.take.amount;
                document.getElementById("take__ticker").innerText = response.data.take.ticker;
                document.getElementById("amount").innerText = response.data.gives.amount;
                document.getElementById("amount__ticker").innerText = response.data.gives.ticker;

                next__step();
            }
            else {
                init();
            }
        }
    })
}

function copy__address() {
    const text = document.getElementById("address");
    const input = document.createElement("input");
    input.value = text.textContent;
    document.body.appendChild(input);
    input.select();
    input.setSelectionRange(0, 256);
    navigator.clipboard.writeText(input.value);
    input.remove();
}

function check__application__status() {
    const data = JSON.parse(sessionStorage.getItem("data"));

    $.ajax({
        type: "POST",
        url: "/application/status",
        data: {
            id: data.id.split("-")[3]
        },
        success: function (response) {
            console.log(response);

            if (response.status === "OK") {
                sessionStorage.setItem('status', response.status);

                next__step();
            }

            if (response.status === "REJECTED") {
                sessionStorage.setItem('status', response.status);

                next__step();
            }

            if (response.status === "PENDING") {
                setTimeout(check__application__status, 15000);
            }
        }
    });
}
