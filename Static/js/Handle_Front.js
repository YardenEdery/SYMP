//checks which os at the start of the html to know how to parse it
function CheckOs(){
    return window.navigator.platform;
}

//create form to post to backend
function CreateForm(){
}

//Drop down menu configration upon clicking on choose device button
document.getElementById('generate').onclick = function() { 

    var values = ["Gesher-Plada", "VM/PC", "AirPort", "Mazpin"];

    var select = document.createElement("select");
    select.name = "devices";
    select.id = "devices"

    for (const val of values) {
        var option = document.createElement("option");
        option.value = val;
        option.text = val.charAt(0).toUpperCase() + val.slice(1);
        select.appendChild(option);
    }

    var label = document.createElement("label");
    label.innerHTML = "Choose Device to run tests on: "
    label.htmlFor = "devices";

    document.getElementById("container").appendChild(label).appendChild(select);

    document.getElementById("generate").remove();

    var submitDevice = document.createElement("BUTTON");
    submitDevice.innerHTML = "Submit Device";
    submitDevice.id = "submitDevice"
    submitDevice.className = "submitbtn"
    document.body.appendChild(submitDevice);

    //Function which dynamically reloads our html
    //with the tests for our chosen device
    //after choosing value from drop down.
    submitDevice.addEventListener('click', function() {
        
    chosen_option = document.getElementById("devices").value;

    document.getElementById("container").remove();
    document.getElementById("submitDevice").remove();
    
    if (chosen_option == "Gesher-Plada"){
        LoadGp()
    }else if (chosen_option == "VM/PC"){
        LoadPc()
        
    }else if (chosen_option == "AirPort"){
        //pass
    }else if (chosen_option == "Mazpin"){
        //pass
    }   

}, false);;
    

}

//
function LoadGp(){
    alert('wroks')    
}

function LoadPc(){
    //create form without appending
    myform = create_form()

    //add form to already created div
    var show_form_div = document.getElementById("Display_form");
    show_form_div.appendChild(myform)
    
    //get form to append inputs to
    my_form = document.getElementById("myform");
    
    //input's text - ping.
    var ping_text_view = document.createElement("p");
    ping_text_view.innerHTML = "ping other devices:"
    myform.appendChild(ping_text_view);    
    //the input itself - ping.
    var ping_test = document.createElement("input");    
    ping_test.type = "text";
    ping_test.id = "ping_id"
    ping_test.className = "inputs"
    //add input to my form.
    myform.appendChild(ping_test);
    
    //added break line between test cases
    myform.appendChild(document.createElement("br"))

    //input's text - nslookup.
    var nslookup_text_view = document.createElement("p")
    nslookup_text_view.innerHTML = "choose a domain for lookup test: "
    myform.appendChild(nslookup_text_view);    
    //the input itself - nslookup.
    var nslookup_test = document.createElement("input");    
    nslookup_test.type = "text";
    nslookup_test.id = "nslookup_id"
    nslookup_test.className = "inputs"
    //add input to my form.
    myform.appendChild(nslookup_test);

    //added break line between test cases
    myform.appendChild(document.createElement("br"))
    
    //add submit btn last.
    post_btn = create_post_button()
    myform.appendChild(post_btn)
    
    //after creating submit btn linking it to a function on click.
    my_form.addEventListener("submit",function(){CollectInputs()},false);
}

function ValidateIPaddress(inputText){
    var ipformat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    if(inputText.match(ipformat)){
        document.body.inputText.focus();
    return true;
    }
    else{
        alert("You have entered an invalid IP address!");
        document.body.inputText.focus();
        return false;
    }
}

function create_form(){
    var myform = document.createElement("FORM");
    myform.method = "POST";
    myform.id = "myform";
    myform.enctype = "multipart/form-data";
    myform.acceptCharset = "UTF-8";
    return myform
}

function create_post_button(){
    var post_btn = document.createElement("INPUT");
    post_btn.setAttribute("type","submit");
    post_btn.id = "post_btn";
    post_btn.value = "Run Tests";
    post_btn.className = "postbtn"
    return post_btn
}
function CollectInputs(){
    MinorTestsJson = {"Minor-tests":
    {   "command": [["ping"],["nslookup"]]
        //[
        //    ["ping","dst_ip"],["nslookup","domain"]
        //]
    }
};

    //build your fucking json bitch.    
    var user_inputs = document.getElementsByClassName("inputs")
    
    //checks if the ip input is valid
    if(ValidateIPaddress(user_inputs[0].value)){
        for (var input = 0; input<user_inputs.length; input++){
            MinorTestsJson["Minor-tests"]["command"][input].push(user_inputs[input].value) //user_inputs[input].value;
        }
    }
    else{
        return "Invalid Ip has been assigned"
    }
    PostToBackend(MinorTestsJson)
}
function PostToBackend(MinorTestsJson){
    // Sending and receiving data in JSON format using POST method
    var xhr = new XMLHttpRequest();
    var url = "/";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            console.log(json.email + ", " + json.password);
        }
    };
    var data = JSON.stringify(MinorTestsJson);
    xhr.send(data);
}