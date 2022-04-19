import React, { useState, useEffect } from 'react';
import "../styles.css"
import Modal from 'react-modal';
import { RiCloseCircleFill } from 'react-icons/ri';
import { FaUserCircle, FaUserPlus, FaUser } from 'react-icons/fa';
import { MdChangeCircle } from 'react-icons/md';
import { FiLogOut } from 'react-icons/fi';
import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios";
import { NotificationContainer, NotificationManager } from 'react-notifications';

import ReactTable from 'react-table-6'
import 'react-table-6/react-table.css'

const ROLES_LIST = ["Admin", "Read Only Admin", "Web Developer", "Front-End Developer", "Back-End Developer", "CEO", "Product Manager", "Technical Lead", "Senior Software Engineer", "Senior Software Developer", "Software Engineer", "Software Developer", "Junior Software Developer", "Intern Software Developer", "HR Specialist", "HR Generalist", "HR Manager", "Recruiting Manager", "HR Business Partner", "HR Director", "Career Consultant", "Career Advisor", "Assignment Coordinator", "SEO Manager", "SEO Engineer", "Digital Marketing Manager", "Digital Marketing Analyst", "MARKETING TECHNOLOGIST", "SEO CONSULTANT", "WEB ANALYTICS DEVELOPER", "DIGITAL MARKETING MANAGER", "SOCIAL MEDIA MANAGER", "GROWTH HACKER", "CONTENT MANAGER", "CONTENT STRATEGIST", "Big Data Engineer", "Big Data Specialist", "Build Engineer", "Data Analysts", "Data Architect", "DevOps Architect", "DevOps Engineer", "ML Engineer"]
// ##################################################################


