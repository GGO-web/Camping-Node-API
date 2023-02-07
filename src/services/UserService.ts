import { UserRecord } from "firebase-admin/lib/auth/user-record";
import { IUser, User } from "../models/User.model";
import { firebaseApp } from "../utils/firebase";
import { NotificationService } from "./NotificationService";

export class UserService {
  public static async getUser(uid: string) {
    const userDB = await User.findOne({ uid: uid });

    return userDB;
  }

  public static async createUser(uid: string) {
    const userDB = await this.getUser(uid);

    if (!userDB) {
      const user: UserRecord = await firebaseApp.auth().getUser(uid);

      const createdDBUser = new User({
        uid,
        fullname: user.displayName,
      });

      NotificationService.createNotification({
        userId: uid,
        title: "Congratulations!",
        message: "You recieved the welcome badge",
        type: "badge",
      });

      const savedUser = await createdDBUser.save();

      return savedUser;
    } else {
      console.log("User is already created");
      return userDB;
    }
  }

  public static async updateUserProfile(userProfile: Partial<IUser>) {
    const user = await this.getUser(userProfile.uid!);

    if (!user) {
      throw new Error("User is not found");
    }

    user.set({
      ...userProfile,
    });

    await user.save();
  }
}
