
const login = () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "admin" && password === "admin123") {
        // alert("Login Successfull");
        window.location.href = "dashboard.html" ;
    } else {
        alert("Invalid Credential");
    }

}

