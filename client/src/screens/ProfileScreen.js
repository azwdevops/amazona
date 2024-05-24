import { getMyOrders, updateProfile } from "../api";
import { clearUser, getUserInfo, setUserInfo } from "../localStorage";
import { hideLoading, showLoading, showMessage } from "../utils";

const ProfileScreen = {
  afterRender: () => {
    document.getElementById("signout-button").addEventListener("click", () => {
      clearUser();
      document.location.hash = "/";
    });
    document.getElementById("profile-form").addEventListener("submit", async (e) => {
      e.preventDefault();

      showLoading();
      const data = await updateProfile({
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
      });
      hideLoading();
      if (data.error) {
        showMessage(data.error);
      } else {
        setUserInfo(data);
        document.location.hash = "/";
      }
    });
  },
  render: async () => {
    const { name, email } = getUserInfo();
    if (!name) {
      document.location.hash = "/";
      return;
    }
    const myOrders = await getMyOrders();
    return `
    <div class="content profile">
      <div class="profile-info">
        <div class='form-container'>
          <form action="" id="profile-form">
            <ul class="form-items">
              <li>
                <h1>My Profile</h1>
              </li>
              <li>
                <label for="name">Name</label>
                <input type="text" name="name" id="name" value="${name}">
              </li>
              <li>
                <label for="email">Email</label>
                <input type="email" name="email" id="email" value="${email}">
              </li>
              <li>
                <label for="password">Password</label>
                <input type="password" name="password" id="password">
              </li>
              <li>
                <button type='submit' class='primary'>Update</button>
              </li>
              <li>
                <button type='button' id='signout-button'>Sign Out</button>
              </li>
              </ul>
          </form>
        </div>
      </div>
      <div class="profile-orders">
        <h2>My Orders History</h2>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Total Price</th>
              <th>Paid</th>
              <th>Delivered</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${
              myOrders?.length === 0
                ? `<tr><td colspan='6'>No orders found</td></tr>`
                : myOrders
                    .map(
                      (orderItem) => `
              <tr>
                <td>${orderItem._id}</td>
                <td>${orderItem.createdAt}</td>
                <td>${orderItem.totalPrice}</td>
                <td>${orderItem.paidAt || "No"}</td>
                <td>${orderItem.DeliveredAt || "No"}</td>
                <td><a href="/#/order/${orderItem._id}">Details</a></td>
              </tr>
            `
                    )
                    .join("\n")
            }
          </tbody>
        </table>
      </div>
    </div>
    `;
  },
};

export default ProfileScreen;
