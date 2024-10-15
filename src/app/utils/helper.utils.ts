import { HttpClient } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class HelperUtils {
    constructor(private router: Router) {}

    getAge(date: Date) {
        const now = new Date();

        const yearNow = now.getFullYear();
        const monthNow = now.getMonth();
        const dateNow = now.getDate();

        const dob = new Date(date);

        const yearDob = dob.getFullYear();
        const monthDob = dob.getMonth();
        const dateDob = dob.getDate();
        let age: any = {};
        let ageString = '';
        let yearString = '';
        let monthString = '';
        let dayString = '';
        let monthAge = 0;
        let dateAge = 0;

        let yearAge = yearNow - yearDob;

        if (monthNow >= monthDob) monthAge = monthNow - monthDob;
        else {
            yearAge--;
            monthAge = 12 + monthNow - monthDob;
        }

        if (dateNow >= dateDob) dateAge = dateNow - dateDob;
        else {
            monthAge--;
            dateAge = 31 + dateNow - dateDob;

            if (monthAge < 0) {
                monthAge = 11;
                yearAge--;
            }
        }

        age = {
            years: yearAge,
            months: monthAge,
            days: dateAge,
        };

        if (age.years > 1) yearString = ' tahun';
        else yearString = ' tahun';
        if (age.months > 1) monthString = ' bulan';
        else monthString = ' bulan';
        if (age.days > 1) dayString = ' hari';
        else dayString = ' hari';

        if (age.years > 0 && age.months > 0 && age.days > 0)
            ageString = age.years + yearString + ' , ' + age.months + monthString + ', dan ' + age.days + dayString;
        else if (age.years == 0 && age.months == 0 && age.days > 0) ageString = age.days + dayString + '';
        else if (age.years > 0 && age.months == 0 && age.days == 0) ageString = age.years + yearString + '. Happy Birthday!!';
        else if (age.years > 0 && age.months > 0 && age.days == 0) ageString = age.years + yearString + ' dan ' + age.months + monthString;
        else if (age.years == 0 && age.months > 0 && age.days > 0) ageString = age.months + monthString + ' dan ' + age.days + dayString;
        else if (age.years > 0 && age.months == 0 && age.days > 0) ageString = age.years + yearString + ' dan ' + age.days + dayString;
        else if (age.years == 0 && age.months > 0 && age.days == 0) ageString = age.months + monthString;
        else ageString = '1 hari';

        return ageString;
    }

    goToURL(link?: string) {
        window?.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });

        this.router.navigateByUrl(link!);
    }

    scrollToElement(id: string): void {
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }

    scrollToTop() {
        window?.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    }

    goToLinkOnly(link: string) {
        window.open(link, '_blank');
    }

    goToLink(link: string) {
        window.open(link, '_blank');
    }

    getInitials = (name: string) => {
        const parts = name.split(' ');
        let initials = '';
        for (let i = 0; i < parts.length; i++) {
            if (parts[i].length > 0 && parts[i] !== '') {
                initials += parts[i][0];
            }
        }
        return initials;
    };

    validateEmail = (email: string) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    isValidUrl = (urlString: string) => {
        try {
            new URL(urlString);
            return true;
        } catch (err) {
            return false;
        }
    };

    copyMessage(val: string) {
        const selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = val;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);
    }

    generateRandomString = (length = 0, randomString = ''): string => {
        randomString += Math.random().toString(20).substr(2, length);
        if (randomString.length > length) return randomString.slice(0, length);
        return this.generateRandomString(length, randomString);
    };
    
    getRandomInt(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    getBrowserType() {
        let nVer = navigator.appVersion;
        let nAgt = navigator.userAgent;
        let browserName  = navigator.appName;
        let fullVersion  = ''+parseFloat(navigator.appVersion); 
        let majorVersion = parseInt(navigator.appVersion,10);
        let nameOffset,verOffset,ix;

        // In Opera, the true version is after "OPR" or after "Version"
        if ((verOffset=nAgt.indexOf("OPR"))!=-1) {
        browserName = "Opera";
        fullVersion = nAgt.substring(verOffset+4);
        if ((verOffset=nAgt.indexOf("Version"))!=-1) 
        fullVersion = nAgt.substring(verOffset+8);
        }
        // In MS Edge, the true version is after "Edg" in userAgent
        else if ((verOffset=nAgt.indexOf("Edg"))!=-1) {
        browserName = "Microsoft Edge";
        fullVersion = nAgt.substring(verOffset+4);
        }
        // In MSIE, the true version is after "MSIE" in userAgent
        else if ((verOffset=nAgt.indexOf("MSIE"))!=-1) {
        browserName = "Microsoft Internet Explorer";
        fullVersion = nAgt.substring(verOffset+5);
        }
        // In Chrome, the true version is after "Chrome" 
        else if ((verOffset=nAgt.indexOf("Chrome"))!=-1) {
        browserName = "Chrome";
        fullVersion = nAgt.substring(verOffset+7);
        }
        // In Safari, the true version is after "Safari" or after "Version" 
        else if ((verOffset=nAgt.indexOf("Safari"))!=-1) {
        browserName = "Safari";
        fullVersion = nAgt.substring(verOffset+7);
        if ((verOffset=nAgt.indexOf("Version"))!=-1) 
        fullVersion = nAgt.substring(verOffset+8);
        }
        // In Firefox, the true version is after "Firefox" 
        else if ((verOffset=nAgt.indexOf("Firefox"))!=-1) {
        browserName = "Firefox";
        fullVersion = nAgt.substring(verOffset+8);
        }else if ( (nameOffset=nAgt.lastIndexOf(' ')+1) < 
        (verOffset=nAgt.lastIndexOf('/')) ) 
        {
        browserName = nAgt.substring(nameOffset,verOffset);
        fullVersion = nAgt.substring(verOffset+1);
        if (browserName.toLowerCase()==browserName.toUpperCase()) {
        browserName = navigator.appName;
        }
        }
        // trim the fullVersion string at semicolon/space if present
        if ((ix=fullVersion.indexOf(";"))!=-1)
        fullVersion=fullVersion.substring(0,ix);
        if ((ix=fullVersion.indexOf(" "))!=-1)
        fullVersion=fullVersion.substring(0,ix);

        majorVersion = parseInt(''+fullVersion,10);
        if (isNaN(majorVersion)) {
        fullVersion  = ''+parseFloat(navigator.appVersion); 
        majorVersion = parseInt(navigator.appVersion,10);
        }

        return {
            browserName: browserName,
            fullVersion: fullVersion,
            majorVersion: majorVersion,
            appName: navigator.appName,
            userAgent: navigator.userAgent,
        }
      }
}
