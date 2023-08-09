import React, { useEffect, useState } from "react";
import { Accordion, Button, Badge } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Mainscreen from "../../components/Mainscreen";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { listOutpassStudent } from "../../actions/outpassActions";
import Outpass from "../../components/Outpass";
import { logout } from "../../actions/userActions";
import Navbar from "../../components/Navbar";
import "./Student.css";

const Student = ({ search }) => {
  // replace this usestate with dispatch ... so commenting the below line
  // and replacing them with these set of lines
  // const [notes, setnotes] = useState([])
  const dispatch = useDispatch();
  const outpassList = useSelector((state) => state.outpassList);
  const { loading, error, outpasses } = outpassList;

  // to give success update on creation of note
  // it should also fire useffect hook too
  const outpassCreate = useSelector((state) => state.outpassCreate);
  const { success: successCreate } = outpassCreate;

  // when user logouts , it should go back to login page
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  console.log("student outpass", outpasses);
  console.log("student userInfo", userInfo);

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login");
  };

  // function deleteHandler(id) {
  //   if (window.confirm("Are you sure ? ")) { }
  // }

  // also removing this fetch notes too after adding dispatch actions

  // // fetch notes which is from backend
  // const fetchNotes = async() => {
  //   // putting { } around data variable means we are destructuring it to get the exact data
  //   const {data} = await axios.get("/api/notes");
  //   // console.log(data);
  //   setnotes(data);
  // }

  const navigate = useNavigate();
  // useeffect is used to get the notes data after page is rendered
  useEffect(() => {
    // replacing this line
    // fetchNotes()
    console.log("userInfo.studentId : ", userInfo.objectId);
    dispatch(listOutpassStudent(userInfo.objectId));
    // console.log(dispatch)
    if (!userInfo) {
      navigate("/");
    }
  }, [dispatch, userInfo, navigate]);
  // console.log(outpasses)
  return (
    <>
      <Navbar role="student" />

      <Mainscreen title={`Hello ${userInfo && userInfo.name} !`}>
        <div
          style={{
            background: "white",
            padding: "20px",
            margin: "20px auto",
            width: "fit-content",
            borderRadius: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* <Button
          variant="primary"
          onClick={logoutHandler}
          style={{ width: "100px" }}
        >
          Logout
        </Button> */}

          {/* Cannot read properties of undefined (reading 'map')
      TypeError: Cannot read properties of undefined (reading 'map')
      After adding a '?' , the problem got solved  */}
          {outpasses?outpasses.reverse().map((outpass) => (
            <Outpass
              appdate={outpass.createdAt.slice(0, 10)}
              key={outpass._id}
              student={true}
              name={userInfo.name}
              dept={userInfo.dept}
              year={userInfo.year}
              room={userInfo.room}
              fromtime={outpass.from.slice(0, 10)}
              place={outpass.place}
              reason={outpass.reason}
              status={outpass.status}
              totime={outpass.to.slice(0, 10)}
              qrCode={outpass.qrCode}
            />
          )):(
            <p className="no-outpasses-message" style={{textAlign:"center" ,color:"red"}}>No outpasses, come back later</p>
          )}
        </div>
      </Mainscreen>
    </>
  );
};

export default Student;
