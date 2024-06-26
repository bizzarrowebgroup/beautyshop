interface IUser {
    displayName: string;
    userUuid: string;
    firstname: string;
    lastname: string;
    email: string;
    pushNotificationToken: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    phonenumber: string;
}

export class User implements IUser {
    displayName: string;
    userUuid: string;
    firstname: string;
    lastname: string;
    email: string;
    pushNotificationToken: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    phonenumber: string;
    constructor(
        displayName: string,
        userUuid: string,
        firtname: string,
        lastname: string,
        email: string,
        pushNotificationToken: string,
        createdAt: string,
        updatedAt: string,
        locale: string,
        phonenumber: string,
    ) {
        this.displayName = displayName;
        this.userUuid = userUuid;
        this.firstname = firtname;
        this.lastname = lastname;
        this.email = email;
        this.pushNotificationToken = pushNotificationToken;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.locale = locale;
        this.phonenumber = phonenumber;
    }
}