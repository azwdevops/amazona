import { register } from "../api";
import { getUserInfo, setUserInfo } from "../localStorage";
import { hideLoading, redirectUser, showLoading, showMessage } from "../utils";

const RegisterScreen = {
  afterRender: () => {
    document.getElementById("register-form").addEventListener("submit", async (e) => {
      e.preventDefault();
      const password = document.getElementById("password").value;
      const confirm_password = document.getElementById("confirm_password").value;
      if (password.trim() === "" || password !== confirm_password) {
        return showMessage("Password and confirm password should match");
      }
      showLoading();
      const data = await register({
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password,
      });
      hideLoading();
      if (data.error) {
        showMessage(data.error);
      } else {
        setUserInfo(data);
        redirectUser();
      }
    });
  },
  render: () => {
    if (getUserInfo().name) {
      redirectUser();
      return;
    }
    return `
      <div class='form-container'>
        <form action="" id="register-form">
          <ul class="form-items">
            <li>
              <h1>Create Account</h1>
            </li>
            <li>
              <label for="name">Name</label>
              <input type="text" name="name" id="name">
            </li>
            <li>
              <label for="email">Email</label>
              <input type="email" name="email" id="email">
            </li>
            <li>
              <label for="password">Password</label>
              <input type="password" name="password" id="password">
            </li>
            <li>
              <label for="confirm_password">Confirm Password</label>
              <input type="password" name="confirm_password" id="confirm_password">
            </li>
            <li>
              <button type='submit' class='primary'>Register</button>
            </li>
            <li>
              <div>
                Already have an account?
                <a href="/#/sigin">Sign In</a>
              </div>
            </li>
          </ul>
        </form>
      </div>
    `;
  },
};

export default RegisterScreen;
