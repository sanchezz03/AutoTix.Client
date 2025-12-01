export interface DeviceInfoDTO {
  name: string;
  fcmToken?: string | null;
}

export interface LoginRequestDTO {
  phone: string;
  code: string;
  device: DeviceInfoDTO;
}

export interface ProfileDTO {
  id: number;
  type: number;
  phone: string;
  email: any;
  shareText: string;
  passenger: PassengerDTO;
  additionalActions: AdditionalActionDTO[];
  loyalty: LoyaltyDTO;
  diiaVerifiedAt: any;
  verifiedAt: any;
  achievements: AchievementsDTO;
  genders: GenderDTO[];
  specialStatuses: string[];
  verificationType: any;
  availableVerificationTypes: number[];
}

export interface PassengerDTO {
  id: number;
  firstName: string;
  lastName: string;
  ticketType: number;
  privilegeId: number;
  privilegeData: PrivilegeDataDTO;
  privilege: PrivilegeDTO;
  photo: any;
  main: boolean;
  phone: any;
  isShareUser: boolean;
  birthday: any;
  gender: any;
}

export interface PrivilegeDataDTO {
  studentId: string;
}

export interface PrivilegeDTO {
  id: number;
  name: string;
  description: string;
  inputType: number;
  active: boolean;
  companionId: any;
  rules: string;
  hint: any;
}

export interface AdditionalActionDTO {
  title: string;
  icon: string;
  link: string;
}

export interface LoyaltyDTO {
  title: string;
  infoLink: string;
  icon: string;
  iconHugs: string;
  pointsCount: number;
  points: PointsDTO;
  dataColumns: DataColumnDTO[];
  infoBlock: InfoBlockDTO;
}

export interface PointsDTO {
  value: string;
  label: string;
}

export interface DataColumnDTO {
  value: string;
  label: string;
}

export interface InfoBlockDTO {
  title: string;
  description: string;
}

export interface AchievementsDTO {
  awardsCount: string;
  title: string;
  image: string;
  levelsEnabled: boolean;
}

export interface GenderDTO {
  id: number;
  title: string;
}

export interface LoginResponseDTO {
  token: string;
  expiresIn: number;
  profile: ProfileDTO;
}
