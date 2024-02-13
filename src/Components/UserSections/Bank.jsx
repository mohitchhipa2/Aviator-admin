import React, { useEffect, useState } from "react";
import { Fade } from "react-reveal";
import "./Bank.css";
import { fetchData, postData } from "../../Api/Clientfunctions";
import Swal from "sweetalert2";
import useSWR from "swr";
import { toast } from "react-toastify";
const BankDetailsForm = () => {
  const [bankData, setBankData] = useState({});
  const [isSwitchOn, setSwitchOn] = useState(() => {
    return localStorage.getItem("isSwitchOn") === "false" ? false : true;
  });
  console.log(
    "🚀 ~ const[isSwitchOn,setSwitchOn]=useState ~ isSwitchOn:",
    isSwitchOn
  );
  const { data: gateWaySetting } = useSWR("/admin/getgatewaykey", fetchData);
  useEffect(() => {
    if (gateWaySetting && gateWaySetting.data) {
      if (gateWaySetting.data.keyenable === 1) {
        setSwitchOn(true);
      } else {
        setSwitchOn(false);
      }
    }
  }, [gateWaySetting]);
  const { data } = useSWR("/admin/getadminbank", fetchData);
  const { data: gatewayData } = useSWR("/admin/getgatewaykey", fetchData);

  useEffect(() => {
    if (gatewayData) {
      setSec(gatewayData.data?.key);
    }
  }, [gatewayData]);
  const toggleSwitch = async () => {
    const updatedSwitchState = !isSwitchOn;
    setSwitchOn(updatedSwitchState);
    // Save the updated state to localStorage
    localStorage.setItem("isSwitchOn", updatedSwitchState.toString());
    console.log("Switch is " + (updatedSwitchState ? "ON" : "OFF"));
    const value = !isSwitchOn === true ? 1 : 0;
    console.log(value);
    const res = await postData("/admin/setpaymentgateway", {
      keyenable: `${value}`,
    });
    res.status && value === 1
      ? localStorage.setItem("isSwitchOn", true)
      : localStorage.setItem("isSwitchOn", false);
    res.status
      ? toast.success("Gateway Changed!...")
      : toast.error("Something Went Wrong!..");
  };

  useEffect(() => {
    if (data && data.data) {
      setBankData(data.data);
    }
  }, [data]);
  const [formData, setFormData] = useState({
    bankName: "",
    accountNumber: "",
    accountHolderName: "",
    ifscCode: "",
    mobileNumber: "",
    upiId: "",
    barCode: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    // If the input is a file input, update the state with the file
    if (type === "file") {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      // For other input types, update the state with the input value
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your logic for handling form submission
    const data = new FormData();

    data.append("bankName", formData.bankName);
    data.append("accountNumber", formData.accountNumber);
    data.append("accountHolderName", formData.accountHolderName);
    data.append("upiId", formData.upiId);
    data.append("mobileNumber", formData.mobileNumber);
    data.append("ifscCode", formData.ifscCode);
    data.append("barCode", formData.barCode);
    console.log("Form data submitted:", data);
    const res = await postData("/admin/setadminaccount", data);
    console.log(res);
    if (res.status) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  const [sec, setSec] = useState("");
  const setKey = async () => {
    console.log(sec);
    const res = await postData("/admin/setgateway", { key: sec });
    if (res.status) {
      Swal.fire(res.message);
    } else {
      Swal.fire(res.message);
    }
  };

  return (
    <Fade top distance="2%" duration={700}>
      <div style={{ background: "#F2EDF3" }} className="wrapper">
        {/*page-wrapper*/}
        <div className="page-wrapper">
          {/*page-content-wrapper*/}
          <div className="page-content-wrapper">
            <div className="page-content">
              <div className="Bank-details">
                <div className="Bank-heading">
                  <i className="bx bxs-home"></i>
                  <h2>Bank Setup</h2>
                  <div className="form-check form-switch lg-switch">
                    <input
                      onClick={toggleSwitch}
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      Checked={isSwitchOn}
                      defaultChecked={isSwitchOn}
                      id="sound"
                    />
                    <label className="form-check-label" htmlFor="sound" />
                  </div>
                </div>

                <div className="second-form">
                  <div className=" Bank-lables">
                    <label>Secret Key:</label>
                    <input
                      placeholder="Enter your Secret Key "
                      type="text"
                      name="accountsecretkey"
                      value={sec}
                      disabled={!isSwitchOn}
                      onChange={(e) => setSec(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      onClick={setKey}
                      disabled={!isSwitchOn}
                    >
                      Submit
                    </button>
                  </div>
                </div>

                <form onSubmit={handleSubmit} encType="multipart/form-data">
                  <div className="bank-form">
                    <div className="Bank-lables">
                      <label>Bank Name:</label>
                      <input
                        type="text"
                        placeholder="Enter your Bank name"
                        name="bankName"
                        disabled={isSwitchOn}
                        defaultValue={bankData?.bankName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="Bank-lables">
                      <label>Account No:</label>
                      <input
                        placeholder="Enter your Account No. "
                        type="text"
                        name="accountNumber"
                        onChange={handleChange}
                        defaultValue={bankData?.accountNumber}
                        disabled={isSwitchOn}
                        required
                      />
                    </div>
                    <div className="Bank-lables">
                      <label>Account Holder Name:</label>
                      <input
                        placeholder="Enter your Account Name "
                        type="text"
                        name="accountHolderName"
                        onChange={handleChange}
                        required
                        disabled={isSwitchOn}
                        defaultValue={bankData?.accountHolderName}
                      />
                    </div>
                    <div className="Bank-lables">
                      <label>IFSC Code:</label>
                      <input
                        placeholder="Enter your IFSC Code "
                        type="text"
                        name="ifscCode"
                        onChange={handleChange}
                        defaultValue={bankData?.ifscCode}
                        disabled={isSwitchOn}
                        required
                      />
                    </div>
                  </div>

                  <div className="bank-form">
                    <div className="Bank-lables">
                      <label>Mobile No:</label>
                      <input
                        placeholder="Enter your Mobile No.  "
                        type="text"
                        name="mobileNumber"
                        defaultValue={bankData?.mobileNumber}
                        disabled={isSwitchOn}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="Bank-lables">
                      <label>UPI Id:</label>
                      <input
                        placeholder="Enter your UPI Id  "
                        type="text"
                        name="upiId"
                        defaultValue={bankData?.upiId}
                        disabled={isSwitchOn}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="Bank-lables">
                      <label>Bar code:</label>
                      <input
                        required
                        style={{ border: "none" }}
                        type="file"
                        name="barCode"
                        disabled={isSwitchOn}
                        onChange={handleChange}
                        accept="image/*"
                      />
                    </div>

                    <div>
                      <button type="submit" disabled={isSwitchOn}>
                        Submit
                      </button>
                    </div>
                  </div>
                </form>

                {/* <button className="custom-btn btn-6">
                  <span>Automatic</span>
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fade>
  );
};

export default BankDetailsForm;
