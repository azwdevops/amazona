import { getProducts } from "../api";
import DashboardMenu from "../components/DashboardMenu";

const ProductListScreen = {
  afterRender: () => {},
  render: async () => {
    const products = await getProducts();
    return `
    <div class='dashboard'>
    ${DashboardMenu.render({ selected: "products" })}
    <div class="dashboard-content">
      <h1>Product List</h1>
      <button id="create-product-button" class='primary'>
        Create Product
      </button>
      <div class='product-list'>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
              <th class='tr-action'>Action</th>
            </tr>
          </thead>
          <tbody>
            ${products
              .map(
                (productItem) => `
              <tr>
                <td>${productItem._id}</td>
                <td>${productItem.name}</td>
                <td>${productItem.price}</td>
                <td>${productItem.category}</td>
                <td>${productItem.brand}</td>
                <td>
                  <button id="${productItem._id}" class='edit-button'>Edit</button>
                  <button id="${productItem._id}" class='delete-button'>Delete</button>
                </td>
              </tr>
            `
              )
              .join("\n")}
          </tbody>
        </table>
      // Info and charts
      </div>
      </div>
  </div>
    `;
  },
};

export default ProductListScreen;
