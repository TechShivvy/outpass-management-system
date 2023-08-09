import React, { useEffect, useRef, useState } from "react";
import { Accordion, Button, Badge } from "react-bootstrap";
import Outpass from "../../components/Outpass";
import Header from "../../components/Header";
import { Link, useNavigate, useParams } from "react-router-dom";
import Mainscreen from "../../components/Mainscreen";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { listOutpassSecurity } from "../../actions/outpassActions";
import { logout } from "../../actions/userActions";
import "./Security.css";
import QrScanner from "../../components/QrScanner";
import QRCode from "qrcode.react";
import QrReader from "react-qr-scanner";
import QrScan from "react-qr-reader";
import Navbar from "../../components/Navbar";
// import Mainscreen from ''

const Security = () => {
  const dispatch = useDispatch();
  const outpassList = useSelector((state) => state.outpassList);
  const { loading, error, outpasses = [] } = outpassList;
  const [qrCode, setScannedText] = useState("");
  // const [outpasses, setOutpasses] = useState([]);
  // const [message, setMessage] = useState("");

  console.log("outpass:", outpasses);
  const handleScan = async (data) => {
    if (data) {
      // console.log(data.text);
      console.log(data.text);
      dispatch(listOutpassSecurity(data.text));
      setScannedText(data.text);
      // const qrCode = data.text;
      // try {
      //   const response = await axios.get(
      //     `http://localhost:5000/api/qr/?qrCode=${qrCode}`,
      //     {
      //       code: data,
      //     }
      //   );
      //   setOutpasses(response.data.outpasses);
      //   setMessage(response.data.message);
      //   alert(response.data.message);
      // } catch (err) {
      //   console.error(err);
      // }
    }
  };
  // when user logouts , it should go back to login page
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login");
  };

  const [userDetails, setUserDetails] = useState({});
  // console.log("Security", outpass);
  // const studentIds = outpasses?.map((item) => item.studentId);

  // console.log(studentIds);

  // console.log("userInfo", userInfo);

  const navigate = useNavigate();
  // useeffect is used to get the notes data after page is rendered
  // const prevStudentIds = useRef(studentIds);
  // useEffect(() => {
  //   console.log("Security.js: here");
  //   dispatch(listOutpassSecurity(qrCode));
  //   if (!userInfo) {
  //     navigate("/");
  //   }

  //   const fetchUserDetails = async () => {
  //     const userDetails = {};
  //     for (const id of studentIds) {
  //       try {
  //         const url = `/api/users/details/${id}`;
  //         console.log("URL", url);
  //         const { data } = await axios.get(url, {
  //           headers: {
  //             Authorization: `Bearer ${userInfo.token}`,
  //           },
  //         });
  //         userDetails[id] = data;
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //     setUserDetails(userDetails);
  //   };

  //   if (userInfo && navigate && dispatch && studentIds) {
  //     fetchUserDetails();
  //   }
  // }, [dispatch, navigate, userInfo]);

  const handleError = (err) => {
    console.error(err);
  };

  // console.log("USERDETAILS", userDetails);
  return (
    <>
      <Navbar role="security" homeLink={"/"} />
      <Mainscreen title={`Security: ${userInfo && userInfo.name}`}>
        {/* <Button
          className="logout-btn"
          variant="primary"
          style={{ width: "100px" }}
          onClick={logoutHandler}
        >
          Logout
        </Button> */}

        <div>
          {/* <Header /> */}
          {/* <Button href="/searchresult" variant="outline-primary">Search</Button> */}
        </div>
        {/* Cannot read properties of undefined (reading 'map')
      TypeError: Cannot read properties of undefined (reading 'map')
      After adding a '?' , the problem got solved  */}
        <div>
          {/* <QrScanner
        onOutpassesChange={handleOutpassesChange}
        onMessageChange={handleMessageChange}
      /> */}
          <h1>Outpass QR Code</h1>
          <div>
            <QrReader
              delay={300}
              onError={handleError}
              onScan={handleScan}
              style={{ width: "100%" }}
            />
            {qrCode ? <p>{qrCode}</p> : null}
          </div>
        </div>

        {outpasses && (
          <Outpass
            key={outpasses._id}
            id={outpasses._id}
            student={false}
            name={outpasses.studentId && outpasses.studentId.name}
            dept={outpasses.studentId && outpasses.studentId.dept}
            room={outpasses.studentId && outpasses.studentId.room}
            year={outpasses.studentId && outpasses.studentId.year}
            fromtime={outpasses.from && outpasses.from.slice(0, 10)}
            totime={outpasses.to && outpasses.to.slice(0, 10)}
            place={outpasses.place}
            reason={outpasses.reason}
            status={outpasses.status}
            security={true}
            appdate={outpasses.createdAt && outpasses.createdAt.slice(0, 10)}
            inTime={outpasses.status === "ACTIVE" ? true : false}
          />
        )}
      </Mainscreen>
    </>
  );
};

export default Security;
