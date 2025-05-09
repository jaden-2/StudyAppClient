'use client'
import {React, useState} from 'react';
import styles from "./group.module.css";
import GroupIcon from 'app/components/group/groupIcon';


const Layout = () => {
  const [group, setGroup] = useState("Welcome to StudyApp")
  const groups =  [
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

  const selectGroup = (id)=>{
    setGroup(groups[id].describtion)
  }
  return (
    <>
    <header className={styles.header}>
    <h2>Study App</h2>
    </header>
    <div className={styles.container}>
      
      {/* Sidebar */}
      <div className={styles.groupList}>
        <h2>Study Groups</h2>
        <ul className={styles.groupListItems}>
          {groups.map((group, index) => (
            <li key={index} className={styles.group} onClick={()=>selectGroup(index)}>
              <GroupIcon props={{
                title: group.title
              }}/>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        <h1>{group}</h1>
      </div>
    </div>
    </>
  );
};

export default Layout;