const MODEL_COMPONENT_NEW = (props) => {

  const [modUsername, setModUsername] = useState("")
  const [modPassword, setModPassword] = useState("")
  const [modEmail, setModEmail] = useState("")
  const [modFirstname, setModFirtsname] = useState("")
  const [modLastname, setModLastname] = useState("")
  const [modRoles, setModRoles] = useState("")
  const [rolesList, setRolesList] = useState([])

  var myUserList = props.userList

  const ITEM_ADDED = () => {
    var modRoles_trim = modRoles.replace(/^\s+|\s+$/gm, '')
    if (modRoles_trim !== "") {
      setRolesList((pre) => {
        return [...pre, modRoles].filter((v, i, a) => a.indexOf(v) === i);
      })
      setModRoles("")
    }
  }

  const arrayRemove = (arr, value) => {
    return arr.filter(function (geeks) {
      return geeks !== value;
    });
  }

  const ITEM_REMOVED = (e) => {
    setRolesList((pre) => {
      return arrayRemove(pre, e);
    })
  }

  const updated_data_fun = () => {
    setModUsername("")
    setModPassword("")
    setModEmail("")
    setModFirtsname("")
    setModLastname("")
    setModRoles("")
    setRolesList([])
    props.closeModal()
  }

  const validEmail = (item) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(item);
  }

  const MODAL_CONTENT_SAVED = () => {
    var modUsername_trim = modUsername.replace(/^\s+|\s+$/gm, '')
    var modPassword_trim = modPassword.replace(/^\s+|\s+$/gm, '')
    var modEmail_trim = modEmail.replace(/^\s+|\s+$/gm, '')
    var modFirstname_trim = modFirstname.replace(/^\s+|\s+$/gm, '')
    var modLastname_trim = modLastname.replace(/^\s+|\s+$/gm, '')

    if (modUsername_trim === "" || modPassword_trim === "" || modEmail_trim === "" || modFirstname_trim === "" || modLastname_trim === "") {
      NotificationManager.warning('All fields are mandatory.', 'Invalid Input', 5000);
    }
    else if (rolesList.length === 0) {
      NotificationManager.warning('Please, Enter atleast one role', 'Invalid Input', 5000);
    }
    else if (!validEmail(modEmail)) {
      NotificationManager.warning('Please, Enter valid email.', 'Invalid Email', 5000);
    }
    else if (myUserList.indexOf(modUsername) >= 0) {
      NotificationManager.warning('Username is already present.', 'Invalid Username', 5000);
    }
    else {
      axios.get(`http://localhost:5000/newUser/${modUsername},${modPassword},${modFirstname},${modLastname},${modEmail},${rolesList}`)
        .then((response) => {
          if (response.data === 200) {
            NotificationManager.success('New user data is added successfully.', 'Updated', 1500);
            setTimeout(updated_data_fun, 3000);
          }
          else {
            NotificationManager.warning('Failed to add new user, please try again.', 'Update Failed', 5000);
          }

        })
        .catch((error) => {
          NotificationManager.warning('Failed to add new user, please try again.', 'Update Failed', 5000);
        })
    }
  }




  return (
    <Modal
      isOpen={props.modalIsOpen}
      onRequestClose={props.closeModal}
      className="MODAL"
    >

      <div className="MODAL_DIV">
        <span className="MODAL_DIV_SPAN">
          Username :
        </span>
        <input className='MODAL_DIV_INPUT' type="text" placeholder='Enter username' onChange={(e) => setModUsername(e.target.value)} value={modUsername} />
      </div>

      <div className="MODAL_DIV">
        <span className="MODAL_DIV_SPAN">
          Password :
        </span>
        <input className='MODAL_DIV_INPUT' type="text" placeholder='Enter password' onChange={(e) => setModPassword(e.target.value)} value={modPassword} />
      </div>


      <div className="MODAL_DIV">
        <span className="MODAL_DIV_SPAN">
          Firstname :
        </span>
        <input className='MODAL_DIV_INPUT' type="text" placeholder='Enter firstname' onChange={(e) => setModFirtsname(e.target.value)} value={modFirstname} />
      </div>


      <div className="MODAL_DIV">
        <span className="MODAL_DIV_SPAN">
          Lastname :
        </span>
        <input className='MODAL_DIV_INPUT' type="text" placeholder='Enter lastname' onChange={(e) => setModLastname(e.target.value)} value={modLastname} />
      </div>

      <div className="MODAL_DIV">
        <span className="MODAL_DIV_SPAN">
          E-mail :
        </span>
        <input className='MODAL_DIV_INPUT' type="text" placeholder='Enter e-mail ID' onChange={(e) => setModEmail(e.target.value)} value={modEmail} />
      </div>

      <div className="MODAL_DIV_ROLES">
        <div className="MODAL_DIV_ROLES_01">
          <span className="MODAL_DIV_ROLES_01_SPAN">
            Roles :
          </span>
          <select className='MODAL_DIV_ROLES_01_INPUT' onChange={(e) => setModRoles(e.target.value)} value={modRoles} >
            <option value="">Select the role...</option>
            {
              ROLES_LIST.map((op) => <option key={op} value={op}>{op}</option>)
            }
          </select>

          <div className='MODAL_DIV_ROLES_01_BUTTON'>
            <button className='MODAL_DIV_ROLES_01_BUTTON_' onClick={ITEM_ADDED}>+
            </button></div>
        </div>

        <div className="MODAL_DIV_ROLES_02">
          <span className="MODAL_DIV_ROLES_01_SPAN"></span>
          <span className="MODAL_DIV_ROLES_01_SPAN_LIST">
            {
              rolesList.map((item) => (
                <span className="MODAL_DIV_ROLES_01_SPAN_LIST_ITEM" key={item}>
                  <span onClick={() => ITEM_REMOVED(item)} className='span_3'><RiCloseCircleFill /></span>
                  <span className='span_3'>
                    {item}
                  </span>
                </span>
              ))
            }
          </span>
        </div>
      </div>

      <div className='MODAL_DIV_SAVE'>
        <button onClick={MODAL_CONTENT_SAVED} className="Modal_button">ADD</button>
      </div>
    </Modal>
  )
}



// ##################################################################

