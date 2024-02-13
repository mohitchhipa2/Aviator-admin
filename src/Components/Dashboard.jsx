import React, { useEffect, useState } from "react";
import { Fade } from "react-reveal";
import "./Dashboard.css";
import { FiUsers } from "react-icons/fi";
import { GiReceiveMoney } from "react-icons/gi";
import { BiMoneyWithdraw } from "react-icons/bi";
import { FaUserClock } from "react-icons/fa6";
import { FiUserX } from "react-icons/fi";
import { AiOutlineBell } from "react-icons/ai";
import useSWR from "swr";
import { fetchData } from "../Api/Clientfunctions";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({});
  //console.log(dashboardData);

  const { data } = useSWR("/admin/dashboard", fetchData);
  useEffect(() => {
    if (data && data.data) {
      setDashboardData(data.data);
    }
  }, [data]);
  return (
    <Fade top distance="2%" duration={700}>
      <div className="page-wrapper">
        <div className="page-content-wrapper">
          <div className="page-content">
            <div className="row">
              <div style={{ marginTop: "10px" }} className="row">
                <div className="col-12 col-lg-3">
                  <div class="card widget-flat">
                    <div class="card-body">
                      <div class="float-end">
                        <FiUsers
                          color="red"
                          class="mdi mdi-account-multiple widget-icon"
                        />
                      </div>
                      <h5
                        class="text-muted fw-normal mt-0"
                        title="Number of Customers"
                      >
                        Total User
                      </h5>
                      <h3 class="mt-3 mb-3">
                        {dashboardData?.totalUsers || 0}
                      </h3>
                      <p class="mb-0 text-muted">
                        <span class="text-success me-2">Today</span>
                        <span>{dashboardData?.todayUsers || 0}</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-3">
                  <div class="card widget-flat">
                    <div class="card-body">
                      <div class="float-end">
                        <FiUsers
                          color=" #198754"
                          class="mdi mdi-account-multiple widget-icon"
                        />
                      </div>
                      <h5
                        class="text-muted fw-normal mt-0"
                        title="Number of Customers"
                      >
                        Total Users
                      </h5>
                      <h3 class="mt-3 mb-3">
                        {dashboardData?.activeUsers || 0}
                      </h3>
                      <p class="mb-0 text-muted">
                        <span class="text-success me-2">
                          <i class="mdi mdi-arrow-up-bold"></i>Approved
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-3">
                  <div class="card widget-flat">
                    <div class="card-body">
                      <div class="float-end">
                        <FaUserClock
                          color=" #0D6EFD"
                          class="mdi mdi-account-multiple widget-icon"
                        />
                      </div>
                      <h5
                        class="text-muted fw-normal mt-0"
                        title="Number of Customers"
                      >
                        Total Users
                      </h5>
                      <h3 class="mt-3 mb-3">
                        {dashboardData?.pendingUsers || 0}
                      </h3>
                      <p class="mb-0 text-muted">
                        <span class="text-primary me-2">
                          <i class="mdi mdi-arrow-up-bold"></i>Pending
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-3">
                  <div class="card widget-flat">
                    <div class="card-body">
                      <div class="float-end">
                        <FiUserX
                          color=" #E15562"
                          class="mdi mdi-account-multiple widget-icon"
                        />
                      </div>
                      <h5
                        class="text-muted fw-normal mt-0"
                        title="Number of Customers"
                      >
                        Total Users
                      </h5>
                      <h3 class="mt-3 mb-3">
                        {dashboardData?.rejectedUsers || 0}
                      </h3>
                      <p class="mb-0 text-muted">
                        <span class="text-danger me-2">
                          <i class="mdi mdi-arrow-up-bold"></i>Rejected
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: "10px" }} className="row">
                <div className="col-12 col-lg-3">
                  <div class="card widget-flat">
                    <div class="card-body">
                      <div class="float-end">
                        <GiReceiveMoney
                          color="green"
                          class="mdi mdi-account-multiple widget-icon"
                        />
                      </div>
                      <h5
                        class="text-muted fw-normal mt-0"
                        title="Number of Customers"
                      >
                        Total Deposit
                      </h5>
                      <h3 class="mt-3 mb-3">
                        {dashboardData?.totalRechargeAmount || 0}
                      </h3>
                      <p class="mb-0 text-muted">
                        <span class="text-success me-2">Today</span>
                        <span>{dashboardData?.todayRechargeAmount || 0}</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-lg-3">
                  <div class="card widget-flat">
                    <div class="card-body">
                      <div class="float-end">
                        <BiMoneyWithdraw
                          color=" #A400ED"
                          class="mdi mdi-account-multiple widget-icon"
                        />
                      </div>
                      <h5
                        class="text-muted fw-normal mt-0"
                        title="Number of Customers"
                      >
                        Total Withdraw
                      </h5>
                      <h3 class="mt-3 mb-3">
                        {dashboardData?.totalWithdrawAmount || 0}
                      </h3>
                      <p class="mb-0 text-muted">
                        <span class="text-success me-2">Today</span>
                        <span>{dashboardData?.todayWithdrawAmount || 0}</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-3">
                  <div class="card widget-flat">
                    <div class="card-body">
                      <div class="float-end">
                        <i
                          style={{ fontSize: "35px", color: "#03A9F4" }}
                          className="bx bxs-rocket  mdi-account-multiple widget-icon "
                        ></i>
                      </div>
                      <h5
                        class="text-muted fw-normal mt-0"
                        title="Number of Customers"
                      >
                        Total Bets
                      </h5>
                      <h3 class="mt-3 mb-3">{dashboardData?.totalBets || 0}</h3>
                      <p class="mb-0 text-muted">
                        <span class="text-success me-2">Today</span>
                        <span>{dashboardData?.todayBets || 0}</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-3">
                  <div class="card widget-flat">
                    <div class="card-body">
                      <div class="float-end">
                        <AiOutlineBell
                          color=" #67B08E"
                          class="mdi mdi-account-multiple widget-icon"
                        />
                      </div>
                      <h5
                        class="text-muted fw-normal mt-0"
                        title="Number of Customers"
                      >
                        Today Withdraw
                      </h5>
                      <h3 class="mt-3 mb-3">
                        {dashboardData?.totalWithDrawRequest || 0}
                      </h3>
                      <p class="mb-0 text-muted">
                        <span class="text-success me-2">
                          <i class="mdi mdi-arrow-up-bold"></i>Requests
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fade>
  );
};

export default Dashboard;
