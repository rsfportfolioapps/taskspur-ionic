


export interface UserLogin {
  username: string,
  password: string
}

export interface User {
  id?: string;
  email?: string;
  username?: string;
  firstname?: string;
  lastname?: string;
  password?: string;
  birthDate?: string;
  timeZone?: string;
}

export interface UserPasswordReset {
  userId: string;
  newPassword: string;
  code: string;
}

export interface UserProfile {
  id?: string;
  userName?: string;
  name?: Name;
  location?: Location;
  birth?: Birth;
  gender?: string;
  email?: string;
  phone?: string;
  configuration?: string;
  roles?: string;
  isEnabled?: boolean;
  isLockedOut?: boolean;
  lastActive?: string;
  interest?: string;
  introduction?: string;
  lookingFor?: string;
  profilePhoto?: ProfilePhoto;
  audit?: Audit;
}

export interface Name {
  title?: string;
  first?: string;
  last?: string;
  fullName?: string;
}

export interface Location {
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  coordinates?: LocationCoordinates;
  timezone?: LocationTimezone;
}

export interface LocationCoordinates {
  latitude?: string;
  longitude?: string;
}

export interface LocationTimezone {
  offset?: string;
  name?: string;
  dst?: string;
}

export interface Birth {
  date?: string;
  age?: string;
}

export interface ProfilePhoto {
  id?: string;
  url?: string;
}

export interface Audit {
  registerDate?: string;
  registerAge?: string;
  lastUpdated?: string;
}