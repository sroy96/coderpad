


function UserProfile(id, name) {       // Accept name and Id in the constructor
    this.name = name || null;
    this.id  = id  || null;
}

UserProfile.prototype.getId = function() {
    return this.id;
};

UserProfile.prototype.setId = function(id) {
    this.id = id;
};

UserProfile.prototype.getName = function() {
    return this.name;
};

UserProfile.prototype.setName = function(name) {
    this.name = name;
};

UserProfile.prototype.equals = function(otherProfile) {
    return otherProfile.getName() === this.getName()
        && otherProfile.getId() === this.getId();
};
UserProfile.prototype.session=function(newsession,oldsession){
    let datetime = new Date();
    datetime=datetime.toISOString().slice(0,10);
    newsession=datetime;
    return newsession - oldsession < 1;
};

UserProfile.prototype.fill = function(newFields) {
    for (var field in newFields) {
        if (this.hasOwnProperty(field) && newFields.hasOwnProperty(field)) {
            if (this[field] !== 'undefined') {
                this[field] = newFields[field];
            }
        }
    }
};

module.exports = UserProfile;     // Export
