window.onload = () =>{

    //date parameters
    let parameters = {
      yearMin: 1920,
      yearMax: 2020,
    };

    let months = ['January','February','March','April','May','June','July',
        'August','September','October','November','December'];

    //fill month select
    months.map(month => {
        let e = document.createElement('option');
        e.innerHTML = month;
        e.value = month;  // set the attribute
        document.getElementById('month').appendChild(e);
    });

    //fill year select
    for(let i = parameters.yearMin; i <= parameters.yearMax; i++){
        let e = document.createElement('option');
        e.innerHTML = i;
        e.value = i;  // set the attribute
        document.getElementById('year').appendChild(e);
    }

    //fill day select
    for(let i = 1; i <= 31; i++){
        let e = document.createElement('option');
        e.innerHTML = i;
        e.value = i;  // set the attribute
        document.getElementById('day').appendChild(e);
    }

    //validate form
    document.forms['form'].addEventListener("submit", function validateForm(e) {

        e.preventDefault();  //not to POST form standart way
        let isOk = true;  //error indicator

        //date validating
        let d = document.forms['form']['day'].value;
        let m = document.forms['form']['month'].value;
        let y = document.forms['form']['year'].value;
        if(d == null || d === ""){
            alert("Please select date.");
            isOk = false;
        }
        if(m == null || m === ""){
            alert("Please select date.");
            isOk = false;
        }
        if(y == null || y === ""){
            alert("Please select date.");
            isOk = false;
        }
        if((m === 4 || m === 6 || m === 9 || m === 11) && d === 31) {
            alert("Selected month contains only 30 days.");
            isOk = false;
        }
        if(m === 'February' && d>29 && (y%4 === 0)) {
            alert("Selected month contains only 29 days.");
            isOk = false;
        }
        if((m === 'February') && d > 28) {
            alert("Selected month contains only 28 days.");
            isOk = false;
        }


        //password validating
        let str =/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
        if(!str.test(document.forms['form']['password'].value)){
            alert("Password is too simple");
            isOk = false;
        }

        if(document.forms['form']['password'].value!==document.forms['form']['password-repeat'].value){
            alert("Passwords must be the same");
            isOk = false;
        }

        let form_data = {
            first_name: document.forms['form']['first-name'].value,
            password : document.forms['form']['password'].value,
            last_name: document.forms['form']['last-name'].value,
            birthday: document.forms['form']['day'].value+'-'+
                Number(months.indexOf(document.forms['form']['month'].value)+1)+'-'+
                document.forms['form']['year'].value,
            gender: document.forms['form']['gender'].value,
            email: document.forms['form']['e-mail'].value
        };
        console.log(form_data);
        if(isOk){
            fetch("server-ok.json", {
                method: 'POST',
                body: form_data
            })
                .then(response => alert( "Data Saved"))
                .catch(error => console.error(error));

            document.forms['form'].reset();  //clear form
        }
        return false;
    });
};

