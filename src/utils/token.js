import { jwtDecode } from "jwt-decode";
function saveToken(token) {
    localStorage.setItem("access_token", token);
}

function getToken() {
    try {
        return jwtDecode(localStorage.getItem("access_token"))
    } catch (error) {}
}

// console.log(
//   jwtDecode(
//     // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiI3NmEzY2NhNS01Y2U0LTQ5ZGItOTlmNS02ZThkZTY5NDAxMWQiLCJuYW1lIjoiZnJvbnRlbnQyMDA0IiwiZW1haWwiOiJFbWFwbGVAZ2FtaWwuY29tIiwic3ViIjoiIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQXBwbGljYXRpb25Vc2VyIiwiZXhwIjoxNzExMTc0NTA3LCJpc3MiOiJzaG9kbW9uIiwiYXVkIjoic2hvZG1vbiJ9.nwKOrLthwdYXFdMhWA_JgVIPcGY3Y_UhgIJOAwSRHcE"
//   )
// );

function destroyToken() {
    localStorage.removeItem("access_token")
}

export {saveToken, destroyToken, getToken}