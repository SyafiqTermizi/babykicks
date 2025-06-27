interface SigninParam {
    email: string;
    password: string;
};

interface SignupParam extends SigninParam {
    username: string;
}

interface SigninResponse {
    access_token: string;
    username: string;
}

export class Api {
    baseUrl = "http://localhost:8000";
    baseHeader = { "Content-Type": "application/json" }
    authToken = "";

    constructor(authToken: string) {
        this.authToken = authToken;
    }

    async callApi(url: string, options: any) {
        let response;
        try {
            response = await fetch(url, options);
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

        return responseData;
    }

    async signin({ email, password }: SigninParam): Promise<SigninResponse> {
        const signinUrl = `${this.baseUrl}/users/signin`;
        const options = {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: this.baseHeader
        };

        const responseData = await this.callApi(signinUrl, options);
        return responseData;
    };

    async signup({ email, username, password }: SignupParam): Promise<SignupParam> {
        const signupUrl = `${this.baseUrl}/users/signup`;
        const options = {
            method: "POST",
            body: JSON.stringify({ email, username, password }),
            headers: this.baseHeader
        };

        const responseData = await this.callApi(signupUrl, options);
        return responseData;
    }

    async createKick() {
        const authToken = this.authToken;
        if (!authToken) return;

        const createkickUrl = `${this.baseUrl}/kicks`;
        const headers = {
            ...this.baseHeader,
            'Authorization': `bearer ${authToken}`
        };

        const options = {
            method: "POST",
            headers: headers
        };

        return this.callApi(createkickUrl, options);
    };

    async getTodayKicks() {
        const authToken = this.authToken;
        if (!authToken) return;

        const getTodayKicksUrl = `${this.baseUrl}/kicks`;
        const headers = {
            ...this.baseHeader,
            'Authorization': `bearer ${authToken}`
        };

        const options = {
            method: "GET",
            headers: headers
        };

        return this.callApi(getTodayKicksUrl, options);
    };

    async deleteKick(kickId: string) {
        const authToken = this.authToken;
        if (!authToken) return;

        const deleteKicksUrl = `${this.baseUrl}/kicks/${kickId}`;
        const headers = {
            ...this.baseHeader,
            'Authorization': `bearer ${authToken}`
        };

        const options = {
            method: "DELETE",
            headers: headers
        };

        return this.callApi(deleteKicksUrl, options);
    }
}