const MODEL_COMPONENT_MODIFY = (props) => {

  const [modUsername, setModUsername] = useState("")
  const [modPassword, setModPassword] = useState("")
  const [modEmail, setModEmail] = useState("")
  const [modFirstname, setModFirtsname] = useState("")
  const [modLastname, setModLastname] = useState("")
  const [modRoles, setModRoles] = useState("")
  const [rolesList, setRolesList] = useState([])


  useEffect(() => {
    setModUsername(props.data.USERNAME)
    setModPassword(props.data.PASSWORD)
    setModEmail(props.data.EMAIL)
    setModFirtsname(props.data.FIRSTNAME)
    setModLastname(props.data.LASTNAME)


    try {
      var kk = props.data.ROLES
      var myArray = kk.split(",");
      setRolesList(myArray)
    }
    catch (err) {
      setRolesList([])
    }
  }, [props]);


  const ITEM_ADDED = () => {
    var modRoles_trim = modRoles.replace(/^\s+|\s+$/gm, '')
    if (modRoles_trim !== "") {
      setRolesList((pre) => {
        return [...pre, modRoles].filter((v, i, a) => a.indexOf(v) === i);
      })
      setModRoles("")
    }
  }


  const arrayRemove = (arr, value) => {
    return arr.filter(function (geeks) {
      return geeks !== value;
    });
  }

  const ITEM_REMOVED = (e) => {
    setRolesList((pre) => {
      return arrayRemove(pre, e);
    })
  }

  const myGreeting = () => {
    setModUsername("")
    setModPassword("")
    setModEmail("")
    setModFirtsname("")
    setModLastname("")
    setModRoles("")
    setRolesList([])
    props.closeModal()
  }

  const validEmail = (item) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(item);
  }


  const MODAL_CONTENT_SAVED = () => {
    var modUsername_trim = modUsername.replace(/^\s+|\s+$/gm, '')
    var modPassword_trim = modPassword.replace(/^\s+|\s+$/gm, '')
    var modEmail_trim = modEmail.replace(/^\s+|\s+$/gm, '')
    var modFirstname_trim = modFirstname.replace(/^\s+|\s+$/gm, '')
    var modLastname_trim = modLastname.replace(/^\s+|\s+$/gm, '')

    if (modUsername_trim === "" || modPassword_trim === "" || modEmail_trim === "" || modFirstname_trim === "" || modLastname_trim === "") {
      NotificationManager.warning('All fields are mandatory.', 'Invalid Input', 5000);
    }
    else if (rolesList.length === 0) {
      NotificationManager.warning('Please, Enter atleast one role', 'Invalid Input', 5000);
    }
    else if (!validEmail(modEmail)) {
      NotificationManager.warning('Please, Enter valid email.', 'Invalid Email', 5000);
    }

    else {
      axios.get(`http://localhost:5000/infoSaved/${modUsername},${modPassword},${modFirstname},${modLastname},${modEmail},${rolesList}`)
        .then((response) => {
          if (response.data === 200) {
            NotificationManager.success('User data is updated successfully.', 'Updated', 1500);

            setTimeout(myGreeting, 5000);

          }
          else {
            NotificationManager.warning('Update failed, please try again.', 'Update Failed', 5000);
          }

        })
        .catch((error) => {
          NotificationManager.warning('Update failed, please try again.', 'Update Failed', 5000);
        })
    }
  }



  return (
    <Modal
      isOpen={props.modalIsOpen}
      onRequestClose={props.closeModal}
      className="MODAL"
    >

      <div className="MODAL_DIV">
        <span className="MODAL_DIV_SPAN">
          Username :
        </span>
        <input className='MODAL_DIV_INPUT' type="text" placeholder='Enter username' value={modUsername} readOnly />
      </div>

      <div className="MODAL_DIV">
        <span className="MODAL_DIV_SPAN">
          Password :
        </span>
        <input className='MODAL_DIV_INPUT' type="text" placeholder='Enter password' onChange={(e) => setModPassword(e.target.value)} value={modPassword} />
      </div>


      <div className="MODAL_DIV">
        <span className="MODAL_DIV_SPAN">
          Firstname :
        </span>
        <input className='MODAL_DIV_INPUT' type="text" placeholder='Enter firstname' onChange={(e) => setModFirtsname(e.target.value)} value={modFirstname} />
      </div>


      <div className="MODAL_DIV">
        <span className="MODAL_DIV_SPAN">
          Lastname :
        </span>
        <input className='MODAL_DIV_INPUT' type="text" placeholder='Enter lastname' onChange={(e) => setModLastname(e.target.value)} value={modLastname} />
      </div>

      <div className="MODAL_DIV">
        <span className="MODAL_DIV_SPAN">
          E-mail :
        </span>
        <input className='MODAL_DIV_INPUT' type="text" placeholder='Enter e-mail ID' onChange={(e) => setModEmail(e.target.value)} value={modEmail} />
      </div>

      <div className="MODAL_DIV_ROLES">
        <div className="MODAL_DIV_ROLES_01">
          <span className="MODAL_DIV_ROLES_01_SPAN">
            Roles :
          </span>
          <select className='MODAL_DIV_ROLES_01_INPUT' onChange={(e) => setModRoles(e.target.value)} value={modRoles} >
            <option value="">Select the role...</option>
            {
              ROLES_LIST.map((op) => <option key={op} value={op}>{op}</option>)
            }
          </select>



          <div className='MODAL_DIV_ROLES_01_BUTTON'>
            <button className='MODAL_DIV_ROLES_01_BUTTON_' onClick={ITEM_ADDED}>+
            </button></div>
        </div>

        <div className="MODAL_DIV_ROLES_02">
          <span className="MODAL_DIV_ROLES_01_SPAN"></span>
          <span className="MODAL_DIV_ROLES_01_SPAN_LIST">
            {
              rolesList.map((item) => (
                <span className="MODAL_DIV_ROLES_01_SPAN_LIST_ITEM" key={item}>
                  <span onClick={() => ITEM_REMOVED(item)} className='span_3'><RiCloseCircleFill /></span>
                  <span className='span_3'>
                    {item}
                  </span>
                </span>
              ))
            }
          </span>
        </div>
      </div>

      <div className='MODAL_DIV_SAVE'>
        <button onClick={MODAL_CONTENT_SAVED} className="Modal_button">SAVE</button>
      </div>
    </Modal>
  )
}





