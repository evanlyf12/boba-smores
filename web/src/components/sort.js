function GetSortOrderCom() {    
    return function(a, b) {  
        if (a.contactInformation.company.name===undefined){
            return 1
        }
        if (b.contactInformation.company.name===undefined){
            return -1
        }
        if ((a.contactInformation.company.name).toLowerCase() > (b.contactInformation.company.name).toLowerCase()) {    
            return 1;    
        } else if ((a.contactInformation.company.name).toLowerCase() < (b.contactInformation.company.name).toLowerCase()) {    
            return -1;    
        }    
        return 0;    
    }    
}    

function GetSortOrderComRev() {    
    return function(a, b) {    
        if (a.contactInformation.company.name===undefined){
            return 1
        }
        if (b.contactInformation.company.name===undefined){
            return -1
        }
        if ((a.contactInformation.company.name).toLowerCase() < (b.contactInformation.company.name).toLowerCase()) {    
            return 1;    
        } else if ((a.contactInformation.company.name).toLowerCase() > (b.contactInformation.company.name).toLowerCase()) {    
            return -1;    
        }    
        return 0;    
    }    
}    
function GetSortOrderCountry() {    
    return function(a, b) {    
        if (a.contactInformation.location.country > b.contactInformation.location.country) {    
            return 1;    
        } else if (a.contactInformation.location.country < b.contactInformation.location.country) {    
            return -1;    
        }    
        return 0;    
    }    
}    

function GetSortOrderCountryRev() {    
    return function(a, b) {    
        if (a.contactInformation.location.country < b.contactInformation.location.country) {    
            return 1;    
        } else if (a.contactInformation.location.country > b.contactInformation.location.country) {    
            return -1;    
        }    
        return 0;    
    }    
}    

function GetSortOrderName() {    
    return function(a, b) {    
        if (a.contactInformation.name.firstName > b.contactInformation.name.firstName) {    
            return 1;    
        } else if (a.contactInformation.name.firstName < b.contactInformation.name.firstName) {    
            return -1;    
        }    
        return 0;    
    }    
}    

function GetSortOrderNameRev() {    
    return function(a, b) {    
        if (a.contactInformation.name.firstName < b.contactInformation.name.firstName) {    
            return 1;    
        } else if (a.contactInformation.name.firstName > b.contactInformation.name.firstName) {    
            return -1;    
        }    
        return 0;    
    }    
}    

function GetSortFav(prop) {    
    return function(a, b) {    
        if (a[prop] < b[prop]) {    
            return 1;    
        } else if (a[prop] > b[prop]) {    
            return -1;    
        }    
        return 0;    
    }    
}  
function GetSortFavRev(prop) {    
    return function(a, b) {    
        if (a[prop] > b[prop]) {    
            return 1;    
        } else if (a[prop] < b[prop]) {    
            return -1;    
        }    
        return 0;    
    }    
}  

export {
    GetSortOrderCom,
    GetSortOrderComRev,
    GetSortOrderCountry,
    GetSortOrderCountryRev,
    GetSortOrderName,
    GetSortOrderNameRev,
    GetSortFav,
    GetSortFavRev,
};