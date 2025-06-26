interface SigninParam {
    email: string;
    password: string;
};

export class Api {
    baseUrl = "http://localhost:8000";
    baseHeader = { "Content-Type": "application/json" }

    async login({ email, password }: SigninParam): Promise<string> {
        const signinUrl = `${this.baseUrl}/users/signin`;
        const options = {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: this.baseHeader
        };

        let response;
        try {
            response = await fetch(signinUrl, options);
        } catch {
            throw Error("We can't connect to the remote server. Please try again later.");
        };

        if (!response.ok) {
            throw Error("Invalid username/password.");
        }

        let responseData;
        try {
            responseData = await response.json();
        } catch {
            throw Error("Fail decoding response data");
        };

        return responseData["access_token"];
    }
}