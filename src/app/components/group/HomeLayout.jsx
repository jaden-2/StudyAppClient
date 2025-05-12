'use client'
import {React, useEffect, useRef, useState} from 'react';
import styles from "./group.module.css";
import GroupIcon from 'app/components/group/groupIcon';
import Group from './group';
import Image from 'next/image';
import useScreenResize from './screenResize';
import CreateGroup from './createGroup';

const Layout = () => {
  const [group, setGroup] = useState(null)
  const width = useScreenResize()
  const sidebar = useRef(null)
  const mainContent = useRef(null)
  const [sideBarVisible, setSidbarVisible] = useState(true)
  const [isNewGroupDialog, setIsNewGroupDialog] = useState(false)
  const [groups, setUserGroups] = useState([])
 
  const groupApiUrl = "http://localhost:9000/api/studyApp/account/group"
  const createGroupUrl = "http://localhost:9000/api/studyApp/group"
  let token;
  // template hard coded groups
  const legacy =  [
    {
      title : "Math Study Group",
      describtion: "Study Group for math"
    },
    {
      title: "Science Enthusiasts",
      describtion: "Science group for math"
    },
    {
      title: "History buffs",
      describtion: "Study Group for History"
    }
  ];
  // -----------------------------------Template-------------------------------

  // load user groups when component is mounted
  useEffect( ()=>{
    token = localStorage.getItem("jwtToken")
    if(token){
      const getUserGroups = async ()=>{
          try{
          let resposnse = await fetch(groupApiUrl, {
            headers: {
              Authorization: `Bearer ${token}`,
              
            }
          })

          if(resposnse.status == 200){
            let data = await resposnse.json()
            setUserGroups(data)
          }
        }catch(e){
          console.error(e.message)
        }
      }
      getUserGroups()

    }
  }, [])


  const toggleGroup = (id)=>{
     if(width <= 500 && sidebar.current && mainContent.current){
      if(sideBarVisible){
        setSidbarVisible(false)
        sidebar.current.style.display = "none"
        mainContent.current.style.display = "block"
      }
    }

    setGroup(groups[id])
  }

  const goHome = ()=>{
    if(width <=500 && sidebar.current && mainContent.current){
      sidebar.current.style.display = "block"
      mainContent.current.style.display = "none"
      setSidbarVisible(true)
    }
  }
  const groupProps = {
    "group" : group,
    "goHome": goHome
  }

  const displayCreateGroupDialog = ()=>{
    if(!isNewGroupDialog){
      setIsNewGroupDialog(true)
      console.log(isNewGroupDialog)
    }
  }
  
  const onClose = ()=>{
    setIsNewGroupDialog(false)
  }

  const onCreate = async (groupDto)=>{
    token = localStorage.getItem("jwtToken")

    try{
      if(!token)
        return;

      let response = await fetch(createGroupUrl, {
        method: "post", 
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(groupDto)
      })
      
      if(response.status == 201){
        let newGroup = await response.json()
        setUserGroups(prev => [...prev, newGroup])
      }  
    }catch(e){
      console.error(e)
    }
  }
  return (
    <>
    {/*Header */}
    <header className={styles.header}>
      <button className={styles.buttons} style={{borderRadius: 50}}> 
        <Image src={"/image/dark mode.svg"}
          width={35}
          height={35}
          alt='dark mode icon' >
        </Image>
      </button>

      <h2>Study App</h2>

      <button type="button" style={{borderRadius: 50}} className={styles.buttons} >
        <Image src={"/image/profile_green.svg"}
          width={35}
          height={35}
          alt='profile icon'>
        </Image>
      </button>
    </header>

    <div className={styles.container}>

      {/* Sidebar */}
      <div className={styles.groupList} id="groupList" ref={sidebar}>
        <h2>Study Groups</h2>
        <ul className={styles.groupListItems}>
          {groups.map((group, index) => (
            <li key={index} className={styles.studyGroups} onClick={()=>toggleGroup(index)}>
              <GroupIcon group={group}/>
            </li>
          ))}
        </ul>
       <div className="createGroup">
          <button onClick={displayCreateGroupDialog}>
            <Image src={"/image/add.svg"}
            width={50}
            height={50} alt='create group'></Image>
          </button>
          {isNewGroupDialog?<CreateGroup onClose={onClose} onCreate={onCreate}/>: ""}
       </div>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent} ref={mainContent}>
        <Group groupData = {groupProps}/>
      </div>
    </div>
    </>
  );
};

export default Layout;