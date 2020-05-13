import { PrivacyPreferences } from "./PrivacyPreferences";
import { UserToCreate } from "./User";

export interface SignUpFormData {
  user: UserToCreate;
  privacy: PrivacyPreferences;
}
