import axios from "axios";
import Router from "next/router";

axios.interceptors.request.use((value) => {
    const clientId = 'online-trading-gateway';
    const authorityPath = 'https://cluster.tech1a.co';

    if (typeof window !== 'undefined') {
        const oidcStorage:any = localStorage.getItem(`oidc.user:${authorityPath}:${clientId}`)
        let token = JSON.parse(oidcStorage)?.access_token
        let tokenType = JSON.parse(oidcStorage)?.token_type
        value.headers = {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer'+" "+'eyJhbGciOiJSUzI1NiIsImtpZCI6IjQ5QzFGM0JGRkNCRjdGNTQ1MDk3OUNFQ0ZEQzRCMEQxNzdEQTgxNjRSUzI1NiIsInR5cCI6ImF0K2p3dCIsIng1dCI6IlNjSHp2X3lfZjFSUWw1enNfY1N3MFhmYWdXUSJ9.eyJuYmYiOjE2Nzg4ODExMjksImV4cCI6MTY3ODg4NDcyOSwiaXNzIjoiaHR0cHM6Ly9jbHVzdGVyLnRlY2gxYS5jbyIsImNsaWVudF9pZCI6ImxvY2FsX2FwaV9zd2FnZ2VyIiwic3ViIjoiZTg5MmVhZTctY2YyZS00OGQ4LWEwMjQtYTdjOWViMGY4NjY4IiwiYXV0aF90aW1lIjoxNjc4ODgxMTI5LCJpZHAiOiJsb2NhbCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJJZGVudGl0eVNlcnZlckFwaSI6IklkZW50aXR5U2VydmVyQXBpLkFsbCIsIkZpbGVNYW5hZ2VyU3lzdGVtIjoiRmlsZU1hbmFnZXJTeXN0ZW0uQWxsIiwiTWFya2V0UnVsZVN0b3JlIjoiTWFya2V0UnVsZVN0b3JlLkFsbCIsIkJvb2tCdWlsZGluZ1N0b3JlIjoiQm9va0J1aWxkaW5nU3RvcmUuQWxsIiwiT3JkZXJNZWRpYXRvciI6Ik9yZGVyTWVkaWF0b3IuQWxsIiwiQ3VzdG9tZXJNYW5hZ2VtZW50IjpbIkN1c3RvbWVyTWFuYWdlbWVudC5BbGwiLCJDdXN0b21lck1hbmFnZW1lbnQuT25saW5lUmVnaXN0cmF0aW9uUHJvZmlsZS5SZWFkIiwiQ3VzdG9tZXJNYW5hZ2VtZW50Lk9ubGluZVJlZ2lzdHJhdGlvblByb2ZpbGUuQ3JlYXRlIiwiQ3VzdG9tZXJNYW5hZ2VtZW50Lk9ubGluZVJlZ2lzdHJhdGlvblByb2ZpbGUuRWRpdCJdLCJJbnRyYWRheVBvcnRmb2xpbyI6IkludHJhZGF5UG9ydGZvbGlvLkFsbCIsIk9yZGVyU3RvcmUiOiJPcmRlclN0b3JlLkFsbCIsImp0aSI6IjI3MzE4NTYwNkU0OEYzRkRBRTY0MDVEMEEwOUIyNUM4Iiwic2lkIjoiNjhDNEFCNzNEMDg2MzNEQUIwOUNDQ0YwNEE3RjA4QTMiLCJpYXQiOjE2Nzg4ODExMjksInNjb3BlIjpbIm9wZW5pZCJdLCJhbXIiOlsicHdkIl19.Oci_ZSmzS7WifEf4nTMbOWHu-5Fq1ku-WkPxL2GZHRNWIIWGCINTxDYXRAqcn-UmPpmiT2Z6fLyDp8SCyQAAo5TO_3cC0HaTCKHbVoq-Jekl3GGZdcnkbpKgYT5SbVpg7QZ-PKHfjOS-rQoijYHG7heABLX37TImL47jAiU1whck_mlvmiDJpbn88ZnWvl_huWlBVaRsD6wFgHYtUw-g-iMfrP76iCGfeYZoQ6aq_vJqa4qtnU1PWYFapjAM2K-dc6HSaQdLKBFTqf4QlVHCdeRZR4RrcSAvmxe1K1Q4CRLLaEXRc0AxT2OHhHfe5WcKz33gItRcKXxBeKFHbN5V3A',
        }

        return value
    }
})

axios.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (error.response) {
            // if (error.response.status === 401) {
            //     localStorage.removeItem('oidc.user:https://cluster.tech1a.co:online-trading-gateway');
            //     Router.push('/');
            // }
        }

        return Promise.reject(error);
    }
);