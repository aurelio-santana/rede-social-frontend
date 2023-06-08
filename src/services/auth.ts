function getAuthHeader() {
    const token = localStorage.getItem("accessToken");
    const authHeader = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    return authHeader;
}

function getUserId(): string {
    const userId = localStorage.getItem("userId") as string;
    
    return  userId;
}

function getEmail(): string {
    const email = localStorage.getItem("email") as string;

    return email;
}

function getName(): string {
    const name = localStorage.getItem("name") as string;

    return name;
}

export { getAuthHeader, getUserId, getEmail, getName };