const DASHBOARD = () => {
  const [JSON_DATA, setJSON_DATA] = useState([])
  let location_Data = useLocation();
  const navigate = useNavigate();

  const get_use = location_Data.state.use
  const get_pass = location_Data.state.pass
  const get_admin = location_Data.state.isAdmin
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalIsOpenNew, setIsOpenNew] = useState(false);
  const [modalData, setMoalData] = useState({});
  const [cardShow, setCardShow] = useState(true);
  const [userList, setUserList] = useState([]);


  const columns = [
    {
      Header: 'Username',
      accessor: 'USERNAME',
      headerClassName: 'Rtable_Head'
    },
    {
      Header: 'Firstname',
      accessor: 'FIRSTNAME',
      headerClassName: 'Rtable_Head'
    },

    {
      Header: 'Lastname',
      accessor: 'LASTNAME',
      headerClassName: 'Rtable_Head'
    },

    {
      Header: 'E-mail',
      accessor: 'EMAIL',
      headerClassName: 'Rtable_Head'
    },
    {
      Header: 'Roles',
      accessor: 'ROLES',
      headerClassName: 'Rtable_Head',
      Cell: props => {
        const {
          value
        } = props;
        return (
          <ul style={{ margin: 0 }}>
            {
              value.split(",").map((it) => (
                <li key={it} style={{ listStyleType: "disc" }}>
                  {it}
                </li>
              ))
            }
          </ul>
        );
      }
    },
    {
      Header: "",
      filterable: false,
      headerClassName: 'Rtable_Head',
      Cell: () => (
        <button onClick={onRowClick}
          style={{ display: "flex", width: "100%", alignItem: "center", justifyItems: "center", justifyContent: "center", alignContent: "center", cursor: "pointer", fontSize: "15px" }}>
          <MdChangeCircle />&nbsp;Modify
        </button>
      )
    }

  ]


  const onRowClick = (state, rowInfo, column, instance) => {
    return {
      onClick: e => {
        MODIFY_BUTTON_CLICKED(rowInfo.original)
      }
    }
  }


  const myRowFilt = (filter, row) => {
    const id = filter.pivotId || filter.id;
    return (
      row[id] !== undefined ?
        String(row[id].toLowerCase()).indexOf(filter.value.toLowerCase()) !== -1
        :
        true
    );
  }

  useEffect(() => {
    try {
      axios.get(`http://localhost:5000/login/${get_use},${get_pass}`)
        .then((response) => {
          if (response.data === 404) {
            NotificationManager.warning('Please, Enter valid username and password.', 'Wrong Credentials', 5000);
          }
          else {
            setJSON_DATA(response.data)
            var u_list = []
            for (var key of response.data) {
              u_list.push(key.USERNAME)
            }
            setUserList([...u_list])


          }
        })

    } catch (error) {
      console.log(error)
      setJSON_DATA([])
      setUserList([])
    }


  }, [modalIsOpen, modalIsOpenNew]);

  const MODIFY_BUTTON_CLICKED = (e) => {
    try {
      if (get_admin) {
        setIsOpen(true);
        setMoalData(e)
      }
      else {
        NotificationManager.warning('Sorry, You are not an admin..', 'Administrators only', 3000);
      }
    } catch (error) {
      NotificationManager.warning('Sorry, You are not an admin..', 'Administrators only', 3000);
    }
  }


  const closeModal = () => {
    setIsOpen(false);
  }

  const closeModalNew = () => {
    setIsOpenNew(false);
  }


  const LOGOUT_BUTTON_CLICKED_THREAD = () => {
    navigate("/", { replace: true })
  }

  const LOGOUT_BUTTON_CLICKED = () => {
    NotificationManager.success('You have successfully logged out !', 'LogOut', 1000);
    setTimeout(LOGOUT_BUTTON_CLICKED_THREAD, 2000);
  }


  const ISCARD_BUTTON_CLICKED = () => {
    setCardShow(!cardShow)
  }


  const NEW_USER_BUTTON_CLICKED = () => {
    try {
      if (get_admin) {
        setIsOpenNew(true)
      }
      else {
        NotificationManager.warning('Sorry, You are not an admin..', 'Administrators only', 3000);
      }
    } catch (error) {
      NotificationManager.warning('Sorry, You are not an admin..', 'Administrators only', 3000);
    }
  }


  Modal.setAppElement('#root');

  return (
    <div className="DASHBOARD_DIV">
      <MODEL_COMPONENT_MODIFY modalIsOpen={modalIsOpen} closeModal={closeModal} data={modalData} />
      <MODEL_COMPONENT_NEW modalIsOpen={modalIsOpenNew} closeModal={closeModalNew} userList={userList} />

      <div className='DASHBOARD_DIV_01'>
        <div className='DASHBOARD_DIV_01_01'>
          <span style={{ display: "flex", paddingRight: "10px" }}><FaUserCircle /></span>{get_use}
        </div>

        <div className='DASHBOARD_DIV_01_02'>
          <button className='DASHBOARD_DIV_01_02_button' onClick={ISCARD_BUTTON_CLICKED}>
            {cardShow ? "Show Table View" : "Show Grid View"}
          </button>
          <button className='DASHBOARD_DIV_01_02_button' onClick={LOGOUT_BUTTON_CLICKED}>
            LogOut<span style={{ display: "flex", paddingLeft: "10px" }}><FiLogOut /></span>
          </button>
        </div>
      </div>

      <div className='DASHBOARD_DIV_02'>
        <button className='DASHBOARD_DIV_02_button' onClick={NEW_USER_BUTTON_CLICKED}>
          <span style={{ display: "flex", paddingRight: "10px" }}><FaUserPlus /></span>New User
        </button>
      </div>

      <div className='DASHBOARD_DIV_03'>
        {
          cardShow ?
            <div className='DASHBOARD_DIV_0300'>
              {
                JSON_DATA.map((item) => (
                  <div key={item.USERNAME} className='DASHBOARD_DIV_03_single' onClick={() => MODIFY_BUTTON_CLICKED(item)}>

                    <div className='DASHBOARD_DIV_03_single_01'>
                      <span className='DASHBOARD_DIV_03_single_01_SPAN_1'>
                        <FaUser fontSize={50} />
                      </span>
                      <span className='DASHBOARD_DIV_03_single_01_SPAN_2'>
                        {item.USERNAME}
                      </span>
                    </div>

                    <div className='DASHBOARD_DIV_03_single_02'>
                      <span className='DASHBOARD_DIV_03_single_02_SPAN_1'>
                        {item.FIRSTNAME}&nbsp;{item.LASTNAME}
                      </span>

                      <span className='DASHBOARD_DIV_03_single_02_SPAN_2'>
                        E-mail : {item.EMAIL}
                        <span className="tooltiptext">&nbsp;&nbsp;{item.EMAIL}&nbsp;</span>
                      </span>

                      <span className='DASHBOARD_DIV_03_single_02_SPAN_3'>
                        Roles :
                      </span>
                      <ul className='DASHBOARD_DIV_03_single_02_SPAN_4'>
                        {
                          item.ROLES.split(",").map((it) => (
                            <li key={it} style={{ listStyleType: "disc" }}>
                              {it}
                            </li>
                          ))
                        }
                      </ul>
                    </div>
                  </div>
                ))
              }
            </div>
            :


            <ReactTable
              data={JSON_DATA}
              columns={columns}
              defaultPageSize={5}
              minRows={7}
              sortable={true}
              resizable={true}
              filterable={true}
              defaultFilterMethod={(filter, row) => myRowFilt(filter, row)}
              getTrProps={onRowClick}
              className='Rtable'
              showPagination={true}
              showPaginationTop={false}
              showPaginationBottom={true}
              pageSizeOptions={[5, 10, 20, 25, 50, 100]}
            />
        }

      </div>
      <NotificationContainer />
    </div>
  );
}

export default DASHBOARD;
