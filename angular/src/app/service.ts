import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Response, Http, RequestOptions, Headers } from '@angular/http';

const options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' }) });
@Injectable()
export class Service {
    constructor(private http: Http) { }

    private getDomain() {
        let location = window.location;
        if (location.port === "4200") {
            return "http://localhost:8080";
        } else {
            return location.origin;
        }
    }

    private request(observable: Observable<Response>): Promise<any> {
        return observable.toPromise().then(response => {
            try {
                return response.json();
            } catch (e) {
                return response;
            }
        }).catch(error => Promise.reject(error));
    }

    public get(url: String): Promise<any> {
        return this.request(this.http.get(this.getDomain() + url));
    }

    public delete(url: String): Promise<any> {
        return this.request(this.http.delete(this.getDomain() + url));
    }

    public post(url: String, body: any): Promise<any> {
        if (typeof body !== "string") {
            body = JSON.stringify(body);
        }
        return this.request(this.http.post(this.getDomain() + url, body, options));
    }

    public put(url: String, body: any): Promise<any> {
        if (typeof body !== "string") {
            body = JSON.stringify(body);
        }
        return this.request(this.http.put(this.getDomain() + url, body, options));
    }
}
