import { User } from "../../../shared/entities";

export default class TestUtil {
  static giveMeAValidUser(): User {
    const user = new User()

    user.id = '00000000-0000-0000-0000-000000000000'
    user.nickname = 'giovanny'
    user.password = 'dv1010aa'

    return user
  }
}