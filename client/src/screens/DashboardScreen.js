import DashboardMenu from "../components/DashboardMenu";

const DashboardScreen = {
  afterRender: () => {},
  render: () => {
    return `
      <div class='dashboard'>
        ${DashboardMenu.render({ selected: "dashboard" })}
        <div class="dashboard-content">
          <h1>Dashboard</h1>
          <div>
          
          // Info and charts
          </div>
          </div>
      </div>
    `;
  },
};

export default DashboardScreen;
